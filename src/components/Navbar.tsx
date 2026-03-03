"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage, T } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggle } = useLanguage();
  const t = T[lang].nav;

  const [desktopInd, setDesktopInd] = useState({ x: 0, visible: false });
  const [mobileInd, setMobileInd] = useState({ y: 0, visible: false });
  const desktopUlRef = useRef<HTMLUListElement>(null);
  const desktopLiRefs = useRef<(HTMLLIElement | null)[]>([]);
  const mobileUlRef = useRef<HTMLUListElement>(null);
  const mobileLiRefs = useRef<(HTMLLIElement | null)[]>([]);

  const navLinks = [
    { label: t.about,    href: "#about"    },
    { label: t.skills,   href: "#skills"   },
    { label: t.projects, href: "#projects" },
    { label: t.contact,  href: "#contact"  },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDesktopEnter = (i: number) => {
    const li = desktopLiRefs.current[i];
    const ul = desktopUlRef.current;
    if (!li || !ul) return;
    setDesktopInd({ x: li.getBoundingClientRect().left - ul.getBoundingClientRect().left, visible: true });
  };

  const handleMobileEnter = (i: number) => {
    const li = mobileLiRefs.current[i];
    const ul = mobileUlRef.current;
    if (!li || !ul) return;
    setMobileInd({ y: li.getBoundingClientRect().top - ul.getBoundingClientRect().top, visible: true });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300 ${
        scrolled ? "border-b bg-[#080808]/90 backdrop-blur-md" : "bg-transparent"
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
      <ul
        ref={desktopUlRef}
        className="hidden md:flex items-center gap-10 relative"
        onMouseLeave={() => setDesktopInd((s) => ({ ...s, visible: false }))}
      >
        <div
          className="absolute top-0 h-full w-0.5 pointer-events-none"
          style={{
            background: "var(--cyan)",
            left: 0,
            transform: `translateX(${desktopInd.x}px)`,
            opacity: desktopInd.visible ? 1 : 0,
            transition: "transform 0.25s ease, opacity 0.15s ease",
          }}
        />
        {navLinks.map((link, i) => (
          <li
            key={link.href}
            ref={(el) => { desktopLiRefs.current[i] = el; }}
            onMouseEnter={() => handleDesktopEnter(i)}
          >
            <a
              href={link.href}
              className="text-[0.7rem] uppercase tracking-[0.15em] transition-colors duration-200"
              style={{ color: "var(--muted2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted2)")}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right side: status + lang toggle */}
      <div className="hidden md:flex items-center gap-5">
        <div
          className="flex items-center gap-2 text-[0.65rem] tracking-[0.1em]"
          style={{ color: "var(--green)" }}
        >
          <span
            className="status-dot w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}
          />
          {t.status}
        </div>

        <button
          onClick={toggle}
          className="text-[0.65rem] font-bold uppercase tracking-[0.15em] px-2.5 py-1 transition-all duration-200 border"
          style={{ color: "var(--cyan)", borderColor: "var(--border)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan)";
            (e.currentTarget as HTMLElement).style.background = "rgba(103,232,249,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          {lang === "tr" ? "EN" : "TR"}
        </button>
      </div>

      {/* Mobile: lang toggle + menu button */}
      <div className="md:hidden flex items-center gap-3">
        <button
          onClick={toggle}
          className="text-[0.6rem] font-bold uppercase tracking-[0.15em] border flex items-center justify-center"
          style={{ color: "var(--cyan)", borderColor: "var(--border)", minWidth: "44px", minHeight: "44px" }}
        >
          {lang === "tr" ? "EN" : "TR"}
        </button>
        <button
          className="text-xs tracking-widest transition-colors"
          style={{ color: "var(--muted2)" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (lang === "tr" ? "kapat" : "close") : (lang === "tr" ? "menü" : "menu")}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 border-t border-b"
          style={{ background: "rgba(8,8,8,0.97)", borderColor: "var(--border)" }}
        >
          <ul
            ref={mobileUlRef}
            className="flex flex-col px-6 py-6 gap-5 relative"
            onMouseLeave={() => setMobileInd((s) => ({ ...s, visible: false }))}
          >
            <div
              className="absolute left-6 w-0.5 h-5 pointer-events-none"
              style={{
                background: "var(--cyan)",
                top: 0,
                transform: `translateY(${mobileInd.y}px)`,
                opacity: mobileInd.visible ? 1 : 0,
                transition: "transform 0.25s ease, opacity 0.15s ease",
              }}
            />
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                ref={(el) => { mobileLiRefs.current[i] = el; }}
                onMouseEnter={() => handleMobileEnter(i)}
              >
                <a
                  href={link.href}
                  className="text-xs uppercase tracking-[0.15em] transition-colors pl-4"
                  style={{ color: "var(--muted2)" }}
                  onClick={() => setMenuOpen(false)}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted2)")}
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
