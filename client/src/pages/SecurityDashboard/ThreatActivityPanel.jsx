import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Bug, FolderOpen, Link2, ArrowUp, ArrowDown } from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — Threat Activity panel
// Component 3 of the Security Dashboard.
// One bordered panel, four metric columns, each with a small animated
// sparkline so the panel reads as "live" rather than static counters.
// ---------------------------------------------------------------------------

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

function buildPath(points, width, height) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);
  return points
    .map((p, i) => {
      const x = i * stepX;
      const y = height - ((p - min) / range) * (height - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function Sparkline({ points, color = "stroke-cyan-400" }) {
  const width = 120;
  const height = 36;
  const pathRef = useRef(null);
  const [drawn, setDrawn] = useState(prefersReducedMotion());
  const d = buildPath(points, width, height);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, [points]);

  const length = pathRef.current?.getTotalLength?.() ?? 300;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-9 w-full overflow-visible"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d={d}
        fill="none"
        strokeWidth="1.75"
        className={color}
        style={{
          strokeDasharray: length,
          strokeDashoffset: drawn ? 0 : length,
          transition: "stroke-dashoffset 1s ease-out",
        }}
      />
      <circle
        cx={width}
        cy={height - ((points[points.length - 1] - Math.min(...points)) / (Math.max(...points) - Math.min(...points) || 1)) * (height - 4) - 2}
        r="2"
        className={color.replace("stroke-", "fill-")}
      >
        <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function Trend({ direction, value, positive }) {
  const Icon = direction === "up" ? ArrowUp : ArrowDown;
  const color = positive ? "text-emerald-400" : "text-red-400";
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      {value}
    </span>
  );
}

const RANGES = ["24H", "7D", "30D"];

const DEFAULT_METRICS = [
  {
    key: "events",
    label: "Events Detected",
    icon: AlertTriangle,
    value: 12480,
    color: "stroke-cyan-400",
    trend: { direction: "up", value: "+8.2%", positive: false },
    points: [12, 18, 14, 22, 19, 27, 24, 31, 28, 36],
  },
  {
    key: "alerts",
    label: "Alerts Generated",
    icon: Bug,
    value: 214,
    color: "stroke-amber-400",
    trend: { direction: "up", value: "+3.1%", positive: false },
    points: [4, 6, 5, 9, 7, 8, 10, 9, 12, 11],
  },
  {
    key: "incidents",
    label: "Incidents Created",
    icon: FolderOpen,
    value: 9,
    color: "stroke-orange-400",
    trend: { direction: "down", value: "-1", positive: true },
    points: [3, 4, 3, 5, 4, 4, 3, 4, 3, 2],
  },
  {
    key: "chains",
    label: "Attack Chains Detected",
    icon: Link2,
    value: 3,
    color: "stroke-red-400",
    trend: { direction: "down", value: "-2", positive: true },
    points: [5, 4, 6, 4, 3, 4, 2, 3, 2, 1],
  },
];

export default function ThreatActivityPanel({
  metrics = DEFAULT_METRICS,
  activeRange: controlledRange,
  onRangeChange,
}) {
  const [internalRange, setInternalRange] = useState("24H");
  const activeRange = controlledRange ?? internalRange;

  const selectRange = (r) => {
    setInternalRange(r);
    onRangeChange?.(r);
  };

  return (
    <section className="border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-5">
        <h2 className="text-sm font-medium text-slate-200">Threat Activity</h2>
        <div className="flex border border-slate-800">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => selectRange(r)}
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                activeRange === r
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-slate-800 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {metrics.map((m) => (
          <div key={m.key} className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <m.icon className="h-3.5 w-3.5 text-slate-600" />
                {m.label}
              </span>
              <Trend {...m.trend} />
            </div>
            <p className="mt-2 font-mono text-xl font-semibold tabular-nums text-slate-100">
              {m.value.toLocaleString()}
            </p>
            <div className="mt-2">
              <Sparkline points={m.points} color={m.color} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
