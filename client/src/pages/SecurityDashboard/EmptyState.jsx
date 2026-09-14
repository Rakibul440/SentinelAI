import { ShieldCheck } from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — shared EmptyState
// Component 12 of the Security Dashboard.
// A single reusable empty/status message block. AlertsTable, IncidentsTable,
// AttackChainsTable, and InfrastructureTable already inline their own
// versions of this — swap them for <EmptyState /> if you want every panel's
// empty state to share one implementation instead of four near-duplicates.
// ---------------------------------------------------------------------------

export default function EmptyState({ icon: Icon = ShieldCheck, message, tone = "neutral" }) {
  const toneText = tone === "positive" ? "text-emerald-400" : "text-slate-500";
  const iconTone = tone === "positive" ? "text-emerald-500" : "text-slate-700";

  return (
    <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
      <Icon className={`h-6 w-6 ${iconTone}`} />
      <p className={`text-sm ${toneText}`}>{message}</p>
    </div>
  );
}

// Reference strings for every empty/status message in the dashboard spec,
// so callers don't have to retype them:
export const EMPTY_MESSAGES = {
  noAlerts: "No active threats detected.",
  noIncidents: "No open incidents.",
  allAgentsOnline: "All monitored agents are online.",
  noAttackChains: "No recent attack chains detected.",
  systemNormal: "System operating normally.",
};
