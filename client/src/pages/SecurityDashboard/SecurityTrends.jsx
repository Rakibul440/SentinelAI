import { useEffect, useId, useRef, useState } from "react";
import { Activity, AlertTriangle, FolderOpen, Link2, ArrowUp, ArrowDown } from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — Security Trends
// Component 9 of the Security Dashboard.
// Risk Trend is rendered as one large headline chart; Events / Alerts /
// Incidents / Attack Chains follow as four smaller trend charts underneath.
// All charts are hand-built SVG (no chart library dependency) so this file
// drops in standalone.
// ---------------------------------------------------------------------------

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

function buildPaths(points, width, height, padding = 4) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p - min) / range) * (height - padding * 2) - padding;
    return [x, y];
  });
  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return { line, area, last: coords[coords.length - 1] };
}

function TrendChart({
  points,
  width = 560,
  height = 140,
  strokeColor = "stroke-cyan-400",
  fillColor = "#22d3ee",
  gridLines = 4,
}) {
  const gradientId = useId();
  const pathRef = useRef(null);
  const [drawn, setDrawn] = useState(prefersReducedMotion());
  const { line, area, last } = buildPaths(points, width, height);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, [points]);

  const length = pathRef.current?.getTotalLength?.() ?? width * 1.4;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full overflow-visible"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillColor} stopOpacity="0.28" />
          <stop offset="100%" stopColor={fillColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {Array.from({ length: gridLines }).map((_, i) => (
        <line
          key={i}
          x1="0"
          x2={width}
          y1={(height / gridLines) * (i + 1)}
          y2={(height / gridLines) * (i + 1)}
          className="stroke-slate-800"
          strokeWidth="1"
        />
      ))}

      <path
        d={area}
        fill={`url(#${gradientId})`}
        style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.8s ease-out 0.3s" }}
      />

      <path
        ref={pathRef}
        d={line}
        fill="none"
        strokeWidth="2"
        className={strokeColor}
        style={{
          strokeDasharray: length,
          strokeDashoffset: drawn ? 0 : length,
          transition: "stroke-dashoffset 1.1s ease-out",
        }}
      />

      <circle cx={last[0]} cy={last[1]} r="3.5" className={strokeColor.replace("stroke-", "fill-")}>
        <animate attributeName="opacity" values="1;0.35;1" dur="1.8s" repeatCount="indefinite" />
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

const DEFAULT_TRENDS = {
  risk: {
    current: 32,
    trend: { direction: "down", value: "-6 pts", positive: true },
    points: [58, 54, 61, 49, 45, 40, 44, 38, 35, 32, 30, 32],
  },
  events: {
    current: 284213,
    trend: { direction: "up", value: "+8.2%", positive: false },
    icon: Activity,
    color: "stroke-cyan-400",
    fill: "#22d3ee",
    points: [12, 18, 14, 22, 19, 27, 24, 31, 28, 36, 33, 40],
  },
  alerts: {
    current: 214,
    trend: { direction: "up", value: "+3.1%", positive: false },
    icon: AlertTriangle,
    color: "stroke-amber-400",
    fill: "#fbbf24",
    points: [4, 6, 5, 9, 7, 8, 10, 9, 12, 11, 13, 12],
  },
  incidents: {
    current: 9,
    trend: { direction: "down", value: "-1", positive: true },
    icon: FolderOpen,
    color: "stroke-orange-400",
    fill: "#fb923c",
    points: [3, 4, 3, 5, 4, 4, 3, 4, 3, 2, 3, 2],
  },
  chains: {
    current: 3,
    trend: { direction: "down", value: "-2", positive: true },
    icon: Link2,
    color: "stroke-red-400",
    fill: "#f87171",
    points: [5, 4, 6, 4, 3, 4, 2, 3, 2, 1, 2, 1],
  },
};

export default function SecurityTrends({ data = DEFAULT_TRENDS }) {
  const [range, setRange] = useState("7D");
  const riskColor =
    data.risk.current >= 70 ? "text-red-400" : data.risk.current >= 40 ? "text-amber-400" : "text-emerald-400";
  const riskStroke =
    data.risk.current >= 70 ? "stroke-red-400" : data.risk.current >= 40 ? "stroke-amber-400" : "stroke-emerald-400";
  const riskFill =
    data.risk.current >= 70 ? "#f87171" : data.risk.current >= 40 ? "#fbbf24" : "#34d399";

  const smallCharts = [
    { key: "events", label: "Events Over Time", ...data.events },
    { key: "alerts", label: "Alerts Over Time", ...data.alerts },
    { key: "incidents", label: "Incidents Over Time", ...data.incidents },
    { key: "chains", label: "Attack Chains Over Time", ...data.chains },
  ];

  return (
    <section className="border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-5">
        <h2 className="text-sm font-medium text-slate-200">Security Trends</h2>
        <div className="flex border border-slate-800">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                range === r ? "bg-cyan-500 text-slate-950" : "bg-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {/* Risk Trend — headline chart */}
        <div className="border border-slate-800 bg-slate-950 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Risk Trend</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className={`font-mono text-3xl font-semibold ${riskColor}`}>
                  {data.risk.current}
                </span>
                <span className="text-sm text-slate-600">/100</span>
                <Trend {...data.risk.trend} />
              </div>
            </div>
          </div>
          <div className="mt-3 h-32 sm:h-40">
            <TrendChart points={data.risk.points} strokeColor={riskStroke} fillColor={riskFill} height={160} />
          </div>
        </div>

        {/* Supporting trend charts */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {smallCharts.map((c) => (
            <div key={c.key} className="border border-slate-800 bg-slate-950 p-3.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <c.icon className="h-3.5 w-3.5 text-slate-600" />
                  {c.label}
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="font-mono text-lg font-semibold text-slate-100">
                  {c.current.toLocaleString()}
                </span>
                <Trend {...c.trend} />
              </div>
              <div className="mt-2 h-14">
                <TrendChart
                  points={c.points}
                  strokeColor={c.color}
                  fillColor={c.fill}
                  height={56}
                  gridLines={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
