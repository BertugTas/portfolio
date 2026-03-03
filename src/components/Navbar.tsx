"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "hakkımda", href: "#about" },
  { label: "beceriler", href: "#skills" },
  { label: "projeler",  href: "#projects" },
  { label: "iletişim",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300 ${
        scrolled
          ? "border-b bg-[#080808]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={{ borderColor: "var(--border)" }}
    >
      {/* Logo */}
      <a
        href="#"
        aria-label="Ana sayfa"
        className="font-mono text-sm font-bold tracking-[0.1em]"
        style={{ color: "var(--cyan)" }}
      >
        BT<span style={{ color: "var(--muted2)" }}>.</span>dev
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="relative text-[0.7rem] uppercase tracking-[0.15em] transition-colors duration-200 group"
              style={{ color: "var(--muted2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted2)")}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                style={{ background: "var(--cyan)" }}
              />
            </a>
          </li>
        ))}
      </ul>

      {/* Status indicator (desktop) */}
      <div
        className="hidden md:flex items-center gap-2 text-[0.65rem] tracking-[0.1em]"
        style={{ color: "var(--green)" }}
      >
        <span
          className="status-dot w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}
        />
        İzmir, TR — aktif
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden text-xs tracking-widest transition-colors"
        style={{ color: "var(--muted2)" }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "kapat" : "menü"}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 border-t border-b"
          style={{
            background: "rgba(8,8,8,0.97)",
            borderColor: "var(--border)",
          }}
        >
          <ul className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs uppercase tracking-[0.15em] transition-colors"
                  style={{ color: "var(--muted2)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
