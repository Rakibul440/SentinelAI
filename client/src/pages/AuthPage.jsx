import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Lock,
  User,
  Building2,
  Eye,
  EyeOff,
  ShieldCheck,
  // Github,
  ArrowRight,
  Activity,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

// ---------------------------------------------------------------------------
// SentinelAI — Auth Page (Login / Sign Up toggle)
// Drop into components/pages/. Wrap with the shared Layout if you want the
// Navbar/Footer around it, or render standalone (recommended — most auth
// screens skip the app chrome entirely).
//
// Wire up onLogin / onSignUp to your actual auth calls. Everything here is
// presentational + local form state; no network calls are made.
// ---------------------------------------------------------------------------

const TELEMETRY_FEED = [
  { text: "agent-014 heartbeat OK · 40ms", tone: "ok" },
  { text: "Blocked SSH brute-force · 203.0.113.4", tone: "danger" },
  { text: "Isolation Forest: anomaly score 0.92", tone: "warn" },
  { text: "Incident #482 correlated · 3 events", tone: "info" },
  { text: "agent-031 enrolled · web-03.internal", tone: "ok" },
  { text: "MITRE T1110 mapped · credential access", tone: "warn" },
];

const toneDot = {
  ok: "bg-emerald-500",
  danger: "bg-red-500",
  warn: "bg-amber-400",
  info: "bg-blue-400",
};

function GoogleMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62Z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.85.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18Z" fill="#34A853" />
      <path d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33Z" fill="#FBBC05" />
      <path d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58Z" fill="#EA4335" />
    </svg>
  );
}

function FieldShell({ icon: Icon, children }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      {children}
    </div>
  );
}

const inputClasses =
  "w-full bg-slate-900 border border-slate-800 pl-10 pr-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40";

