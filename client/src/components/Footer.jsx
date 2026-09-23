import { useState } from "react";

// ── Icons ──────────────────────────────────────────────────────────────────────
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
);

const ActivityIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────────
const PLATFORM_LINKS = [
  { label: "Security Dashboard", href: "/dashboard" },
  { label: "Live Events",        href: "/events"    },
  { label: "Alerts",             href: "/alerts"    },
  { label: "Incidents",          href: "/incidents" },
  { label: "Attack Timeline",    href: "/timeline"  },
  { label: "Attack Graph",       href: "/graph"     },
];

const RESOURCE_LINKS = [
  { label: "Documentation",   href: "/docs"              },
  { label: "How It Works",    href: "/how-it-works"      },
  { label: "Architecture",    href: "/docs/architecture" },
  { label: "Security",        href: "/docs/security"     },
  { label: "API Reference",   href: "/docs/api"          },
  { label: "Agent Setup",     href: "/docs/agent"        },
];

const COMPANY_LINKS = [
  { label: "About",    href: "/about"    },
  { label: "Careers",  href: "/careers"  },
  { label: "Contact",  href: "/contact"  },
  { label: "Security", href: "/security" },
  { label: "Privacy",  href: "/privacy"  },
  { label: "Terms",    href: "/terms"    },
];

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com",    icon: <GithubIcon />,   external: true  },
  { label: "LinkedIn", href: "https://linkedin.com",  icon: <LinkedInIcon />, external: true  },
  { label: "X",        href: "https://x.com",         icon: <XIcon />,        external: true  },
];

const BOTTOM_LINKS = [
  { label: "Privacy",  href: "/privacy"  },
  { label: "Terms",    href: "/terms"    },
  { label: "Security", href: "/security" },
];

// ── Mobile accordion section ───────────────────────────────────────────────────
function MobileAccordion({ title, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.15em]">{title}</span>
        <ChevronDown open={open} />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96 pb-4" : "max-h-0"}`}>
        <ul className="flex flex-col gap-3">
          {links.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-300 transition-colors duration-150"
              >
                {link.icon && <span className="text-neutral-700">{link.icon}</span>}
                {link.label}
                {link.external && <span className="text-neutral-800 ml-auto"><ArrowUpRight /></span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Footer link column ─────────────────────────────────────────────────────────
function LinkColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-5">
      <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-[0.18em]">{title}</span>
      <ul className="flex flex-col gap-3">
        {links.map(link => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-1.5 text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors duration-150"
            >
              {link.icon && <span className="text-neutral-700 group-hover:text-neutral-500 transition-colors duration-150">{link.icon}</span>}
              {link.label}
              {link.external && (
                <span className="opacity-0 group-hover:opacity-100 text-neutral-700 transition-opacity duration-150 ml-auto">
                  <ArrowUpRight />
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── MAIN FOOTER ────────────────────────────────────────────────────────────────
export default function Footer({
  githubUrl    = "https://github.com",
  linkedinUrl  = "https://linkedin.com",
  twitterUrl   = "https://x.com",
  copyrightYear = 2026,
}) {
  // override social hrefs if props passed
  const socials = [
    { label: "GitHub",   href: githubUrl,   icon: <GithubIcon />,   external: true },
    { label: "LinkedIn", href: linkedinUrl, icon: <LinkedInIcon />, external: true },
    { label: "X",        href: twitterUrl,  icon: <XIcon />,        external: true },
  ];

  return (
    <footer
      className="w-full bg-[#04050a] border-t border-white/[0.07]"
      style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
    >

      {/* ── Status bar ──────────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.05] bg-[#060810]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* live dot */}
            <span className="flex items-center gap-2">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute w-full h-full bg-green-500 opacity-60 animate-ping"/>
                <span className="relative w-1.5 h-1.5 bg-green-500"/>
              </span>
              <span className="font-mono text-[10px] text-green-700 tracking-widest">SYSTEMS OPERATIONAL</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-neutral-800">
              <span className="text-[10px]">·</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-neutral-700">
              <ActivityIcon />
              <span>THREAT LEVEL: <span className="text-neutral-500">LOW</span></span>
            </span>
          </div>
          <span className="font-mono text-[10px] text-neutral-800 tracking-widest hidden md:block">
            SentinelAI Platform · v1.0
          </span>
        </div>
      </div>

      {/* ── Main footer body ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-16 py-16 lg:py-20 border-b border-white/[0.06]">

          {/* Brand column */}
          <div className="flex flex-col gap-7">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white shrink-0">
                <ShieldIcon />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-mono text-[14px] font-bold text-white tracking-tight">
                  Sentinel<span className="text-blue-400">AI</span>
                </span>
                <span className="font-mono text-[9px] text-neutral-700 tracking-[0.2em] uppercase">Defense Platform</span>
              </div>
            </div>

            {/* Tagline */}
            <div className="flex flex-col gap-3">
              <p className="text-[13px] font-semibold text-neutral-400 leading-snug">
                From Security Events to Attack Stories.
              </p>
              <p className="text-[13px] text-neutral-600 leading-[1.75] max-w-[34ch]">
                An AI-assisted cyber defense and security investigation platform that correlates Linux server telemetry into evidence-grounded attack narratives.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-1">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center text-neutral-700 border border-transparent hover:border-white/[0.1] hover:text-neutral-400 transition-colors duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Status pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "MITRE ATT&CK", color: "border-neutral-800 text-neutral-700" },
                { label: "Isolation Forest ML", color: "border-neutral-800 text-neutral-700" },
                { label: "AI Investigation", color: "border-neutral-800 text-neutral-700" },
              ].map(p => (
                <span key={p.label} className={`font-mono text-[10px] px-2 py-0.5 border ${p.color} tracking-wide`}>
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <LinkColumn title="Platform"  links={PLATFORM_LINKS} />
          <LinkColumn title="Resources" links={RESOURCE_LINKS} />
          <LinkColumn title="Company"   links={COMPANY_LINKS}  />
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden flex-col py-10 border-b border-white/[0.06]">

          {/* Brand */}
          <div className="flex flex-col gap-5 pb-8 border-b border-white/[0.06] mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white shrink-0">
                <ShieldIcon />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-mono text-[14px] font-bold text-white tracking-tight">
                  Sentinel<span className="text-blue-400">AI</span>
                </span>
                <span className="font-mono text-[9px] text-neutral-700 tracking-[0.2em] uppercase">Defense Platform</span>
              </div>
            </div>
            <p className="text-[13px] text-neutral-600 leading-[1.75]">
              An AI-assisted cyber defense and security investigation platform — from security events to attack stories.
            </p>
            {/* social row */}
            <div className="flex items-center gap-1">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center text-neutral-600 border border-white/[0.07] hover:text-neutral-300 transition-colors duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Accordions */}
          <MobileAccordion title="Platform"  links={PLATFORM_LINKS} />
          <MobileAccordion title="Resources" links={RESOURCE_LINKS} />
          <MobileAccordion title="Company"   links={COMPANY_LINKS}  />
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <span className="font-mono text-[11px] text-neutral-700">
            © {copyrightYear} SentinelAI. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {BOTTOM_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] text-neutral-700 hover:text-neutral-500 transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}