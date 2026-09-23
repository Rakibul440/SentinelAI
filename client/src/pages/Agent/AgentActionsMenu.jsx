import { useEffect, useRef, useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  PowerOff,
  ShieldOff,
  RefreshCw,
  RotateCcw,
  Trash2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — Agent Actions Menu
// Component 7 of the Agents page (built early so AgentListTable can import it).
// Shared dropdown used in every table row AND in the AgentDetailsDrawer.
// Pass `align="left"` when the trigger is on the left side of the screen.
// ---------------------------------------------------------------------------

const ACTIONS = [
  { key: "view", label: "View Details", icon: Eye, tone: "normal" },
  { key: "edit", label: "Edit Agent", icon: Pencil, tone: "normal" },
  { key: "disable", label: "Disable Agent", icon: PowerOff, tone: "warn" },
  { key: "revoke", label: "Revoke Credential", icon: ShieldOff, tone: "danger" },
  { key: "rotate", label: "Rotate Credential", icon: RefreshCw, tone: "normal" },
  { key: "reenroll", label: "Re-enroll Agent", icon: RotateCcw, tone: "normal" },
  { key: "remove", label: "Remove Agent", icon: Trash2, tone: "danger" },
];

const TONE_CLASS = {
  normal: "text-slate-300 hover:text-slate-100 hover:bg-slate-800/50",
  warn: "text-amber-400 hover:bg-amber-400/10",
  danger: "text-red-400 hover:bg-red-500/10",
};

export default function AgentActionsMenu({ agent, onAction, align = "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-7 w-7 items-center justify-center border border-slate-800 bg-slate-900 text-slate-500 transition-colors hover:border-slate-700 hover:text-slate-300"
        aria-label="Agent actions"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div
          className={`absolute z-50 mt-1 w-48 border border-slate-800 bg-slate-900 py-1 shadow-xl shadow-black/40 ${
            align === "left" ? "left-0" : "right-0"
          }`}
          style={{ animation: "fadeSlideIn 0.15s ease-out" }}
        >
          <style>{`
            @keyframes fadeSlideIn {
              from { opacity: 0; transform: translateY(-4px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          {ACTIONS.map((a, i) => {
            const showDivider =
              (i === 2) || (i === 4);
            return (
              <div key={a.key}>
                {showDivider && <div className="my-1 border-t border-slate-800" />}
                <button
                  type="button"
                  onClick={() => { onAction?.(a.key, agent); setOpen(false); }}
                  className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-sm transition-colors ${TONE_CLASS[a.tone]}`}
                >
                  <a.icon className="h-3.5 w-3.5 shrink-0" />
                  {a.label}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
