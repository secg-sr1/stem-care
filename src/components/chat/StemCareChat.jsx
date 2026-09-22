import GenomeHeading from '../GenomeHeading.jsx';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './chat.css';
const ChatPanel = lazy(() => import('./ChatPanel.jsx'));
export default function StemCareChat() {
  const host = useRef(null);
  const trigger = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [floating, setFloating] = useState(false);
  const [context, setContext] = useState('Stem Care');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { setLoaded(true); observer.disconnect(); }
    }, { rootMargin: '300px' });
    observer.observe(host.current);
    const open = () => { trigger.current = document.activeElement; setLoaded(true); setFloating(true); };
    const section = event => setContext(event.detail || 'Stem Care');
    window.addEventListener('stemcare:ask', open);
    window.addEventListener('stemcare:section', section);
    return () => { observer.disconnect(); window.removeEventListener('stemcare:ask', open); window.removeEventListener('stemcare:section', section); };
  }, []);
  useEffect(() => {
    document.body.classList.toggle('stem-ai-mode', floating);
    return () => document.body.classList.remove('stem-ai-mode');
  }, [floating]);
  const close = () => { setFloating(false); trigger.current?.focus({ preventScroll: true }); };
  return <section id="asistente" ref={host} className={`stem-chat stem-workspace${floating ? ' is-floating' : ''}`}>
    <div className="stem-workspace-intro"><span className="bio-eyebrow">ASISTENTE STEM CARE</span><GenomeHeading>¿Qué más te gustaría saber?</GenomeHeading><p>¿Te interesa conocer el cuidado de las células madre de tu bebé, la criopreservación o las pruebas genéticas?</p><a href="/contacto">Consultar con un especialista ↗</a></div>
    <div className="stem-chat-slot"><Suspense fallback={<p role="status">Preparando tu conversación…</p>}>{loaded ? <ChatPanel open embedded floating={floating} context={context} onClose={close} /> : <button onClick={() => setLoaded(true)}>Iniciar conversación</button>}</Suspense></div>
    {floating && <div className="stem-chat-docked-note">La conversación te acompaña mientras exploras.<button onClick={close}>Volver a integrar aquí ↙</button></div>}
  </section>;
}
