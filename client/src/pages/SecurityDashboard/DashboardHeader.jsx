import { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  Search,
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  UserCircle,
  X,
} from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — Dashboard Header
// Component 1 of the Security Dashboard.
// Shared across every dashboard page — pass `pageTitle` to relabel it
// ("Security Overview", "Alerts", "Incidents", ...) without rebuilding it.
// Sits below your existing app shell; this is the in-app header, not the
// public site Navbar.
// ---------------------------------------------------------------------------

const DEFAULT_NOTIFICATIONS = [
  {
    id: 1,
    tone: "danger",
    text: "Critical alert: SSH brute-force on web-03",
    time: "2m ago",
  },
  {
    id: 2,
    tone: "warn",
    text: "Anomaly score 0.92 flagged on db-01",
    time: "18m ago",
  },
  {
    id: 3,
    tone: "info",
    text: "Agent agent-031 enrolled successfully",
    time: "1h ago",
  },
];

const toneDot = {
  danger: "bg-red-500",
  warn: "bg-amber-400",
  info: "bg-blue-400",
  ok: "bg-emerald-500",
};

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [ref, onOutside]);
}

export default function DashboardHeader({
  pageTitle = "Security Overview",
  user = { name: "Rakibul Islam", role: "Admin" },
  notifications = DEFAULT_NOTIFICATIONS,
  onSearch,
  onProfile,
  onSettings,
  onLogout,
  onViewAllNotifications,
}) {
  const [query, setQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));

  const unreadCount = notifications.length;
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
      <style>{`
        @keyframes headerFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sentinel-dropdown {
          animation: headerFadeIn 0.15s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .sentinel-dropdown { animation: none; }
        }
      `}</style>

      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center border border-cyan-500/40 bg-cyan-500/10">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-slate-900 motion-reduce:animate-none animate-pulse" />
          </div>
          <span className="hidden text-sm font-semibold tracking-tight text-slate-100 sm:inline">
            SentinelAI
          </span>
        </div>

        {/* Divider + page title */}
        <div className="hidden h-6 w-px bg-slate-800 md:block" />
        <h1 className="hidden truncate text-sm font-medium text-slate-300 md:block">
          {pageTitle}
        </h1>

        {/* Search — desktop */}
        <form
          onSubmit={submitSearch}
          className="ml-auto hidden max-w-md flex-1 items-center sm:flex"
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hosts, alerts, incidents..."
              className="w-full border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40"
            />
          </div>
        </form>

        {/* Search — mobile trigger */}
        <button
          type="button"
          onClick={() => setMobileSearchOpen(true)}
          className="ml-auto flex h-9 w-9 items-center justify-center border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 sm:hidden"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifOpen((o) => !o);
              setProfileOpen(false);
            }}
            className="relative flex h-9 w-9 items-center justify-center border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center bg-red-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="sentinel-dropdown absolute right-0 mt-2 w-80 border border-slate-800 bg-slate-900 shadow-xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                <span className="text-sm font-medium text-slate-200">
                  Notifications
                </span>
                <button
                  onClick={() => setNotifOpen(false)}
                  className="text-slate-500 hover:text-slate-300"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {notifications.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-slate-500">
                  No new notifications.
                </p>
              ) : (
                <ul className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className="flex gap-3 border-b border-slate-800/60 px-4 py-3 last:border-b-0 hover:bg-slate-800/40"
                    >
                      <span
                        className={`mt-1 h-1.5 w-1.5 shrink-0 ${toneDot[n.tone]}`}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm text-slate-300">
                          {n.text}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-600">
                          {n.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={() => {
                  onViewAllNotifications?.();
                  setNotifOpen(false);
                }}
                className="block w-full border-t border-slate-800 py-2.5 text-center text-xs font-medium text-cyan-400 hover:bg-slate-800/40 hover:text-cyan-300"
              >
                View all
              </button>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setProfileOpen((o) => !o);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 border border-slate-800 bg-slate-900 py-1 pl-1 pr-2 transition-colors hover:border-slate-700"
          >
            <span className="flex h-7 w-7 items-center justify-center bg-slate-800 text-xs font-semibold text-slate-200">
              {initials}
            </span>
            <span className="hidden text-left leading-tight md:block">
              <span className="block text-xs font-medium text-slate-200">
                {user.name}
              </span>
              <span className="block text-[11px] text-slate-500">
                {user.role}
              </span>
            </span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-slate-500 md:block" />
          </button>

          {profileOpen && (
            <div className="sentinel-dropdown absolute right-0 mt-2 w-52 border border-slate-800 bg-slate-900 shadow-xl shadow-black/40">
              <div className="border-b border-slate-800 px-4 py-3">
                <p className="truncate text-sm font-medium text-slate-200">
                  {user.name}
                </p>
                <p className="truncate text-xs text-slate-500">{user.role}</p>
              </div>
              <button
                onClick={() => {
                  onProfile?.();
                  setProfileOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/40"
              >
                <UserCircle className="h-4 w-4 text-slate-500" />
                Profile
              </button>
              <button
                onClick={() => {
                  onSettings?.();
                  setProfileOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/40"
              >
                <Settings className="h-4 w-4 text-slate-500" />
                Settings
              </button>
              <button
                onClick={() => {
                  onLogout?.();
                  setProfileOpen(false);
                }}
                className="flex w-full items-center gap-2.5 border-t border-slate-800 px-4 py-2.5 text-sm text-red-400 hover:bg-slate-800/40"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <div className="border-t border-slate-800 bg-slate-900 px-4 py-3 sm:hidden">
          <form onSubmit={submitSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search hosts, alerts, incidents..."
                className="w-full border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-slate-800 text-slate-400"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
