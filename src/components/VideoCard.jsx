import { useState } from 'react';

export default function VideoCard({ src, label }) {
  const [playing, setPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const id = new URL(src).pathname.split('/').pop();
  return <figure className="stem-video">
    <div className="stem-video-frame">
      {playing ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`} title={label} referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> :
        <button className="stem-video-poster" onClick={() => setPlaying(true)} aria-label={`Reproducir ${label}`}>
          {!posterFailed && <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" onError={() => setPosterFailed(true)} />}
          <span className="stem-video-play" aria-hidden="true">▷</span><span className="stem-video-poster-label">{label}</span>
        </button>}
    </div>
    <figcaption>{label}</figcaption>
    <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">Ver en YouTube ↗</a>
  </figure>;
}
