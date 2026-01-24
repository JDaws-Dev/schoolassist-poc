import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * SlideUpPanel Component
 * A bottom sheet / slide-up panel that keeps users in context
 * Similar to iOS/Android native bottom sheets
 */
const SlideUpPanel = ({ isOpen, onClose, title, children }) => {
  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Dark Overlay Backdrop */}
      <div
        className={`slide-panel-backdrop ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* The Panel Sheet */}
      <div
        className={`slide-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
      >
        {/* Handle Bar (Visual cue to swipe down) */}
        <div className="slide-panel-handle" onClick={onClose}>
          <div className="handle-bar" />
        </div>

        {/* Panel Header */}
        <div className="slide-panel-header">
          <h2 id="panel-title">{title}</h2>
          <button
            onClick={onClose}
            className="slide-panel-close"
            aria-label="Close panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Panel Content (Scrollable) */}
        <div className="slide-panel-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default SlideUpPanel;
