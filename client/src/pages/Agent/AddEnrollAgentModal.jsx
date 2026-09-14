import { useState } from "react";
import {
  X,
  ChevronRight,
  Copy,
  Check,
  KeyRound,
  Terminal,
  Wifi,
  CheckCircle2,
  Clock,
  RefreshCw,
} from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — Add / Enroll Agent Modal
// Component 4 of the Agents page.
// Step 1: Agent details form
// Step 2: Generated token + install command
// Step 3: Verify connection (waiting → connected)
// ---------------------------------------------------------------------------

const STEPS = ["Agent Details", "Enrollment Token", "Verify Connection"];

const ENVIRONMENTS = ["Production", "Staging", "Development", "QA", "DR / Backup"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <span className={`flex h-6 w-6 items-center justify-center text-xs font-semibold transition-colors ${
                done ? "bg-cyan-500 text-slate-950"
                  : active ? "border border-cyan-500 text-cyan-400"
                  : "border border-slate-700 text-slate-600"
              }`}>
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={`mt-1 whitespace-nowrap text-[10px] font-medium ${
                active ? "text-cyan-400" : done ? "text-slate-400" : "text-slate-600"
              }`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`mb-4 h-px w-12 sm:w-20 ${i < current ? "bg-cyan-500" : "bg-slate-800"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center gap-1.5 border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

const inputCls = "w-full border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30";
const labelCls = "block text-xs font-medium text-slate-500 mb-1";

function Step1({ form, setForm, onNext }) {
  const valid = form.name.trim() && form.hostname.trim();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Agent Name <span className="text-red-400">*</span></label>
          <input className={inputCls} placeholder="e.g. web-agent-04" value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <label className={labelCls}>Hostname <span className="text-red-400">*</span></label>
          <input className={inputCls} placeholder="e.g. web-04.internal" value={form.hostname}
            onChange={(e) => setForm((f) => ({ ...f, hostname: e.target.value }))} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Environment</label>
        <select className={inputCls} value={form.environment}
          onChange={(e) => setForm((f) => ({ ...f, environment: e.target.value }))}>
          {ENVIRONMENTS.map((env) => <option key={env}>{env}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>Description</label>
        <textarea className={`${inputCls} resize-none`} rows={3}
          placeholder="Optional notes about this agent..."
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
      </div>
      <div className="flex justify-end pt-2">
        <button type="button" onClick={onNext} disabled={!valid}
          className="flex items-center gap-2 bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50">
          Generate Enrollment Token <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

const MOCK_TOKEN = "sat_enroll_8f3a2b1c9d4e7f6a0b5c8d3e2f1a4b7c";
const MOCK_CMD = (token) =>
  `curl -sSL https://sentinel.internal/install.sh | sudo bash -s -- --token ${token}`;

function Step2({ form, onNext, onBack }) {
  return (
    <div className="space-y-4">
      <div className="border border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <KeyRound className="h-3.5 w-3.5 text-cyan-400" />
          Enrollment Token
        </div>
        <div className="mt-2 flex items-center gap-2">
          <code className="flex-1 truncate font-mono text-xs text-cyan-300">{MOCK_TOKEN}</code>
          <CopyButton text={MOCK_TOKEN} />
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-400">
          <Clock className="h-3.5 w-3.5" />
          Token expires in <span className="font-mono font-semibold">24:00:00</span>
        </div>
      </div>

      <div className="border border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
          Installation Command
        </div>
        <div className="mt-2 flex items-start gap-2">
          <code className="flex-1 break-all font-mono text-xs leading-relaxed text-slate-300">
            {MOCK_CMD(MOCK_TOKEN)}
          </code>
          <CopyButton text={MOCK_CMD(MOCK_TOKEN)} />
        </div>
      </div>

      <p className="text-xs text-slate-600">
        Run this command on <span className="font-mono text-slate-400">{form.hostname || "the target host"}</span>.
        The agent will self-register and appear in the list once connected.
      </p>

      <div className="flex items-center justify-between pt-2">
        <button type="button" onClick={onBack}
          className="border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:text-slate-200">
          Back
        </button>
        <button type="button" onClick={onNext}
          className="flex items-center gap-2 bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
          Verify Connection <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Step3({ form, onClose }) {
  const [status, setStatus] = useState("waiting");

  const simulate = () => {
    setStatus("checking");
    setTimeout(() => setStatus("connected"), 2200);
  };

  return (
    <div className="space-y-4">
      {status === "waiting" && (
        <div className="flex flex-col items-center gap-3 border border-slate-800 bg-slate-950 py-10 text-center">
          <Wifi className="h-8 w-8 text-slate-700" />
          <p className="text-sm font-medium text-slate-400">
            Agent is waiting for enrollment.
          </p>
          <p className="text-xs text-slate-600">
            Run the install command on{" "}
            <span className="font-mono text-slate-400">{form.hostname || "the target host"}</span>, then verify.
          </p>
          <button type="button" onClick={simulate}
            className="mt-2 flex items-center gap-2 border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
            <RefreshCw className="h-3.5 w-3.5" /> Verify Connection
          </button>
        </div>
      )}

      {status === "checking" && (
        <div className="flex flex-col items-center gap-3 border border-slate-800 bg-slate-950 py-10 text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-cyan-400" />
          <p className="text-sm text-slate-400">Checking agent connectivity…</p>
        </div>
      )}

      {status === "connected" && (
        <div className="flex flex-col items-center gap-3 border border-emerald-500/20 bg-emerald-500/5 py-10 text-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          <p className="text-base font-semibold text-emerald-400">Agent successfully enrolled.</p>
          <p className="text-xs text-slate-500">
            <span className="font-mono text-slate-300">{form.name || "agent"}</span> is now
            online and sending events.
          </p>
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button type="button" onClick={onClose}
          className="bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
          {status === "connected" ? "Done" : "Close"}
        </button>
      </div>
    </div>
  );
}

export default function AddEnrollAgentModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", hostname: "", environment: "Production", description: "" });

  if (!open) return null;

  const reset = () => { setStep(0); setForm({ name: "", hostname: "", environment: "Production", description: "" }); };
  const close = () => { reset(); onClose?.(); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={close} />
      <div className="relative z-10 w-full max-w-xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/60"
        style={{ animation: "modalIn 0.2s ease-out" }}>
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(-8px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-100">Add New Agent</h2>
          <button type="button" onClick={close} className="text-slate-500 hover:text-slate-300">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex justify-center border-b border-slate-800 px-5 py-4">
          <StepIndicator current={step} />
        </div>

        <div className="p-5">
          {step === 0 && <Step1 form={form} setForm={setForm} onNext={() => setStep(1)} />}
          {step === 1 && <Step2 form={form} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
          {step === 2 && <Step3 form={form} onClose={close} />}
        </div>
      </div>
    </div>
  );
}
