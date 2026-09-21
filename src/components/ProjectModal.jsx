import React from 'react';
import { X, ExternalLink, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, onClose, onStartProject }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close Project Details"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="modal-header">
          <span className="modal-badge">Demo Project</span>
          <h2 className="modal-title">{project.name || project.title}</h2>
          <span className="modal-category">{project.category}</span>
        </div>

        {/* Image Preview */}
        <div className="modal-image-wrap">
          <img
            src={project.image}
            alt={project.name || project.title}
            className="modal-image"
          />
        </div>

        {/* Content */}
        <div className="modal-body">
          <p className="modal-description">{project.description}</p>

          <div className="modal-highlights">
            <h4 className="modal-subtitle">Project Highlights:</h4>
            <ul className="modal-list">
              <li>
                <Check size={16} className="modal-check" />
                <span>Tailored aesthetic aligning with target audience psychology</span>
              </li>
              <li>
                <Check size={16} className="modal-check" />
                <span>100% mobile-first responsive architecture</span>
              </li>
              <li>
                <Check size={16} className="modal-check" />
                <span>Optimized asset delivery for fast load performance</span>
              </li>
            </ul>
          </div>

          <div className="modal-actions">
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Visit Live Website</span>
                <ExternalLink size={16} />
              </a>
            )}
            <button
              onClick={() => {
                onClose();
                if (onStartProject) onStartProject();
              }}
              className="btn-secondary"
            >
              <span>Start A Project Like This</span>
              <ArrowRight size={16} />
            </button>
            <button onClick={onClose} className="btn-secondary" style={{ marginLeft: 'auto' }}>
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
