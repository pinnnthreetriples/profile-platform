import { cn } from "@/lib/utils"

interface ModelPlaceholderProps {
  /** Seed used to vary the placeholder appearance per model */
  seed: string
  /** Initials shown in the center */
  initials?: string
  className?: string
  /** Aspect treatment: portrait (3/4) or square */
  shape?: "portrait" | "square"
}

/** Deterministic hash → 0..1 from seed */
function hash01(seed: string, salt = 0): number {
  let h = 2166136261 ^ salt
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 1000) / 1000
}

const palette = [
  ["#dcd4c4", "#a89c89"],
  ["#c8b9a3", "#8a7a64"],
  ["#d8c5a8", "#6f5f48"],
  ["#bfa78d", "#3f3527"],
  ["#e3d6c0", "#7c6b53"],
  ["#cfbfa8", "#4a3f2e"],
  ["#b9a78f", "#2e2618"],
] as const

/**
 * Editorial SVG placeholder used in place of real model photography.
 * Deterministic per `seed` so re-renders look stable.
 * No external assets, no network — works in CI and tests.
 */
export function ModelPlaceholder({
  seed,
  initials,
  className,
  shape = "portrait",
}: ModelPlaceholderProps) {
  const idx = Math.floor(hash01(seed) * palette.length)
  const [bg, fg] = palette[idx] ?? palette[0]!
  const tilt = (hash01(seed, 7) - 0.5) * 6 // -3..3 deg
  const headX = 50 + (hash01(seed, 11) - 0.5) * 6
  const aspect = shape === "portrait" ? "3 / 4" : "1 / 1"
  const text = (initials ?? seed.slice(0, 2)).toUpperCase()

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-brand-line text-brand-ink",
        className
      )}
      style={{ aspectRatio: aspect }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 130"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {/* Background paper */}
        <rect width="100" height="130" fill={bg} />

        {/* Soft vignette */}
        <defs>
          <radialGradient id={`grad-${seed}`} cx="50%" cy="40%" r="80%">
            <stop offset="0%" stopColor={fg} stopOpacity="0" />
            <stop offset="100%" stopColor={fg} stopOpacity="0.35" />
          </radialGradient>
        </defs>
        <rect width="100" height="130" fill={`url(#grad-${seed})`} />

        {/* Stylised silhouette: head + shoulders */}
        <g style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "50% 65%" }}>
          {/* Shoulders */}
          <path
            d="M10 130 C 18 95, 30 85, 50 85 S 82 95, 90 130 Z"
            fill={fg}
            opacity="0.65"
          />
          {/* Neck */}
          <rect
            x={headX - 7}
            y="58"
            width="14"
            height="22"
            rx="4"
            fill={fg}
            opacity="0.75"
          />
          {/* Head */}
          <ellipse cx={headX} cy="46" rx="18" ry="22" fill={fg} opacity="0.8" />
          {/* Hair */}
          <path
            d={`M ${headX - 19} 40 C ${headX - 22} 22, ${headX + 22} 22, ${headX + 19} 40 L ${headX + 18} 50 C ${headX + 14} 38, ${headX - 14} 38, ${headX - 18} 50 Z`}
            fill="#1f1a14"
            opacity="0.65"
          />
        </g>

        {/* Cream paper grain dots */}
        <g opacity="0.35">
          {Array.from({ length: 24 }).map((_, i) => {
            const cx = (hash01(seed, 30 + i) * 100).toFixed(1)
            const cy = (hash01(seed, 60 + i) * 130).toFixed(1)
            return <circle key={i} cx={cx} cy={cy} r="0.6" fill={fg} />
          })}
        </g>
      </svg>

      {/* Subtle initials watermark */}
      <span className="absolute bottom-3 right-3 display text-2xl text-brand-ink/40">
        {text}
      </span>
    </div>
  )
}
