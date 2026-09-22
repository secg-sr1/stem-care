import { endpoint, readJson, validateContact, verifyBot, simulation, HttpError } from '../lib/http/security.mjs';
import { sendTeamEmail } from '../lib/email/send.mjs';

export default endpoint(['POST'], async (req, res) => {
  const body = await readJson(req);
  const data = validateContact(body);
  if (!['Criopreservación', 'Terapia Celular', 'Pruebas Genéticas'].includes(data.origen)) throw new HttpError(400, 'Invalid service.');
  if (data.telefono && !/^[+\d ()-]{7,30}$/.test(data.telefono)) throw new HttpError(400, 'Invalid phone.');
  if (data.origen !== 'Criopreservación') for (const key of ['semana_de_embarazo', 'nombre_de_ginecologo', 'hospital_donde_se_atendera']) delete data[key];
  if (data.semana_de_embarazo && (!/^\d+$/.test(data.semana_de_embarazo) || +data.semana_de_embarazo < 1 || +data.semana_de_embarazo > 42)) throw new HttpError(400, 'Invalid pregnancy week.');
  await verifyBot(body.turnstileToken);
  if (simulation()) return res.json({ ok: true, simulated: true });
  const labels = { nombre: 'Nombre', apellidos: 'Apellidos', email: 'E-mail', telefono: 'Teléfono', semana_de_embarazo: 'Semana de embarazo', nombre_de_ginecologo: 'Doctor/Especialista', telefonos_de_contacto: 'Teléfonos de contacto', hospital_donde_se_atendera: 'Hospital', mensaje: 'Mensaje', origen: 'Tipo de consulta' };
  await sendTeamEmail({ subject: `Solicitud de consulta · ${data.origen}`, text: Object.entries(data).filter(([,value]) => value).map(([key,value]) => `${labels[key]}: ${value}`).join('\n\n') });
  res.json({ ok: true });
}, { bucket: 'consultation', limit: 5 });
