import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';

/**
 * ScheduleSection Component
 * Displays school hours overview
 *
 * @param {Object} props
 * @param {Object} props.schedules - Schedule data object with overview array
 */
const ScheduleSection = ({ schedules }) => {
  if (!schedules) return null;

  return (
    <section id="schedule" className="schedule-section">
      <h2>
        <Clock size={24} /> School Hours
      </h2>
      <div className="schedule-grid simple">
        {schedules.overview?.map(item => (
          <div key={item.id} className="schedule-card">
            <h3>{item.level}</h3>
            <div className="schedule-details">
              <span className="schedule-days">{item.days}</span>
              <span className="schedule-hours">{item.hours}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="schedule-note-bottom">
        Students should arrive 10-15 minutes before class starts.
      </p>
      <a
        href="#schedule"
        target="_blank"
        rel="noopener noreferrer"
        className="schedule-full-link"
      >
        View Full Class Schedule <ExternalLink size={14} />
      </a>
    </section>
  );
};

export default ScheduleSection;
