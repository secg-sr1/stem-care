import { useEffect, useRef, useState } from 'react';
const bases = 'ACGT';
export default function TypeText({ text }) {
  const host = useRef(null);
  const [frame, setFrame] = useState(24);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) { setFrame(24); return; }
    let timer;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect(); setFrame(0);
      let next = 0;
      timer = setInterval(() => { next += 1; setFrame(next); if (next >= 24) clearInterval(timer); }, 60);
    }, { threshold: .15 });
    observer.observe(host.current);
    const stop = () => { if (motion.matches) { clearInterval(timer); observer.disconnect(); setFrame(24); } };
    motion.addEventListener('change', stop);
    return () => { clearInterval(timer); observer.disconnect(); motion.removeEventListener('change', stop); };
  }, [text]);
  let index = 0;
  return <span ref={host} className="genome-text" data-genome-text={text}>
    <span className="genome-accessible">{text}</span><span aria-hidden="true">{text.split(/(\s+)/).map((word, w) => /\s/.test(word) ? word : <span className="genome-word" key={w}>{[...word].map(char => {
      const i = index++;
      const resolved = frame >= 24 || i / Math.max(text.replace(/\s/g, '').length, 1) < frame / 21;
      return <span className={`genome-glyph${resolved ? ' resolved' : ''}`} key={i}><span className="genome-original">{char}</span>{!resolved && <span className="genome-base">{/[\p{L}\p{N}]/u.test(char) ? bases[(i * 3 + frame) % 4] : char}</span>}</span>;
    })}</span>)}</span>
  </span>;
}
