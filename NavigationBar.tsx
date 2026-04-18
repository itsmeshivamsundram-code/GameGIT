import { useState, useEffect } from 'react';

interface NavigationBarProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  userName: string;
}

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'REVIEWS', href: '#reviews' },
  { label: 'PLATFORMS', href: '#platforms' },
  { label: 'TOP RATED', href: '#top-rated' },
  { label: 'COMMUNITY', href: '#community' },
];

export default function NavigationBar({ onLoginClick, isLoggedIn, userName }: NavigationBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'reviews', 'platforms', 'top-rated', 'community'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] flex items-center transition-all duration-300 ${
          scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : ''
        }`}
        style={{
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="container-custom w-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-bone font-extrabold text-xl tracking-[-0.02em] select-none"
          >
            GAMECRIT <span className="text-ember font-bold">HQ</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium tracking-[0.05em] uppercase transition-colors duration-200 pb-1 border-b-2 ${
                  activeSection === link.href.slice(1)
                    ? 'text-ember border-ember'
                    : 'text-ash border-transparent hover:text-bone'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Login Button / User Display */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <span className="text-bone text-sm font-medium tracking-[0.05em] uppercase">
                HI, {userName.toUpperCase()}
              </span>
            ) : (
              <button
                onClick={onLoginClick}
                className="hidden md:block text-bone text-sm font-medium tracking-[0.06em] uppercase px-6 py-2.5 rounded-full border transition-all duration-300 hover:bg-white/[0.08]"
                style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)')
                }
              >
                LOG IN
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-bone p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          top: '72px',
        }}
      >
        <div className="flex flex-col items-center gap-6 pt-12">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-lg font-medium tracking-[0.05em] uppercase transition-colors duration-200 ${
                activeSection === link.href.slice(1) ? 'text-ember' : 'text-ash'
              }`}
            >
              {link.label}
            </a>
          ))}
          {!isLoggedIn && (
            <button
              onClick={() => {
                onLoginClick();
                setMobileMenuOpen(false);
              }}
              className="text-bone text-sm font-medium tracking-[0.06em] uppercase px-8 py-3 rounded-full border mt-4"
              style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              LOG IN
            </button>
          )}
        </div>
      </div>
    </>
  );
}
