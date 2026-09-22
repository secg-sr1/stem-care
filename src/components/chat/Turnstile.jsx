import { useEffect, useRef, useState } from 'react';
const simulated = import.meta.env.DEV && import.meta.env.VITE_SIMULATION === 'true';
let loaded;
function load() {
  if (window.turnstile) return Promise.resolve();
  if (!loaded) loaded = new Promise((resolve, reject) => {
    const script = document.createElement('script'); script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; script.async = true; script.onload = resolve; script.onerror = () => { loaded = null; reject(new Error()); }; document.head.appendChild(script);
  });
  return loaded;
}
export default function Turnstile({ onToken, language }) {
  const ref = useRef(null), callback = useRef(onToken); callback.current = onToken;
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (simulated) { callback.current('local-simulation'); return; }
    let cancelled = false, id;
    const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (!sitekey) { setFailed(true); return; }
    load().then(() => { if (!cancelled) id = window.turnstile.render(ref.current, { sitekey, language, callback: token => callback.current(token), 'expired-callback': () => callback.current(''), 'error-callback': () => { callback.current(''); setFailed(true); } }); }).catch(() => setFailed(true));
    return () => { cancelled = true; if (id !== undefined) window.turnstile?.remove(id); };
  }, [language]);
  return <div ref={ref}>{failed && <p role="alert">{language === 'es' ? 'Verificación no disponible. Intenta de nuevo más tarde.' : 'Verification unavailable. Please try again later.'}</p>}</div>;
}
