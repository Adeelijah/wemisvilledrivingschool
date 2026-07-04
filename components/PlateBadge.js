export default function PlateBadge({ children, tone = "yellow", className = "" }) {
  const tones = {
    yellow: "bg-signal text-ink border-ink",
    dark: "bg-ink text-signal border-signal",
    white: "bg-paper text-ink border-ink",
  };
  return (
    <span
      className={`relative inline-flex items-center gap-2 rounded-[4px] border-2 px-3 py-1 font-plate text-[13px] tracking-[0.12em] ${tones[tone]} ${className}`}
    >
      {/* rivets */}
      <span className="absolute left-1 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-current opacity-40" />
      <span className="absolute right-1 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-current opacity-40" />
      {children}
    </span>
  );
}
