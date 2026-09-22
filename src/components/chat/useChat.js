import { useCallback, useEffect, useRef, useState } from 'react';
import { createReveal } from './reveal';

const STORE = 'stemcare-chat-v1';
export default function useChat(language, reducedMotion, level = 'beginner') {
  const [messages, setMessages] = useState([]);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState('idle');
  const [pending, setPending] = useState([]);
  const [error, setError] = useState('');
  const clearing = useRef(false);
  const current = useRef(null);
  const restore = useRef(null);
  const expires = useRef(0);
  const motion = useRef(reducedMotion);
  motion.current = reducedMotion;
  const stop = useCallback(() => {
    const run = current.current;
    if (!run) return;
    run.controller.abort();
    if (run.timer) cancelAnimationFrame(run.timer);
    run.finish?.();
    current.current = null;
    setMessages(prev => prev.map(m => m.id === run.id ? { ...m, status: 'interrupted' } : m));
    setPhase('idle');
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    restore.current = controller;
    fetch('/api/session', { signal: controller.signal }).then(async res => {
      if (!res.ok) { sessionStorage.removeItem(STORE); return; }
      const session = await res.json();
      if (controller.signal.aborted) return;
      expires.current = session.expires;
      const saved = JSON.parse(sessionStorage.getItem(STORE) || 'null');
      if (saved?.expires === session.expires && Array.isArray(saved.messages)) setMessages(saved.messages.map(m => ({ ...m, status: m.status === 'streaming' ? 'interrupted' : m.status })));
      const ar = await fetch('/api/agents/approvals', { signal: controller.signal });
      if (ar.ok) { const data = await ar.json(); if (!controller.signal.aborted) setPending(data.pending || []); }
    }).catch(() => {}).finally(() => { if (!controller.signal.aborted) setReady(true); });
    return () => { controller.abort(); stop(); };
  }, [stop]);
  useEffect(() => {
    if (phase !== 'idle' || !ready) return;
    try { sessionStorage.setItem(STORE, JSON.stringify({ expires: expires.current, messages })); } catch { /* private mode */ }
  }, [messages, phase, ready]);
  useEffect(() => {
    const expire = () => {
      if (expires.current && expires.current <= Date.now()) {
        stop(); setMessages([]); setPending([]); expires.current = 0;
        try { sessionStorage.removeItem(STORE); } catch { /* private mode */ }
      }
    };
    const timer = setInterval(expire, 1000);
    document.addEventListener('visibilitychange', expire);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', expire); };
  }, [stop]);
  const clear = async () => {
    if (clearing.current) return false;
    clearing.current = true; setReady(false);
    restore.current?.abort();
    stop(); setError('');
    try {
      const res = await fetch('/api/session', { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setMessages([]); setPending([]); expires.current = 0; sessionStorage.removeItem(STORE);
      return true;
    } catch { setError(language === 'es' ? 'No se pudo borrar. Intenta de nuevo.' : 'Could not clear. Please try again.'); return false; }
    finally { clearing.current = false; setReady(true); }
  };
  const send = async input => {
    if (current.current || clearing.current || !ready || !input.trim()) return;
    const expired = expires.current && expires.current <= Date.now();
    if (expired) { setMessages([]); setPending([]); }
    const id = crypto.randomUUID();
    const run = { id, controller: new AbortController(), received: '', immediate: motion.current, timer: 0 };
    current.current = run; setError(''); setPhase('waiting');
    setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'user', content: input }, { id, role: 'assistant', content: '', status: 'streaming', question: input }]);
    const write = (text, status = 'streaming') => {
      if (current.current !== run) return;
      setMessages(prev => prev.map(m => m.id === id ? { ...m, content: text, status } : m));
    };
    let visibility;
    try {
      const history = []; let remaining = 12000;
      for (const row of (expired ? [] : [...messages].reverse())) {
        if (!row.content || (row.role === 'assistant' && row.status !== 'complete')) continue;
        const content = row.content.slice(0, 6000);
        if (history.length === 8 || content.length > remaining) break;
        history.unshift({ role: row.role, content }); remaining -= content.length;
      }
      const res = await fetch('/api/agents/concierge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: input, language, level, history }), signal: run.controller.signal });
      if (current.current !== run) return;
      if (!res.ok || !res.body) { const failure = new Error(); failure.status = res.status; throw failure; }
      expires.current = Number(res.headers.get('X-Session-Expires'));
      const reader = res.body.getReader(); const decoder = new TextDecoder(); const engine = createReveal();
      let done = false, last = performance.now(), visible = '';
      const drained = new Promise(resolve => { run.finish = resolve; });
      const step = now => {
        if (current.current !== run) return;
        const next = engine.step(run.received, now - last, run.immediate || motion.current || document.hidden);
        last = now;
        if (next !== visible) { visible = next; write(visible); setPhase(done ? 'revealing' : 'generating'); }
        if (done && visible === run.received) { run.finish(); return; }
        run.timer = requestAnimationFrame(step);
      };
      visibility = () => { if (document.hidden && done) { write(run.received); run.finish(); } };
      document.addEventListener('visibilitychange', visibility);
      run.timer = requestAnimationFrame(step);
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        run.received += decoder.decode(chunk.value, { stream: true });
      }
      run.received += decoder.decode(); done = true;
      if (current.current !== run) return;
      if (!run.received.trim()) throw new Error();
      setPhase('revealing'); visibility(); await drained;
      if (current.current !== run) return;
      write(run.received, 'complete');
      const ar = await fetch('/api/agents/approvals', { signal: run.controller.signal });
      if (ar.ok && current.current === run) setPending((await ar.json()).pending || []);
    } catch (err) {
      if (current.current === run && err.name !== 'AbortError') {
        write(run.received, 'error');
        setError(err.status === 503 ? (language === 'es' ? 'StemCare AI no está disponible en este momento. Intenta más tarde o contáctanos para recibir orientación.' : 'StemCare AI is currently unavailable. Try again later or contact us.') : (language === 'es' ? 'La respuesta se interrumpió. Puedes volver a intentar.' : 'The response was interrupted. You can try again.'));
      }
    } finally {
      cancelAnimationFrame(run.timer); document.removeEventListener('visibilitychange', visibility);
      if (current.current === run) { current.current = null; setPhase('idle'); }
    }
  };
  return { messages, phase, pending, setPending, error, ready, send, stop, clear, revealNow: () => { if (current.current) current.current.immediate = true; } };
}
