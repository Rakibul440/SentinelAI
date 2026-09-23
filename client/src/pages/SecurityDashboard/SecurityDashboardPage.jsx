import DashboardHeader from "./DashboardHeader";
import OverviewStats from "./OverviewStats";
import ThreatActivityPanel from "./ThreatActivityPanel";
import AlertsTable from "./AlertsTable";
import IncidentsTable from "./IncidentsTable";
import AttackChainsTable from "./AttackChainsTable";
import InfrastructureTable from "./InfrastructureTable";
import DetectionSummary from "./DetectionSummary";
import SecurityTrends from "./SecurityTrends";
import QuickActions from "./QuickActions";
import SystemStatusPanel from "./SystemStatusPanel";

// ---------------------------------------------------------------------------
// SentinelAI — Security Dashboard (assembled page)
// Wires all 12 dashboard components into the full "Security Overview" page,
// in the order given in the content spec. No Navbar/Footer here — this
// renders inside your existing app shell.
//
// Each section below takes the same props as its component file (data,
// callbacks, etc.) — pass real data down from wherever this page is routed.
// Every component also ships with sane defaults, so this page renders a
// complete demo dashboard with zero props.
// ---------------------------------------------------------------------------

export default function SecurityDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardHeader pageTitle="Security Overview" />

      <main className="mx-auto max-w-[1600px] space-y-4 p-4 sm:p-6">
        <OverviewStats />

        <ThreatActivityPanel />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <AlertsTable />
          <IncidentsTable />
        </div>

        <AttackChainsTable />

        <InfrastructureTable />

        <DetectionSummary />

        <SecurityTrends />

        <QuickActions />

        <SystemStatusPanel />
      </main>
    </div>
  );
}
