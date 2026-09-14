import { useEffect, useRef, useState } from "react";
import {
  Radio,
  Wifi,
  WifiOff,
  Clock,
  ShieldOff,
  ShieldCheck,
} from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — Agents Page Header
// Component 1 of the Agents page.
// Page title + subtitle + 5 overview stat cards with count-up animation.
// The pulsing "live" dot on the Online card ties this page into the same
// "system is alive" visual language as the Dashboard.
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
    if (prefersReducedMotion()) { setValue(target); return; }
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return value;
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent = "text-cyan-400",
  iconBg = "bg-cyan-500/10",
  iconBorder = "border-cyan-500/30",
  pulse = false,
  subtext,
}) {
  const count = useCountUp(value);
  return (
    <div className="group relative overflow-hidden border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-slate-700">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-center justify-between">
        <span className={`flex h-8 w-8 items-center justify-center border ${iconBorder} ${iconBg} ${accent}`}>
          <Icon className="h-4 w-4" />
        </span>
        {pulse && (
          <span className="relative flex h-2 w-2">
            <span className="absolute h-2 w-2 rounded-full bg-emerald-500 motion-reduce:animate-none animate-ping opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>
        )}
      </div>
      <p className="mt-3 text-xs font-medium text-slate-500">{label}</p>
      <p className={`mt-0.5 font-mono text-2xl font-semibold tabular-nums ${accent}`}>
        {count}
      </p>
      {subtext && <p className="mt-1 text-xs text-slate-600">{subtext}</p>}
    </div>
  );
}

export default function AgentsHeader({
  stats = {
    total: 18,
    online: 17,
    offline: 1,
    pendingEnrollment: 2,
    revoked: 1,
  },
}) {
  return (
    <div className="space-y-4">
      {/* Page title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center border border-cyan-500/40 bg-cyan-500/10">
            <Radio className="h-4 w-4 text-cyan-400" />
          </span>
          <div>
            <h1 className="text-lg font-semibold text-slate-100">Agents</h1>
            <p className="text-xs text-slate-500">
              Monitor and manage your SentinelAI agents.
            </p>
          </div>
        </div>
      </div>

      {/* Overview stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          icon={ShieldCheck}
          label="Total Agents"
          value={stats.total}
          accent="text-slate-100"
          iconBg="bg-slate-800"
          iconBorder="border-slate-700"
          subtext="Registered"
        />
        <StatCard
          icon={Wifi}
          label="Online Agents"
          value={stats.online}
          accent="text-emerald-400"
          iconBg="bg-emerald-500/10"
          iconBorder="border-emerald-500/30"
          pulse={true}
          subtext="Sending heartbeats"
        />
        <StatCard
          icon={WifiOff}
          label="Offline Agents"
          value={stats.offline}
          accent={stats.offline > 0 ? "text-red-400" : "text-slate-600"}
          iconBg={stats.offline > 0 ? "bg-red-500/10" : "bg-slate-800"}
          iconBorder={stats.offline > 0 ? "border-red-500/30" : "border-slate-700"}
          subtext={stats.offline > 0 ? "Connection lost" : "All connected"}
        />
        <StatCard
          icon={Clock}
          label="Pending Enrollment"
          value={stats.pendingEnrollment}
          accent={stats.pendingEnrollment > 0 ? "text-amber-400" : "text-slate-600"}
          iconBg={stats.pendingEnrollment > 0 ? "bg-amber-400/10" : "bg-slate-800"}
          iconBorder={stats.pendingEnrollment > 0 ? "border-amber-400/30" : "border-slate-700"}
          subtext="Awaiting connection"
        />
        <StatCard
          icon={ShieldOff}
          label="Revoked Agents"
          value={stats.revoked}
          accent={stats.revoked > 0 ? "text-slate-400" : "text-slate-600"}
          iconBg="bg-slate-800"
          iconBorder="border-slate-700"
          subtext="Credentials revoked"
        />
      </div>
    </div>
  );
}
