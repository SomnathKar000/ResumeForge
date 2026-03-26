const navLinks = [
  { label: "Dashboard", href: "#" },
  { label: "Templates", href: "#" },
  { label: "My Resumes", href: "#" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-surface-low/80 backdrop-blur-xl rounded-2xl px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <span className="font-headline text-lg font-bold text-white tracking-tight">
            Resume<span className="text-primary">Forge</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${i === 0
                  ? "bg-surface-highest text-white"
                  : "text-on-surface-variant hover:text-white hover:bg-surface-high"
                }
              `}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button className="relative p-2 rounded-xl text-on-surface-variant hover:text-white hover:bg-surface-high transition-all duration-300 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-tertiary to-tertiary-container flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:scale-105 transition-transform duration-300">
            S
          </div>
        </div>
      </div>
    </nav>
  );
}
