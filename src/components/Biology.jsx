import GenomeHeading from './GenomeHeading.jsx';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './biology.css';
import TypeText from './TypeText.jsx';

export function Cell({ small = false }) {
  return <span className={`bio-cell${small ? ' small' : ''}`} aria-hidden="true"><span className="bio-nucleus" /></span>;
}

export function BiologicalHero() {
  const field = useRef(null);
  return <section className="bio-hero" onPointerMove={e => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    e.currentTarget.style.setProperty('--hero-x', `${(e.clientX / window.innerWidth - .5) * 25}px`);
    e.currentTarget.style.setProperty('--hero-y', `${(e.clientY / window.innerHeight - .5) * 18}px`);
    field.current?.style.setProperty('--x', `${(e.clientX / window.innerWidth - .5) * 18}px`);
    field.current?.style.setProperty('--y', `${(e.clientY / window.innerHeight - .5) * 18}px`);
  }}>
    <div className="bio-hero-photo" aria-hidden="true" />
    <div className="bio-hero-shade" aria-hidden="true" />
    <div className="bio-hero-copy"><span className="bio-eyebrow">STEM CARE · GUATEMALA</span>
      <GenomeHeading as="h1"><TypeText text="El Primer y Único Banco Privado de Células Madre de Cordón Umbilical en Guatemala desde el año 2006." /></GenomeHeading>
      <div className="bio-actions"><Link to="/planes">planes <span>↗</span></Link><a href="https://www.youtube.com/watch?v=yRuY5k6sIyg" target="_blank" rel="noreferrer">▷ Podcast Alejandra Calgua</a></div>
    </div>
    <div className="bio-environment" ref={field} aria-hidden="true"><div className="bio-orbit" /><Cell />{Array.from({ length: 10 }, (_, i) => <span className="bio-satellite" key={i} style={{ '--n': i, left: `${50 + Math.cos(i * Math.PI / 5) * 43}%`, top: `${50 + Math.sin(i * Math.PI / 5) * 43}%` }}><Cell small /></span>)}<span className="bio-annotation">01 / CÉLULAS MADRE<br />Cordón umbilical</span></div>
    <a className="bio-scroll" href="#intro">Explorar Stem Care <span>↓</span></a>
  </section>;
}

const stages = ['Bienvenidos, familia', 'Nacimiento', 'Recolección', 'Criopreservación'];
export function BiologicalJourney() {
  const [step, setStep] = useState(0);
  const host = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const update = () => {
      const rect = host.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) setStep(Math.min(stages.length - 1, Math.max(0, Math.floor((window.innerHeight - rect.top) / (window.innerHeight + rect.height) * stages.length))));
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <section ref={host} className="bio-journey" aria-label="Recorrido de la muestra"><span className="bio-eyebrow">PROGRAMA STEM CARE</span><div className="bio-journey-line"><div className="bio-traveler" style={{ left: `${(step + .5) * 100 / stages.length}%` }}><Cell small /></div></div><div className="bio-steps">{stages.map((stage, i) => <button key={stage} aria-pressed={step === i} onClick={() => setStep(i)}><small>0{i + 1}</small>{stage}</button>)}</div><Link to="/programa-stem-care">Programa Stem Care ↗</Link></section>;
}

export function ScienceExplorer() {
  const { pathname } = useLocation();
  const [selected, setSelected] = useState(0);
  const genetics = pathname.endsWith('/pruebas-geneticas');
  const dental = pathname.endsWith('/pulpa');
  const program = pathname === '/programa-stem-care';
  if (program) return <BiologicalJourney />;
  if (!genetics && !dental) return null;
  const labels = genetics ? ['myGenome', 'myCancerRisk', 'myHealthScore', 'myPrenatal'] : ['Diente de leche', 'Pulpa dental', 'Células madre', 'Criopreservación'];
  return <section className={`science-explorer ${genetics ? 'genetics' : 'dental'}`} aria-label={genetics ? 'Explorar pruebas genéticas' : 'Explorar pulpa dental'}>
    <div className="science-model" aria-hidden="true">{genetics ? <img className="bio-dna-image" src="/dna-illustration.png" alt="" /> : selected < 2 ? <svg viewBox="0 0 200 230"><path d="M100 32C48 0 17 40 33 101c8 30 10 97 30 102 21 3 13-77 37-77s16 80 37 77c20-5 22-72 30-102C183 40 152 0 100 32Z" fill="#e8edf6" stroke="#9893bf" strokeWidth="2"/><path d="M100 60c-25-15-42 5-34 28 8 20 20 30 19 71m15-99c25-15 42 5 34 28-8 20-20 30-19 71" fill="none" stroke="#9893bf" strokeWidth={selected === 1 ? 12 : 4}/></svg> : <div className={selected === 3 ? 'bio-frozen' : ''}><Cell /></div>}</div>
    <div className="science-controls"><span className="bio-eyebrow">{genetics ? 'PRUEBAS GENÉTICAS' : 'PULPA DE DIENTE DE LECHE'}</span><GenomeHeading as="h2">{labels[selected]}</GenomeHeading><div className="science-options">{labels.map((label, i) => <button key={label} aria-pressed={selected === i} onClick={() => setSelected(i)}><small>0{i + 1}</small>{label}<span>↗</span></button>)}</div>{genetics && <a href={`#${labels[selected]}`}>Más información ↘</a>}</div>
  </section>;
}

export function TourCompanion() {
  const { pathname } = useLocation();
  const [label, setLabel] = useState('Stem Care');
  useEffect(() => {
    window.scrollTo(0, 0);
    const seen = new Set();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setLabel(entry.target.querySelector('[data-genome-text]')?.getAttribute('data-genome-text') || entry.target.querySelector('h2')?.textContent || entry.target.textContent.slice(0, 75));
    }, { rootMargin: '-15% 0px -55% 0px' });
    const discover = () => document.querySelectorAll('main h1, main h2, main h4, .science-explorer h2').forEach(el => { if (!seen.has(el)) { seen.add(el); observer.observe(el); } });
    const changes = new MutationObserver(discover);
    changes.observe(document.getElementById('contenido'), { childList: true, subtree: true });
    discover();
    return () => { observer.disconnect(); changes.disconnect(); };
  }, [pathname]);
  useEffect(() => { window.dispatchEvent(new CustomEvent('stemcare:section', { detail: label })); }, [label]);
  return <aside className="bio-companion"><Cell small /><span>{label}</span><button type="button" onClick={() => window.dispatchEvent(new Event('stemcare:ask'))}>Preguntar ↗</button></aside>;
}
