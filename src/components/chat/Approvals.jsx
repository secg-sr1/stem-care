import { useRef, useState } from 'react';
import Turnstile from './Turnstile';
export default function Approvals({ pending, onChange, language }) {
  const [busy, setBusy] = useState(false), [token, setToken] = useState(''), [attempt, setAttempt] = useState(0), [notice, setNotice] = useState('');
  const lock = useRef(false); const es = language === 'es';
  const decide = async (id, decision) => {
    if (lock.current) return; lock.current = true; setBusy(true);
    try {
      const res = await fetch('/api/agents/approvals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ approvalId: id, decision, turnstileToken: token }) });
      const result = await res.json();
      if (!res.ok) throw new Error();
      if (['approved', 'rejected'].includes(result.status)) {
        onChange(pending.filter(p => p.id !== id));
        setNotice(result.simulated ? (es ? 'Prueba completada. No se envió información.' : 'Test complete. No information was sent.') : result.status === 'approved' ? (es ? 'Solicitud recibida.' : 'Request received.') : (es ? 'Solicitud cancelada.' : 'Request cancelled.'));
      } else setNotice(es ? 'La solicitud aún no está confirmada. Vuelve a consultar.' : 'The request is not confirmed yet. Please check again.');
    } catch { setNotice(es ? 'No se pudo confirmar. Intenta de nuevo.' : 'Could not confirm. Please try again.'); }
    finally { lock.current = false; setBusy(false); setToken(''); setAttempt(v => v + 1); }
  };
  return <div className="approvals">{pending.map(p => <div className="approval-card" key={p.id}><strong>{es ? 'Revisa tu solicitud de contacto' : 'Review your contact request'}</strong><p>{p.proposed_action.summary}</p><p className="privacy-note">{es ? 'Al confirmar, estos datos se enviarán al equipo de Stem Care.' : 'Confirming sends these details to the Stem Care team.'}</p><button disabled={busy || !token} onClick={() => decide(p.id, 'approve')}>{es ? 'Confirmar' : 'Confirm'}</button><button disabled={busy} onClick={() => decide(p.id, 'reject')}>{es ? 'Cancelar' : 'Cancel'}</button></div>)}{pending.length > 0 && <Turnstile key={attempt} language={language} onToken={setToken} />}{notice && <p role="status">{notice}</p>}</div>;
}
