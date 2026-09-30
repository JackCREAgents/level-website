// Sonoran Monolith site chrome: consistent brand, navigation, and footer across public pages.
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

type NavigationItem = {
  label: string;
  href: string;
};

const primaryNavItems: NavigationItem[] = [
  { label: "Firm", href: "/#firm" },
  { label: "Philosophy", href: "/#philosophy" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Advisory Services", href: "/#advisory-services" },
  { label: "Contact", href: "/#contact" },
];

const teamNavItem: NavigationItem = {
  label: "Team",
  href: "/team",
};

const mobileNavItems = [...primaryNavItems, teamNavItem];

// LevelMark: the typographic "LCA" monogram. Styled by .brand-mark in index.css.
export function LevelMark({ className = "" }: { className?: string }) {
  return <span className={className} aria-hidden="true">LCA</span>;
}

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="/#top" className="brand" aria-label="Level Capital Advisors home">
      <LevelMark className="brand-mark" />
      <span className={inverse ? "brand-type brand-type-inverse" : "brand-type"}>
        <strong>Level</strong>
        <small>Capital Advisors</small>
      </span>
    </a>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const onTeamPage = typeof window !== "undefined" && window.location.pathname === "/team";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <div className="header-inner">
          <Brand inverse={!scrolled} />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {primaryNavItems.map(({ label, href }) => (
              <a key={label} href={href} aria-current={href === "/team" && onTeamPage ? "page" : undefined}>{label}</a>
            ))}
          </nav>
          <a className="header-cta" href={teamNavItem.href} aria-current={onTeamPage ? "page" : undefined}>
            {teamNavItem.label} <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            aria-controls="primary-navigation-menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div id="primary-navigation-menu" className={`mobile-menu ${mobileOpen ? "mobile-menu-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu-top">
          <Brand inverse />
          <button onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={26} /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {mobileNavItems.map(({ label, href }, index) => (
            <a key={label} href={href} onClick={() => setMobileOpen(false)} aria-current={href === "/team" && onTeamPage ? "page" : undefined}>
              <span>0{index + 1}</span>{label}<ArrowUpRight size={20} />
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Brand inverse />
        <p>Commercial real estate investment banking.<br />Clear structures. Accountable execution. Decisive outcomes.</p>
        <a href="#top" className="back-top">Back to top <ArrowUpRight size={16} /></a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Level Capital Advisors · levelcapitaladvisors.com</span>
        <span>Information is for discussion purposes only and does not constitute a financing commitment.</span>
      </div>
    </footer>
  );
}
