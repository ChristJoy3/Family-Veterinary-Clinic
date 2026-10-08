/**
 * Thin-line bone divider, a nod to the original site's motif. Each stroke has
 * pathLength=1 so the motion controller can draw it in with stroke-dashoffset.
 */
export function BoneDivider({ className = "", tone = "navy" }: { className?: string; tone?: "navy" | "light" }) {
  const color = tone === "light" ? "text-periwinkle/70" : "text-navy/35";
  return (
    <div className={`container-x ${className}`} aria-hidden="true">
      <svg data-bone viewBox="0 0 400 24" className={`mx-auto block h-6 w-full max-w-md ${color}`} fill="none">
        <path d="M0 12H160" pathLength={1} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path
          d="M174.24 9.5A4.5 4.5 0 1 0 167.94 12A4.5 4.5 0 1 0 174.24 14.5H225.76A4.5 4.5 0 1 0 232.06 12A4.5 4.5 0 1 0 225.76 9.5Z"
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path d="M240 12H400" pathLength={1} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
