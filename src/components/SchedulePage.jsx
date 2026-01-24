import React from 'react';
import { ChevronRight, Clock, GraduationCap, Heart, Sparkles, MessageCircle, Printer } from 'lucide-react';
import ChatWidget from './ChatWidget';

/**
 * SchedulePage Component
 * Full class schedule page with school hours, Friday arts, dance classes, and art club
 */
const SchedulePage = ({ onBack, scheduleData = {}, chatOpen, setChatOpen, systemPrompt }) => {
  return (
    <div className="page-view">
      <header className="page-header">
        <button onClick={onBack} className="back-btn">
          <ChevronRight size={20} className="back-arrow" /> Back to Home
        </button>
        <h1>Class Schedule</h1>
        <button onClick={() => window.print()} className="print-btn" aria-label="Print schedule">
          <Printer size={18} />
        </button>
      </header>

      <div className="schedule-page-content">
        {/* Overview - Main Hours */}
        <section className="schedule-page-section">
          <h2><Clock size={22} /> School Hours</h2>
          <p className="schedule-note">Doors open at 8:50 AM (10 minutes before first class)</p>
          <div className="schedule-overview-grid">
            {scheduleData.overview?.map(item => (
              <div key={item.id} className="schedule-overview-card">
                <h3>{item.level}</h3>
                <div className="schedule-detail">
                  <span className="schedule-days">{item.days}</span>
                  <span className="schedule-hours">{item.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Friday High School Arts Conservatory */}
        <section className="schedule-page-section">
          <h2><GraduationCap size={22} /> Friday Arts Conservatory (HS)</h2>
          <p className="schedule-note">High School Arts day is the Arts Conservatory — extended arts training from 9:00 AM to 4:30 PM</p>
          <div className="schedule-table-wrapper">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Classes Offered</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.fridayArts?.map(slot => (
                  <tr key={slot.id}>
                    <td className="time-cell">{slot.time}</td>
                    <td className="classes-cell">{slot.classes.join(' • ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Monday Dance */}
        <section className="schedule-page-section">
          <h2><Heart size={22} /> Monday Dance Classes</h2>
          <p className="schedule-note">Dance classes for various levels (schedule tentative)</p>
          <div className="schedule-table-wrapper">
            <table className="schedule-table compact">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.mondayDance?.map(item => (
                  <tr key={item.id}>
                    <td className="time-cell">{item.time}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Art Club */}
        {scheduleData.artClub && (
          <section className="schedule-page-section">
            <h2><Sparkles size={22} /> {scheduleData.artClub.name}</h2>
            <div className="art-club-info">
              <p><strong>Grades:</strong> {scheduleData.artClub.grades}</p>
              <p><strong>Time:</strong> {scheduleData.artClub.time}</p>
            </div>
          </section>
        )}

        <div className="schedule-page-footer">
          <p>Questions about the schedule? Use our assistant or contact the office.</p>
          <button onClick={() => setChatOpen(true)} className="btn-ask-schedule">
            <MessageCircle size={18} /> Ask About Schedule
          </button>
        </div>
      </div>

      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} customPrompt={systemPrompt} />
      {!chatOpen && (
        <button className="chat-toggle" onClick={() => setChatOpen(true)} aria-label="Open chat assistant">
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default SchedulePage;
