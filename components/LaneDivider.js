export default function LaneDivider({ tone = "light" }) {
  const color = tone === "dark" ? "text-chalkLine/30" : "text-ink/15";
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`h-[3px] w-full bg-lanes bg-[length:52px_3px] animate-drive ${color}`}
    />
  );
}
