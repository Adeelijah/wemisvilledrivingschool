// Semi-circular dashboard gauge — the page's signature element.
// Needle points proportionally to `value` out of `max` (default rating gauge 0-5).
export default function Gauge({ value = 4.9, max = 5, label = "Rating", sub = "402 Google reviews" }) {
  const pct = Math.min(value / max, 1);
  const angle = -90 + pct * 180; // -90deg (left) to +90deg (right)
  const ticks = new Array(6).fill(0);

  return (
    <div className="flex flex-col items-center select-none" role="img" aria-label={`${value} out of ${max} — ${label}, ${sub}`}>
      <svg viewBox="0 0 200 120" className="w-52 h-32 overflow-visible">
        <path d="M 12 110 A 88 88 0 0 1 188 110" fill="none" stroke="#DADADD" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M 12 110 A 88 88 0 0 1 188 110"
          fill="none"
          stroke="#F2C200"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="276"
          strokeDashoffset={276 - 276 * pct}
        />
        {ticks.map((_, i) => {
          const a = (-90 + (i / (ticks.length - 1)) * 180) * (Math.PI / 180);
          const x1 = 100 + 78 * Math.cos(a - Math.PI / 2);
          const y1 = 110 + 78 * Math.sin(a - Math.PI / 2);
          const x2 = 100 + 68 * Math.cos(a - Math.PI / 2);
          const y2 = 110 + 68 * Math.sin(a - Math.PI / 2);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5B5B60" strokeWidth="2" />;
        })}
        <g transform={`rotate(${angle} 100 110)`}>
          <line x1="100" y1="110" x2="100" y2="34" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="100" cy="110" r="7" fill="#4C1D75" />
      </svg>
      <div className="-mt-2 text-center">
        <div className="font-display text-4xl leading-none text-ink">{value.toFixed(1)}<span className="text-lg text-slate">/{max}</span></div>
        <div className="mt-1 font-plate text-[11px] tracking-[0.15em] text-slate uppercase">{sub}</div>
      </div>
    </div>
  );
}
