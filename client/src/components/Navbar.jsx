import { useState, useEffect } from "react";

// ─── Icons (inline SVG — zero extra deps) ─────────────────────────────────────

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg
    width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Pulsing green "live" dot — system operational indicator */
const LiveDot = () => (
  <span className="relative flex items-center justify-center w-2 h-2">
    <span className="absolute w-full h-full bg-green-400 opacity-50 animate-ping" />
    <span className="relative w-2 h-2 bg-green-400" />
  </span>
);

/** Small threat-alert counter badge shown in nav */
const ThreatBadge = ({ count = 3 }) => (
  <div className="flex items-center gap-1.5 px-2.5 py-1 border border-red-900/70 bg-red-950/50">
    <span className="w-1.5 h-1.5 bg-red-500 animate-pulse" />
    <span className="font-mono text-xs font-semibold text-red-400 tracking-wide">
      {count} ALERTS
    </span>
  </div>
);

/** Documentation dropdown */
const DocsDropdown = ({ open, onToggle }) => {
  const items = [
    { label: "Quick Start", href: "/docs/quickstart" },
    { label: "Architecture Guide", href: "/docs/architecture" },
    { label: "Agent Setup", href: "/docs/agent" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Detection Rules", href: "/docs/rules" },
  ];

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-150"
      >
        Documentation
        <ChevronDown open={open} />
      </button>

      <div
        className={`absolute top-full left-0 mt-1 w-52 bg-gray-900 border border-gray-700 shadow-2xl transition-all duration-150 origin-top-left ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {items.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-100 ${
              i < items.length - 1 ? "border-b border-gray-800/70" : ""
            }`}
          >
            <span className="w-1 h-1 bg-gray-600 shrink-0" />
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

// ─── Default nav links ─────────────────────────────────────────────────────────

const DEFAULT_LINKS = [
  { label: "Features",      href: "#features"      },
  { label: "How It Works",  href: "#how-it-works"  },
  { label: "Architecture",  href: "#architecture"  },
  { label: "Documentation", href: "/docs", dropdown: true },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar({
  links        = DEFAULT_LINKS,
  githubUrl    = "https://github.com",
  loginUrl     = "/login",
  getStartedUrl = "/dashboard",
  activePath   = "",
  alertCount   = 3,
}) {
  const [mobileOpen, setMobileOpen]  = useState(false);
  const [scrolled,   setScrolled]    = useState(false);
  const [docsOpen,   setDocsOpen]    = useState(false);

  /* Scroll-aware navbar bg */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Close docs dropdown on outside click */
  useEffect(() => {
    if (!docsOpen) return;
    const close = () => setDocsOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [docsOpen]);

  const navLinkCls = (href) =>
    `px-3 py-2 text-sm font-medium transition-colors duration-150 ${
      activePath === href ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  return (
    <>
      {/* ════════════════════════════════════════════
          TOP STATUS BAR — desktop only
      ════════════════════════════════════════════ */}
      <div className="hidden lg:block w-full bg-black border-b border-gray-800/50">
        <div className="mx-auto max-w-[1600px] px-8 h-7 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 font-mono text-[11px] text-gray-500">
              <LiveDot />
              <span className="text-green-400 font-semibold">ALL SYSTEMS OPERATIONAL</span>
            </span>
            <span className="text-gray-800">│</span>
            <span className="font-mono text-[11px] text-gray-500">
              THREAT LEVEL:{" "}
              <span className="text-blue-400 font-semibold">LOW</span>
            </span>
            <span className="text-gray-800">│</span>
            <span className="font-mono text-[11px] text-gray-500">
              AGENTS ONLINE:{" "}
              <span className="text-gray-300 font-semibold">4</span>
            </span>
          </div>
          <span className="font-mono text-[11px] text-gray-700 tracking-widest uppercase">
            SentinelAI Defense Platform · v0.1.0
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MAIN NAVBAR
      ════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? "bg-gray-950/95 backdrop-blur-md border-b border-gray-800"
            : "bg-gray-950 border-b border-gray-900"
        }`}
      >
        <nav className="mx-auto max-w-[1600px] flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">

          {/* ── Logo ── */}
          <a
            href="/"
            className="flex items-center gap-3 shrink-0 group"
            onClick={() => setMobileOpen(false)}
          >
            {/* Icon block */}
            <div className="relative w-9 h-9 bg-blue-600 flex items-center justify-center text-white transition-colors duration-200 group-hover:bg-blue-500 shrink-0">
              <ShieldIcon />
              {/* corner accent */}
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-blue-300 opacity-60" />
            </div>
            {/* Wordmark */}
            <div className="flex flex-col leading-none gap-0.5">
              <span className="font-mono text-[15px] font-bold tracking-tight text-white">
                Sentinel<span className="text-blue-400">AI</span>
              </span>
              <span className="font-mono text-[9px] tracking-[0.22em] text-gray-600 uppercase">
                Cyber Defense
              </span>
            </div>
          </a>

          {/* ── Desktop nav links ── */}
          <ul className="hidden lg:flex items-center">
            {links.map((link) =>
              link.dropdown ? (
                <li key={link.href}>
                  <DocsDropdown
                    open={docsOpen}
                    onToggle={() => setDocsOpen((v) => !v)}
                  />
                </li>
              ) : (
                <li key={link.href}>
                  <a href={link.href} className={navLinkCls(link.href)}>
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* ── Desktop right actions ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Live threat counter */}
            <ThreatBadge count={alertCount} />

            {/* GitHub */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-gray-500 hover:text-white border border-transparent hover:border-gray-700 transition-colors duration-150"
            >
              <GitHubIcon />
            </a>

            {/* Rule */}
            <div className="w-px h-5 bg-gray-800" />

            {/* Login */}
            <a
              href={loginUrl}
              className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-700 hover:border-gray-500 hover:text-white transition-colors duration-150"
            >
              Login
            </a>

            {/* Get Started — shimmer CTA */}
            <a
              href={getStartedUrl}
              className="relative overflow-hidden px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors duration-150 group"
            >
              {/* Shimmer on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <span className="relative">Get Started</span>
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors duration-150"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>

        {/* Blue accent underline */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent" />
      </header>

      {/* ════════════════════════════════════════════
          MOBILE OVERLAY
      ════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════ */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col bg-gray-950 border-l border-gray-800 shadow-2xl transition-transform duration-200 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white shrink-0">
              <ShieldIcon />
            </div>
            <span className="font-mono text-sm font-bold text-white">
              Sentinel<span className="text-blue-400">AI</span>
            </span>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors duration-150"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Status strip */}
        <div className="mx-4 mt-4 mb-1 flex items-center gap-2 px-3 py-2 bg-gray-900 border border-gray-800">
          <LiveDot />
          <span className="font-mono text-xs text-green-400 font-semibold">SYSTEMS OPERATIONAL</span>
        </div>

        {/* Alert strip */}
        <div className="mx-4 mb-3 flex items-center justify-between px-3 py-2 bg-red-950/40 border border-red-900/60">
          <span className="font-mono text-xs text-red-400 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-500 animate-pulse" />
            {alertCount} ACTIVE ALERTS
          </span>
          <a href="/alerts" className="font-mono text-xs text-red-400 hover:text-red-300 transition-colors duration-150">
            View →
          </a>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {links.map((link) => (
              <li key={link.href} className="border-b border-gray-800/60">
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-5 py-4 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900/60 transition-colors duration-150"
                >
                  {link.label}
                  <span className="text-gray-600 text-xs">→</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Extra resource links */}
          <div className="px-5 pt-5 pb-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-600 mb-3">
              Resources
            </p>
            {[
              { label: "Quick Start Guide",  href: "/docs/quickstart" },
              { label: "API Reference",      href: "/docs/api"        },
              { label: "Agent Setup",        href: "/docs/agent"      },
              { label: "Detection Rules",    href: "/docs/rules"      },
            ].map((r) => (
              <a
                key={r.href}
                href={r.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-2.5 text-sm text-gray-500 hover:text-gray-200 border-b border-gray-800/40 last:border-0 transition-colors duration-150"
              >
                <span className="w-1 h-1 bg-gray-700 shrink-0" />
                {r.label}
              </a>
            ))}
          </div>
        </nav>

        {/* CTA stack */}
        <div className="shrink-0 px-4 pt-3 pb-6 border-t border-gray-800 flex flex-col gap-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-gray-700 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:border-gray-500 transition-colors duration-150"
          >
            <GitHubIcon />
            View on GitHub
          </a>
          <a
            href={loginUrl}
            className="flex items-center justify-center border border-gray-700 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:border-gray-500 transition-colors duration-150"
          >
            Login
          </a>
          <a
            href={getStartedUrl}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 py-2.5 text-sm font-semibold text-white transition-colors duration-150"
          >
            Get Started →
          </a>
        </div>
      </div>
    </>
  );
}
