import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import IconComponent from './IconComponent';

/**
 * CommunitySection Component
 * Displays community resources and parent links
 *
 * @param {Object} props
 * @param {Array} props.resources - Array of community resource items
 */
const CommunitySection = ({ resources }) => {
  if (!resources || resources.length === 0) return null;

  return (
    <section id="community" className="community-section">
      <h2>
        <Heart size={24} /> Community & Parent Resources
      </h2>
      <div className="community-grid">
        {resources.map(resource => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="community-card"
          >
            <IconComponent name={resource.icon} size={24} />
            <div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
            </div>
            <ChevronRight size={16} className="arrow" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;
