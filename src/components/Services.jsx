import React from 'react';
import {
  Check,
  Sparkles,
  ArrowRight,
  Layers,
  Info,
} from 'lucide-react';
import { services } from '../data/servicesData';
import { useScrollRevealItem } from '../utils/useScrollReveal';

function ServiceCard({ service, index, onOpenContact, onOpenServiceDetails }) {
  const [cardRef, isInViewport] = useScrollRevealItem({
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px',
  });

  const desktopDelay = `${(index % 3) * 110}ms`;

  return (
    <article
      ref={cardRef}
      className={`service-card-item reveal-init ${
        isInViewport ? 'reveal-active' : ''
      } ${service.isPopular ? 'service-card-popular' : ''} ${
        service.isFeatured ? 'service-card-featured' : ''
      }`}
      style={{
        '--service-delay': desktopDelay,
        transitionDelay: isInViewport ? 'var(--service-delay, 0ms)' : '0ms',
      }}
    >
      {/* Optional Highlight Tags */}
      {service.isPopular && (
        <div className="service-ribbon-tag">Most Popular</div>
      )}
      {service.isFeatured && (
        <div className="service-ribbon-tag store-ribbon">Full E-Commerce</div>
      )}

      {/* Card Header */}
      <div className="service-card-top">
        <div className="service-meta-line">
          <span className="service-number-tag">
            SERVICE {service.number}
          </span>
          <span
            className={`service-price-pill ${
              service.isCustomPrice
                ? 'price-pill-custom'
                : 'price-pill-fixed'
            }`}
          >
            {service.price}
          </span>
        </div>

        <h3 className="service-card-title">{service.name}</h3>

        {service.pageRange && (
          <div className="service-pages-tag">
            <Layers size={13} />
            <span>{service.pageRange}</span>
          </div>
        )}

        <p className="service-card-desc">{service.description}</p>
      </div>

      {/* Key Features Highlights */}
      <div className="service-card-features">
        <span className="features-label">Key Highlights</span>
        <ul className="features-checklist">
          {service.cardHighlights.map((highlight, idx) => (
            <li key={idx} className="feature-check-item">
              <Check size={15} className="feature-check-icon" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Delivery, Responsiveness & Domain Info Badges */}
      <div className="card-info-badges">
        <div className="card-info-badge">
          <svg className="card-badge-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 4v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Delivered in 5–7 days</span>
        </div>
        <div className="card-info-badge">
          <svg className="card-badge-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="2" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="5" y="10.5" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3.5 14.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <rect x="12" y="5" width="3" height="5.5" rx="0.8" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
          <span>Fully Responsive (Mobile + Desktop)</span>
        </div>
        <div className="card-info-badge card-info-badge-muted">
          <svg className="card-badge-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 1c0 0-3 2.5-3 7s3 7 3 7M8 1c0 0 3 2.5 3 7s-3 7-3 7M1 8h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span>Domain &amp; Hosting not included</span>
        </div>
        <p className="card-domain-note">
          Domain &amp; hosting charges are paid separately according to your requirements. We can set up and configure everything for you using your Gmail/account details.
        </p>
      </div>

      {/* Card Action Buttons: View Details & CTA Button */}
      <div className="service-card-actions">
        <button
          type="button"
          onClick={() =>
            onOpenServiceDetails && onOpenServiceDetails(service)
          }
          className="btn-secondary service-details-btn"
          aria-label={`View full details for ${service.name}`}
        >
          <Info size={15} />
          <span>View Details</span>
        </button>

        <button
          type="button"
          onClick={() =>
            onOpenContact &&
            onOpenContact(service.contactServiceValue || service.name)
          }
          className={`service-primary-cta ${
            service.isPopular || service.isFeatured
              ? 'btn-primary'
              : 'btn-accent-blue'
          }`}
          aria-label={`${service.ctaText} for ${service.name}`}
        >
          <span>{service.ctaText}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

export default function Services({ onOpenContact, onOpenServiceDetails }) {
  const [headerRef, isHeaderVisible] = useScrollRevealItem({ threshold: 0.15 });

  return (
    <section id="services" className="section-padding services-section">
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`section-header reveal-init ${isHeaderVisible ? 'reveal-active' : ''}`}
        >
          <div className="section-tag">
            <Sparkles size={14} />
            <span>SERVICES &amp; WEB SOLUTIONS</span>
          </div>
          <h2 className="section-title">
            Websites Built Around Your Vision.
          </h2>
          <p className="section-subtitle">
            From simple business websites to complete e-commerce platforms and custom web solutions — choose the service that fits your needs.
          </p>
        </div>

        {/* 7 Services Grid */}
        <div className="services-showcase-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onOpenContact={onOpenContact}
              onOpenServiceDetails={onOpenServiceDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
