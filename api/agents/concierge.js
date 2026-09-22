import { endpoint, readJson, textField, languageOf, simulation, HttpError } from '../../lib/http/security.mjs';
import { getSession, simulatedSessions } from '../../lib/http/session.mjs';
import { stateless } from '../../lib/http/storage-mode.mjs';
export default endpoint(['POST'], async (req, res) => {
  const body = await readJson(req);
  const message = textField(body.message, 'message', 4000, true);
  const language = languageOf(body.language);
  // Browser history is untrusted conversational data, never system/tool messages.
  let clientHistory = [];
  if (stateless() && body.history !== undefined) {
    if (!Array.isArray(body.history) || body.history.length > 8) throw new HttpError(400, 'Invalid history.');
    clientHistory = body.history.map(row => {
      if (!row || !['user', 'assistant'].includes(row.role)) throw new HttpError(400, 'Invalid history role.');
      return { role: row.role, content: textField(row.content, 'history', 6000, true) };
    });
    if (clientHistory.reduce((n, row) => n + row.content.length, 0) > 12000) throw new HttpError(400, 'History too long.');
  }
  const level = body.level ?? 'beginner';
  if (!['beginner', 'medium', 'academic'].includes(level)) throw new HttpError(400, 'Invalid explanation level.');
  const session = await getSession(req, res, true, language);
  const controller = new AbortController();
  const abort = () => { if (!res.writableEnded) controller.abort(); };
  res.on('close', abort);
  const timeout = setTimeout(() => controller.abort(), 90000);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Session-Expires', String(session.expires));
  try {
    if (simulation()) {
      const state = simulatedSessions.get(session.id);
      let answer = language === 'es'
        ? 'Podemos explorarlo con calma. Las células madre de la sangre del cordón pueden dar origen a células sanguíneas y se utilizan en determinados trasplantes.\n\nLa utilidad depende de la enfermedad y de la evaluación de un especialista. Otras aplicaciones siguen en investigación; no todas son tratamientos establecidos.\n\n¿Qué te gustaría conocer: el proceso de conservación o sus posibles usos?'
        : 'We can explore this together. Cord blood stem cells can develop into blood cells and are used in certain transplants.\n\nTheir suitability depends on the condition and a specialist’s assessment. Other applications remain under investigation; they are not all established treatments.\n\nWould you like to explore the preservation process or potential uses?';
      if (level !== 'beginner') answer += language === 'es'
        ? level === 'academic' ? '\n\nEn una revisión académica, distinguiríamos el diseño del estudio, la población y los límites de la evidencia. Esta respuesta simulada no incluye una revisión bibliográfica.' : '\n\nPodemos profundizar en el proceso y sus limitaciones, explicando los términos técnicos paso a paso.'
        : level === 'academic' ? '\n\nAn academic review would distinguish study design, population and evidence limitations. This simulated response is not a literature review.' : '\n\nWe can explore the process and its limitations, explaining technical terms step by step.';
      if (/contact|cita|appointment/i.test(message) && /[^\s@]+@[^\s@]+\.[^\s@]+/.test(message)) {
        const email = message.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)[0];
        state.pending.push({ id: Date.now(), proposed_action: { tool: 'createLead', args: { service: 'criopreservacion', nombre: 'Demo', email }, summary: 'Demo · ' + email } });
        answer = language === 'es' ? 'Tu solicitud de prueba está preparada. Revisa los datos antes de confirmar.' : 'Your test request is ready. Review the details before confirming.';
      }
      state.messages.push({ role: 'user', content: message });
      for (const part of answer.match(/.{1,28}|\n/g) || []) {
        if (controller.signal.aborted) break;
        res.write(part);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      if (simulatedSessions.has(session.id) && !controller.signal.aborted) state.messages.push({ role: 'assistant', content: answer });
    } else {
      const { runConciergeStream } = await import('../../lib/agent/run.mjs');
      await runConciergeStream({ userMessage: message, language, level, sessionId: session.id, clientHistory, signal: controller.signal, onToken: t => res.write(t) });
    }
    if (controller.signal.aborted && !res.writableEnded) res.destroy(); else res.end();
  } finally { clearTimeout(timeout); res.off('close', abort); }
}, { bucket: 'chat' });
