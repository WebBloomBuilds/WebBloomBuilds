import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { useScrollRevealItem } from '../utils/useScrollReveal';

const faqData = [
  {
    id: 'faq-01',
    number: '01',
    question: '01. How much does a website cost?',
    answer: (
      <>
        Our website packages start from <strong>₹2,999</strong>, with Standard at{' '}
        <strong>₹4,999</strong>, Premium starting at <strong>₹9,999</strong>, and
        E-commerce at <strong>₹14,999</strong>. We also offer custom pricing for
        event websites, redesigns, and projects with specific requirements.
      </>
    ),
  },
  {
    id: 'faq-02',
    number: '02',
    question: '02. How long does it take to build a website?',
    answer: (
      <>
        Most of our standard projects are planned for delivery within{' '}
        <strong>5–7 days</strong>, depending on the package, content, features,
        and requirements. More complex or customized projects may require
        additional time, which will be discussed before starting.
      </>
    ),
  },
  {
    id: 'faq-03',
    number: '03',
    question: '03. What information do you need from me to start?',
    answer: (
      <>
        We'll generally need your business details, logo, content, images, product
        or service information, contact details, and any design preferences you
        have. If you're unsure about what to provide, we'll guide you through
        what is needed for your project.
      </>
    ),
  },
  {
    id: 'faq-04',
    number: '04',
    question: '04. Do you provide domain and hosting?',
    answer: (
      <>
        Yes, we can help you with the <strong>domain and hosting setup</strong>{' '}
        for your website. The exact domain and hosting arrangement can be
        discussed based on your project and requirements, including any
        associated third-party costs.
      </>
    ),
  },
  {
    id: 'faq-05',
    number: '05',
    question: '05. Can you redesign my existing website?',
    answer: (
      <>
        Absolutely. We offer <strong>Website Redesign</strong> services for
        businesses that want to refresh an existing website. We can improve its
        visual design, UI/UX, responsiveness, page structure, navigation, and
        other requested features.
      </>
    ),
  },
  {
    id: 'faq-06',
    number: '06',
    question: '06. Will my website work on mobile and desktop?',
    answer: (
      <>
        Yes. Our websites are designed to be{' '}
        <strong>fully responsive across mobile and desktop devices</strong>.
        The layout, navigation, images, text, and interactive elements are
        adapted to provide a smooth experience across different screen sizes.
      </>
    ),
  },
  {
    id: 'faq-07',
    number: '07',
    question: '07. Can I request changes after seeing the website?',
    answer: (
      <>
        Yes. You can share your feedback and requested changes during the
        development process. We'll discuss the requested updates and make the
        applicable revisions according to the scope of your selected package or
        project.
      </>
    ),
  },
  {
    id: 'faq-08',
    number: '08',
    question: '08. Do you provide maintenance after the website is launched?',
    answer: (
      <>
        We can provide <strong>post-launch support and updates</strong> depending
        on your requirements. Maintenance needs can include content updates,
        product changes, design adjustments, or other website improvements, and
        can be discussed separately.
      </>
    ),
  },
  {
    id: 'faq-09',
    number: '09',
    question:
      '09. Can you integrate WhatsApp, contact forms, payment gateways, or social media?',
    answer: (
      <>
        Yes. We can integrate features such as{' '}
        <strong>
          WhatsApp, enquiry/contact forms, social media links, payment gateways,
          and other required integrations
        </strong>{' '}
        depending on your selected package and project requirements.
      </>
    ),
  },
  {
    id: 'faq-10',
    number: '10',
    question:
      '10. I need something different from your packages. Can I request a custom website?',
    answer: (
      <>
        Definitely. Our <strong>Custom Project</strong> service is designed for
        requirements that don't fit into our standard packages. You can tell us
        what you want to build, and we'll discuss the pages, features,
        functionality, pricing, and project scope based on your requirements.
      </>
    ),
  },
];

function FAQAccordionItem({ item, index, isOpen, onToggle }) {
  const [itemRef, isInViewport] = useScrollRevealItem({
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px',
  });

  return (
    <div
      ref={itemRef}
      className={`faq-item reveal-init ${isInViewport ? 'reveal-active' : ''} ${
        isOpen ? 'faq-item-open' : ''
      }`}
    >
      <button
        type="button"
        className="faq-question-btn"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="faq-question-text">{item.question}</span>
        <span className="faq-icon-pill">
          <ChevronDown
            size={18}
            className={`faq-chevron ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      <div
        id={`faq-answer-${item.id}`}
        className="faq-answer-wrapper"
        role="region"
        aria-hidden={!isOpen}
      >
        <div className="faq-answer-inner">
          <div className="faq-answer-content">
            <p>{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ onOpenContact }) {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default
  const [headerRef, isHeaderVisible] = useScrollRevealItem({ threshold: 0.15 });
  const [footerRef, isFooterVisible] = useScrollRevealItem({ threshold: 0.15 });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="section-padding faq-section">
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`section-header reveal-init ${isHeaderVisible ? 'reveal-active' : ''}`}
        >
          <div className="section-tag">
            <HelpCircle size={14} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find quick answers to common questions about our website packages, turnaround times, domains, hosting, and customization.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-wrap">
          {faqData.map((item, index) => (
            <FAQAccordionItem
              key={item.id}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Additional questions lead-in */}
        <div
          ref={footerRef}
          className={`faq-footer-card reveal-init ${isFooterVisible ? 'reveal-active' : ''}`}
        >
          <div className="faq-footer-text">
            <h4>Still have a question?</h4>
            <p>
              We're happy to answer any questions about your project, timeline, or
              requirements.
            </p>
          </div>
          <div className="faq-footer-actions">
            <button
              onClick={onOpenContact}
              className="btn-primary"
              aria-label="Contact WebBloomBuilds"
            >
              <span>Get in Touch</span>
              <ArrowRight size={16} />
            </button>
            <a
              href="mailto:webbloombuilds@gmail.com"
              className="btn-secondary"
            >
              <span>webbloombuilds@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
