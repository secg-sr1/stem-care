import GenomeHeading from '../GenomeHeading.jsx';
import { useEffect, useRef, useState } from 'react';
import CloseRounded from '@mui/icons-material/CloseRounded';
import SendRounded from '@mui/icons-material/SendRounded';
import StopRounded from '@mui/icons-material/StopRounded';
import useChat from './useChat';
import MarkdownMessage from './MarkdownMessage';
import Approvals from './Approvals';
import ConsultationDialog from './ConsultationDialog.jsx';
import EditCalendarRounded from '@mui/icons-material/EditCalendarRounded';

const initialSuggestions = ['¿Cómo se conservan las células madre?', '¿Cómo funciona el programa Stem Care?', '¿Qué pruebas genéticas ofrecen?', '¿Cómo puedo explorar la evidencia científica?'];

export default function ChatPanel({ open, onClose, embedded = false, floating = false, context = 'Stem Care' }) {
  const [draft, setDraft] = useState('');
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [level, setLevel] = useState(() => {
    try { const saved = localStorage.getItem('stemcare-level'); return ['beginner', 'medium', 'academic'].includes(saved) ? saved : 'beginner'; } catch { return 'beginner'; }
  });
  const chat = useChat('es', reducedMotion, level);
  const lastQuestion = [...chat.messages].reverse().find(message => message.role === 'user')?.content || '';
  const topic = /genét|genet|ADN/i.test(lastQuestion) ? 'las pruebas genéticas' : /conserv|almacen|programa/i.test(lastQuestion) ? 'la conservación' : 'las células madre';
  const suggestions = !lastQuestion ? initialSuggestions.slice(0, 3) : level === 'academic'
    ? ['¿Qué evidencia respalda ' + topic + '?', '¿Qué limitaciones tienen esos estudios?', '¿Qué sigue siendo experimental?']
    : level === 'medium' ? ['¿Cómo funciona ' + topic + '?', '¿Qué beneficios y limitaciones tiene?', '¿Qué debería preguntar en una consulta?']
    : ['Explícame ' + topic + ' con un ejemplo.', '¿Qué significa esto para mi familia?', '¿Cuál sería el siguiente paso?'];
  const input = useRef(null);
  const history = useRef(null);
  const follow = useRef(true);
  const busy = chat.phase !== 'idle';

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => { if (open && (!embedded || floating)) input.current?.focus({ preventScroll: true }); }, [open, embedded, floating]);
  useEffect(() => {
    if (open && chat.messages.length > 0 && follow.current && history.current) history.current.scrollTop = history.current.scrollHeight;
  }, [chat.messages, chat.pending, chat.error, open]);

  const send = (text = draft) => {
    if (!text.trim() || busy || !chat.ready) return;
    follow.current = true;
    setDraft('');
    void chat.send(text.trim());
  };

  return <section id="stem-chat-panel" className={`stem-chat-panel${open ? ' is-open' : ''}`}
    role={embedded ? "region" : "dialog"} aria-label="Conversación con StemCare AI" inert={!open}
    aria-hidden={!open} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); onClose?.(); } }}>
    <header className="stem-chat-header">
      <div className="stem-chat-brand"><img src="/STEM%20CARE-06.png" alt="Stem Care" /></div>
      <div><GenomeHeading as="h2">StemCare <span>AI</span></GenomeHeading><p>{floating ? "Modo StemCare AI · Explora y pregunta" : "Un espacio para tus preguntas"}</p></div>
      {(!embedded || floating) && <button className="stem-chat-icon" aria-label="Volver al sitio" title="Volver al sitio" onClick={onClose}><CloseRounded /></button>}
    </header>
    {import.meta.env.DEV && import.meta.env.VITE_SIMULATION === 'true' && <div className="stem-chat-demo">Vista de prueba · respuestas simuladas</div>}
    {floating && <div className="stem-chat-reading">Explorando · {context}</div>}
    <fieldset className="stem-chat-levels" disabled={busy}>
      <legend>Nivel de explicación</legend>
      {[['beginner', 'Principiante'], ['medium', 'Intermedio'], ['academic', 'Académico']].map(([value, label]) => <label key={value}><input type="radio" name="explanation-level" value={value} checked={level === value} onChange={() => { setLevel(value); try { localStorage.setItem('stemcare-level', value); } catch { /* private mode */ } }} /><span>{label}</span></label>)}
    </fieldset>
    <div className="stem-chat-companion">
      <button type="button" className={`stem-chat-cell${busy ? ' is-thinking' : ''}`} aria-label="Escribir una pregunta" title="Haz clic para escribir tu pregunta"
        onClick={() => input.current?.focus()}
        onPointerMove={event => {
          if (reducedMotion) return;
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty('--cell-x', `${(event.clientX - rect.left - rect.width / 2) * .16}px`);
          event.currentTarget.style.setProperty('--cell-y', `${(event.clientY - rect.top - rect.height / 2) * .16}px`);
        }}
        onPointerLeave={event => { event.currentTarget.style.setProperty('--cell-x', '0px'); event.currentTarget.style.setProperty('--cell-y', '0px'); }}>
        <span className="stem-cell-membrane" aria-hidden="true"><span className="stem-cell-nucleus" /></span>
      </button>
      <div><span className="stem-chat-cell-label">{busy ? 'Pensando contigo…' : 'Aquí, para acompañarte'}</span><p>{busy ? 'Tu respuesta está tomando forma.' : 'Toca la célula y cuéntame tu pregunta.'}</p></div>
    </div>
    <div ref={history} className="stem-chat-history" role="log" aria-label="Mensajes" aria-live="off"
      onScroll={() => { const el = history.current; follow.current = el.scrollHeight - el.scrollTop - el.clientHeight < 70; }}>
      {!chat.messages.length && <div className="stem-chat-welcome">
        <span className="stem-chat-eyebrow">A TU RITMO</span>
        <GenomeHeading as="h3">Conversemos con calma.</GenomeHeading>
        <p>Estoy aquí para ayudarte a conocer más sobre las células madre y el cuidado del futuro de tu familia.</p>

      </div>}
      {chat.messages.map(message => <article key={message.id} className={`stem-chat-message ${message.role}`}>
        <span className="stem-chat-author">{message.role === 'user' ? 'Tú' : 'StemCare AI'}</span>
        {message.content ? <MarkdownMessage content={message.content} /> : message.status === 'streaming' ? <span className="stem-chat-thinking">Pensando contigo<span>…</span></span> : null}
        {message.status === 'interrupted' && <small>Respuesta detenida</small>}
        {message.status === 'error' && <button disabled={busy} onClick={() => send(message.question)}>Volver a intentar</button>}
      </article>)}
      <Approvals pending={chat.pending} onChange={chat.setPending} language="es" />
      {chat.error && <p className="stem-chat-error" role="alert">{chat.error}</p>}
    </div>
    <span className="stem-chat-sr" role="status">{busy ? 'StemCare está respondiendo.' : chat.messages.at(-1)?.content || ''}</span>
    <footer className="stem-chat-footer">
      <div className="stem-chat-suggestions" aria-label="Preguntas sugeridas">
        <span className="suggestions-label">{lastQuestion ? 'Para continuar' : 'Puedes comenzar aquí'}</span>
        <div className="suggestion-chips">{suggestions.map(text => <button type="button" key={text} disabled={busy || !chat.ready} onClick={() => send(text)}>{text}<span aria-hidden="true">↗</span></button>)}</div>
      </div>
      <form onSubmit={event => { event.preventDefault(); send(); }}>
        <textarea ref={input} rows={2} value={draft} maxLength={4000} aria-label="Tu pregunta para StemCare AI"
          placeholder="Escribe tu pregunta…" onChange={event => setDraft(event.target.value)}
          onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(); } }} />
        <button type="button" className="stem-chat-schedule" aria-label="Agendar consulta" title="Agendar consulta" onClick={() => setConsultationOpen(true)}><EditCalendarRounded /></button>
        {busy ? <button type="button" className="stem-chat-send" aria-label="Detener respuesta" onClick={chat.stop}><StopRounded /></button>
          : <button className="stem-chat-send" type="submit" aria-label="Enviar pregunta" disabled={!draft.trim() || !chat.ready}><SendRounded /></button>}
      </form>
      <div className="stem-chat-footnote"><span>© 2026 Supervisado por el Departamento de Investigación & Desarrollo en Stem Care. | Comprueba la información importante ó contáctanos.</span>
        {chat.messages.length > 0 && <button disabled={busy || !chat.ready} onClick={() => void chat.clear()}>Borrar conversación</button>}
      </div>
    </footer>
    <ConsultationDialog open={consultationOpen} onClose={() => setConsultationOpen(false)} />
  </section>;
}
