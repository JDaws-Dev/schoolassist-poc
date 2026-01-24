import React, { useState } from 'react';
import { Sparkles, X, CheckCircle, ArrowRight } from 'lucide-react';
import IconComponent from './IconComponent';

/**
 * OnboardingBanner Component
 * Shows a getting started checklist for new families
 *
 * @param {Object} props
 * @param {Array} props.steps - Array of onboarding steps
 */
const OnboardingBanner = ({ steps }) => {
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem('onboardingDismissed') === 'true';
  });

  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('onboardingCompleted') || '[]');
    } catch {
      return [];
    }
  });

  const toggleStep = (stepId) => {
    const newCompleted = completedSteps.includes(stepId)
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];
    setCompletedSteps(newCompleted);
    localStorage.setItem('onboardingCompleted', JSON.stringify(newCompleted));
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('onboardingDismissed', 'true');
  };

  if (dismissed) return null;

  const progress = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <section className="onboarding-banner">
      <div className="onboarding-header">
        <div className="onboarding-title">
          <Sparkles size={24} aria-hidden="true" />
          <div>
            <h2>New to Artios?</h2>
            <p>Complete these steps to get started at Artios Academies</p>
          </div>
        </div>
        <button onClick={handleDismiss} className="onboarding-dismiss" aria-label="Dismiss onboarding checklist">
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="onboarding-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span>{completedSteps.length} of {steps.length} completed</span>
      </div>

      <div className="onboarding-steps">
        {steps.map(step => (
          <div
            key={step.id}
            className={`onboarding-step ${completedSteps.includes(step.id) ? 'completed' : ''}`}
          >
            <button
              className="step-checkbox"
              onClick={() => toggleStep(step.id)}
              aria-label={completedSteps.includes(step.id) ? `Mark ${step.title} as incomplete` : `Mark ${step.title} as complete`}
            >
              {completedSteps.includes(step.id) ? (
                <CheckCircle size={20} aria-hidden="true" />
              ) : (
                <div className="checkbox-empty" />
              )}
            </button>
            <div className="step-content">
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
            {step.link && step.link !== '#' && (
              <a
                href={step.link}
                target="_blank"
                rel="noopener noreferrer"
                className="step-link"
                aria-label={`Open ${step.title} (opens in new tab)`}
              >
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default OnboardingBanner;
