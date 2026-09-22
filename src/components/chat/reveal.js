// Pure, time-based reveal engine. Network arrival never sets display speed.
export function createReveal() {
  let shown = 0, budget = 0, speed = 45, pause = 0;
  let cached = null, graphemes = [];
  const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
  return {
    step(text, milliseconds, immediate = false) {
      if (text !== cached) { cached = text; graphemes = segmenter ? Array.from(segmenter.segment(text), p => p.segment) : Array.from(text); }
      if (immediate) { shown = graphemes.length; return text; }
      let dt = Math.min(milliseconds, 80);
      if (pause) { const spent = Math.min(pause, dt); pause -= spent; dt -= spent; }
      const behind = graphemes.length - shown;
      const target = Math.min(65, 45 + Math.max(0, behind - 300) / 60);
      speed += (target - speed) * (1 - Math.exp(-dt / 500));
      if (behind <= 0) { budget = 0; return text; }
      budget += speed * dt / 1000;
      while (budget >= 1 && shown < graphemes.length) {
        budget--; const next = graphemes[shown++];
        if (/[.!?。！？]/u.test(next)) { pause = 130; budget = 0; break; }
      }
      return graphemes.slice(0, shown).join('');
    },
  };
}
