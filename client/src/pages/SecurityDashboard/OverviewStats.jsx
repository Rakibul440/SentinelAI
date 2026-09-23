import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Activity,
  AlertTriangle,
  AlertOctagon,
  Flame,
  Server,
  Radio,
  Database,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — Security Overview stat cards
// Component 2 of the Security Dashboard.
// Renders the 8 top-level metrics in a responsive grid. StatCard is exported
// too, so later components (Detection Summary, etc.) can reuse the same
// card shell for consistency.
// ---------------------------------------------------------------------------

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(prefersReducedMotion() ? target : 0);
  const raf = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const from = 0;
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

function Trend({ direction, value, positive }) {
  if (!direction) return null;
  const Icon = direction === "up" ? ArrowUp : ArrowDown;
  const color = positive ? "text-emerald-400" : "text-red-400";
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      {value}
    </span>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  numeric = true,
  duration = 900,
  accent = "text-cyan-400",
  trend,
  subtext,
  children,
}) {
  const animated = useCountUp(numeric ? value : 0, duration);
  return (
    <div className="group relative overflow-hidden border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-slate-700">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-center justify-between">
        <span className={`flex h-8 w-8 items-center justify-center border border-slate-800 bg-slate-950 ${accent}`}>
          <Icon className="h-4 w-4" />
        </span>
        {trend && <Trend {...trend} />}
      </div>

      <p className="mt-3 text-xs font-medium text-slate-500">{label}</p>

      <div className="mt-1 flex items-baseline gap-1">
        <span className="font-mono text-2xl font-semibold tabular-nums text-slate-100">
          {numeric ? animated.toLocaleString() : value}
        </span>
        {suffix && <span className="text-sm text-slate-500">{suffix}</span>}
      </div>

      {subtext && <p className="mt-1 text-xs text-slate-600">{subtext}</p>}
      {children}
    </div>
  );
}

export default function OverviewStats({
  data = {
    status: { label: "Secure", detail: "No critical threats active", level: "ok" },
    riskScore: 32,
    activeAlerts: 7,
    openIncidents: 2,
    criticalThreats: 0,
    monitoredHosts: 18,
    onlineAgents: { online: 17, total: 18 },
    eventsCollected: 284213,
  },
}) {
  const riskColor =
    data.riskScore >= 70
      ? "bg-red-500"
      : data.riskScore >= 40
      ? "bg-amber-400"
      : "bg-emerald-500";
  const riskText =
    data.riskScore >= 70
      ? "text-red-400"
      : data.riskScore >= 40
      ? "text-amber-400"
      : "text-emerald-400";

  const statusTone = {
    ok: { icon: ShieldCheck, accent: "text-emerald-400", dot: "bg-emerald-500" },
    warn: { icon: ShieldAlert, accent: "text-amber-400", dot: "bg-amber-400" },
    critical: { icon: ShieldAlert, accent: "text-red-400", dot: "bg-red-500" },
  }[data.status.level];

  const agentsOffline = data.onlineAgents.total - data.onlineAgents.online;
  const agentsPct = Math.round(
    (data.onlineAgents.online / data.onlineAgents.total) * 100
  );

  return (
    <section>
      <style>{`
        @keyframes barShimmer {
          0% { background-position: -120px 0; }
          100% { background-position: 240px 0; }
        }
        .sentinel-bar-shimmer {
          background-image: linear-gradient(
            100deg,
            transparent 20%,
            rgba(255,255,255,0.12) 40%,
            transparent 60%
          );
          background-size: 200px 100%;
          animation: barShimmer 2.4s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .sentinel-bar-shimmer { animation: none; }
        }
      `}</style>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {/* Security Status */}
        <div className="group relative overflow-hidden border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center justify-between">
            <span className={`flex h-8 w-8 items-center justify-center border border-slate-800 bg-slate-950 ${statusTone.accent}`}>
              <statusTone.icon className="h-4 w-4" />
            </span>
            <span className={`h-2 w-2 rounded-full ${statusTone.dot} motion-reduce:animate-none animate-pulse`} />
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">Security Status</p>
          <p className={`mt-1 text-2xl font-semibold ${statusTone.accent}`}>
            {data.status.label}
          </p>
          <p className="mt-1 text-xs text-slate-600">{data.status.detail}</p>
        </div>

        {/* Overall Risk Score */}
        <div className="border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center justify-between">
            <span className={`flex h-8 w-8 items-center justify-center border border-slate-800 bg-slate-950 ${riskText}`}>
              <Activity className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">Overall Risk Score</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className={`font-mono text-2xl font-semibold tabular-nums ${riskText}`}>
              {data.riskScore}
            </span>
            <span className="text-sm text-slate-500">/100</span>
          </div>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden bg-slate-800">
            <div
              className={`sentinel-bar-shimmer h-full ${riskColor} transition-all duration-700`}
              style={{ width: `${data.riskScore}%` }}
            />
          </div>
        </div>

        {/* Active Alerts */}
        <StatCard
          icon={AlertTriangle}
          label="Active Alerts"
          value={data.activeAlerts}
          accent="text-amber-400"
          trend={{ direction: "up", value: "+2 today", positive: false }}
        />

        {/* Open Incidents */}
        <StatCard
          icon={AlertOctagon}
          label="Open Incidents"
          value={data.openIncidents}
          accent="text-orange-400"
          trend={{ direction: "down", value: "-1 today", positive: true }}
        />

        {/* Critical Threats */}
        <div className="border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center justify-between">
            <span className={`flex h-8 w-8 items-center justify-center border border-slate-800 bg-slate-950 ${data.criticalThreats > 0 ? "text-red-400" : "text-slate-600"}`}>
              <Flame className="h-4 w-4" />
            </span>
            {data.criticalThreats > 0 && (
              <span className="h-2 w-2 rounded-full bg-red-500 motion-reduce:animate-none animate-ping" />
            )}
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">Critical Threats</p>
          <p className={`mt-1 font-mono text-2xl font-semibold tabular-nums ${data.criticalThreats > 0 ? "text-red-400" : "text-slate-100"}`}>
            {data.criticalThreats}
          </p>
          <p className="mt-1 text-xs text-slate-600">
            {data.criticalThreats > 0 ? "Immediate review needed" : "No active threats detected."}
          </p>
        </div>

        {/* Monitored Hosts */}
        <StatCard
          icon={Server}
          label="Monitored Hosts"
          value={data.monitoredHosts}
          accent="text-blue-400"
          subtext="Across all environments"
        />

        {/* Online Agents */}
        <div className="border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center border border-slate-800 bg-slate-950 text-emerald-400">
              <Radio className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">Online Agents</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-2xl font-semibold tabular-nums text-slate-100">
              {data.onlineAgents.online}
            </span>
            <span className="text-sm text-slate-500">/{data.onlineAgents.total}</span>
          </div>
          <div className="mt-2.5 flex h-1.5 w-full overflow-hidden bg-slate-800">
            <div
              className="h-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${agentsPct}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-600">
            {agentsOffline === 0 ? "All monitored agents are online." : `${agentsOffline} offline`}
          </p>
        </div>

        {/* Events Collected */}
        <StatCard
          icon={Database}
          label="Events Collected"
          value={data.eventsCollected}
          accent="text-cyan-400"
          duration={1400}
          subtext="Last 24 hours"
        />
      </div>
    </section>
  );
}
