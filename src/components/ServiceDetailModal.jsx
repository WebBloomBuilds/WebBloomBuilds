import React, { useEffect } from 'react';
import {
  X,
  Check,
  ArrowRight,
  Layers,
  Database,
  Globe,
  Clock,
  Smartphone,
  Info,
  ShieldCheck,
} from 'lucide-react';

export default function ServiceDetailModal({ service, onClose, onSelectService }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!service) return null;

  const handleCtaClick = () => {
    onClose();
    if (onSelectService) {
      onSelectService(service.contactServiceValue || service.name);
    }
  };

  const isDual = service.fullDetails?.type === 'dual';

  return (
    <div
      className="service-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className={`service-modal-container ${isDual ? 'service-modal-wide' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="service-modal-header">
          <div className="service-modal-title-row">
            <div className="service-num-badge">SERVICE {service.number}</div>
            <span
              className={`service-pricing-pill ${
                service.isCustomPrice ? 'pricing-custom' : 'pricing-fixed'
              }`}
            >
              {service.price}
            </span>
            {service.pageRange && (
              <span className="service-pages-pill">
                <Layers size={13} />
                <span>{service.pageRange}</span>
              </span>
            )}
          </div>

          <button
            type="button"
            className="service-modal-close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="service-modal-body">
          <h2 id="service-modal-title" className="service-modal-heading">
            {service.name}
          </h2>
          <p className="service-modal-desc">{service.description}</p>

          {/* Delivery & Responsive Highlight Box */}
          <div className="service-delivery-banner">
            <div className="delivery-badge-item">
              <Clock size={16} className="delivery-icon" />
              <span>{service.delivery || 'Delivered in 5–7 days'}</span>
            </div>
            <div className="delivery-divider" />
            <div className="delivery-badge-item">
              <Smartphone size={16} className="delivery-icon" />
              <span>{service.responsiveInfo || 'Fully Responsive (Mobile + Desktop)'}</span>
            </div>
          </div>

          {/* DUAL SECTION DISPLAY (Premium Website & E-commerce Website) */}
          {isDual ? (
            <div className="service-dual-grid">
              {/* Customer Website Column */}
              <div className="service-split-card split-customer">
                <div className="split-header">
                  <div className="split-icon-badge">
                    <Globe size={18} />
                  </div>
                  <div>
                    <h3 className="split-title">
                      {service.fullDetails.customerSection.title}
                    </h3>
                  </div>
                </div>

                <div className="split-subsections-wrap">
                  {service.fullDetails.customerSection.subsections.map(
                    (sub, sIdx) => (
                      <div key={sIdx} className="split-subgroup">
                        <h4 className="subgroup-title">{sub.subtitle}</h4>
                        <ul className="split-items-list">
                          {sub.items.map((item, i) => (
                            <li key={i} className="split-item">
                              <Check size={14} className="split-check" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Admin Dashboard Column */}
              <div className="service-split-card split-admin">
                <div className="split-header">
                  <div className="split-icon-badge admin-badge-icon">
                    <Database size={18} />
                  </div>
                  <div>
                    <h3 className="split-title">
                      {service.fullDetails.adminSection.title}
                    </h3>
                  </div>
                </div>

                <div className="split-subsections-wrap">
                  {service.fullDetails.adminSection.subsections.map(
                    (sub, sIdx) => (
                      <div key={sIdx} className="split-subgroup">
                        <h4 className="subgroup-title">{sub.subtitle}</h4>
                        <ul className="split-items-list">
                          {sub.items.map((item, i) => (
                            <li key={i} className="split-item">
                              <Check size={14} className="split-check check-admin" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* STANDARD CATEGORIZED DISPLAY */
            <div className="service-single-details">
              {service.fullDetails?.sections.map((section, sIdx) => (
                <div key={sIdx} className="service-feature-group">
                  <h3 className="feature-group-title">{section.title}</h3>
                  <ul className="feature-group-list">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="feature-group-item">
                        <Check size={15} className="feature-check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Optional Note (for Event, Redesign, Custom Project) */}
          {service.note && (
            <div className="service-custom-note-card">
              <Info size={16} className="note-icon" />
              <p>{service.note}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="service-modal-footer">
          <div className="service-modal-reassurance">
            <ShieldCheck size={16} className="reassurance-icon" />
            <span>5–7 Days Delivery • Direct Designer Support</span>
          </div>

          <div className="service-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary modal-cancel-btn"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleCtaClick}
              className="btn-primary modal-action-btn"
            >
              <span>{service.ctaText}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
