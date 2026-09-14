import { useEffect, useState } from "react";
import { ListChecks, Zap, ShieldAlert, Activity } from "lucide-react";
import { SeverityBadge } from "./AlertsTable";

// ---------------------------------------------------------------------------
// SentinelAI — Detection Summary panel
// Component 8 of the Security Dashboard.
// Four sub-sections in one panel: rules overview, top detection types
// (ranked bars), highest severity detections (list), and a live-cycling
// detection activity feed.
// ---------------------------------------------------------------------------

const DEFAULT_RULES = { total: 128, triggeredToday: 42 };

const DEFAULT_TOP_TYPES = [
  { type: "Brute Force Attempts", count: 86, percent: 38 },
  { type: "Anomalous Network Traffic", count: 54, percent: 24 },
  { type: "Privilege Escalation", count: 41, percent: 18 },
  { type: "Data Exfiltration Patterns", count: 27, percent: 12 },
  { type: "Other", count: 18, percent: 8 },
];

const DEFAULT_HIGHEST_SEVERITY = [
  { id: 1, name: "SSH brute-force → root login", severity: "Critical", host: "web-03.internal", time: "2m ago" },
  { id: 2, name: "Anomalous outbound transfer", severity: "High", host: "db-01.internal", time: "18m ago" },
  { id: 3, name: "Unusual sudo escalation", severity: "Medium", host: "app-02.internal", time: "41m ago" },
];

const DEFAULT_ACTIVITY = [
  "Rule 'SSH Brute Force' triggered · web-03.internal",
  "Rule 'Anomalous Egress' triggered · db-01.internal",
  "Rule 'Sudo Escalation Watch' triggered · app-02.internal",
  "Rule 'Port Scan Detection' triggered · web-01.internal",
  "Isolation Forest flagged anomaly score 0.92 · db-01.internal",
];

function RulesOverview({ rules }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="border border-slate-800 bg-slate-950 p-3.5">
        <span className="flex h-7 w-7 items-center justify-center border border-slate-800 bg-slate-900 text-cyan-400">
          <ListChecks className="h-3.5 w-3.5" />
        </span>
        <p className="mt-2.5 text-xs font-medium text-slate-500">Detection Rules</p>
        <p className="mt-0.5 font-mono text-xl font-semibold text-slate-100">{rules.total}</p>
      </div>
      <div className="border border-slate-800 bg-slate-950 p-3.5">
        <span className="flex h-7 w-7 items-center justify-center border border-slate-800 bg-slate-900 text-amber-400">
          <Zap className="h-3.5 w-3.5" />
        </span>
        <p className="mt-2.5 text-xs font-medium text-slate-500">Rules Triggered</p>
        <p className="mt-0.5 font-mono text-xl font-semibold text-slate-100">{rules.triggeredToday}</p>
      </div>
    </div>
  );
}

function TopDetectionTypes({ types }) {
  return (
    <div className="border border-slate-800 bg-slate-950 p-3.5">
      <p className="text-xs font-medium text-slate-500">Top Detection Types</p>
      <ul className="mt-3 space-y-2.5">
        {types.map((t) => (
          <li key={t.type}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">{t.type}</span>
              <span className="font-mono text-slate-500">{t.count}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden bg-slate-800">
              <div
                className="h-full bg-cyan-500 transition-all duration-700"
                style={{ width: `${t.percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HighestSeverityDetections({ items }) {
  const isEmpty = items.length === 0;
  return (
    <div className="border border-slate-800 bg-slate-950 p-3.5">
      <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <ShieldAlert className="h-3.5 w-3.5 text-slate-600" />
        Highest Severity Detections
      </p>
      {isEmpty ? (
        <p className="mt-4 text-center text-xs text-slate-600">No active threats detected.</p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-800/70">
          {items.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-2 py-2 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="truncate text-sm text-slate-200">{d.name}</p>
                <p className="mt-0.5 truncate text-xs text-slate-600">
                  {d.host} · <span className="font-mono">{d.time}</span>
                </p>
              </div>
              <SeverityBadge severity={d.severity} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DetectionActivity({ feed }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % feed.length), 2600);
    return () => clearInterval(id);
  }, [feed.length]);

  const visible = feed
    .slice(index, index + 3)
    .concat(feed.slice(0, Math.max(0, index + 3 - feed.length)));

  return (
    <div className="border border-slate-800 bg-slate-950 p-3.5">
      <style>{`
        @keyframes detectionFeedIn {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .sentinel-detection-line { animation: detectionFeedIn 0.4s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .sentinel-detection-line { animation: none; }
        }
      `}</style>
      <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Activity className="h-3.5 w-3.5 text-cyan-400" />
        Detection Activity
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500 motion-reduce:animate-none animate-pulse" />
      </p>
      <div className="mt-3 space-y-2 font-mono text-[11px] leading-5 text-slate-500">
        {visible.map((line, i) => (
          <div key={`${index}-${i}`} className="sentinel-detection-line truncate">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DetectionSummary({
  rules = DEFAULT_RULES,
  topTypes = DEFAULT_TOP_TYPES,
  highestSeverity = DEFAULT_HIGHEST_SEVERITY,
  activityFeed = DEFAULT_ACTIVITY,
}) {
  return (
    <section className="border border-slate-800 bg-slate-900 p-4 sm:p-5">
      <h2 className="text-sm font-medium text-slate-200">Detection Summary</h2>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="space-y-3">
          <RulesOverview rules={rules} />
          <TopDetectionTypes types={topTypes} />
        </div>
        <div className="space-y-3">
          <HighestSeverityDetections items={highestSeverity} />
          <DetectionActivity feed={activityFeed} />
        </div>
      </div>
    </section>
  );
}
