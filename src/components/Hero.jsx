import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  Layout,
  Smartphone,
  Zap,
  ShieldCheck,
  Settings,
  HeartHandshake,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { BotanicalIcon, BloomFlower } from './BrandLogo';

// ─── Typing animation config ──────────────────────────────────────────────────
// The heading: "Turn Your Idea \n Into a Website \n That Works."
// We type the plain text, then render the styled markup once done.
const HEADING_LINES = ['Turn Your Idea ', 'Into a Website ', 'That Works.'];
const FULL_TEXT = HEADING_LINES.join('');

// Natural typing speeds (ms per character)
const BASE_SPEED = 42;
const VARIANCE = 24; // ±24ms random jitter
const PAUSE_AT_LINE_END = 110; // extra pause at end of each logical line

function randomDelay(base, variance) {
  return base + (Math.random() * variance * 2 - variance);
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useScrollReveal(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return visible;
}

export default function Hero({ onOpenContact }) {
  const valuePillars = [
    { icon: Layout, title: 'Custom Designs', desc: 'Tailored to your brand & goals.' },
    { icon: Smartphone, title: 'Modern & Responsive', desc: 'Looks great on every device.' },
    { icon: Zap, title: 'Fast Loading', desc: 'Because your time matters.' },
    { icon: ShieldCheck, title: 'Secure & Reliable', desc: 'Your data, and your customers.' },
    { icon: Settings, title: 'Easy to Manage', desc: 'Update, grow, with confidence.' },
    { icon: HeartHandshake, title: 'Ongoing Support', desc: "I'm here, whenever you need." },
  ];

  // ─── Reduced-motion guard ───────────────────────────────────────────────────
  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // ─── Animation phases ───────────────────────────────────────────────────────
  const [eyebrowIn, setEyebrowIn]     = useState(false);
  const [typedChars, setTypedChars]   = useState(0);         // 0 … FULL_TEXT.length
  const [typingDone, setTypingDone]   = useState(false);
  const [cursorFade, setCursorFade]   = useState(false);
  const [descIn, setDescIn]           = useState(false);
  const [ctasIn, setCtasIn]           = useState(false);
  const [visualIn, setVisualIn]       = useState(false);
  const [floatStart, setFloatStart]   = useState(false);
  const [badgesIn, setBadgesIn]       = useState(false);
  const [noteIn, setNoteIn]           = useState(false);
  const [reassuranceIn, setReassuranceIn] = useState(false);

  // Scroll-reveal for the features bar
  const featuresRef = useRef(null);
  const featuresVisible = useScrollReveal(featuresRef, 0.1);

  const heroRef = useRef(null);

  useEffect(() => {
    if (prefersReduced.current) {
      // Skip animations – show everything immediately
      setEyebrowIn(true); setTypedChars(FULL_TEXT.length); setTypingDone(true);
      setDescIn(true); setCtasIn(true); setVisualIn(true);
      setFloatStart(true); setBadgesIn(true); setNoteIn(true); setReassuranceIn(true);
      return;
    }

    // 0.20s → eyebrow fades in
    const t1 = setTimeout(() => setEyebrowIn(true), 200);

    // 0.40s → typing begins
    let charIndex = 0;
    let typingTimer;
    const scheduleNextChar = () => {
      const ch = FULL_TEXT[charIndex];
      // Extra pause at end of each line's last char
      const isLineEnd =
        charIndex === HEADING_LINES[0].length - 1 ||
        charIndex === (HEADING_LINES[0] + HEADING_LINES[1]).length - 1;
      const delay = isLineEnd
        ? randomDelay(BASE_SPEED, VARIANCE) + PAUSE_AT_LINE_END
        : randomDelay(BASE_SPEED, VARIANCE);
      typingTimer = setTimeout(() => {
        charIndex++;
        setTypedChars(charIndex);
        if (charIndex < FULL_TEXT.length) {
          scheduleNextChar();
        } else {
          // Typing done
          setTypingDone(true);
          // Cursor blinks for 800ms then fades
          setTimeout(() => setCursorFade(true), 800);
          // Description slides in ~300ms after typing done
          setTimeout(() => setDescIn(true), 300);
          // CTAs ~550ms after typing done
          setTimeout(() => setCtasIn(true), 550);
          // Reassurance tag ~750ms
          setTimeout(() => setReassuranceIn(true), 750);
          // Visual column pop-in ~700ms
          setTimeout(() => setVisualIn(true), 700);
          // Floating cards ~1000ms
          setTimeout(() => setBadgesIn(true), 1000);
          // Floating start ~1400ms
          setTimeout(() => setFloatStart(true), 1400);
          // Handwritten note ~900ms
          setTimeout(() => setNoteIn(true), 900);
        }
      }, delay);
    };

    const t2 = setTimeout(() => scheduleNextChar(), 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(typingTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Build the displayed heading ────────────────────────────────────────────
  // While typing: plain characters + blinking cursor
  // After done: full styled markup (with italic span + SVG underline)
  const renderHeading = () => {
    if (typingDone) {
      return (
        <>
          Turn Your Idea <br />
          Into a Website <br />
          <span className="hero-title-italic">
            That Works.
            <svg
              className="hero-underline-svg"
              viewBox="0 0 280 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 14C80 4 190 4 277 11"
                stroke="#3D6DA6"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </>
      );
    }

    // Build partial text with line breaks
    const partial = FULL_TEXT.slice(0, typedChars);
    const line0End = HEADING_LINES[0].length;
    const line1End = line0End + HEADING_LINES[1].length;

    const line0 = partial.slice(0, line0End);
    const line1 = partial.length > line0End ? partial.slice(line0End, line1End) : null;
    const line2 = partial.length > line1End ? partial.slice(line1End) : null;

    return (
      <>
        {line0}
        {line1 !== null && <><br />{line1}</>}
        {line2 !== null && <><br />{line2}</>}
        <span className={`typing-cursor ${cursorFade ? 'cursor-fade-out' : ''}`} aria-hidden="true">|</span>
      </>
    );
  };

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      {/* Decorative Botanical Ambient Tints */}
      <div className="hero-decor-blob blob-top-left" aria-hidden="true" />
      <div className="hero-decor-blob blob-bottom-right" aria-hidden="true" />

      <div className="container hero-container">
        {/* Top Floating Handwritten Annotation */}
        <div
          className={`hero-handwritten-note-top hero-note-anim ${noteIn ? 'hero-el-in' : ''}`}
          aria-hidden="true"
        >
          <div className="note-text">
            <span>Your Idea,</span>
            <span>Your Website. ˊ</span>
          </div>
          <div className="note-bullets">
            <div className="note-bullet">
              <Globe size={13} />
              <span>Modern Websites</span>
            </div>
            <div className="note-bullet">
              <Sparkles size={13} />
              <span>Brand Identity</span>
            </div>
            <div className="note-bullet">
              <TrendingUp size={13} />
              <span>Online Growth</span>
            </div>
            <div className="note-bullet">
              <HeartHandshake size={13} />
              <span>Ongoing Support</span>
            </div>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="hero-content-grid">
          {/* Left Column: Typography & CTAs */}
          <div className="hero-text-col">
            {/* Tagline / Eyebrow */}
            <div className={`hero-eyebrow hero-eyebrow-anim ${eyebrowIn ? 'hero-el-in' : ''}`}>
              <BotanicalIcon size={20} color="#3D6DA6" />
              <span>WEBSITES • DESIGN • GROWTH</span>
            </div>

            {/* Main Heading Area with Rotating Decorative Flower */}
            <div className="hero-heading-wrapper">
              <h1 className="hero-title hero-title-anim" aria-label="Turn Your Idea Into a Website That Works.">
                {renderHeading()}
              </h1>

              {/* Decorative Petal-by-Petal Blooming WebBloom Flower beside the heading */}
              <div className="hero-heading-flower" aria-hidden="true">
                <div className="hero-heading-flower-glow" />
                <div className="hero-heading-flower-bloom">
                  <BloomFlower size="100%" color="#3D6DA6" className="hero-heading-flower-svg" />
                </div>
              </div>
            </div>

            {/* Supporting Copy */}
            <p className={`hero-description hero-desc-anim ${descIn ? 'hero-el-in' : ''}`}>
              I design and build clean, modern and easy-to-manage websites for
              small businesses, creatives and growing brands.
            </p>

            {/* Actions */}
            <div className={`hero-actions hero-ctas-anim ${ctasIn ? 'hero-el-in' : ''}`}>
              <button
                onClick={onOpenContact}
                className="btn-primary hero-btn-main hero-btn-hover"
                id="hero-start-project-btn"
              >
                <span>Let's Build Yours</span>
                <ArrowRight size={18} />
              </button>

              <a href="#our-work" className="btn-secondary hero-btn-sub hero-btn-hover">
                <span>View Our Work</span>
              </a>
            </div>

            {/* Small reassurance tag */}
            <div className={`hero-reassurance hero-reassurance-anim ${reassuranceIn ? 'hero-el-in' : ''}`}>
              <span className="reassurance-dot" />
              <span>Accepting new client projects for this season</span>
            </div>
          </div>

          {/* Right Column: High Fidelity Realistic Devices Mockup */}
          <div className="hero-visual-col">
            <div
              className={`mockup-stage hero-visual-anim ${visualIn ? 'hero-el-in' : ''} ${floatStart ? 'hero-floating' : ''}`}
            >
              {/* Laptop Mockup */}
              <div className="laptop-mockup-frame">
                {/* Laptop Screen */}
                <div className="laptop-screen">
                  {/* Mock Browser Header */}
                  <div className="mock-browser-bar">
                    <div className="mock-dots">
                      <span className="mock-dot red" />
                      <span className="mock-dot yellow" />
                      <span className="mock-dot green" />
                    </div>
                    <div className="mock-address-bar">
                      <span className="mock-lock">🔒</span> yourbrand.studio
                    </div>
                  </div>

                  {/* Screen Content Preview */}
                  <div className="laptop-screen-content">
                    <div className="mock-site-nav">
                      <span className="mock-logo">YourBrand</span>
                      <div className="mock-nav-links">
                        <span>Home</span>
                        <span>About</span>
                        <span>Services</span>
                        <span>Contact</span>
                      </div>
                      <span className="mock-nav-cta">Get Started</span>
                    </div>

                    <div className="mock-hero-area">
                      <div className="mock-hero-text">
                        <h3>
                          Big Ideas <br />
                          Deserve Beautiful <br />
                          Websites.
                        </h3>
                        <p>Modern. Functional. Built for You.</p>
                        <span className="mock-site-button">
                          Get Started →
                        </span>
                      </div>
                      {/* Scenic Nature Visual */}
                      <div className="mock-scenic-image" />
                    </div>
                  </div>
                </div>

                {/* Laptop Base & Keyboard Chasis */}
                <div className="laptop-base">
                  <div className="laptop-notch" />
                </div>
                <div className="laptop-bottom-lip" />
              </div>

              {/* Smartphone Mockup Layered on the right */}
              <div
                className={`phone-mockup-frame hero-badge-anim hero-badge-1 ${badgesIn ? 'hero-el-in' : ''}`}
              >
                <div className="phone-screen">
                  <div className="phone-speaker" />
                  <div className="phone-mock-nav">
                    <span className="phone-logo">YourBrand</span>
                    <span className="phone-menu-icon">☰</span>
                  </div>
                  <div className="phone-content-body">
                    <h4>
                      Big Ideas <br />
                      Deserve Beautiful <br />
                      Websites.
                    </h4>
                    <p>Modern. Functional. Built for You.</p>
                    <span className="phone-cta-btn">Get Started →</span>
                    <div className="phone-scenic-thumbnail" />
                  </div>
                </div>
              </div>

              {/* Botanical Accent Plant Branch */}
              <div
                className={`mockup-botanical-branch hero-badge-anim hero-badge-2 ${badgesIn ? 'hero-el-in' : ''}`}
                aria-hidden="true"
              >
                <svg viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M140 210 C120 160, 90 90, 30 10"
                    stroke="#2D4D73"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Leaf 1 */}
                  <path
                    d="M100 130 C75 110, 60 125, 68 145 C78 152, 95 145, 100 130 Z"
                    fill="#3B679B"
                    opacity="0.85"
                  />
                  {/* Leaf 2 */}
                  <path
                    d="M80 85 C105 70, 115 85, 110 105 C100 112, 85 102, 80 85 Z"
                    fill="#527FA4"
                    opacity="0.8"
                  />
                  {/* Leaf 3 */}
                  <path
                    d="M55 50 C35 30, 20 45, 30 65 C40 70, 52 62, 55 50 Z"
                    fill="#3B679B"
                    opacity="0.85"
                  />
                  {/* Leaf 4 */}
                  <path
                    d="M30 10 C32 -10, 48 -5, 48 15 C42 22, 33 20, 30 10 Z"
                    fill="#2D4D73"
                    opacity="0.9"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 6-Pillar Features Bar */}
        <div ref={featuresRef} className="hero-features-bar">
          <div className="features-grid">
            {valuePillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`feature-item feature-item-reveal ${featuresVisible ? 'feature-item-visible' : ''}`}
                  style={{ '--feature-delay': `${idx * 0.1}s` }}
                >
                  <div className="feature-icon-bubble">
                    <IconComp size={22} className="feature-icon" />
                  </div>
                  <h4 className="feature-title">{item.title}</h4>
                  <p className="feature-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom Left Script Flourish */}
          <div className="bottom-script-flourish" aria-hidden="true">
            <span>Let's build something amazing. ¨ ˊ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
