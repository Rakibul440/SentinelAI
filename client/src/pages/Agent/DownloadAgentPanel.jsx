import { useState } from "react";
import { Download, Terminal, KeyRound, Copy, Check, X } from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — Download Agent Panel
// Component 5 of the Agents page.
// Slides down when "Download Agent" is clicked in AgentsActionBar.
// Shows version info, Linux download button, and install + enroll steps.
// ---------------------------------------------------------------------------

const VERSION = "1.4.2";

const INSTALL_STEPS = [
  {
    step: 1,
    title: "Download & install",
    command: `curl -sSL https://sentinel.internal/install.sh | sudo bash`,
  },
  {
    step: 2,
    title: "Enroll with your token",
    command: `sudo sentinel-agent enroll --token <YOUR_ENROLLMENT_TOKEN>`,
  },
  {
    step: 3,
    title: "Verify status",
    command: `sudo systemctl status sentinel-agent`,
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button type="button" onClick={copy}
      className="flex shrink-0 items-center gap-1 border border-slate-700 bg-slate-900 px-2 py-1 text-xs font-medium text-slate-400 hover:text-slate-200">
      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function DownloadAgentPanel({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="border border-slate-800 bg-slate-900"
      style={{ animation: "panelSlideDown 0.2s ease-out" }}>
      <style>{`
        @keyframes panelSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4 text-cyan-400" />
          <h2 className="text-sm font-semibold text-slate-100">Sentinel Agent</h2>
          <span className="border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-xs text-cyan-400">
            v{VERSION}
          </span>
          <span className="text-xs text-slate-600">Latest Version</span>
        </div>
        <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-300">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-2">
        {/* Download */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-500">Platform</p>
          <div className="flex items-center justify-between border border-slate-800 bg-slate-950 px-4 py-3">
            <div className="flex items-center gap-3">
              <Terminal className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-200">Linux</p>
                <p className="text-xs text-slate-600">x86_64 · ARM64 · Python 3.9+</p>
              </div>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 bg-cyan-500 px-3.5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
              onClick={(e) => e.preventDefault()}
            >
              <Download className="h-3.5 w-3.5" />
              Download Agent
            </a>
          </div>
          <p className="text-xs text-slate-600">
            The sentinel-agent is a lightweight Python daemon. It requires root or a dedicated
            service account to read system logs and send telemetry over HTTPS.
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-slate-500">Installation Instructions</p>
            <div className="mt-2 space-y-2">
              {INSTALL_STEPS.slice(0, 1).map((s) => (
                <div key={s.step} className="border border-slate-800 bg-slate-950 p-3">
                  <p className="mb-1.5 text-xs text-slate-500">
                    <span className="font-mono text-cyan-400">{s.step}.</span> {s.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 truncate font-mono text-xs text-slate-300">{s.command}</code>
                    <CopyButton text={s.command} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">Enrollment Instructions</p>
            <div className="mt-2 space-y-2">
              {INSTALL_STEPS.slice(1).map((s) => (
                <div key={s.step} className="border border-slate-800 bg-slate-950 p-3">
                  <p className="mb-1.5 text-xs text-slate-500">
                    <span className="font-mono text-cyan-400">{s.step}.</span> {s.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 truncate font-mono text-xs text-slate-300">{s.command}</code>
                    <CopyButton text={s.command} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-300">
            <KeyRound className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Generate an enrollment token from the Actions bar before running the enroll command.
          </div>
        </div>
      </div>
    </div>
  );
}
