import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Sparkles, X, ShieldCheck, Eye, ExternalLink, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/projectsData';
import { resolveAsset } from '../utils/resolveAsset';

import { useScrollRevealItem } from '../utils/useScrollReveal';

// Helper to determine tier tag styling
const getTierType = (tier = '') => {
  const lower = tier.toLowerCase();
  if (lower.includes('basic')) return 'basic';
  if (lower.includes('standard')) return 'standard';
  if (lower.includes('premium') || lower.includes('e-commerce') || lower.includes('custom')) return 'premium';
  return 'standard';
};

/**
 * Individual Project Card with independent viewport observation
 * for smooth scroll-triggered reveal.
 */
function ProjectCard({
  project,
  index,
  isSectionVisible,
  onSelectProject,
}) {
  const [cardRef, isInViewport] = useScrollRevealItem({
    threshold: 0.05,
    rootMargin: '60px 0px 60px 0px',
    once: false,
  });

  const staggerDelay = `${(index % 3) * 120}ms`;
  const tierType = project.tierType || getTierType(project.tier);
  const liveUrl = project.liveUrl || project.websiteUrl || '#';
  const primaryScreenshot = resolveAsset(
    project.screenshots?.[0] || project.image
  );
  const hasModalDetails =
    Boolean(project.screenshots?.length > 0) ||
    Boolean(project.features?.length > 0) ||
    Boolean(project.hasDetails);

  // Each card receives a distinct orbit trajectory & timing class
  const orbitClass = `mobile-orbit-card-${index % 3}`;
  // Automatically pause when scrolled out of viewport, resume when in viewport
  const viewportClass = isInViewport ? 'card-in-viewport' : 'card-out-of-viewport';

  return (
    <article
      ref={cardRef}
      className={`compact-project-card ${orbitClass} ${viewportClass} ${
        isSectionVisible ? 'compact-card-reveal' : 'compact-card-hidden'
      }`}
      style={{
        transitionDelay: isSectionVisible ? staggerDelay : '0ms',
      }}
    >
      {/* Browser Mock Frame Header */}
      <div className="compact-frame">
        <div className="compact-browser-bar">
          <div className="browser-dots">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
          <span className={`compact-tier-badge tier-pill-${tierType}`}>
            {project.tier}
          </span>
        </div>

        {/* Website Preview Screenshot */}
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="compact-image-wrapper"
          aria-label={`View live website for ${project.name}`}
        >
          {primaryScreenshot ? (
            <img
              src={primaryScreenshot}
              alt={`${project.name} preview`}
              className="compact-project-image"
              loading="lazy"
            />
          ) : (
            <div
              className="compact-project-placeholder"
              style={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--text-muted, #8b949e)',
              }}
            >
              <span>Screenshot Preview</span>
            </div>
          )}
          <div className="compact-image-overlay">
            <span className="compact-overlay-pill">
              <span>View Live Website</span>
              <ArrowUpRight size={14} />
            </span>
          </div>
        </a>
      </div>

      {/* Compact Card Content */}
      <div className="compact-card-body">
        <div className="compact-title-row">
          <h3 className="compact-project-title">{project.name}</h3>
          <span className={`compact-tier-tag tier-tag-${tierType}`}>
            {project.tier}
          </span>
        </div>

        <p className="compact-description">{project.description}</p>

        {/* Action Buttons */}
        <div className="compact-card-actions">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="compact-btn-primary"
            aria-label={`View live website for ${project.name} (opens in new tab)`}
          >
            <span>View Live Website</span>
            <ArrowUpRight size={14} className="compact-arrow" />
          </a>

          {hasModalDetails && (
            <button
              type="button"
              onClick={() => onSelectProject(project)}
              className="compact-btn-secondary"
              aria-label={`View details for ${project.name}`}
            >
              <Eye size={14} />
              <span>View Details</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Websites() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [detailsProject, setDetailsProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (detailsProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setDetailsProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [detailsProject]);

  // Filter only visible projects
  const visibleProjects = projects.filter((item) => item.visible !== false);

  return (
    <section id="our-work" className="section-padding websites-section" ref={sectionRef}>
      <div id="websites" style={{ position: 'relative', top: '-80px' }} aria-hidden="true" />
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>OUR WORK</span>
          </div>
          <h2 className="section-title">Real Projects. Real Websites. Real Results.</h2>
          <p className="section-subtitle">
            A concise look at recent client websites crafted by WebBloomBuilds.
          </p>
        </div>

        {/* Projects Grid */}
        {visibleProjects.length === 0 ? (
          <div
            className="portfolio-empty-state"
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-muted, #8b949e)',
            }}
          >
            <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No portfolio projects yet.</p>
            <p style={{ fontSize: '0.9rem' }}>
              Add your projects in <code>src/data/projectsData.js</code>
            </p>
          </div>
        ) : (
          <div className="projects-grid portfolio-compact-grid">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isSectionVisible={isVisible}
                onSelectProject={(proj) => setDetailsProject(proj)}
              />
            ))}
          </div>
        )}

        {/* Portfolio Bottom Note */}
        <div className="portfolio-note">
          <p>
            Have a project in mind?{' '}
            <a href="#contact" className="inline-text-link">
              Let's build a website tailored to your goals →
            </a>
          </p>
        </div>
      </div>

      {/* ============================================================
          Project View Details Modal Overlay
          ============================================================ */}
      {detailsProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setDetailsProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div
            className="project-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="modal-header">
              <div className="modal-header-info">
                <div className="modal-tier-badge">
                  {detailsProject.tier}
                </div>
                <h3 id="modal-project-title" className="modal-title">
                  {detailsProject.name}
                </h3>
                <p className="modal-subtitle">
                  {detailsProject.description}
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setDetailsProject(null)}
                aria-label="Close project details"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="modal-body">
              {/* 1. Website Preview Section */}
              <div className="modal-showcase-block">
                <div className="modal-block-header">
                  <h4 className="modal-section-heading">Website Preview</h4>
                  <a
                    href={detailsProject.liveUrl || detailsProject.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-live-link"
                  >
                    <span>Open Live Website</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
                <div className="modal-preview-frame">
                  <div className="modal-frame-topbar">
                    <div className="browser-dots">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </div>
                    <span className="modal-url-label">
                      {(detailsProject.liveUrl || detailsProject.websiteUrl || '').replace(/^https?:\/\//, '')}
                    </span>
                  </div>
                  {resolveAsset(detailsProject.screenshots?.[0] || detailsProject.image) && (
                    <img
                      src={resolveAsset(detailsProject.screenshots?.[0] || detailsProject.image)}
                      alt={`${detailsProject.name} website preview`}
                      className="modal-preview-img"
                    />
                  )}
                </div>
              </div>

              {/* 2. Additional Screenshots (if any) */}
              {detailsProject.screenshots && detailsProject.screenshots.length > 1 && (
                <div className="modal-showcase-block">
                  <div className="modal-block-header">
                    <h4 className="modal-section-heading">Additional Screenshots</h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {detailsProject.screenshots.slice(1).map((scr, sIdx) => {
                      const resolvedScr = resolveAsset(scr);
                      const isAdm = scr.includes('admin');
                      return (
                        <div key={sIdx} className="modal-preview-frame">
                          <div className="modal-frame-topbar">
                            <div className="browser-dots">
                              <span className="dot" />
                              <span className="dot" />
                              <span className="dot" />
                            </div>
                            <span className="modal-url-label">
                              {isAdm ? 'Administration Interface' : `Screenshot ${sIdx + 2}`}
                            </span>
                            {isAdm && (
                              <span className="modal-admin-secure-tag">
                                <ShieldCheck size={12} />
                                <span>Private Panel</span>
                              </span>
                            )}
                          </div>
                          {resolvedScr && (
                            <img
                              src={resolvedScr}
                              alt={`${detailsProject.name} screenshot ${sIdx + 2}`}
                              className="modal-preview-img"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Project Features List */}
              {detailsProject.customerFeatures && detailsProject.adminFeatures ? (
                <div className="modal-showcase-block">
                  <div className="modal-block-header">
                    <h4 className="modal-section-heading">Key Project Features</h4>
                  </div>

                  {/* Customer Page Features */}
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#1A365D',
                          background: '#E6EFFB',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1px solid rgba(26, 54, 93, 0.2)',
                        }}
                      >
                        CUSTOMER PAGE
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '10px',
                      }}
                    >
                      {detailsProject.customerFeatures.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 14px',
                            background: '#F8FAFC',
                            border: '1px solid rgba(15, 30, 54, 0.08)',
                            borderRadius: '8px',
                            fontSize: '0.88rem',
                            color: '#000000',
                          }}
                        >
                          <CheckCircle2 size={15} color="#58a6ff" style={{ flexShrink: 0 }} />
                          <span style={{ color: '#000000', fontWeight: '500' }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Admin Page Features */}
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#7C2D12',
                          background: '#FEF2F2',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1px solid rgba(124, 45, 18, 0.2)',
                        }}
                      >
                        ADMIN PAGE
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '10px',
                      }}
                    >
                      {detailsProject.adminFeatures.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 14px',
                            background: '#F8FAFC',
                            border: '1px solid rgba(15, 30, 54, 0.08)',
                            borderRadius: '8px',
                            fontSize: '0.88rem',
                            color: '#000000',
                          }}
                        >
                          <CheckCircle2 size={15} color="#58a6ff" style={{ flexShrink: 0 }} />
                          <span style={{ color: '#000000', fontWeight: '500' }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : detailsProject.features && detailsProject.features.length > 0 ? (
                <div className="modal-showcase-block">
                  <div className="modal-block-header">
                    <h4 className="modal-section-heading">Key Project Features</h4>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '10px',
                      marginTop: '12px',
                    }}
                  >
                    {detailsProject.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 14px',
                          background: '#F8FAFC',
                          border: '1px solid rgba(15, 30, 54, 0.08)',
                          borderRadius: '8px',
                          fontSize: '0.88rem',
                          color: '#000000',
                        }}
                      >
                        <CheckCircle2 size={15} color="#58a6ff" style={{ flexShrink: 0 }} />
                        <span style={{ color: '#000000', fontWeight: '500' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="modal-btn-secondary"
                onClick={() => setDetailsProject(null)}
              >
                Close
              </button>
              <a
                href={detailsProject.liveUrl || detailsProject.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn-primary"
              >
                <span>View Live Website</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
