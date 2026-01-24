import React, { useState, useEffect } from 'react';
import { GraduationCap, Check, ChevronDown } from 'lucide-react';

/**
 * GradeLevelSelector Component
 * Allows parents to select their child's grade level for personalized content
 */

const GRADE_LEVELS = [
  { id: 'all', label: 'All Grades', division: null },
  { id: 'k', label: 'Kindergarten', division: 'elementary' },
  { id: '1', label: '1st Grade', division: 'elementary' },
  { id: '2', label: '2nd Grade', division: 'elementary' },
  { id: '3', label: '3rd Grade', division: 'elementary' },
  { id: '4', label: '4th Grade', division: 'elementary' },
  { id: '5', label: '5th Grade', division: 'elementary' },
  { id: '6', label: '6th Grade', division: 'elementary' },
  { id: '7', label: '7th Grade', division: 'jrhigh' },
  { id: '8', label: '8th Grade', division: 'jrhigh' },
  { id: '9', label: '9th Grade', division: 'highschool' },
  { id: '10', label: '10th Grade', division: 'highschool' },
  { id: '11', label: '11th Grade', division: 'highschool' },
  { id: '12', label: '12th Grade', division: 'highschool' },
];

const DIVISIONS = {
  elementary: { label: 'Elementary (K-6)', days: 'Mon/Wed' },
  jrhigh: { label: 'Jr High (7-8)', days: 'Tue/Thu' },
  highschool: { label: 'High School (9-12)', days: 'Tue/Thu' },
};

const GradeLevelSelector = ({ onChange, showDivisionInfo = true }) => {
  const [selectedGrades, setSelectedGrades] = useState(() => {
    try {
      const saved = localStorage.getItem('artios-grade-levels');
      return saved ? JSON.parse(saved) : ['all'];
    } catch {
      return ['all'];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  // Save to localStorage when selection changes
  useEffect(() => {
    localStorage.setItem('artios-grade-levels', JSON.stringify(selectedGrades));
    if (onChange) {
      onChange(selectedGrades);
    }
  }, [selectedGrades, onChange]);

  const toggleGrade = (gradeId) => {
    if (gradeId === 'all') {
      setSelectedGrades(['all']);
    } else {
      const newSelection = selectedGrades.filter(g => g !== 'all');
      if (newSelection.includes(gradeId)) {
        const filtered = newSelection.filter(g => g !== gradeId);
        setSelectedGrades(filtered.length > 0 ? filtered : ['all']);
      } else {
        setSelectedGrades([...newSelection, gradeId]);
      }
    }
  };

  const getSelectedDivisions = () => {
    if (selectedGrades.includes('all')) return Object.values(DIVISIONS);

    const divisions = new Set();
    selectedGrades.forEach(gradeId => {
      const grade = GRADE_LEVELS.find(g => g.id === gradeId);
      if (grade?.division) {
        divisions.add(grade.division);
      }
    });
    return Array.from(divisions).map(d => DIVISIONS[d]);
  };

  const getDisplayLabel = () => {
    if (selectedGrades.includes('all')) return 'All Grades';
    if (selectedGrades.length === 1) {
      return GRADE_LEVELS.find(g => g.id === selectedGrades[0])?.label || 'Select Grade';
    }
    return `${selectedGrades.length} grades selected`;
  };

  return (
    <div className="grade-selector">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="grade-selector-button"
        aria-expanded={isOpen}
      >
        <GraduationCap size={18} />
        <span>{getDisplayLabel()}</span>
        <ChevronDown size={16} className={isOpen ? 'rotated' : ''} />
      </button>

      {isOpen && (
        <div className="grade-selector-dropdown">
          <div className="grade-list">
            {GRADE_LEVELS.map(grade => (
              <button
                key={grade.id}
                onClick={() => toggleGrade(grade.id)}
                className={`grade-option ${selectedGrades.includes(grade.id) ? 'selected' : ''}`}
              >
                <span>{grade.label}</span>
                {selectedGrades.includes(grade.id) && <Check size={16} />}
              </button>
            ))}
          </div>

          {showDivisionInfo && (
            <div className="division-info">
              <p className="division-label">Your schedule:</p>
              {getSelectedDivisions().map((div, i) => (
                <div key={i} className="division-item">
                  <strong>{div.label}</strong>
                  <span>{div.days} • 9 AM - 2:45 PM</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GradeLevelSelector;
export { GRADE_LEVELS, DIVISIONS };
