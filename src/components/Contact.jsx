import React, { useState, useEffect } from 'react';
import {
  Send,
  Mail,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Phone,
  Tag,
  Check,
  Plus,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { useScrollRevealItem } from '../utils/useScrollReveal';

// 7 exact service options with clean labels & corresponding package scopes
const SERVICES_OPTIONS = [
  {
    id: 'basic-website',
    value: 'Basic Website',
    label: 'Basic Website — ₹2,999',
    price: '₹2,999',
    badge: 'Fixed Package Price',
    scope: '3–5 Pages',
    type: 'fixed',
  },
  {
    id: 'standard-website',
    value: 'Standard Website',
    label: 'Standard Website — ₹4,999',
    price: '₹4,999',
    badge: 'Fixed Package Price',
    scope: '6–8 Pages',
    type: 'fixed',
  },
  {
    id: 'premium-website',
    value: 'Premium Website',
    label: 'Premium Website — Starting at ₹9,999',
    price: 'Starting at ₹9,999',
    badge: 'Fixed Package Price',
    scope: '10–15 Pages + Admin Dashboard',
    type: 'fixed',
  },
  {
    id: 'ecommerce-website',
    value: 'E-commerce Website',
    label: 'E-commerce Website — ₹14,999',
    price: '₹14,999',
    badge: 'Fixed Package Price',
    scope: 'Complete Online Store',
    type: 'fixed',
  },
  {
    id: 'event-website',
    value: 'Event Website',
    label: 'Event Website — Custom Pricing',
    price: 'Custom Pricing',
    badge: 'Custom Scope',
    scope: 'Pages and features based on your event requirements.',
    type: 'custom_event',
  },
  {
    id: 'website-redesign',
    value: 'Website Redesign',
    label: 'Website Redesign — Custom Pricing',
    price: 'Custom Pricing',
    badge: 'Custom Scope',
    scope: 'Scope and pricing based on your existing website and requested changes.',
    type: 'custom_redesign',
  },
  {
    id: 'custom-project',
    value: 'Custom Project',
    label: 'Custom Project — Custom Pricing',
    price: 'Custom Pricing',
    badge: 'Bespoke Development',
    scope: 'Custom budget, features, and tailored scope.',
    type: 'custom_project',
  },
];

// Single-select budget options for Custom Project
const CUSTOM_BUDGET_OPTIONS = [
  'Under ₹3,000',
  'Under ₹5,000',
  'Under ₹10,000',
  'Under ₹15,000',
  '₹15,000–₹20,000',
  '₹20,000+',
  'Not sure yet',
];

// Multiple-select feature chips for Custom Project
const CUSTOM_FEATURE_OPTIONS = [
  'Services',
  'Portfolio / Gallery',
  'Products',
  'Booking',
  'Contact / Enquiries',
  'WhatsApp',
  'Online Payments',
  'Admin Dashboard',
  'Blog',
  'Other',
];

export default function Contact({ isModal = false, onClose, selectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    projectType: 'Basic Website',
    customBudget: '',
    customFeatures: [],
    customOtherText: '',
    customMessage: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const [bannerRef, isBannerVisible] = useScrollRevealItem({ threshold: 0.1 });
  const isRevealed = isModal || isBannerVisible;

  // Sync when selectedService prop changes from CTAs
  useEffect(() => {
    if (selectedService) {
      const match = SERVICES_OPTIONS.find(
        (s) =>
          s.value.toLowerCase() === selectedService.toLowerCase() ||
          selectedService.toLowerCase().includes(s.value.toLowerCase()) ||
          s.value.toLowerCase().includes(selectedService.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({
          ...prev,
          projectType: match.value,
        }));
      }
    }
  }, [selectedService]);

  // Current active service configuration
  const currentService =
    SERVICES_OPTIONS.find((s) => s.value === formData.projectType) ||
    SERVICES_OPTIONS[0];

  const isCustomProject = currentService.value === 'Custom Project';

  // Toggle single budget chip
  const handleSelectBudget = (budget) => {
    setFormData((prev) => ({
      ...prev,
      customBudget: prev.customBudget === budget ? '' : budget,
    }));
    if (errors.customBudget) {
      setErrors((prev) => ({ ...prev, customBudget: null }));
    }
  };

  // Toggle multiple feature chips
  const handleToggleFeature = (feature) => {
    setFormData((prev) => {
      const exists = prev.customFeatures.includes(feature);
      const updated = exists
        ? prev.customFeatures.filter((f) => f !== feature)
        : [...prev.customFeatures, feature];
      return {
        ...prev,
        customFeatures: updated,
      };
    });
    if (errors.customFeatures) {
      setErrors((prev) => ({ ...prev, customFeatures: null }));
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    // 1. Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }

    // 2. Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g. name@business.com)';
      }
    }

    // 3. Service validation
    if (!formData.projectType) {
      newErrors.projectType = 'Please select a service';
    }

    // 4. Custom Project specific validation
    if (isCustomProject) {
      if (!formData.customBudget) {
        newErrors.customBudget = 'Please select an estimated budget range';
      }
      if (!formData.customFeatures || formData.customFeatures.length === 0) {
        newErrors.customFeatures = 'Please select at least one website feature';
      }
      if (
        formData.customFeatures &&
        formData.customFeatures.includes('Other') &&
        !formData.customOtherText.trim()
      ) {
        newErrors.customOtherText = 'Please describe what other features you need';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate clean, professional Instagram DM enquiry message
  const buildEnquiryMessage = () => {
    const lines = [
      'Hello WebBloomBuilds! 👋',
      'I’d like to discuss a website project.',
      '',
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
    ];

    if (formData.phone && formData.phone.trim()) {
      lines.push(`WhatsApp / Phone: ${formData.phone.trim()}`);
    }

    if (formData.businessName && formData.businessName.trim()) {
      lines.push(`Business / Project: ${formData.businessName.trim()}`);
    }

    lines.push(`Service: ${currentService.value}`);
    lines.push(`Package / Pricing: ${currentService.price}`);

    if (isCustomProject) {
      if (formData.customBudget) {
        lines.push(`Budget: ${formData.customBudget}`);
      }
      if (formData.customFeatures && formData.customFeatures.length > 0) {
        lines.push('Website Requirements:');
        formData.customFeatures.forEach((feat) => {
          if (feat === 'Other' && formData.customOtherText.trim()) {
            lines.push(`• Other: ${formData.customOtherText.trim()}`);
          } else {
            lines.push(`• ${feat}`);
          }
        });
      }
      if (formData.customMessage && formData.customMessage.trim()) {
        lines.push('Additional Information:');
        lines.push(formData.customMessage.trim());
      }
    } else {
      if (currentService.scope) {
        lines.push(`Scope: ${currentService.scope}`);
      }
    }

    lines.push('');
    lines.push('Looking forward to discussing the project with you!');

    return lines.join('\n');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildEnquiryMessage();
    setGeneratedMessage(message);
    setSubmitted(true);
    setCopied(false);
  };

  // Copy message to clipboard with robust fallbacks
  const handleCopyMessage = async () => {
    if (!generatedMessage) return;

    let copySuccess = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(generatedMessage);
        copySuccess = true;
      } catch (err) {
        console.warn('Navigator clipboard failed, trying fallback...', err);
      }
    }

    if (!copySuccess) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = generatedMessage;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        copySuccess = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        console.error('Fallback copy error:', err);
      }
    }

    if (copySuccess) {
      setCopied(true);
    }
  };

  // Reset copied state after 2.5 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleReset = () => {
    setSubmitted(false);
    setGeneratedMessage('');
    setCopied(false);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      phone: '',
      businessName: '',
      projectType: 'Basic Website',
      customBudget: '',
      customFeatures: [],
      customOtherText: '',
      customMessage: '',
    });
  };

  return (
    <section
      id="contact"
      className={`section-padding contact-section ${isModal ? 'as-modal' : ''}`}
    >
      <div className="container">
        {/* Outer Banner Card */}
        <div
          ref={bannerRef}
          className={`contact-banner-card reveal-init ${isRevealed ? 'reveal-active' : ''}`}
        >
          {/* Subtle decorative glow */}
          <div className="contact-decor-glow" aria-hidden="true" />

          <div className="contact-grid">
            {/* Left Info Column */}
            <div className="contact-info-col reveal-init">
              <div className="section-tag" style={{ background: '#FFFFFF' }}>
                <Sparkles size={14} />
                <span>LET'S CONNECT</span>
              </div>

              <h2 className="contact-heading">Let's Build Something Amazing.</h2>

              <p className="contact-description">
                Have an idea for your website? Let's turn it into something your
                customers can experience. Tell me a bit about your vision and
                we'll map out the next steps.
              </p>

              {/* Contact Channels */}
              <div className="contact-channels-list">
                {/* Instagram Channel */}
                <a
                  href="https://www.instagram.com/webbloombuilds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-card"
                  aria-label="Follow WebBloomBuilds on Instagram"
                >
                  <div className="channel-icon-wrap instagram-wrap">
                    <InstagramIcon size={22} />
                  </div>
                  <div className="channel-text">
                    <span className="channel-label">Instagram Direct</span>
                    <strong className="channel-value">@webbloombuilds</strong>
                  </div>
                  <ArrowRight size={16} className="channel-arrow" />
                </a>

                {/* Email Channel */}
                <a
                  href="mailto:webbloombuilds@gmail.com"
                  className="contact-channel-card contact-channel-email"
                  aria-label="Email WebBloomBuilds at webbloombuilds@gmail.com"
                >
                  <div className="channel-icon-wrap email-wrap">
                    <Mail size={22} />
                  </div>
                  <div className="channel-text">
                    <span className="channel-label">Email Inquiries</span>
                    <strong className="channel-value">webbloombuilds@gmail.com</strong>
                  </div>
                  <ArrowRight size={16} className="channel-arrow" />
                </a>
              </div>

              {/* Response Time Reassurance */}
              <div className="response-time-badge">
                <Clock size={16} />
                <span>Typically responding within 24–48 hours</span>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="contact-form-col reveal-init">
              <div className="contact-form-container">
                {submitted ? (
                  /* ========================================================
                     SUCCESS STATE: Generated Enquiry & Instagram DM Flow
                     ======================================================== */
                  <div className="submission-success-view">
                    <div className="success-icon-ring">
                      <CheckCircle2 size={42} />
                    </div>

                    <h3 className="success-title">Your project enquiry is ready! 🎉</h3>
                    <p className="success-text">
                      Copy the message below and send it to us on Instagram to start the conversation.
                    </p>

                    {/* Styled Generated Message Box */}
                    <div className="generated-message-container">
                      <div className="message-box-header">
                        <span className="message-box-tag">PRE-FILLED PROJECT ENQUIRY</span>
                        <span className="message-box-hint">Ready to paste in Instagram DM</span>
                      </div>
                      <div
                        className="generated-message-box"
                        tabIndex={0}
                        role="region"
                        aria-label="Generated project enquiry message"
                      >
                        <pre className="message-pre-text">{generatedMessage}</pre>
                      </div>
                    </div>

                    {/* Small Supporting Guidance */}
                    <p className="copy-instruction-notice">
                      Your message has been prepared. Copy it, open Instagram, and paste it into our DM.
                    </p>

                    {/* Action Buttons Group */}
                    <div className="success-actions-group">
                      {/* 1. Prominent Copy Message Button */}
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className={`btn-primary copy-message-btn ${
                          copied ? 'btn-copied-state' : ''
                        }`}
                        aria-label="Copy generated message to clipboard"
                      >
                        {copied ? (
                          <>
                            <Check size={18} />
                            <span>✓ Message Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={18} />
                            <span>📋 Copy Message</span>
                          </>
                        )}
                      </button>

                      {/* Copied Confirmation Feedback */}
                      {copied && (
                        <div
                          className="copied-confirmation-banner"
                          role="status"
                          aria-live="polite"
                        >
                          <CheckCircle2 size={16} />
                          <span>✓ Copied! Now open Instagram and paste the message into our DM.</span>
                        </div>
                      )}

                      {/* 2. Prominent Instagram Direct CTA Button */}
                      <a
                        href="https://www.instagram.com/webbloombuilds/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-instagram-direct"
                        aria-label="Open WebBloomBuilds Instagram profile in a new tab"
                      >
                        <InstagramIcon size={20} />
                        <span>Open Instagram &amp; Send Message</span>
                        <ArrowRight size={18} />
                      </a>

                      {/* 3. Reset / Start Another Enquiry */}
                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn-link-reset"
                        aria-label="Start another project enquiry"
                      >
                        Start Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ========================================================
                     CONTACT FORM VIEW
                     ======================================================== */
                  <form
                    onSubmit={handleSubmit}
                    className="project-inquiry-form"
                    noValidate
                  >
                    {/* 1. Heading & Supporting text */}
                    <div className="form-header">
                      <h3 className="form-title">Start Your Project</h3>
                      <p className="form-subtitle">
                        Fill in the quick details below.
                      </p>
                    </div>

                    {/* 2. Basic Contact Details */}
                    {/* Your Name * */}
                    <div className="form-group">
                      <label htmlFor="client-name" className="form-label">
                        Your Name *
                      </label>
                      <input
                        id="client-name"
                        type="text"
                        required
                        placeholder="e.g. Elena Vance"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: null });
                        }}
                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                      />
                      {errors.name && (
                        <span className="field-error-text">{errors.name}</span>
                      )}
                    </div>

                    {/* Email Address * */}
                    <div className="form-group">
                      <label htmlFor="client-email" className="form-label">
                        Email Address *
                      </label>
                      <input
                        id="client-email"
                        type="email"
                        required
                        placeholder="name@business.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: null });
                        }}
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                      />
                      {errors.email && (
                        <span className="field-error-text">{errors.email}</span>
                      )}
                    </div>

                    {/* WhatsApp / Phone Number (Optional) */}
                    <div className="form-group">
                      <label htmlFor="client-phone" className="form-label">
                        WhatsApp / Phone Number
                      </label>
                      <div className="input-with-icon">
                        <Phone size={16} className="field-inner-icon" />
                        <input
                          id="client-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="form-input has-icon"
                        />
                      </div>
                    </div>

                    {/* Business / Project Name (Optional) */}
                    <div className="form-group">
                      <label htmlFor="client-business" className="form-label">
                        Business / Project Name
                      </label>
                      <input
                        id="client-business"
                        type="text"
                        placeholder="e.g. Vance Botanicals"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessName: e.target.value,
                          })
                        }
                        className="form-input"
                      />
                    </div>

                    {/* 3. Select Service * (ONLY the 7 clean options) */}
                    <div className="form-group">
                      <label htmlFor="project-type" className="form-label">
                        Select Service *
                      </label>
                      <select
                        id="project-type"
                        required
                        value={formData.projectType}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            projectType: e.target.value,
                          });
                          if (errors.projectType) {
                            setErrors({ ...errors, projectType: null });
                          }
                        }}
                        className="form-select"
                      >
                        {SERVICES_OPTIONS.map((s) => (
                          <option key={s.id} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <span className="field-error-text">
                          {errors.projectType}
                        </span>
                      )}
                    </div>

                    {/* 4. Budget & Package Scope (Dynamic) */}
                    <div className="form-group dynamic-scope-group">
                      <label className="form-label">Budget &amp; Package Scope</label>

                      {/* For Basic, Standard, Premium, E-commerce, Event, Redesign: Fixed Package Info */}
                      {!isCustomProject ? (
                        <div className="package-scope-card">
                          <div className="scope-badge-line">
                            <div className="package-price-badge">
                              <Tag size={14} />
                              <span>{currentService.price}</span>
                            </div>
                            {currentService.type === 'fixed' && (
                              <span className="package-type-pill">
                                Fixed Package Price
                              </span>
                            )}
                            {currentService.type.startsWith('custom') && (
                              <span className="package-type-pill pill-custom">
                                Custom Scope
                              </span>
                            )}
                          </div>
                          <div className="package-scope-text">
                            <p>{currentService.scope}</p>
                          </div>
                        </div>
                      ) : (
                        /* For ONLY Custom Project: Estimated Budget Selection Chips */
                        <div className="custom-project-budget-block">
                          <span className="custom-sublabel">
                            What's your estimated budget? *
                          </span>
                          <div
                            className="chips-group budget-chips-grid"
                            role="radiogroup"
                            aria-label="Estimated budget options"
                          >
                            {CUSTOM_BUDGET_OPTIONS.map((budgetOption) => {
                              const isSelected =
                                formData.customBudget === budgetOption;
                              return (
                                <button
                                  type="button"
                                  key={budgetOption}
                                  role="radio"
                                  aria-checked={isSelected}
                                  onClick={() => handleSelectBudget(budgetOption)}
                                  className={`selectable-chip budget-chip ${
                                    isSelected ? 'chip-selected' : ''
                                  }`}
                                >
                                  {isSelected && (
                                    <Check
                                      size={14}
                                      className="chip-check-icon"
                                    />
                                  )}
                                  <span>{budgetOption}</span>
                                </button>
                              );
                            })}
                          </div>
                          {errors.customBudget && (
                            <span className="field-error-text">
                              {errors.customBudget}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 5. Custom Project ONLY: Additional Questions */}
                    {isCustomProject && (
                      <div className="custom-project-flow-wrapper">
                        {/* What would you like your website to include? */}
                        <div className="form-group custom-features-group">
                          <label className="form-label">
                            What would you like your website to include? *
                          </label>
                          <span className="field-hint-text">
                            Select all that apply for your project.
                          </span>

                          <div
                            className="chips-group feature-chips-grid"
                            aria-label="Selectable website features"
                          >
                            {CUSTOM_FEATURE_OPTIONS.map((featureOption) => {
                              const isSelected =
                                formData.customFeatures.includes(featureOption);
                              return (
                                <button
                                  type="button"
                                  key={featureOption}
                                  aria-pressed={isSelected}
                                  onClick={() =>
                                    handleToggleFeature(featureOption)
                                  }
                                  className={`selectable-chip feature-chip ${
                                    isSelected ? 'chip-selected' : ''
                                  }`}
                                >
                                  {isSelected ? (
                                    <Check
                                      size={14}
                                      className="chip-check-icon"
                                    />
                                  ) : (
                                    <Plus
                                      size={13}
                                      className="chip-plus-icon"
                                    />
                                  )}
                                  <span>{featureOption}</span>
                                </button>
                              );
                            })}
                          </div>
                          {errors.customFeatures && (
                            <span className="field-error-text">
                              {errors.customFeatures}
                            </span>
                          )}

                          {/* If "Other" is selected, allow user to describe what they need */}
                          {formData.customFeatures.includes('Other') && (
                            <div className="other-feature-input-wrap">
                              <label
                                htmlFor="custom-other-detail"
                                className="form-sublabel"
                              >
                                Please describe what other features you need: *
                              </label>
                              <input
                                id="custom-other-detail"
                                type="text"
                                placeholder="e.g. Custom quotation tool, LMS, multi-language..."
                                value={formData.customOtherText}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    customOtherText: e.target.value,
                                  });
                                  if (errors.customOtherText) {
                                    setErrors({
                                      ...errors,
                                      customOtherText: null,
                                    });
                                  }
                                }}
                                className={`form-input ${
                                  errors.customOtherText ? 'input-error' : ''
                                }`}
                              />
                              {errors.customOtherText && (
                                <span className="field-error-text">
                                  {errors.customOtherText}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Optional Multiline Textarea: Anything else you'd like us to know? */}
                        <div className="form-group">
                          <label
                            htmlFor="custom-message"
                            className="form-label"
                          >
                            Anything else you'd like us to know?
                          </label>
                          <textarea
                            id="custom-message"
                            rows="3"
                            placeholder="Tell us briefly about your idea, features, or requirements..."
                            value={formData.customMessage}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                customMessage: e.target.value,
                              })
                            }
                            className="form-textarea"
                          />
                        </div>
                      </div>
                    )}

                    {/* 6. Submit Button */}
                    <button
                      type="submit"
                      className="btn-primary form-submit-btn"
                    >
                      <span>Submit Project Enquiry</span>
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
