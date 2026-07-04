export default function ImagePlaceholder({ label = "Photo", ratio = "aspect-[4/3]", className = "" }) {
  return (
    <div
      className={`flex ${ratio} w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-slate/40 bg-chalk text-slate ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current opacity-50" aria-hidden="true">
        <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5Z" />
      </svg>
      <span className="font-plate text-[11px] uppercase tracking-[0.15em]">{label}</span>
    </div>
  );
}
