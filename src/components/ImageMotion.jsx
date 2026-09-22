import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ImageMotion() {
  const { pathname } = useLocation();
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let images = [], frame = 0;
    const update = () => {
      frame = 0;
      if (motion.matches) return;
      images.forEach(image => {
        const rect = image.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight) image.style.setProperty('--image-drift', `${Math.max(-14, Math.min(14, (rect.top + rect.height / 2 - innerHeight / 2) * .035))}px`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const discover = () => {
      images = [...document.querySelectorAll('.stem-page-content img')].filter(image => !image.closest('.stem-video, .service-graphic, .services-experience, .family-story'));
      images.forEach(image => image.classList.add('stem-image-motion'));
      schedule();
    };
    const observer = new MutationObserver(discover);
    observer.observe(document.getElementById('contenido'), { childList: true, subtree: true });
    discover(); window.addEventListener('scroll', schedule, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', schedule); cancelAnimationFrame(frame); images.forEach(image => image.classList.remove('stem-image-motion')); };
  }, [pathname]);
  return null;
}
