import { useState, useEffect, useRef } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Shield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const GitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const AlertTriangle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const Activity = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const Layers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
);
const Brain = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14Z"/>
  </svg>
);
const Server = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8"/><rect x="2" y="14" width="20" height="8"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);
const Lock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="0" ry="0"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const Target = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const GitBranch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <path d="M18 9a9 9 0 0 1-9 9"/>
  </svg>
);
const Clock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const TrendingUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const Search = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const CheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const Cpu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16"/><rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);

// ─── Attack Chain Step ────────────────────────────────────────────────────────
const CHAIN_STEPS = [
  { id: 1, label: "Failed Login",        mitre: "T1110", color: "border-yellow-500 text-yellow-400", dot: "bg-yellow-500", glow: "shadow-yellow-500/20" },
  { id: 2, label: "Successful Login",    mitre: "T1078", color: "border-orange-500 text-orange-400", dot: "bg-orange-500", glow: "shadow-orange-500/20" },
  { id: 3, label: "Privilege Escalation",mitre: "T1548", color: "border-red-500 text-red-400",    dot: "bg-red-500",    glow: "shadow-red-500/20"    },
  { id: 4, label: "Suspicious Command",  mitre: "T1059", color: "border-red-600 text-red-300",    dot: "bg-red-600",    glow: "shadow-red-600/20"    },
  { id: 5, label: "File Modification",   mitre: "T1565", color: "border-red-700 text-red-200",    dot: "bg-red-700",    glow: "shadow-red-700/20"    },
];

