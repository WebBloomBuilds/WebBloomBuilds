import React from 'react';
import BrandLogo from './BrandLogo';
import { ArrowUp, Mail, Heart } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        {/* Top Row: Brand & Links */}
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <BrandLogo showTagline={true} />
            <p className="footer-brand-desc">
              Building clean, modern and easy-to-manage websites that help small
              businesses, creatives and growing brands bloom online.
            </p>
            <div className="footer-social-row">
              <a
                href="https://www.instagram.com/webbloombuilds/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
                aria-label="Follow WebBloomBuilds on Instagram"
              >
                <InstagramIcon size={17} />
                <span>@webbloombuilds</span>
              </a>
              <a
                href="mailto:webbloombuilds@gmail.com"
                className="footer-social-pill"
                aria-label="Email WebBloomBuilds"
              >
                <Mail size={16} />
                <span>webbloombuilds@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Col */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#our-work" className="footer-link">
                  Our Work
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  Services
                </a>
              </li>
              <li>
                <a href="#reviews" className="footer-link">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>
              <li>
                <a href="#faq" className="footer-link">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Services Col */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Services &amp; Packages</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#services" className="footer-link">
                  Basic Website (₹2,999)
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  Standard Website (₹4,999)
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  Premium Website (From ₹9,999)
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  E-commerce Website (₹14,999)
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  Event Website
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  Website Redesign
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  Custom Project
                </a>
              </li>
            </ul>
          </div>

          {/* Back to top & inquiry note */}
          <div className="footer-action-col">
            <h4 className="footer-col-title">Ready to Start?</h4>
            <p className="footer-action-text">
              Have questions about your project scope or timeline?
            </p>
            <a href="#contact" className="btn-primary footer-cta-btn">
              <span>Start a Project</span>
            </a>
            <button
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © 2026 WebBloomBuilds. All rights reserved.
          </p>
          <div className="footer-tagline-right">
            <span>Designed with intention for growing businesses</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
