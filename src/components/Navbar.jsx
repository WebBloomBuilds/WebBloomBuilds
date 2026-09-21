import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Trigger navbar entrance animation on mount
    const t = setTimeout(() => setEntered(true), 30);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Work', href: '#our-work' },
    { name: 'Services', href: '#services' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''} ${entered ? 'navbar-entered' : 'navbar-pre-enter'}`}>
      <div className="container navbar-container">
        {/* Left Side: Mobile Hamburger (on the LEFT on mobile) + Brand Logo beside it */}
        <div className={`navbar-left-group navbar-anim-logo ${entered ? 'nav-el-entered' : ''}`}>
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-icon-char">
              {mobileMenuOpen ? '✕' : '☰'}
            </span>
          </button>

          <BrandLogo showTagline={false} />
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link, idx) => (
              <li
                key={link.name}
                className={`nav-item navbar-anim-link ${entered ? 'nav-el-entered' : ''}`}
                style={{ '--nav-link-delay': `${0.08 + idx * 0.06}s` }}
              >
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button */}
        <div className={`navbar-actions navbar-anim-cta ${entered ? 'nav-el-entered' : ''}`}>
          <button
            onClick={onOpenContact}
            className="btn-primary nav-cta-btn"
            aria-label="Start a Project"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <div className="container mobile-drawer-inner">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mobile-drawer-cta">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenContact) onOpenContact();
                }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <span>Start a Project</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
