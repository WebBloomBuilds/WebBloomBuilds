import React, { useState, useEffect } from 'react';
import { Image, MessageSquareHeart, X, ZoomIn } from 'lucide-react';
import { reviews } from '../data/testimonialsData';
import { resolveAsset } from '../utils/resolveAsset';

export default function Testimonials() {
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeLightboxImage) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setActiveLightboxImage(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeLightboxImage]);

  // Only display reviews with visible: true
  const visibleReviews = reviews.filter((item) => item.visible !== false);

  return (
    <section id="reviews" className="section-padding testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <MessageSquareHeart size={14} />
            <span>CLIENT EXPERIENCES</span>
          </div>
          <h2 className="section-title">Client Reviews</h2>
          <p className="section-subtitle">
            Genuine feedback and experiences shared by businesses and clients who trusted WebBloomBuilds with their digital presence.
          </p>
        </div>

        {/* Review Screenshot Gallery Grid */}
        <div className="reviews-gallery-grid">
          {visibleReviews.map((item) => {
            const resolvedImg = resolveAsset(item.image);

            return (
              <div key={item.id} className="review-screenshot-card">
                {/* Review Screenshot or Clearly Marked Placeholder */}
                {resolvedImg ? (
                  <div
                    className="review-screenshot-frame"
                    style={{ cursor: 'pointer', position: 'relative' }}
                    onClick={() =>
                      setActiveLightboxImage({
                        src: resolvedImg,
                        title: item.clientName || item.businessName || 'Client Review',
                      })
                    }
                    title="Click to expand screenshot"
                  >
                    <img
                      src={resolvedImg}
                      alt={
                        item.clientName
                          ? `Client review from ${item.clientName}`
                          : item.businessName
                          ? `Client review from ${item.businessName}`
                          : 'Genuine client review screenshot'
                      }
                      className="review-screenshot-img"
                      loading="lazy"
                    />
                    <div
                      className="review-screenshot-zoom-hint"
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(4px)',
                        padding: '4px 8px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                        color: '#e6edf3',
                      }}
                    >
                      <ZoomIn size={12} />
                      <span>Expand</span>
                    </div>
                  </div>
                ) : (
                  <div className="review-placeholder-frame">
                    <div className="placeholder-icon-wrap">
                      <Image size={28} className="placeholder-svg-icon" />
                    </div>
                    <p className="placeholder-notice-text">
                      Client review screenshot will be added here.
                    </p>
                    <span className="placeholder-helper-hint">
                      Put screenshot in <code>src/assets/reviews/</code> & link in <code>src/data/testimonialsData.js</code>
                    </span>
                  </div>
                )}

                {/* Optional Client / Business Attribution */}
                {(item.clientName || item.businessName) && (
                  <div className="review-card-footer">
                    {item.clientName && (
                      <span className="review-client-name">{item.clientName}</span>
                    )}
                    {item.businessName && (
                      <span className="review-business-name">{item.businessName}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Transparent Note for Prospective Clients */}
        <div className="reviews-trust-note">
          <p>
            ✨ <em>Transparent Collaboration:</em> We only feature genuine, unedited client messages and reviews.
          </p>
        </div>
      </div>

      {/* Lightbox / Screenshot Full Preview Modal */}
      {activeLightboxImage && (
        <div
          className="project-modal-backdrop"
          onClick={() => setActiveLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          style={{
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="project-modal-dialog"
            style={{
              maxWidth: '800px',
              width: '90%',
              padding: '16px',
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              backdropFilter: 'blur(16px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <span style={{ fontWeight: 600, color: '#f0f6fc', fontSize: '0.95rem' }}>
                {activeLightboxImage.title}
              </span>
              <button
                type="button"
                onClick={() => setActiveLightboxImage(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8b949e',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Close image preview"
              >
                <X size={20} />
              </button>
            </div>
            <div
              style={{
                textAlign: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={activeLightboxImage.src}
                alt={activeLightboxImage.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