function AttackChain() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    if (!animating) return;
    if (active >= CHAIN_STEPS.length - 1) { setAnimating(false); return; }
    const t = setTimeout(() => setActive((v) => v + 1), 900);
    return () => clearTimeout(t);
  }, [active, animating]);

  return (
    <div className="w-full">
      {/* Desktop horizontal chain */}
      <div className="hidden md:flex items-center gap-0">
        {CHAIN_STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1 min-w-0">
            <div
              className={`relative flex-1 border ${step.color} bg-gray-950 p-3 cursor-pointer transition-all duration-300 ${
                i <= active ? `shadow-lg ${step.glow} opacity-100` : "opacity-30"
              }`}
              onClick={() => { setActive(i); setAnimating(false); }}
            >
              {/* Pulse dot */}
              {i === active && (
                <span className="absolute top-2 right-2 flex w-2 h-2">
                  <span className={`absolute w-full h-full ${step.dot} opacity-60 animate-ping`} />
                  <span className={`relative w-2 h-2 ${step.dot}`} />
                </span>
              )}
              <div className="font-mono text-[10px] text-gray-600 mb-1">{step.mitre}</div>
              <div className={`text-xs font-semibold leading-tight ${i <= active ? step.color.split(" ")[1] : "text-gray-600"}`}>
                {step.label}
              </div>
            </div>
            {/* Connector arrow */}
            {i < CHAIN_STEPS.length - 1 && (
              <div className={`shrink-0 w-6 h-px transition-colors duration-300 ${i < active ? "bg-red-700" : "bg-gray-800"}`}>
                <div className={`w-0 h-0 ml-auto border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent transition-colors duration-300 ${i < active ? "border-l-red-700" : "border-l-gray-800"}`} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile vertical chain */}
      <div className="flex md:hidden flex-col gap-0">
        {CHAIN_STEPS.map((step, i) => (
          <div key={step.id} className="flex items-stretch gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 border-2 mt-3 shrink-0 transition-colors duration-300 ${i <= active ? step.dot.replace("bg-", "border-") + " " + step.dot : "border-gray-700 bg-gray-900"}`} />
              {i < CHAIN_STEPS.length - 1 && (
                <div className={`w-px flex-1 min-h-4 transition-colors duration-300 ${i < active ? "bg-red-800" : "bg-gray-800"}`} />
              )}
            </div>
            <div className={`flex-1 border-l-2 pl-3 pb-4 transition-all duration-300 ${i <= active ? step.color.split(" ")[0] : "border-gray-800"}`}>
              <div className="font-mono text-[10px] text-gray-600">{step.mitre}</div>
              <div className={`text-sm font-semibold mt-0.5 transition-colors duration-300 ${i <= active ? step.color.split(" ")[1] : "text-gray-700"}`}>
                {step.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Replay */}
      {!animating && (
        <button
          onClick={() => { setActive(0); setAnimating(true); }}
          className="mt-4 font-mono text-xs text-gray-600 hover:text-blue-400 transition-colors duration-150 underline underline-offset-2"
        >
          ↺ replay sequence
        </button>
      )}
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ id, className = "", children }) => (
  <section id={id} className={`w-full ${className}`}>{children}</section>
);

// ─── Feature card ─────────────────────────────────────────────────────────────
const FeatureCard = ({ icon, title, desc, accent = "text-blue-400", border = "border-gray-800" }) => (
  <div className={`border ${border} bg-gray-950 p-5 flex flex-col gap-3 hover:bg-gray-900 transition-colors duration-150`}>
    <span className={`${accent}`}>{icon}</span>
    <h3 className="text-sm font-semibold text-gray-100">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

// ─── Pipeline step ────────────────────────────────────────────────────────────
const PipeStep = ({ label, sub, accent, last }) => (
  <div className="flex items-center gap-0 flex-1 min-w-0">
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div className={`w-full border ${accent} bg-gray-950 px-3 py-3 text-center`}>
        <div className={`text-xs font-semibold ${accent.includes("blue") ? "text-blue-400" : accent.includes("red") ? "text-red-400" : accent.includes("green") ? "text-green-400" : accent.includes("purple") ? "text-purple-400" : "text-yellow-400"}`}>
          {label}
        </div>
        {sub && <div className="font-mono text-[10px] text-gray-600 mt-0.5">{sub}</div>}
      </div>
    </div>
    {!last && (
      <div className="shrink-0 text-gray-700 text-lg font-light px-1">›</div>
    )}
  </div>
);

// ─── Showcase card ────────────────────────────────────────────────────────────
const ShowcaseCard = ({ title, badge, badgeColor, lines }) => (
  <div className="border border-gray-800 bg-gray-950 flex flex-col overflow-hidden">
    {/* Titlebar */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900">
      <span className="font-mono text-xs text-gray-400">{title}</span>
      <span className={`font-mono text-[10px] px-2 py-0.5 border ${badgeColor}`}>{badge}</span>
    </div>
    {/* Content */}
    <div className="p-4 flex flex-col gap-2 font-mono text-xs text-gray-500 flex-1">
      {lines.map((line, i) => (
        <div key={i} className={`flex items-start gap-2 ${line.highlight ? "text-gray-300" : ""}`}>
          {line.dot && <span className={`mt-1.5 w-1.5 h-1.5 shrink-0 ${line.dot}`} />}
          <span className={line.accent || ""}>{line.text}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-sans antialiased">

      {/* ════ 1. HERO ════════════════════════════════════════════════════════ */}
      <Section id="hero" className="relative overflow-hidden border-b border-gray-800">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-red-900/8 blur-3xl" />
        </div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)", backgroundSize: "48px 48px" }}
        />

        <div className="relative mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — copy */}
            <div className="flex flex-col gap-6">
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 animate-pulse" />
                <span className="font-mono text-xs text-blue-400 tracking-wide">
                  AI-ASSISTED CYBER DEFENSE PLATFORM
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.08] tracking-tight max-w-xl">
                From Security Events<br />
                <span className="text-blue-400">to Attack Stories.</span>
              </h1>

              {/* Subhead */}
              <p className="text-base text-gray-400 leading-relaxed max-w-md">
                SentinelAI collects Linux server telemetry, detects suspicious behavior, and correlates isolated events into complete attack narratives — with evidence-grounded AI investigation.
              </p>

              {/* Highlights */}
              <ul className="flex flex-col gap-2">
                {[
                  "Rule-based + ML anomaly detection",
                  "Multi-stage attack correlation",
                  "MITRE ATT&CK mapping",
                  "Evidence-grounded AI investigation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-green-400"><CheckCircle /></span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="/dashboard"
                  className="relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-150 group"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                  <span className="relative flex items-center gap-2">
                    Open Dashboard <ChevronRight />
                  </span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 text-sm font-medium hover:border-gray-500 hover:text-white transition-colors duration-150"
                >
                  <GitHub />
                  View Source
                </a>
              </div>

            </div>

            {/* Right — attack chain viz */}
            <div className="flex flex-col gap-4">
              <div className="border border-gray-800 bg-gray-900/50">
                {/* Terminal bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-800 bg-gray-900">
                  <span className="w-2.5 h-2.5 bg-red-500/70" />
                  <span className="w-2.5 h-2.5 bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 bg-green-500/70" />
                  <span className="font-mono text-xs text-gray-600 ml-2">sentinel://attack-chain · INC-000047</span>
                  <span className="ml-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-red-500 animate-pulse" />
                    <span className="font-mono text-[10px] text-red-400">LIVE</span>
                  </span>
                </div>
                <div className="p-4">
                  <AttackChain />
                </div>
              </div>

              {/* Incident summary card */}
              <div className="border border-red-900/40 bg-red-950/20 p-4 flex items-start gap-3">
                <span className="text-red-400 mt-0.5 shrink-0"><AlertTriangle /></span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-red-400">CRITICAL INCIDENT</span>
                    <span className="font-mono text-[10px] text-gray-600">INC-000047</span>
                  </div>
                  <p className="text-xs text-gray-400">Possible SSH account compromise — 5 correlated events, risk score <span className="text-red-400 font-semibold">94/100</span></p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["T1110", "T1078", "T1548", "T1059"].map(t => (
                      <span key={t} className="font-mono text-[10px] px-1.5 py-0.5 bg-gray-900 border border-gray-700 text-gray-500">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ════ 2. PROBLEM → SOLUTION ══════════════════════════════════════════ */}
      <Section id="problem" className="border-b border-gray-800">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Problem */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                Alerts without context are noise.
              </h2>
              <p className="text-gray-400 leading-relaxed">
                A modern Linux server generates hundreds of security events daily. A failed SSH login, a sudo command, a web request — each is logged individually. Traditional monitoring shows you each event in isolation. You see the notes, never the melody.
              </p>
              {/* Isolated alert stack */}
              <div className="flex flex-col gap-px border border-gray-800">
                {[
                  { time: "09:10:01", event: "Failed SSH login", src: "203.0.113.10", sev: "LOW",  sevColor: "text-blue-400" },
                  { time: "09:11:23", event: "Successful SSH login", src: "203.0.113.10", sev: "LOW",  sevColor: "text-blue-400" },
                  { time: "09:13:10", event: "sudo command executed",  src: "203.0.113.10", sev: "MED",  sevColor: "text-yellow-400" },
                  { time: "09:13:55", event: "Suspicious binary run",  src: "203.0.113.10", sev: "HIGH", sevColor: "text-red-400" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-2.5 bg-gray-950 border-b border-gray-800 last:border-0 font-mono text-xs">
                    <span className="text-gray-700 shrink-0 w-16">{row.time}</span>
                    <span className="text-gray-400 flex-1 truncate">{row.event}</span>
                    <span className="text-gray-600 shrink-0 hidden sm:block w-28 truncate">{row.src}</span>
                    <span className={`shrink-0 font-semibold w-10 text-right ${row.sevColor}`}>{row.sev}</span>
                  </div>
                ))}
                <div className="px-4 py-2 bg-gray-900 border-t border-gray-800 font-mono text-xs text-gray-600">
                  4 unrelated alerts · no story · analyst overwhelmed
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                SentinelAI builds the story.
              </h2>
              <p className="text-gray-400 leading-relaxed">
                SentinelAI's correlation engine connects events across time, source IP, username, and behavior — turning four isolated log lines into a single, evidence-grounded incident with a timeline, MITRE mapping, and AI-generated investigation summary.
              </p>
              {/* Correlated incident card */}
              <div className="border border-blue-900/50 bg-blue-950/10">
                <div className="flex items-center justify-between px-4 py-3 border-b border-blue-900/40">
                  <span className="font-mono text-xs font-semibold text-blue-400">CORRELATED INCIDENT · INC-000047</span>
                  <span className="font-mono text-xs px-2 py-0.5 bg-red-950 border border-red-900/60 text-red-400">CRITICAL 94/100</span>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Possible SSH account compromise — repeated authentication failures followed by successful login, privilege escalation, and suspicious command execution from the same source IP within 4 minutes.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Source IP", val: "203.0.113.10" },
                      { label: "Duration", val: "4 min 54 sec" },
                      { label: "Events", val: "4 correlated" },
                      { label: "Confidence", val: "96/100" },
                    ].map(m => (
                      <div key={m.label} className="bg-gray-900 border border-gray-800 px-3 py-1.5">
                        <div className="font-mono text-[10px] text-gray-600">{m.label}</div>
                        <div className="font-mono text-xs text-gray-300 font-semibold">{m.val}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["T1110 · Brute Force","T1078 · Valid Accounts","T1548 · Priv. Escalation"].map(t => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 border border-gray-700 text-gray-500">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ════ 3. HOW IT WORKS ════════════════════════════════════════════════ */}
      <Section id="how-it-works" className="border-b border-gray-800 bg-gray-900/30">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 py-16 lg:py-24">
          <div className="mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">How It Works</h2>
            <p className="text-gray-400 mt-3 max-w-xl">
              A lightweight agent runs on each monitored Linux server and ships telemetry securely to the SentinelAI backend, where a layered detection pipeline turns raw logs into actionable incidents.
            </p>
          </div>

          {/* Desktop pipeline */}
          <div className="hidden md:flex items-center gap-0 w-full overflow-x-auto pb-2">
            {[
              { label: "Linux Server",   sub: "Ubuntu / RHEL",    accent: "border-gray-700" },
              { label: "Sentinel Agent", sub: "log collector",     accent: "border-blue-800" },
              { label: "Secure Ingest",  sub: "TLS · auth",       accent: "border-blue-800" },
              { label: "Normalization",  sub: "parse · enrich",   accent: "border-blue-700" },
              { label: "Detection",      sub: "rules + ML",       accent: "border-yellow-800" },
              { label: "Correlation",    sub: "event grouping",   accent: "border-orange-800" },
              { label: "Incident",       sub: "risk · MITRE",     accent: "border-red-800" },
              { label: "AI Investigation", sub: "analyst assist", accent: "border-purple-800" },
            ].map((step, i, arr) => (
              <PipeStep key={step.label} {...step} last={i === arr.length - 1} />
            ))}
          </div>

          {/* Mobile pipeline — vertical */}
          <div className="flex md:hidden flex-col gap-px">
            {[
              { label: "Linux Server",     sub: "Ubuntu / RHEL",    col: "text-gray-400",   border: "border-gray-700" },
              { label: "Sentinel Agent",   sub: "Log collection",   col: "text-blue-400",   border: "border-blue-800" },
              { label: "Secure Ingest",    sub: "TLS · auth",       col: "text-blue-400",   border: "border-blue-800" },
              { label: "Normalization",    sub: "Parse · enrich",   col: "text-blue-300",   border: "border-blue-700" },
              { label: "Detection",        sub: "Rules + ML",       col: "text-yellow-400", border: "border-yellow-800" },
              { label: "Correlation",      sub: "Event grouping",   col: "text-orange-400", border: "border-orange-800" },
              { label: "Incident",         sub: "Risk · MITRE",     col: "text-red-400",    border: "border-red-800" },
              { label: "AI Investigation",sub: "Analyst assist",   col: "text-purple-400", border: "border-purple-800" },
            ].map((step, i) => (
              <div key={step.label} className={`flex items-center gap-4 border-l-2 ${step.border} pl-4 py-3 bg-gray-950 border-b border-gray-800`}>
                <div className="flex flex-col">
                  <span className={`text-sm font-semibold ${step.col}`}>{step.label}</span>
                  <span className="font-mono text-xs text-gray-600">{step.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Agent detail */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800">
            {[
              { title: "Per-Agent Credentials", desc: "Each sentinel-agent gets a unique credential via a secure one-time claim token flow. No shared global API keys." },
              { title: "Local Event Buffering", desc: "Events are queued locally in SQLite. If the server is unreachable, the agent retries — no log loss on transient failures." },
              { title: "Configurable Log Sources", desc: "YAML config drives which log files are watched — auth.log, nginx access/error, syslog, application logs — extensible per host." },
            ].map(c => (
              <div key={c.title} className="bg-gray-950 p-5">
                <h4 className="text-sm font-semibold text-gray-200 mb-2">{c.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════ 4. SINGLE ALERT vs ATTACK CHAIN ═══════════════════════════════ */}
      <Section id="comparison" className="border-b border-gray-800">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            One event, or the whole story?
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl">
            Isolated detection treats each log entry as an independent signal. Attack correlation reveals the sequence — the who, what, when, and how of a full intrusion.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
            {/* Isolated */}
            <div className="bg-gray-950 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-gray-600 uppercase tracking-wider">Without Correlation</span>
              </div>
              <div className="flex flex-col gap-2">
                {["AUTH FAILURE · 09:10:01 · 203.0.113.10","AUTH FAILURE · 09:10:14 · 203.0.113.10","AUTH FAILURE · 09:10:28 · 203.0.113.10","AUTH SUCCESS · 09:11:23 · 203.0.113.10","SUDO EXEC · 09:13:10 · alice","PROCESS · 09:13:55 · bash"].map((line, i) => (
                  <div key={i} className="font-mono text-xs text-gray-600 px-3 py-2 bg-gray-900 border border-gray-800">
                    {line}
                    <span className="ml-2 text-gray-700">→ individual alert #{i+1}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 border border-gray-800 bg-gray-900">
                <p className="font-mono text-xs text-gray-600">6 separate low/medium alerts · no relationship · analyst must connect dots manually</p>
              </div>
            </div>

            {/* Correlated */}
            <div className="bg-gray-950 p-6 border-l border-blue-900/30">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 bg-blue-500" />
                <span className="font-mono text-xs text-blue-400 uppercase tracking-wider">With SentinelAI Correlation</span>
              </div>
              {/* Timeline */}
              <div className="flex flex-col gap-0">
                {[
                  { time: "09:10", label: "Brute Force",        detail: "6 failures / 90s · same IP", col: "text-yellow-400", dot: "bg-yellow-500" },
                  { time: "09:11", label: "Initial Access",     detail: "Successful login post-brute", col: "text-orange-400", dot: "bg-orange-500" },
                  { time: "09:13", label: "Privilege Escalation",detail: "sudo to root · alice",       col: "text-red-400",    dot: "bg-red-500"    },
                  { time: "09:13", label: "Command Execution",  detail: "bash -i spawned",              col: "text-red-500",    dot: "bg-red-600"    },
                ].map((step, i, arr) => (
                  <div key={i} className="flex items-stretch gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 shrink-0 mt-2.5 ${step.dot}`} />
                      {i < arr.length - 1 && <div className="w-px flex-1 bg-gray-800 min-h-4" />}
                    </div>
                    <div className={`pb-4 ${i === arr.length - 1 ? "" : ""}`}>
                      <div className="font-mono text-[10px] text-gray-700">{step.time}</div>
                      <div className={`text-sm font-semibold ${step.col}`}>{step.label}</div>
                      <div className="font-mono text-xs text-gray-600">{step.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 p-3 border border-blue-900/40 bg-blue-950/20">
                <p className="font-mono text-xs text-blue-400">1 critical incident · full kill chain · AI-summarized · MITRE-mapped</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ════ 5. CORE FEATURES ═══════════════════════════════════════════════ */}
      <Section id="features" className="border-b border-gray-800 bg-gray-900/30">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Core Capabilities</h2>
          <p className="text-gray-400 mb-10 max-w-xl">
            Every component in SentinelAI exists because it solves a specific security investigation problem — not to fill a feature matrix.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800">
            <FeatureCard icon={<Server />}     accent="text-blue-400"   border="border-0" title="Event Collection"      desc="Lightweight sentinel-agent watches configurable log sources on Linux servers — auth, nginx, syslog — and ships normalized telemetry over TLS." />
            <FeatureCard icon={<Target />}     accent="text-yellow-400" border="border-0" title="Rule-Based Detection"  desc="Explicit, readable detection rules — SSH brute force, login after failure, suspicious sudo, abnormal login times. Evidence-first, not black-box." />
            <FeatureCard icon={<GitBranch />}  accent="text-orange-400" border="border-0" title="Attack Correlation"    desc="The correlation engine groups related events by source IP, user, host, and time window — building the attack chain the attacker actually executed." />
            <FeatureCard icon={<Layers />}     accent="text-red-400"    border="border-0" title="Incident Management"   desc="Alerts escalate into incidents. Each incident tracks status, analyst notes, affected hosts, and the full correlated event set." />
            <FeatureCard icon={<TrendingUp />} accent="text-green-400"  border="border-0" title="Risk Scoring"          desc="Risk is calculated from rule score, ML anomaly score, behavioral deviation, threat intelligence, and correlation strength — not a single signal." />
            <FeatureCard icon={<Clock />}      accent="text-blue-400"   border="border-0" title="Attack Timeline"       desc="Every incident gets a timestamped, event-level timeline — the full sequence from first anomaly to detection, ready for analyst review." />
            <FeatureCard icon={<Cpu />}        accent="text-purple-400" border="border-0" title="ML Anomaly Detection"  desc="Isolation Forest detects behavioral deviations — unusual login hours, abnormal event frequency, new source IPs — to catch what rules miss." />
            <FeatureCard icon={<Brain />}      accent="text-indigo-400" border="border-0" title="AI Investigation"      desc="An evidence-grounded LLM assistant answers analyst questions — what happened, why this alert, what to investigate next — without inventing evidence." />
          </div>
        </div>
      </Section>

      {/* ════ 6. ARCHITECTURE ════════════════════════════════════════════════ */}
      <Section id="architecture" className="border-b border-gray-800">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Architecture</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                SentinelAI follows a strict layered architecture — the AI never touches raw telemetry and never independently decides if something is malicious. Evidence always comes first.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { layer: "Sentinel Agent",       role: "Log collection, normalization, secure transport",        col: "border-blue-800 text-blue-400" },
                  { layer: "Event Pipeline",        role: "Ingestion, validation, storage, enrichment",             col: "border-blue-700 text-blue-300" },
                  { layer: "Detection Engine",      role: "Rule evaluation + Isolation Forest ML",                  col: "border-yellow-800 text-yellow-400" },
                  { layer: "Correlation Engine",    role: "Multi-signal grouping into incidents",                   col: "border-orange-800 text-orange-400" },
                  { layer: "Risk & MITRE Engine",   role: "Composite scoring + ATT&CK technique mapping",          col: "border-red-800 text-red-400" },
                  { layer: "AI Investigation",      role: "Evidence-grounded LLM analysis, advisory only",        col: "border-purple-800 text-purple-400" },
                  { layer: "FastAPI Backend",        role: "REST API, RBAC, audit logging, PostgreSQL",             col: "border-gray-700 text-gray-400" },
                  { layer: "React SOC Dashboard",   role: "Live events, alerts, incidents, timeline, AI chat",     col: "border-gray-700 text-gray-400" },
                ].map((l, i) => (
                  <div key={i} className={`flex items-center gap-4 border-l-2 ${l.col.split(" ")[0]} pl-4 py-2.5 bg-gray-950 border-b border-gray-900`}>
                    <div className="flex flex-col gap-0.5 flex-1">
                      <span className={`text-xs font-semibold ${l.col.split(" ")[1]}`}>{l.layer}</span>
                      <span className="font-mono text-xs text-gray-600">{l.role}</span>
                    </div>
                    <span className="font-mono text-[10px] text-gray-700 shrink-0 hidden sm:block">Layer {i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture visual */}
            <div className="border border-gray-800 bg-gray-950 p-6">
              <div className="font-mono text-xs text-gray-600 mb-4">sentinel://architecture</div>
              <pre className="font-mono text-[11px] text-gray-500 leading-5 overflow-x-auto whitespace-pre">
{`  Linux Server 1          Linux Server 2
  ┌────────────┐           ┌────────────┐
  │  auth.log  │           │  auth.log  │
  │  nginx log │           │  nginx log │
  └─────┬──────┘           └─────┬──────┘
        │                        │
        ▼                        ▼
  ┌──────────┐             ┌──────────┐
  │ sentinel │             │ sentinel │
  │  -agent  │             │  -agent  │
  └─────┬────┘             └─────┬────┘
        │  Bearer <credential>   │
        └──────────┬─────────────┘
                   ▼
        ┌──────────────────────┐
        │  SentinelAI Backend  │
        │  FastAPI · RBAC      │
        └──────────┬───────────┘
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
   ┌────────┐ ┌────────┐ ┌─────────┐
   │ Rules  │ │  ML    │ │ Threat  │
   │ Engine │ │ Engine │ │  Intel  │
   └────┬───┘ └───┬────┘ └────┬────┘
        └─────────┼───────────┘
                  ▼
        ┌──────────────────┐
        │  Correlation +   │
        │  Risk + MITRE    │
        └────────┬─────────┘
                 ▼
        ┌──────────────────┐
        │ AI Investigation │
        │  (advisory only) │
        └────────┬─────────┘
                 ▼
        ┌──────────────────┐
        │  SOC Dashboard   │
        │  React · TS      │
        └──────────────────┘`}
              </pre>
            </div>
          </div>
        </div>
      </Section>

      {/* ════ 7. INVESTIGATION SHOWCASE ══════════════════════════════════════ */}
      <Section id="showcase" className="border-b border-gray-800 bg-gray-900/30">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Investigation Interface</h2>
          <p className="text-gray-400 mb-10 max-w-xl">
            Every incident surfaces the evidence an analyst needs — without forcing them to correlate it manually.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800">
            <ShowcaseCard
              title="SOC Dashboard"
              badge="LIVE"
              badgeColor="border-green-900 text-green-400 bg-green-950/40"
              lines={[
                { text: "Active Incidents", highlight: true, dot: "bg-red-500", accent: "text-gray-300" },
                { text: "3 CRITICAL · 7 HIGH · 12 MEDIUM", accent: "text-gray-500" },
                { text: "", accent: "" },
                { text: "Risk Trend ↑  +23% last hour", highlight: true, accent: "text-red-400" },
                { text: "Agents Online: 4 / 4", accent: "text-green-400" },
                { text: "Events today: 14,832", accent: "text-gray-500" },
                { text: "", accent: "" },
                { text: "Top Source:  203.0.113.10", accent: "text-gray-500" },
                { text: "Top Technique: T1110 · Brute Force", accent: "text-gray-500" },
              ]}
            />
            <ShowcaseCard
              title="Incident Timeline · INC-000047"
              badge="CRITICAL"
              badgeColor="border-red-900 text-red-400 bg-red-950/40"
              lines={[
                { text: "09:10:01 · AUTH FAILURE ×6",  dot: "bg-yellow-500", accent: "text-yellow-400" },
                { text: "same IP · 90 second window", accent: "text-gray-600" },
                { text: "09:11:23 · AUTH SUCCESS",     dot: "bg-orange-500", accent: "text-orange-400" },
                { text: "rule: success_after_brute",   accent: "text-gray-600" },
                { text: "09:13:10 · SUDO EXEC",        dot: "bg-red-500",    accent: "text-red-400" },
                { text: "user: alice → root",          accent: "text-gray-600" },
                { text: "09:13:55 · SUSPICIOUS CMD",   dot: "bg-red-600",    accent: "text-red-400" },
                { text: "bash -i >& /dev/tcp/...",     accent: "text-gray-600" },
              ]}
            />
            <ShowcaseCard
              title="AI Investigation"
              badge="ADVISORY"
              badgeColor="border-purple-900 text-purple-400 bg-purple-950/40"
              lines={[
                { text: "Analyst: What happened here?", accent: "text-blue-400" },
                { text: "", accent: "" },
                { text: "AI: The incident began with 6 failed", accent: "text-gray-400" },
                { text: "SSH attempts from 203.0.113.10", accent: "text-gray-400" },
                { text: "over 90 seconds. A successful login", accent: "text-gray-400" },
                { text: "followed within 2 minutes from the", accent: "text-gray-400" },
                { text: "same IP. Privileged activity occurred", accent: "text-gray-400" },
                { text: "shortly after. Recommend confirming", accent: "text-gray-400" },
                { text: "whether this login was authorized.", accent: "text-gray-500" },
              ]}
            />
          </div>
        </div>
      </Section>

      {/* ════ 8. SECURITY ════════════════════════════════════════════════════ */}
      <Section id="security" className="border-b border-gray-800">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Security by Design</h2>
          <p className="text-gray-400 mb-10 max-w-xl">
            A security platform that isn't itself secure undermines the point. SentinelAI treats its own security with the same rigor it applies to detecting threats.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800">
            {[
              { icon: <Lock />,   title: "Agent Authentication",  desc: "Each agent holds a unique revocable credential issued via a time-limited, single-use claim token. No shared secrets.", col: "text-blue-400" },
              { icon: <Shield />, title: "Secure Enrollment",      desc: "Agents are enrolled through the dashboard. Claim tokens expire in minutes and are consumed on first use.", col: "text-green-400" },
              { icon: <Activity />,title: "Transport Security",    desc: "All agent-to-server communication uses HTTPS/TLS. Credentials are never sent in URL parameters or query strings.", col: "text-blue-400" },
              { icon: <Search />, title: "Prompt Injection Guard", desc: "Security logs are treated as untrusted data, not instructions. The AI receives structured evidence — never raw log content directly.", col: "text-purple-400" },
            ].map(c => (
              <div key={c.title} className="bg-gray-950 p-5 flex flex-col gap-3">
                <span className={c.col}>{c.icon}</span>
                <h3 className="text-sm font-semibold text-gray-200">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════ 9. TECHNOLOGY / RESEARCH ═══════════════════════════════════════ */}
      <Section id="technology" className="border-b border-gray-800 bg-gray-900/30">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Technology Stack</h2>
              <p className="text-gray-400 mb-8">
                Selected for correctness and composability, not for marketing appeal. Every dependency earns its place.
              </p>
              <div className="grid grid-cols-2 gap-px bg-gray-800">
                {[
                  { layer: "Agent",     items: "Python · watchdog · httpx · SQLite · PyYAML" },
                  { layer: "Backend",   items: "FastAPI · SQLAlchemy · PostgreSQL · Pydantic" },
                  { layer: "ML",        items: "scikit-learn · Isolation Forest · pandas · numpy" },
                  { layer: "Frontend",  items: "React · TypeScript · Vite · Tailwind CSS" },
                  { layer: "AI Layer",  items: "Provider-agnostic LLMProvider abstraction" },
                  { layer: "Infra",     items: "Docker Compose · Nginx · PostgreSQL" },
                ].map(s => (
                  <div key={s.layer} className="bg-gray-950 p-4">
                    <div className="font-mono text-[10px] text-gray-600 uppercase tracking-wider mb-1">{s.layer}</div>
                    <div className="text-xs text-gray-400">{s.items}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Research Focus</h2>
              <p className="text-gray-400 mb-8">
                This project explores the intersection of classical security engineering and applied machine learning in the context of intrusion detection and investigation.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Hybrid deterministic + probabilistic detection architectures",
                  "Attack event correlation and kill-chain reconstruction",
                  "Isolation Forest for behavioral anomaly detection in security telemetry",
                  "Evidence-grounded LLM integration with prompt injection resistance",
                  "MITRE ATT&CK technique mapping from raw log evidence",
                  "SOC analyst workflow design and investigation UX",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="text-blue-500 mt-0.5 shrink-0"><CheckCircle /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ════ 10. FINAL CTA ══════════════════════════════════════════════════ */}
      <Section id="cta" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/3 w-96 h-64 bg-blue-900/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-blue-500 animate-pulse" />
              <span className="font-mono text-xs text-blue-400 tracking-wide">READY TO INVESTIGATE</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Turn Security Events<br />
              <span className="text-blue-400">Into Attack Stories.</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg">
              Deploy SentinelAI in your lab, enroll your first Linux server, and watch isolated log lines become a complete, AI-investigated incident — in minutes.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/dashboard"
                className="relative overflow-hidden flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-150 group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                <span className="relative flex items-center gap-2">Open Dashboard <ChevronRight /></span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 border border-gray-700 text-gray-300 text-sm font-medium hover:border-gray-500 hover:text-white transition-colors duration-150"
              >
                <GitHub />
                GitHub
              </a>
            </div>
            {/* <p className="font-mono text-xs text-gray-700 mt-6">
              B.Tech Final Year Project · Cooch Behar Government Engineering College · 2023–2027
            </p> */}
          </div>
        </div>
      </Section>

    </div>
)}