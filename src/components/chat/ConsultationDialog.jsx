import GenomeHeading from '../GenomeHeading.jsx';
import TypeText from '../TypeText.jsx';
import { useRef, useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, TextField } from '@mui/material';
import Turnstile from './Turnstile.jsx';

const services = ['Criopreservación', 'Terapia Celular', 'Pruebas Genéticas'];
const blank = { nombre: '', apellidos: '', email: '', telefono: '', semana_de_embarazo: '', nombre_de_ginecologo: '', telefonos_de_contacto: '', hospital_donde_se_atendera: '', mensaje: '' };
export default function ConsultationDialog({ open, onClose }) {
  const [service, setService] = useState(0);
  const [values, setValues] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);
  const [token, setToken] = useState('');
  const [attempt, setAttempt] = useState(0);
  const lock = useRef(false);
  const close = () => { if (!lock.current) { setNotice(null); onClose(); } };
  const field = (name, label, extra = {}) => <TextField key={name} name={name} label={label} value={values[name]} onChange={e => setValues(v => ({ ...v, [name]: e.target.value }))} variant="filled" fullWidth disabled={busy} inputProps={{ maxLength: name === 'mensaje' ? 2000 : 200 }} {...extra} />;
  const submit = async event => {
    event.preventDefault();
    if (lock.current || !token) return;
    lock.current = true; setBusy(true); setNotice(null);
    try {
      const data = { ...values, origen: services[service], turnstileToken: token };
      if (service !== 0) for (const key of ['semana_de_embarazo', 'nombre_de_ginecologo', 'hospital_donde_se_atendera']) delete data[key];
      const response = await fetch('/api/consultation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error();
      setNotice({ severity: 'success', text: result.simulated ? 'Solicitud de prueba validada. No se ha enviado información ni agendado una consulta.' : 'Solicitud enviada. El equipo de Stem Care se comunicará contigo para coordinar la consulta.' });
      setValues(blank);
    } catch { setNotice({ severity: 'error', text: 'No se pudo enviar la solicitud. Intenta nuevamente o comunícate con contacto@stem-care.com.' }); }
    finally { lock.current = false; setBusy(false); setToken(''); setAttempt(v => v + 1); }
  };
  return <Dialog open={open} onClose={close} fullWidth maxWidth="md" aria-labelledby="consultation-title" PaperProps={{ className: 'consultation-dialog' }}>
    <DialogTitle id="consultation-title"><TypeText text="Agendar Consulta" /></DialogTitle>
    <Tabs value={service} onChange={(_, value) => { setService(value); setNotice(null); }} variant="fullWidth" aria-label="Tipo de consulta">
      {services.map((label, i) => <Tab key={label} label={label} id={`consultation-tab-${i}`} aria-controls="consultation-fields" disabled={busy} />)}
    </Tabs>
    <DialogContent><form id="consultation-form" onSubmit={submit}>
      <div id="consultation-fields" role="tabpanel" aria-labelledby={`consultation-tab-${service}`}>
        <GenomeHeading as="h3">Datos de contacto</GenomeHeading><div className="consultation-grid">
          {field('nombre', 'Nombre', { required: true, autoComplete: 'given-name' })}{field('apellidos', 'Apellidos', { autoComplete: 'family-name' })}
          {field('email', 'E-mail', { required: true, type: 'email', autoComplete: 'email' })}{field('telefono', 'Teléfono', { type: 'tel', autoComplete: 'tel', helperText: 'Solo números o +; ej: +502 5555 5555', inputProps: { maxLength: 30, pattern: '[+0-9 ()-]{7,30}' } })}
        </div>
        {service === 0 && <><GenomeHeading as="h3">Información médica</GenomeHeading><div className="consultation-grid">
          {field('semana_de_embarazo', 'Semana de Embarazo', { type: 'number', helperText: 'Opcional', inputProps: { min: 1, max: 42 } })}
          {field('nombre_de_ginecologo', 'Nombre de Doctor/Especialista', { helperText: 'Opcional' })}
          {field('telefonos_de_contacto', 'Teléfonos de Contacto', { helperText: 'Opcional — separa con comas si son varios' })}
          {field('hospital_donde_se_atendera', 'Hospital en donde se Atenderá', { helperText: 'Opcional' })}
        </div></>}
        {service !== 0 && <div className="consultation-extra">{field('telefonos_de_contacto', 'Teléfonos de Contacto', { helperText: 'Opcional — separa con comas si son varios' })}</div>}
        <GenomeHeading as="h3">Mensaje</GenomeHeading>{field('mensaje', 'Mensaje', { multiline: true, minRows: 3 })}
      </div>
      <p className="consultation-note">Al enviar, compartes estos datos con el equipo de Stem Care para coordinar tu consulta.</p>
      {open && <Turnstile key={attempt} language="es" onToken={setToken} />}
      {notice && <Alert severity={notice.severity}>{notice.text}</Alert>}
    </form></DialogContent>
    <DialogActions><Button onClick={close} disabled={busy}>Cancelar</Button><Button variant="contained" type="submit" form="consultation-form" disabled={busy || !token}>{busy ? 'Enviando…' : 'Enviar'}</Button></DialogActions>
  </Dialog>;
}