export default function AuthPage({ onLogin, onSignUp, onGoogle, onGithub }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedIndex, setFeedIndex] = useState(0);
  const [form, setForm] = useState({
    fullName: "",
    orgName: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setFeedIndex((i) => (i + 1) % TELEMETRY_FEED.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const update = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === "login") onLogin?.(form);
      else onSignUp?.(form);
    }, 900);
  };

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    setShowPassword(false);
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-stretch font-sans">
      <style>{`
        @keyframes sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(220%); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes feedIn {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .sentinel-grid {
          background-image:
            linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .sentinel-sweep {
          animation: sweep 5s linear infinite;
        }
        .sentinel-panel-enter {
          animation: fadeSlideIn 0.35s ease-out;
        }
        .sentinel-feed-line {
          animation: feedIn 0.4s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .sentinel-sweep, .sentinel-panel-enter, .sentinel-feed-line { animation: none; }
        }
      `}</style>

      {/* Left: brand / live telemetry panel — desktop only */}
      <div className="relative hidden lg:flex lg:w-[46%] flex-col justify-between overflow-hidden bg-slate-900 border-r border-slate-800 p-10">
        <div className="sentinel-grid absolute inset-0 motion-reduce:opacity-50" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-500/10 to-transparent" />
        <div
          className="sentinel-sweep motion-reduce:hidden pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-cyan-400/10 via-cyan-400/0 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center border border-cyan-500/40 bg-cyan-500/10">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-100">
            SentinelAI
          </span>
        </div>

        <div className="relative z-10 max-w-sm">
          <h2 className="text-2xl font-semibold leading-snug text-slate-100">
            See the attack before it becomes an incident.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            SentinelAI watches your fleet in real time, correlates weak
            signals into confirmed incidents, and hands your team a timeline
            instead of a wall of logs.
          </p>

          <div className="mt-8 border border-slate-800 bg-slate-950/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2.5">
              <Activity className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-xs font-medium text-slate-400">
                Live agent feed
              </span>
              <span className="ml-auto flex h-1.5 w-1.5 rounded-full bg-emerald-500 motion-reduce:animate-none animate-pulse" />
            </div>
            <div className="h-24 px-4 py-3 font-mono text-[11px] leading-6 text-slate-400">
              {TELEMETRY_FEED.slice(feedIndex, feedIndex + 3)
                .concat(TELEMETRY_FEED.slice(0, Math.max(0, feedIndex + 3 - TELEMETRY_FEED.length)))
                .map((line, i) => (
                  <div key={`${feedIndex}-${i}`} className="sentinel-feed-line flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 shrink-0 ${toneDot[line.tone]}`} />
                    <span className="truncate">{line.text}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-slate-600">
          Built for security teams who need answers, not more dashboards.
        </p>
      </div>

      {/* Right: auth form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          {/* Mobile brand mark */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center border border-cyan-500/40 bg-cyan-500/10">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              SentinelAI
            </span>
          </div>

          {/* Toggle tabs */}
          <div className="relative grid grid-cols-2 border border-slate-800 bg-slate-900 p-1">
            <div
              className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-slate-800 transition-transform duration-300 ease-out ${
                mode === "signup" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`relative z-10 py-2 text-sm font-medium transition-colors ${
                mode === "login" ? "text-slate-100" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`relative z-10 py-2 text-sm font-medium transition-colors ${
                mode === "signup" ? "text-slate-100" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Create account
            </button>
          </div>

          <div key={mode} className="sentinel-panel-enter mt-7">
            <h1 className="text-xl font-semibold text-slate-100">
              {mode === "login" ? "Welcome back" : "Create your SentinelAI account"}
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              {mode === "login"
                ? "Sign in to your SentinelAI security platform."
                : "Start monitoring, detecting, and investigating security threats."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FieldShell icon={User}>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={form.fullName}
                      onChange={update("fullName")}
                      className={inputClasses}
                    />
                  </FieldShell>
                  <FieldShell icon={Building2}>
                    <input
                      type="text"
                      required
                      placeholder="Organization"
                      value={form.orgName}
                      onChange={update("orgName")}
                      className={inputClasses}
                    />
                  </FieldShell>
                </div>
              )}

              <FieldShell icon={Mail}>
                <input
                  type="email"
                  required
                  placeholder={mode === "login" ? "Email" : "Work email"}
                  value={form.email}
                  onChange={update("email")}
                  className={inputClasses}
                />
              </FieldShell>

              <FieldShell icon={Lock}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="Password"
                  value={form.password}
                  onChange={update("password")}
                  className={`${inputClasses} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </FieldShell>

              {mode === "signup" && (
                <FieldShell icon={Lock}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={update("confirmPassword")}
                    className={`${inputClasses} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </FieldShell>
              )}

              {mode === "login" ? (
                <div className="flex items-center justify-between pt-1 text-sm">
                  <label className="flex items-center gap-2 text-slate-400">
                    <input
                      type="checkbox"
                      checked={form.remember}
                      onChange={update("remember")}
                      className="peer sr-only"
                    />
                    <span className="flex h-4 w-4 items-center justify-center border border-slate-700 bg-slate-900 peer-checked:border-cyan-500 peer-checked:bg-cyan-500 transition-colors">
                      <svg
                        className={`h-2.5 w-2.5 text-slate-950 ${form.remember ? "opacity-100" : "opacity-0"}`}
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                      </svg>
                    </span>
                    Remember me
                  </label>
                  <button type="button" className="text-cyan-400 hover:text-cyan-300">
                    Forgot password?
                  </button>
                </div>
              ) : (
                <p className="pt-1 text-xs leading-relaxed text-slate-600">
                  By creating an account, you agree to our{" "}
                  <button type="button" className="text-slate-400 underline underline-offset-2 hover:text-slate-200">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-slate-400 underline underline-offset-2 hover:text-slate-200">
                    Privacy Policy
                  </button>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 bg-cyan-500 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin border-2 border-slate-950/30 border-t-slate-950" />
                ) : (
                  <>
                    {mode === "login" ? "Sign in" : "Create account"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-xs text-slate-600">Or continue with</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onGoogle}
                className="flex items-center justify-center gap-2 border border-slate-800 bg-slate-900 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-800"
              >
                <GoogleMark className="h-4 w-4" />
                Google
              </button>
              <button
                type="button"
                onClick={onGithub}
                className="flex items-center justify-center gap-2 border border-slate-800 bg-slate-900 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-800"
              >
                {/* <Github className="h-4 w-4" /> */}
                <FaGithub className="h-4 w-4" />
                GitHub
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-slate-500">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                className="font-medium text-cyan-400 hover:text-cyan-300"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>

            <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-slate-600">
              <Lock className="h-3 w-3" />
              Your connection is secured with encryption.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
