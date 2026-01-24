import React from 'react';
import { Users, Mail } from 'lucide-react';

/**
 * StaffDirectory Component
 * Displays a grid of staff members with contact info
 *
 * @param {Object} props
 * @param {Array} props.staff - Array of staff members
 */
const StaffDirectory = ({ staff }) => {
  if (!staff || staff.length === 0) return null;

  return (
    <section id="staff" className="staff-section">
      <h2>
        <Users size={24} /> Staff Directory
      </h2>
      <div className="staff-grid">
        {staff.map(person => (
          <div key={person.id} className="staff-card">
            <div className="staff-avatar">
              <Users size={24} />
            </div>
            <div className="staff-info">
              <h3>{person.name}</h3>
              <p className="staff-title">{person.title}</p>
              <p className="staff-dept">{person.department}</p>
            </div>
            <a
              href={`mailto:${person.email}`}
              className="staff-email"
              aria-label={`Email ${person.name}`}
            >
              <Mail size={16} /> Email
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffDirectory;
