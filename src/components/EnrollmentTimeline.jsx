import { useState } from 'react';
import GenomeHeading from './GenomeHeading.jsx';
export default function EnrollmentTimeline() {
  const [expanded, setExpanded] = useState(false);
  const steps = [
    ['Inscripción', 'Completa los formularios de inscripción y de pago. Adjunta DPI o pasaporte de ambos padres y envíalos a alecalgua@stem-care.com o al WhatsApp 5702-9736.'],
    ['Contrato y kit', 'Stem Care registra la recolección en espera y entrega el contrato y el kit. En el interior del país, coordina la entrega por Guatex.'],
    ['Pago antes del nacimiento', 'Completa el pago antes del nacimiento de tu bebé.'],
    ['Panel de infecciosas', 'Entre las semanas 35–40, realiza el panel materno y envía los resultados a alecalgua@stem-care.com.'],
    ['Coordina el nacimiento', 'Informa a tu obstetra y a Stem Care la fecha probable de parto o cesárea para coordinar la toma de muestra.'],
    ['Recibe tus documentos', 'Tres semanas después del nacimiento, recibirás el contrato legalizado y el informe de resultados de la muestra almacenada.'],
  ];
  return <section className="enrollment" aria-labelledby="enrollment-title"><div className="enrollment-header"><div><span className="bio-eyebrow">PASO A PASO</span><GenomeHeading id="enrollment-title">Cómo contratar Stem Care</GenomeHeading><p>Prepara todo antes del nacimiento.</p></div><a className="enrollment-download" href="/stem-care-guia.pdf" download>Descargar folleto PDF ↓</a></div><ol>{steps.map(([title, text], i) => <li key={title}><span className="enrollment-number" aria-hidden="true">0{i + 1}</span><GenomeHeading as="h3">{title}</GenomeHeading><p>{text.split(/(alecalgua@stem-care.com|WhatsApp 5702-9736)/).map((part, n) => part.includes('@') ? <a key={n} href={'mailto:' + part}>{part}</a> : part === 'WhatsApp 5702-9736' ? <a key={n} href="https://wa.me/50257029736" target="_blank" rel="noreferrer">{part}</a> : part)}</p>{i === 3 && <div className="exam-details"><button type="button" aria-expanded={expanded} aria-controls="maternal-exams" onClick={() => setExpanded(!expanded)}>Ver los cinco exámenes <span aria-hidden="true">{expanded ? '−' : '+'}</span></button><div id="maternal-exams" className={'exam-reveal' + (expanded ? ' is-expanded' : '')} inert={!expanded}><div><ul>{['VIH','Hepatitis B (HBsAg)','Anticuerpos totales de hepatitis C','Chagas (IgG e IgM)','VDRL'].map(exam => <li key={exam}>{exam}</li>)}</ul><p>Realízalos en tu laboratorio de confianza o donde indique tu médico.</p></div></div></div>}</li>)}</ol><div className="enrollment-contact"><p>Te acompañamos desde el primer paso.</p><a href="https://wa.me/50257029736" target="_blank" rel="noreferrer">Conversemos por WhatsApp</a><a href="mailto:alecalgua@stem-care.com">Escríbenos</a></div></section>;
}
