import React, { useState, useRef, useEffect } from 'react';
import artiosLogo from '/artios-logo.png';
import {
  LayoutDashboard,
  PenSquare,
  Users,
  Home as HomeIcon,
  BookOpen,
  Calendar,
  BarChart3,
  GraduationCap,
  ClipboardList,
  CreditCard,
  FileText,
  Target,
  ExternalLink,
  UtensilsCrossed,
  PieChart,
  CalendarDays,
  TrendingUp,
  AlertTriangle,
  UserPlus,
  CheckSquare,
  Receipt,
  FileEdit,
  Activity,
  UsersRound,
  Menu,
  X,
  ChevronDown,
  AlertCircle,
  Clock,
  XCircle
} from 'lucide-react';

const generateSessionId = () => 'session-' + Math.random().toString(36).substr(2, 9);
const API_URL = 'http://localhost:3001';

// Icon component mapping for cleaner code
const NavIcon = ({ iconId, isActive }) => {
  const color = isActive ? '#9ACD32' : 'rgba(255,255,255,0.6)';
  const size = 18;
  const icons = {
    dashboard: <LayoutDashboard size={size} color={color} />,
    content: <PenSquare size={size} color={color} />,
    students: <Users size={size} color={color} />,
    families: <HomeIcon size={size} color={color} />,
    classes: <BookOpen size={size} color={color} />,
    calendar: <Calendar size={size} color={color} />,
    reports: <BarChart3 size={size} color={color} />,
    grades: <GraduationCap size={size} color={color} />,
    children: <Users size={size} color={color} />,
    payments: <CreditCard size={size} color={color} />,
    policies: <FileText size={size} color={color} />,
    assignments: <ClipboardList size={size} color={color} />,
    myGrades: <Target size={size} color={color} />,
  };
  return icons[iconId] || <LayoutDashboard size={size} color={color} />;
};

// Role configurations with navigation items (icons now reference Lucide components)
const roleConfig = {
  admin: {
    name: "Admin",
    userName: "Administrator",
    navItems: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'content', label: 'Manage Content' },
      { id: 'students', label: 'All Students' },
      { id: 'families', label: 'Families' },
      { id: 'classes', label: 'Classes' },
      { id: 'calendar', label: 'Calendar' },
      { id: 'reports', label: 'Reports' },
    ]
  },
  teacher: {
    name: "Teacher",
    userName: "Mrs. Anderson",
    navItems: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'classes', label: 'My Classes' },
      { id: 'students', label: 'My Students' },
      { id: 'grades', label: 'Gradebook' },
      { id: 'calendar', label: 'Calendar' },
    ]
  },
  parent: {
    name: "Parent",
    userName: "Sarah Martinez",
    navItems: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'children', label: 'My Children' },
      { id: 'calendar', label: 'Calendar' },
      { id: 'payments', label: 'Payments' },
      { id: 'policies', label: 'School Policies' },
    ]
  },
  student: {
    name: "Student",
    userName: "Emma Martinez",
    navItems: [
      { id: 'dashboard', label: 'My Dashboard' },
      { id: 'classes', label: 'My Classes' },
      { id: 'assignments', label: 'Assignments' },
      { id: 'grades', label: 'My Grades' },
      { id: 'calendar', label: 'Calendar' },
    ]
  }
};

// Mock data
const mockData = {
  children: [
    { id: 'emma', name: 'Emma Martinez', initials: 'EM', grade: '7th Grade', gpa: '3.8', attendance: '98%', currentClass: 'Advanced Watercolor', room: 'Room 304', teacher: 'Mr. Alverez', color: '#9ACD32' },
    { id: 'lucas', name: 'Lucas Martinez', initials: 'LM', grade: '5th Grade', gpa: '3.6', attendance: '95%', currentClass: 'Music Theory', room: 'Room 201', teacher: 'Mrs. Phillips', color: '#4299E1' }
  ],
  assignments: [
    { id: 1, title: 'Renaissance Art History Paper', student: 'Emma', class: 'Academy', due: 'Due Tomorrow', urgent: true, courseId: '123456789', assignmentId: 'a1' },
    { id: 2, title: 'Math Worksheet: Fractions', student: 'Lucas', class: 'Math', due: 'Due Friday', urgent: false, courseId: '234567890', assignmentId: 'a2' },
    { id: 3, title: 'Read: "A Midsummer Night\'s Dream"', student: 'Emma', class: 'English', due: 'Due Dec 20', urgent: false, courseId: '345678901', assignmentId: 'a3' },
    { id: 4, title: 'Science Project Outline', student: 'Lucas', class: 'Science', due: 'Due Monday', urgent: false, courseId: '456789012', assignmentId: 'a4' },
    { id: 5, title: 'Lab Report: Chemical Reactions', student: 'Emma', class: 'Science', due: 'Overdue', urgent: true, status: 'missing', courseId: '456789012', assignmentId: 'a5' }
  ],
  classes: [
    { name: 'Academy of Arts & History', teacher: 'Mrs. Anderson', grade: 'A-', room: '101', students: 12 },
    { name: 'Pre-Algebra', teacher: 'Mr. Chen', grade: 'B', room: '201', students: 15 },
    { name: 'Science', teacher: 'Mrs. Nelson', grade: 'B+', room: 'Lab', students: 14 },
    { name: 'Choir', teacher: 'Mrs. Anderson', grade: 'A', room: 'Music Hall', students: 18 },
    { name: 'Dance', teacher: 'Miss Taylor', grade: 'A+', room: 'Dance Studio', students: 12 }
  ],
  calendarEvents: [
    { date: 'Dec 18', title: 'Christmas Break Begins', time: 'All Day', location: '' },
    { date: 'Jan 5', title: 'Elem & JH Academics Resume', time: 'All Day', location: '' },
    { date: 'Jan 6', title: 'HS Academics Resume', time: 'All Day', location: '' },
    { date: 'Jan 12', title: 'Artios Open House', time: '6:00 PM', location: 'Main Campus' },
    { date: 'Jan 16', title: 'Pilgrims Progress - Dance Performance', time: '7:00 PM', location: 'Main Auditorium' },
    { date: 'Jan 19', title: 'MLK Day (Artios Closed)', time: 'All Day', location: '' },
    { date: 'Jan 20', title: 'Senior Meeting (Parents & Students)', time: '4:00 PM', location: '' },
    { date: 'Jan 23', title: '9th Grade Preview Day', time: '9:00 AM', location: 'Main Campus' }
  ],
  students: [
    { name: 'Emma Martinez', grade: '7th', gpa: '3.8', programs: ['Academy', 'Choir', 'Dance'] },
    { name: 'Lucas Martinez', grade: '5th', gpa: '3.6', programs: ['Academy', 'Music'] },
    { name: 'Sophia Johnson', grade: '10th', gpa: '3.9', programs: ['Conservatory', 'Choir'] },
    { name: 'Liam Johnson', grade: '7th', gpa: '2.8', programs: ['Academy', 'Choir'] },
    { name: 'Olivia Williams', grade: '3rd', gpa: '3.5', programs: ['Academy', 'Dance'] },
    { name: 'Noah Williams', grade: '8th', gpa: '2.9', programs: ['Academy', 'Drama'] },
    { name: 'Isabella Garcia', grade: '9th', gpa: '3.7', programs: ['Conservatory', 'Art'] },
    { name: 'Mason Garcia', grade: '4th', gpa: '3.4', programs: ['Academy'] }
  ],
  families: [
    { name: 'Martinez Family', children: ['Emma (7th)', 'Lucas (5th)'], programs: ['Academy', 'Choir', 'Dance', 'Music'], contact: 'sarah.martinez@email.com' },
    { name: 'Johnson Family', children: ['Sophia (10th)', 'Liam (7th)'], programs: ['Conservatory', 'Academy', 'Choir'], contact: 'johnson.family@email.com' },
    { name: 'Williams Family', children: ['Olivia (3rd)', 'Noah (8th)'], programs: ['Academy', 'Dance', 'Drama'], contact: 'williams@email.com' },
    { name: 'Garcia Family', children: ['Isabella (9th)', 'Mason (4th)'], programs: ['Conservatory', 'Academy', 'Art'], contact: 'garcia.family@email.com' }
  ],
  policies: [
    { title: 'Dress Code', summary: 'Artios t-shirt with twill/denim pants or shorts. No sweatpants, leggings, or ripped jeans. Shorts must be within 3 inches of knee.', icon: '👕' },
    { title: 'Cell Phone Policy', summary: 'High School: Phones off in backpacks. K-8: Turn in phones at front desk upon arrival. Lobby use permitted.', icon: '📱' },
    { title: 'Late Work Policy', summary: 'Notify teachers 48 hours before class if unprepared. Extensions are at teacher discretion per course syllabus.', icon: '📝' },
    { title: 'Illness Policy', summary: 'Stay home if: fever, vomiting, diarrhea, frequent cough, rash, or pinkeye. No-nit policy for head lice.', icon: '🤒' },
    { title: 'Lunch Policy', summary: 'Bring lunch from home (no nuts, no heating). Or order at ArtiosCafe.com by 10am!', icon: '🥪' },
    { title: 'Weather Policy', summary: 'If Gwinnett or Forsyth County Public Schools close, Artios closes. Virtual assignments on Google Classroom.', icon: '🌧️' },
    { title: 'Transcripts', summary: 'One free transcript annually per student. Additional: $20 each. 14 business day turnaround.', icon: '📜' }
  ],
  gradingScale: {
    A: '90-100',
    B: '80-89',
    C: '70-79',
    D: '60-69',
    F: 'Below 59',
    note: 'Two or more letter-grade drops trigger academic probation.'
  }
};

// ============ SHARED COMPONENTS ============

// Custom dropdown for role switching (looks better than native select)
function RoleSwitcher({ value, onChange, variant = 'light' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const roles = [
    { value: 'parent', label: 'Parent' },
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' }
  ];

  const currentLabel = roles.find(r => r.value === value)?.label || 'Parent';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDark = variant === 'dark';

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.9)',
          border: isDark ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(0,0,0,0.1)',
          borderRadius: '10px',
          padding: '8px 12px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: isDark ? 'white' : '#2D3748',
          fontWeight: '600',
          cursor: 'pointer',
          minHeight: 'auto',
          transition: 'all 0.2s'
        }}
      >
        <span>{currentLabel}</span>
        <ChevronDown
          size={14}
          color={isDark ? 'rgba(255,255,255,0.7)' : '#718096'}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '6px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          zIndex: 1000,
          minWidth: '140px'
        }}>
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => {
                onChange(role.value);
                setIsOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: value === role.value ? 'rgba(154, 205, 50, 0.15)' : 'transparent',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: value === role.value ? '#4A5568' : '#718096',
                fontWeight: value === role.value ? '600' : '400',
                textAlign: 'left',
                cursor: 'pointer',
                minHeight: 'auto',
                transition: 'background 0.15s'
              }}
              onMouseEnter={(e) => {
                if (value !== role.value) e.target.style.background = 'rgba(0,0,0,0.04)';
              }}
              onMouseLeave={(e) => {
                if (value !== role.value) e.target.style.background = 'transparent';
              }}
            >
              {role.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ currentRole, userName, activeNav, onNavChange, isMobile, isOpen, onClose }) {
  const config = roleConfig[currentRole];
  const navItems = config.navItems;

  // Handle nav change and close mobile menu
  const handleNavChange = (id) => {
    onNavChange(id);
    if (isMobile && onClose) onClose();
  };

  // Mobile: full-screen overlay
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 998,
              transition: 'opacity 0.3s'
            }}
          />
        )}
        {/* Slide-in sidebar */}
        <div style={{
          width: '280px',
          height: '100vh',
          background: 'linear-gradient(180deg, rgba(69, 90, 76, 0.99) 0%, rgba(55, 75, 65, 1) 100%)',
          position: 'fixed',
          left: isOpen ? 0 : '-300px',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 0',
          zIndex: 999,
          transition: 'left 0.3s ease',
          boxShadow: isOpen ? '4px 0 20px rgba(0,0,0,0.3)' : 'none'
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} color="rgba(255,255,255,0.8)" />
          </button>

          <div style={{ textAlign: 'center', marginBottom: '30px', padding: '0 15px', marginTop: '10px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              border: '2px solid rgba(154, 205, 50, 0.6)',
              borderRadius: '50%',
              margin: '0 auto 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(154, 205, 50, 0.1)'
            }}>
              <img src={artiosLogo} alt="Artios" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
            </div>
            <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '18px', color: 'white', fontWeight: 'bold', letterSpacing: '0.5px' }}>
              ArtiosConnect
            </h1>
          </div>

          <nav style={{ flex: 1, padding: '0 10px', overflowY: 'auto' }}>
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNavChange(item.id)}
                style={{
                  padding: '14px 15px',
                  margin: '4px 0',
                  background: activeNav === item.id
                    ? 'linear-gradient(90deg, rgba(154, 205, 50, 0.25) 0%, rgba(154, 205, 50, 0.1) 70%, transparent 100%)'
                    : 'transparent',
                  borderRadius: activeNav === item.id ? '4px 16px 16px 4px' : '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s',
                  transform: activeNav === item.id ? 'translateX(4px)' : 'none'
                }}
              >
                <NavIcon iconId={item.id} isActive={activeNav === item.id} />
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  color: activeNav === item.id ? '#9ACD32' : 'rgba(255,255,255,0.7)',
                  fontWeight: activeNav === item.id ? '600' : '400'
                }}>{item.label}</span>
              </div>
            ))}
          </nav>

          {/* Quick Links */}
          <div style={{ padding: '0 12px', marginBottom: '10px' }}>
            <a
              href="https://classroom.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                background: 'rgba(66, 133, 244, 0.15)',
                borderRadius: '12px',
                textDecoration: 'none',
                marginBottom: '6px',
                border: '1px solid rgba(66, 133, 244, 0.2)'
              }}
            >
              <BookOpen size={18} color="rgba(255,255,255,0.85)" />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: '500', flex: 1 }}>
                Google Classroom
              </span>
              <ExternalLink size={14} color="rgba(255,255,255,0.5)" />
            </a>
            <a
              href="https://artioscafe.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                background: 'rgba(245, 158, 11, 0.15)',
                borderRadius: '12px',
                textDecoration: 'none',
                border: '1px solid rgba(245, 158, 11, 0.2)'
              }}
            >
              <UtensilsCrossed size={18} color="rgba(255,255,255,0.85)" />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: '500', flex: 1 }}>
                Order Lunch (by 10am)
              </span>
              <ExternalLink size={14} color="rgba(255,255,255,0.5)" />
            </a>
          </div>

          {/* User Profile Card */}
          <div style={{
            margin: '10px 12px',
            padding: '12px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #9ACD32 0%, #6B8E23 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'white', fontWeight: '600' }}>
                {userName}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                {config.name}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop: floating sidebar
  return (
    <div style={{
      width: '260px',
      height: 'calc(100vh - 40px)',
      /* Floating sidebar with softer sage green and glass effect */
      background: 'linear-gradient(180deg, rgba(69, 90, 76, 0.97) 0%, rgba(55, 75, 65, 0.98) 100%)',
      backdropFilter: 'blur(10px)',
      position: 'fixed',
      left: '20px',
      top: '20px',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0',
      borderRadius: '24px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255,255,255,0.05) inset'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px', padding: '0 15px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          border: '2px solid rgba(154, 205, 50, 0.6)',
          borderRadius: '50%',
          margin: '0 auto 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(154, 205, 50, 0.1)'
        }}>
          <img src={artiosLogo} alt="Artios" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '18px', color: 'white', fontWeight: 'bold', letterSpacing: '0.5px' }}>
          ArtiosConnect
        </h1>
      </div>

      <nav style={{ flex: 1, padding: '0 10px' }}>
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavChange(item.id)}
            style={{
              padding: '12px 15px',
              margin: '4px 0',
              /* Brush-stroke style background for active state */
              background: activeNav === item.id
                ? 'linear-gradient(90deg, rgba(154, 205, 50, 0.25) 0%, rgba(154, 205, 50, 0.1) 70%, transparent 100%)'
                : 'transparent',
              borderRadius: activeNav === item.id ? '4px 16px 16px 4px' : '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s',
              transform: activeNav === item.id ? 'translateX(4px)' : 'none'
            }}
          >
            <NavIcon iconId={item.id} isActive={activeNav === item.id} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: activeNav === item.id ? '#9ACD32' : 'rgba(255,255,255,0.7)',
              fontWeight: activeNav === item.id ? '600' : '400'
            }}>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Quick Links */}
      <div style={{ padding: '0 12px', marginBottom: '10px' }}>
        <a
          href="https://classroom.google.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            background: 'rgba(66, 133, 244, 0.15)',
            borderRadius: '12px',
            textDecoration: 'none',
            marginBottom: '6px',
            border: '1px solid rgba(66, 133, 244, 0.2)'
          }}
        >
          <BookOpen size={16} color="rgba(255,255,255,0.85)" />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>
            Google Classroom
          </span>
          <ExternalLink size={12} color="rgba(255,255,255,0.5)" />
        </a>
        <a
          href="https://artioscafe.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            background: 'rgba(245, 158, 11, 0.15)',
            borderRadius: '12px',
            textDecoration: 'none',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}
        >
          <UtensilsCrossed size={16} color="rgba(255,255,255,0.85)" />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>
            Order Lunch (by 10am)
          </span>
          <ExternalLink size={12} color="rgba(255,255,255,0.5)" />
        </a>
      </div>

      {/* User Profile Card */}
      <div style={{
        margin: '10px 12px',
        padding: '12px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #9ACD32 0%, #6B8E23 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {userName.split(' ').map(n => n[0]).join('')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'white', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {userName}
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
            {config.name}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sparkle SVG Icon
function SparkleIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="url(#sparkleGradient)" />
      <path d="M19 15L19.54 17.46L22 18L19.54 18.54L19 21L18.46 18.54L16 18L18.46 17.46L19 15Z" fill="url(#sparkleGradient)" opacity="0.7" />
      <path d="M5 17L5.36 18.64L7 19L5.36 19.36L5 21L4.64 19.36L3 19L4.64 18.64L5 17Z" fill="url(#sparkleGradient)" opacity="0.5" />
      <defs>
        <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9ACD32" />
          <stop offset="100%" stopColor="#6B8E23" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MuseBar({ onSubmit, isLoading, placeholder }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'white',
      borderRadius: '28px',
      padding: '8px 8px 8px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: isFocused
        ? '0 8px 30px rgba(154, 205, 50, 0.2), 0 0 0 2px rgba(154, 205, 50, 0.3)'
        : '0 4px 20px rgba(0,0,0,0.06)',
      marginBottom: '20px',
      transition: 'box-shadow 0.3s ease',
      position: 'relative'
    }}>
      {/* Sparkle Icon */}
      <div className="sparkle-icon" style={{ display: 'flex', alignItems: 'center' }}>
        <SparkleIcon size={22} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={isLoading}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          color: '#2D3748',
          background: 'transparent'
        }}
      />
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: isLoading || !query.trim() ? '#CBD5E0' : '#9ACD32',
          border: 'none',
          cursor: isLoading || !query.trim() ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <span style={{ color: 'white', fontSize: '18px' }}>→</span>
      </button>
    </form>
  );
}

function Card({ children, color = '#9ACD32', style = {}, onClick, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`float-card ${className}`}
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        borderLeft: `5px solid ${color}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        ...style
      }}
    >
      {children}
    </div>
  );
}

function StatBox({ label, value, color = '#2D3748' }) {
  return (
    <div style={{
      background: '#F7FAFC',
      borderRadius: '12px',
      padding: '12px',
      textAlign: 'center',
      flex: 1
    }}>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#718096', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px', color, fontWeight: 'bold' }}>{value}</div>
    </div>
  );
}

// AI Response Panel (replaces modal)
function AIResponsePanel({ messages, isLoading, onClose, onAskFollowUp, isMobile }) {
  const messagesEndRef = useRef(null);
  const [followUp, setFollowUp] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0 && !isLoading) return null;

  const handleFollowUp = (e) => {
    e.preventDefault();
    if (followUp.trim()) {
      onAskFollowUp(followUp);
      setFollowUp('');
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99
          }}
        />
      )}
      <div style={{
        position: 'fixed',
        right: isMobile ? 0 : 0,
        left: isMobile ? 0 : 'auto',
        top: isMobile ? 'auto' : 0,
        bottom: isMobile ? 0 : 'auto',
        width: isMobile ? '100%' : '400px',
        height: isMobile ? '85vh' : '100vh',
        background: 'white',
        boxShadow: isMobile ? '0 -4px 30px rgba(0,0,0,0.2)' : '-4px 0 30px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        animation: isMobile ? 'slideUp 0.3s ease-out' : 'slideIn 0.3s ease-out',
        borderRadius: isMobile ? '20px 20px 0 0' : 0
      }}>
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>

        {/* Mobile drag handle */}
        {isMobile && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px 0 5px'
          }}>
            <div style={{
              width: '40px',
              height: '4px',
              background: '#CBD5E0',
              borderRadius: '2px'
            }} />
          </div>
        )}

        <div style={{
          padding: isMobile ? '12px 16px' : '20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '16px', color: '#2D3748', margin: 0 }}>ArtiosConnect</h3>
          <button
            onClick={onClose}
            style={{
              background: '#F7FAFC',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#718096',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >×</button>
        </div>

        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: isMobile ? '12px 16px' : '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              padding: '12px 16px',
              borderRadius: '16px',
              background: msg.role === 'user' ? '#9ACD32' : '#F7FAFC',
              color: msg.role === 'user' ? 'white' : '#2D3748',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '90%',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>{msg.content}</div>
          ))}
          {isLoading && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '16px',
              background: '#F7FAFC',
              color: '#718096',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ animation: 'pulse 1.5s infinite' }}>●</span>
              <span style={{ animation: 'pulse 1.5s infinite 0.2s' }}>●</span>
              <span style={{ animation: 'pulse 1.5s infinite 0.4s' }}>●</span>
              <style>{`
                @keyframes pulse {
                  0%, 100% { opacity: 0.3; }
                  50% { opacity: 1; }
                }
              `}</style>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleFollowUp} style={{
          padding: isMobile ? '12px 16px 20px' : '15px 20px',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          gap: '10px',
          paddingBottom: isMobile ? 'max(20px, env(safe-area-inset-bottom))' : '15px'
        }}>
          <input
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Ask a follow-up..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '12px 15px',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px'
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !followUp.trim()}
            style={{
              padding: '12px 20px',
              background: isLoading || !followUp.trim() ? '#CBD5E0' : '#9ACD32',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: isLoading || !followUp.trim() ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >Send</button>
        </form>
      </div>
    </>
  );
}

// Quick suggestion chips - styled like speech bubbles from AI
function QuickChips({ suggestions, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
      <span style={{ fontSize: '12px', color: '#718096', alignSelf: 'center', marginRight: '4px' }}>Try asking:</span>
      {suggestions.map(q => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="suggestion-chip"
          style={{
            padding: '10px 16px',
            borderRadius: '18px 18px 18px 4px', /* Speech bubble shape */
            border: 'none',
            background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            fontSize: '13px',
            color: '#4A5568',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500'
          }}
        >"{q}"</button>
      ))}
    </div>
  );
}

// ============ ANNOUNCEMENT BANNER COMPONENT ============

function AnnouncementBanners({ role }) {
  const [announcements, setAnnouncements] = useState([]);
  const [dismissed, setDismissed] = useState(new Set());

  useEffect(() => {
    fetch(`${API_URL}/api/admin/content`)
      .then(res => res.json())
      .then(data => {
        // Filter by audience
        const filtered = (data.announcements || []).filter(a => {
          if (a.audience === 'all') return true;
          if (a.audience === 'parents' && role === 'parent') return true;
          if (a.audience === 'students' && role === 'student') return true;
          if (a.audience === 'teachers' && role === 'teacher') return true;
          return false;
        });
        setAnnouncements(filtered);
      })
      .catch(err => console.error('Failed to fetch announcements:', err));
  }, [role]);

  if (announcements.length === 0) return null;

  const visibleAnnouncements = announcements.filter(a => !dismissed.has(a.id));
  if (visibleAnnouncements.length === 0) return null;

  return (
    <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {visibleAnnouncements.map(a => (
        <div
          key={a.id}
          style={{
            padding: '12px 16px',
            borderRadius: '12px',
            background: a.priority === 'urgent' ? 'linear-gradient(135deg, #FED7D7 0%, #FEB2B2 100%)' :
                       a.priority === 'high' ? 'linear-gradient(135deg, #FEFCBF 0%, #FAF089 100%)' :
                       'linear-gradient(135deg, #C6F6D5 0%, #9AE6B4 100%)',
            borderLeft: `4px solid ${a.priority === 'urgent' ? '#E53E3E' : a.priority === 'high' ? '#D69E2E' : '#38A169'}`,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '20px' }}>
            {a.priority === 'urgent' ? '🚨' : a.priority === 'high' ? '⚠️' : '📢'}
          </span>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '14px', color: '#2D3748', fontWeight: '600', marginBottom: '2px' }}>{a.title}</h4>
            <p style={{ fontSize: '13px', color: '#4A5568', margin: 0 }}>{a.content}</p>
          </div>
          <button
            onClick={() => setDismissed(prev => new Set([...prev, a.id]))}
            style={{ background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontSize: '16px', padding: '0' }}
          >×</button>
        </div>
      ))}
    </div>
  );
}

// ============ CONTENT VIEWS ============

function DashboardView({ role, onSearch, isLoading }) {
  const quickQuestions = {
    parent: ['When is spring break?', "How is Emma doing?", 'What assignments are due?'],
    student: ['When is spring break?', "What's my grade?", 'What do I have due?'],
    teacher: ['Who has missing work?', 'Students in choir AND dance', 'Parent contact for Liam'],
    admin: ['Families with siblings', 'Students below 3.0 GPA', 'When is Christmas break?']
  };

  if (role === 'parent') {
    return (
      <>
        <AnnouncementBanners role="parent" />
        <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Ask about grades, schedules, or policies..." />
        <QuickChips suggestions={quickQuestions.parent} onSelect={onSearch} />

        {/* Morning Briefing */}
        <Card color="#9ACD32" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <div style={{ fontSize: '32px' }}>☀️</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '18px', color: '#22543D', fontWeight: 'bold', marginBottom: '8px' }}>Good Morning, Sarah!</h3>
              <div style={{ fontSize: '13px', color: '#276749', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '6px' }}>🎄 <strong>Christmas Break</strong> starts today! No classes until January 5</div>
                <div style={{ marginBottom: '6px' }}>📅 <strong>Elem & JH Academics</strong> resume Monday, Jan 5</div>
                <div style={{ marginBottom: '6px' }}>📅 <strong>HS Academics</strong> resume Tuesday, Jan 6</div>
                <div>🏠 <strong>Artios Open House</strong> is Jan 12 at 6:00 PM - Great for inviting new families!</div>
              </div>
            </div>
            <button
              onClick={() => onSearch('Give me a full update on both kids')}
              style={{
                padding: '8px 14px',
                background: '#48BB78',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Full Update →
            </button>
          </div>
        </Card>

        <div className="grid-2" style={{ gap: '20px' }}>
          {mockData.children.map(child => (
            <Card
              key={child.id}
              color={child.color}
              className={child.id === 'emma' ? 'sibling-stripe-emma' : 'sibling-stripe-lucas'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${child.color}20 0%, ${child.color}40 100%)`,
                  border: `2px solid ${child.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: child.color,
                  fontWeight: 'bold'
                }}>
                  {child.initials}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '18px', color: '#2D3748', fontWeight: 'bold', marginBottom: '4px' }}>{child.name}</h3>
                  <span style={{ background: '#EDF2F7', padding: '3px 10px', borderRadius: '10px', fontSize: '11px', color: '#4A5568' }}>{child.grade}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <StatBox label="GPA" value={child.gpa} />
                <StatBox label="Attendance" value={child.attendance} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#A0AEC0', marginBottom: '4px' }}>
                <span className="pulse-dot" style={{ display: 'inline-block', width: '6px', height: '6px', background: '#48BB78', borderRadius: '50%' }}></span>
                NOW IN CLASS
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2D3748' }}>{child.currentClass}</div>
              <div style={{ fontSize: '12px', color: '#718096' }}>{child.room} • {child.teacher}</div>
            </Card>
          ))}

          {/* Next Event - styled like a ticket/invitation */}
          <div className="event-card" style={{
            background: 'linear-gradient(135deg, #805AD5 0%, #6B46C1 100%)',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 8px 30px rgba(128, 90, 213, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative circles like ticket perforations */}
            <div style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', background: '#FAF9F6', borderRadius: '50%' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', letterSpacing: '2px', marginBottom: '6px' }}>🏠 NEXT EVENT</div>
                <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '22px', color: 'white', fontWeight: 'bold', marginBottom: '6px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Artios Open House</h3>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>🏫 Main Campus • 6:00 PM</div>
              </div>
              <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.95)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <div style={{ fontFamily: 'Merriweather, serif', fontSize: '28px', color: '#6B46C1', fontWeight: 'bold' }}>12</div>
                <div style={{ fontSize: '12px', color: '#6B46C1', fontWeight: '600' }}>JAN</div>
              </div>
            </div>
            {/* Ticket stub text */}
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.3)', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
              Invite friends & neighbors to see what Artios is all about!
            </div>
          </div>

          <Card color="#4299E1">
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px' }}>Upcoming Assignments</h3>
            {mockData.assignments.slice(0, 3).map((a, i) => (
              <div key={a.id} style={{ padding: '10px 0', borderBottom: i < 2 ? '1px solid #E2E8F0' : 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: a.urgent ? '#E53E3E' : '#718096' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', color: '#2D3748' }}>{a.title}</div>
                  <div style={{ fontSize: '11px', color: '#A0AEC0' }}>{a.student}</div>
                </div>
                <div style={{ fontSize: '11px', color: a.urgent ? '#E53E3E' : '#718096', fontWeight: a.urgent ? 'bold' : 'normal', marginRight: '8px' }}>{a.due}</div>
                <a
                  href={`https://classroom.google.com/c/${a.courseId}/a/${a.assignmentId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '4px 8px',
                    background: '#4285f4',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '10px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Open →
                </a>
              </div>
            ))}
          </Card>
        </div>
      </>
    );
  }

  if (role === 'student') {
    return (
      <>
        <AnnouncementBanners role="student" />
        <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Ask about assignments, grades, or school events..." />
        <QuickChips suggestions={quickQuestions.student} onSelect={onSearch} />

        <Card color="#6366F1" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#A0AEC0' }}>EM</div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '22px', color: '#2D3748', marginBottom: '4px' }}>Emma Martinez</h2>
              <span style={{ background: '#EDF2F7', padding: '3px 10px', borderRadius: '10px', fontSize: '11px', color: '#4A5568' }}>7th Grade • Junior High</span>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <StatBox label="GPA" value="3.8" />
              <StatBox label="Attendance" value="98%" />
              <StatBox label="Missing" value="1" color="#E53E3E" />
            </div>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Card color="#9ACD32">
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px' }}>📚 My Classes</h3>
            {mockData.classes.slice(0, 4).map((c, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < 3 ? '1px solid #E2E8F0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#2D3748', fontWeight: '500' }}>{c.name}</div>
                  <div style={{ fontSize: '11px', color: '#718096' }}>{c.teacher}</div>
                </div>
                <div style={{
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: c.grade.startsWith('A') ? '#C6F6D5' : c.grade.startsWith('B') ? '#FEFCBF' : '#FED7D7',
                  color: c.grade.startsWith('A') ? '#22543D' : c.grade.startsWith('B') ? '#744210' : '#742A2A',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}>{c.grade}</div>
              </div>
            ))}
          </Card>

          <Card color="#F59E0B">
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px' }}>📝 Due Soon</h3>
            {mockData.assignments.filter(a => a.student === 'Emma').slice(0, 3).map((a, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid #E2E8F0' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: '#2D3748', fontWeight: '500' }}>{a.title}</div>
                    <div style={{ fontSize: '11px', color: '#718096' }}>{a.class}</div>
                  </div>
                  <div style={{ textAlign: 'right', marginRight: '10px' }}>
                    <div style={{ fontSize: '11px', color: a.urgent ? '#E53E3E' : '#718096', fontWeight: a.urgent ? 'bold' : 'normal' }}>{a.due}</div>
                    {a.status === 'missing' && <span style={{ fontSize: '9px', background: '#FED7D7', color: '#742A2A', padding: '2px 5px', borderRadius: '4px' }}>MISSING</span>}
                  </div>
                  <a
                    href={`https://classroom.google.com/c/${a.courseId}/a/${a.assignmentId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '6px 10px',
                      background: '#4285f4',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '11px',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      alignSelf: 'center'
                    }}
                  >
                    Open →
                  </a>
                </div>
              </div>
            ))}
          </Card>

          {/* Handbook Quick Reference for Students */}
          <Card color="#805AD5" style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px' }}>📋 Quick Rules Reminder</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ background: '#F7FAFC', padding: '12px', borderRadius: '10px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>👕</div>
                <div style={{ fontSize: '12px', color: '#2D3748', fontWeight: '500' }}>Dress Code</div>
                <div style={{ fontSize: '11px', color: '#718096' }}>Artios t-shirt + twill/denim pants. No leggings!</div>
              </div>
              <div style={{ background: '#F7FAFC', padding: '12px', borderRadius: '10px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>📱</div>
                <div style={{ fontSize: '12px', color: '#2D3748', fontWeight: '500' }}>Phone Policy</div>
                <div style={{ fontSize: '11px', color: '#718096' }}>Turn in at front desk when you arrive!</div>
              </div>
              <div style={{ background: '#F7FAFC', padding: '12px', borderRadius: '10px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>🥪</div>
                <div style={{ fontSize: '12px', color: '#2D3748', fontWeight: '500' }}>Lunch</div>
                <div style={{ fontSize: '11px', color: '#718096' }}>Bring from home. NO NUTS allowed!</div>
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  }

  if (role === 'teacher') {
    return (
      <>
        <AnnouncementBanners role="teacher" />
        <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Find students, check assignments, get parent contacts..." />
        <QuickChips suggestions={quickQuestions.teacher} onSelect={onSearch} />

        {/* Quick Actions Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <button
            onClick={() => window.open('https://classroom.google.com', '_blank')}
            style={{
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            📚 Open Google Classroom
          </button>
          <button
            onClick={() => onSearch('Sync my grades to FACTS')}
            style={{
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #9ACD32 0%, #7CB342 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            🔄 Sync Grades to FACTS
          </button>
          <button
            onClick={() => onSearch('Email parents of students with missing assignments')}
            style={{
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #805AD5 0%, #6B46C1 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ✉️ Email Parents
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* At-Risk Early Warning */}
          <Card color="#E53E3E">
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px' }}>🚨 At-Risk Students</h3>
            {[
              { name: 'Liam Johnson', issue: 'Grade dropped C+ → C-, 2 missing', trend: '↓', email: 'jennifer.johnson@email.com' },
              { name: 'Noah Williams', issue: '90.3% attendance, chronic tardies', trend: '↓', email: 'sarah.williams@email.com' }
            ].map((s, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < 1 ? '1px solid #E2E8F0' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', color: '#2D3748', fontWeight: '500' }}>{s.name}</span>
                      <span style={{ color: '#E53E3E', fontWeight: 'bold' }}>{s.trend}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#718096' }}>{s.issue}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => onSearch(`Prepare conference notes for ${s.name}`)}
                      style={{ padding: '4px 8px', background: '#EDF2F7', border: 'none', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}
                    >
                      📋 Prep
                    </button>
                    <a
                      href={`mailto:${s.email}?subject=Regarding ${s.name.split(' ')[0]}'s Progress`}
                      style={{ padding: '4px 8px', background: '#4285f4', color: 'white', borderRadius: '4px', fontSize: '10px', textDecoration: 'none' }}
                    >
                      ✉️ Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          {/* Missing Assignments */}
          <Card color="#F59E0B">
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px' }}>📝 Missing Assignments</h3>
            {[
              { student: 'Liam Johnson', assignment: 'Historical Figure Presentation', daysLate: 3 },
              { student: 'Liam Johnson', assignment: 'Chapter 5 Practice Problems', daysLate: 1 },
              { student: 'Emma Martinez', assignment: 'Lab Report: Chemical Reactions', daysLate: 2 }
            ].map((s, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid #E2E8F0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#2D3748', fontWeight: '500' }}>{s.student}</div>
                  <div style={{ fontSize: '11px', color: '#718096' }}>{s.assignment}</div>
                </div>
                <span style={{ fontSize: '10px', background: s.daysLate > 2 ? '#FED7D7' : '#FEFCBF', color: s.daysLate > 2 ? '#742A2A' : '#744210', padding: '3px 8px', borderRadius: '4px' }}>
                  {s.daysLate} day{s.daysLate > 1 ? 's' : ''} late
                </span>
              </div>
            ))}
          </Card>

          {/* My Classes with Grade Sync */}
          <Card color="#9ACD32">
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px' }}>📚 My Classes</h3>
            {[
              { name: 'Academy of Arts & History', period: '1st', students: 12, avgGrade: 'B+', lastSync: '2 days ago' },
              { name: 'Choir', period: '3rd', students: 18, avgGrade: 'A-', lastSync: '1 day ago' }
            ].map((c, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < 1 ? '1px solid #E2E8F0' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: '#2D3748', fontWeight: '500' }}>{c.name}</div>
                    <div style={{ fontSize: '11px', color: '#718096' }}>{c.period} Period • {c.students} students • Avg: {c.avgGrade}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <a
                      href="https://classroom.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ padding: '4px 8px', background: '#4285f4', color: 'white', borderRadius: '4px', fontSize: '10px', textDecoration: 'none' }}
                    >
                      Open →
                    </a>
                    <span style={{ fontSize: '9px', color: '#A0AEC0' }}>Synced: {c.lastSync}</span>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          {/* Recent Submissions */}
          <Card color="#805AD5">
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px' }}>📥 Recent Submissions</h3>
            {[
              { student: 'Sophia Johnson', assignment: 'Historical Figure Presentation', time: '2h ago', status: 'needs_grading' },
              { student: 'Ava Brown', assignment: 'Choir Practice Log', time: '3h ago', status: 'needs_grading' },
              { student: 'Emma Martinez', assignment: 'Renaissance Art Project', time: '5h ago', status: 'graded' }
            ].map((s, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid #E2E8F0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#2D3748', fontWeight: '500' }}>{s.student}</div>
                  <div style={{ fontSize: '11px', color: '#718096' }}>{s.assignment} • {s.time}</div>
                </div>
                {s.status === 'needs_grading' ? (
                  <span style={{ fontSize: '10px', background: '#E9D8FD', color: '#553C9A', padding: '3px 8px', borderRadius: '4px' }}>Grade →</span>
                ) : (
                  <span style={{ fontSize: '10px', background: '#C6F6D5', color: '#22543D', padding: '3px 8px', borderRadius: '4px' }}>✓ Graded</span>
                )}
              </div>
            ))}
          </Card>
        </div>

        {/* Conference Prep Section */}
        <div style={{ marginTop: '20px' }}>
          <Card color="#4299E1">
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px' }}>📋 Quick Conference Prep</h3>
            <p style={{ fontSize: '13px', color: '#718096', marginBottom: '12px' }}>Click a student to generate conference notes with grades, attendance, and talking points.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Emma Martinez', 'Liam Johnson', 'Noah Williams', 'Sophia Johnson'].map(name => (
                <button
                  key={name}
                  onClick={() => onSearch(`Generate conference prep for ${name}`)}
                  style={{
                    padding: '8px 14px',
                    background: '#EBF8FF',
                    border: '1px solid #BEE3F8',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#2B6CB0',
                    cursor: 'pointer'
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </>
    );
  }

  // Admin dashboard with enhanced visuals
  const adminStats = [
    { label: 'Students', value: '247', color: '#9ACD32', trend: [8, 12, 10, 15, 14, 18, 16], change: '+12' },
    { label: 'Families', value: '142', color: '#4299E1', trend: [5, 6, 5, 7, 6, 8, 7], change: '+5' },
    { label: 'Classes', value: '32', color: '#805AD5', trend: [4, 4, 5, 5, 5, 6, 6], change: '' },
    { label: 'Attendance', value: '96%', color: '#48BB78', trend: [92, 94, 95, 93, 96, 95, 96], change: '+2%' }
  ];

  const activityItems = [
    { text: 'New student enrolled: Mason Garcia', time: '10m ago', Icon: UserPlus, iconBg: '#9ACD32' },
    { text: 'Mrs. Anderson updated 12 grades', time: '1h ago', Icon: CheckSquare, iconBg: '#4299E1' },
    { text: 'Martinez family payment received', time: '2h ago', Icon: Receipt, iconBg: '#48BB78' },
    { text: 'Williams requested re-enrollment form', time: '3h ago', Icon: FileEdit, iconBg: '#805AD5' }
  ];

  return (
    <>
      <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Search students, families, run reports..." />
      <QuickChips suggestions={quickQuestions.admin} onSelect={onSearch} />

      {/* Stats with sparklines */}
      <div className="grid-4" style={{ marginBottom: '20px' }}>
        {adminStats.map(stat => (
          <Card key={stat.label} color={stat.color} style={{ padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#718096', marginBottom: '4px' }}>{stat.label}</div>
                <div style={{ fontFamily: 'Merriweather, serif', fontSize: '28px', color: '#2D3748', fontWeight: 'bold' }}>{stat.value}</div>
              </div>
              {/* Mini sparkline */}
              <div className="sparkline" style={{ opacity: 0.6 }}>
                {stat.trend.map((v, i) => (
                  <div key={i} className="sparkline-bar" style={{
                    height: `${(v / Math.max(...stat.trend)) * 100}%`,
                    background: stat.color
                  }}></div>
                ))}
              </div>
            </div>
            {stat.change && (
              <div style={{ fontSize: '11px', color: stat.change.startsWith('+') ? '#48BB78' : '#E53E3E', marginTop: '6px' }}>
                {stat.change} this month
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="grid-2" style={{ gap: '20px' }}>
        {/* Activity feed with color-coded icons */}
        <Card color="#F59E0B">
          <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={16} color="#F59E0B" /> Recent Activity
          </h3>
          {activityItems.map((a, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: i < activityItems.length - 1 ? '1px solid #E2E8F0' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: `${a.iconBg}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <a.Icon size={16} color={a.iconBg} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', color: '#2D3748', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.text}</div>
              </div>
              <div style={{ fontSize: '11px', color: '#A0AEC0', flexShrink: 0 }}>{a.time}</div>
            </div>
          ))}
        </Card>

        <Card color="#E53E3E">
          <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} color="#E53E3E" /> Needs Attention
          </h3>
          {[
            { icon: XCircle, color: '#E53E3E', label: 'Missing Assignments', count: 12, desc: '5 students with 3+ missing' },
            { icon: Clock, color: '#F59E0B', label: 'Attendance Concerns', count: 3, desc: 'Below 90% this month' },
            { icon: AlertTriangle, color: '#805AD5', label: 'Pending Re-enrollments', count: 8, desc: 'Response needed by Dec 20' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '10px 0',
              borderBottom: i < 2 ? '1px solid #E2E8F0' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: `${item.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <item.icon size={18} color={item.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', color: '#2D3748', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.label}
                  <span style={{
                    background: item.color,
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>{item.count}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#718096', marginTop: '2px' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}

function ChildrenView({ onSearch, isLoading }) {
  return (
    <>
      <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Ask about your children..." />
      <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', color: '#2D3748', marginBottom: '20px' }}>My Children</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {mockData.children.map(child => (
          <Card key={child.id} color={child.color}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#A0AEC0' }}>
                {child.initials}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '22px', color: '#2D3748', fontWeight: 'bold', marginBottom: '8px' }}>{child.name}</h3>
                <span style={{ background: '#EDF2F7', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', color: '#4A5568' }}>{child.grade}</span>

                <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                  <StatBox label="GPA" value={child.gpa} />
                  <StatBox label="Attendance" value={child.attendance} />
                </div>

                <div style={{ marginTop: '15px', padding: '12px', background: '#F7FAFC', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#A0AEC0', marginBottom: '4px' }}>CURRENTLY IN</div>
                  <div style={{ fontSize: '14px', color: '#2D3748', fontWeight: '500' }}>{child.currentClass}</div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>{child.room} • {child.teacher}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function CalendarView({ onSearch, isLoading }) {
  return (
    <>
      <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Ask about school events and dates..." />
      <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', color: '#2D3748', marginBottom: '20px' }}>School Calendar</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {mockData.calendarEvents.map((event, i) => (
          <Card key={i} color={i === 0 ? '#E57373' : '#4299E1'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: i === 0 ? '#FFF5F5' : '#EBF8FF',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: i === 0 ? '#E57373' : '#4299E1' }}>{event.date.split(' ')[0]}</div>
                <div style={{ fontFamily: 'Merriweather, serif', fontSize: '20px', color: i === 0 ? '#E57373' : '#4299E1', fontWeight: 'bold' }}>{event.date.split(' ')[1] || ''}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '18px', color: '#2D3748', fontWeight: 'bold', marginBottom: '4px' }}>{event.title}</h3>
                {event.time && <div style={{ fontSize: '13px', color: '#718096' }}>{event.time}{event.location && ` • ${event.location}`}</div>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function StudentsView({ onSearch, isLoading, role }) {
  const students = role === 'teacher'
    ? mockData.students.filter(s => ['Emma Martinez', 'Liam Johnson', 'Sophia Johnson'].includes(s.name))
    : mockData.students;

  return (
    <>
      <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Search students by name, grade, or program..." />
      <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', color: '#2D3748', marginBottom: '20px' }}>
        {role === 'teacher' ? 'My Students' : 'All Students'}
      </h2>

      <div className="grid-2">
        {students.map((student, i) => (
          <Card key={i} color={parseFloat(student.gpa) >= 3.5 ? '#48BB78' : parseFloat(student.gpa) >= 3.0 ? '#F59E0B' : '#E53E3E'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#A0AEC0' }}>
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '4px' }}>{student.name}</h3>
                <div style={{ fontSize: '12px', color: '#718096' }}>{student.grade} Grade • GPA: {student.gpa}</div>
                <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
                  {student.programs.map(p => (
                    <span key={p} style={{ fontSize: '10px', background: '#EDF2F7', padding: '2px 6px', borderRadius: '4px', color: '#4A5568' }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function FamiliesView({ onSearch, isLoading }) {
  return (
    <>
      <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Search families..." />
      <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', color: '#2D3748', marginBottom: '20px' }}>All Families</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {mockData.families.map((family, i) => (
          <Card key={i} color="#805AD5">
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '18px', color: '#2D3748', fontWeight: 'bold', marginBottom: '8px' }}>{family.name}</h3>
            <div style={{ fontSize: '13px', color: '#718096', marginBottom: '8px' }}>Children: {family.children.join(', ')}</div>
            <div style={{ fontSize: '12px', color: '#4299E1', marginBottom: '10px' }}>{family.contact}</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {family.programs.map(p => (
                <span key={p} style={{ fontSize: '11px', background: '#EDF2F7', padding: '3px 8px', borderRadius: '6px', color: '#4A5568' }}>{p}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function ClassesView({ onSearch, isLoading }) {
  return (
    <>
      <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Search classes..." />
      <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', color: '#2D3748', marginBottom: '20px' }}>Classes</h2>

      <div className="grid-2">
        {mockData.classes.map((cls, i) => (
          <Card key={i} color="#9ACD32">
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '16px', color: '#2D3748', fontWeight: 'bold', marginBottom: '8px' }}>{cls.name}</h3>
            <div style={{ fontSize: '13px', color: '#718096', marginBottom: '10px' }}>{cls.teacher} • Room {cls.room}</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <StatBox label="Students" value={cls.students} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function AssignmentsView({ onSearch, isLoading, studentFilter }) {
  const assignments = studentFilter
    ? mockData.assignments.filter(a => a.student === studentFilter)
    : mockData.assignments;

  const openInClassroom = (assignment) => {
    const url = `https://classroom.google.com/c/${assignment.courseId}/a/${assignment.assignmentId}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Search assignments..." />
      <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', color: '#2D3748', marginBottom: '20px' }}>Assignments</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {assignments.map((assignment) => (
          <Card key={assignment.id} color={assignment.urgent ? '#E53E3E' : '#4299E1'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '4px' }}>{assignment.title}</h3>
                <div style={{ fontSize: '12px', color: '#718096' }}>{assignment.class} • {assignment.student}</div>
              </div>
              <div style={{ textAlign: 'right', marginRight: '15px' }}>
                <div style={{ fontSize: '13px', color: assignment.urgent ? '#E53E3E' : '#718096', fontWeight: assignment.urgent ? 'bold' : 'normal' }}>{assignment.due}</div>
                {assignment.status === 'missing' && (
                  <span style={{ fontSize: '10px', background: '#FED7D7', color: '#742A2A', padding: '2px 6px', borderRadius: '4px' }}>MISSING</span>
                )}
              </div>
              <button
                onClick={() => openInClassroom(assignment)}
                style={{
                  padding: '8px 12px',
                  background: 'linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                📚 View in Classroom
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function GradesView({ onSearch, isLoading }) {
  return (
    <>
      <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Ask about grades..." />
      <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', color: '#2D3748', marginBottom: '20px' }}>My Grades</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {mockData.classes.map((cls, i) => (
          <Card key={i} color={cls.grade.startsWith('A') ? '#48BB78' : cls.grade.startsWith('B') ? '#F59E0B' : '#E53E3E'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '16px', color: '#2D3748', fontWeight: 'bold', marginBottom: '4px' }}>{cls.name}</h3>
                <div style={{ fontSize: '13px', color: '#718096' }}>{cls.teacher}</div>
              </div>
              <div style={{
                padding: '8px 20px',
                borderRadius: '10px',
                background: cls.grade.startsWith('A') ? '#C6F6D5' : cls.grade.startsWith('B') ? '#FEFCBF' : '#FED7D7',
                color: cls.grade.startsWith('A') ? '#22543D' : cls.grade.startsWith('B') ? '#744210' : '#742A2A',
                fontWeight: 'bold',
                fontSize: '20px'
              }}>{cls.grade}</div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function PoliciesView({ onSearch, isLoading }) {
  return (
    <>
      <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Ask about school policies... (e.g., 'Can my child wear leggings?')" />
      <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', color: '#2D3748', marginBottom: '10px' }}>Artios Handbook Quick Reference</h2>
      <p style={{ fontSize: '13px', color: '#718096', marginBottom: '20px' }}>Key policies from the Artios Academies Student/Family Handbook. Ask the AI for more details!</p>

      {/* Grading Scale Card */}
      <Card color="#48BB78" style={{ marginBottom: '20px' }}>
        <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '16px', color: '#2D3748', fontWeight: 'bold', marginBottom: '12px' }}>📊 Grading Scale</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '10px' }}>
          {Object.entries(mockData.gradingScale).filter(([k]) => k !== 'note').map(([grade, range]) => (
            <div key={grade} style={{ background: '#F0FFF4', padding: '8px 16px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22543D' }}>{grade}</div>
              <div style={{ fontSize: '12px', color: '#276749' }}>{range}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: '#718096', margin: 0, fontStyle: 'italic' }}>{mockData.gradingScale.note}</p>
      </Card>

      <div className="grid-2">
        {mockData.policies.map((policy, i) => (
          <Card key={i} color={policy.title === 'Dress Code' ? '#9ACD32' : policy.title === 'Lunch Policy' ? '#E53E3E' : '#805AD5'}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ fontSize: '28px' }}>{policy.icon}</div>
              <div>
                <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '6px' }}>{policy.title}</h3>
                <p style={{ fontSize: '13px', color: '#718096', lineHeight: '1.5', margin: 0 }}>{policy.summary}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#EBF8FF', borderRadius: '12px', border: '1px solid #BEE3F8' }}>
        <p style={{ fontSize: '13px', color: '#2B6CB0', margin: 0 }}>
          💡 <strong>Tip:</strong> Ask the AI questions like "Can my child wear leggings?", "What's the dress code?", or "Do I need to wear an Artios t-shirt?" for instant answers!
        </p>
      </div>
    </>
  );
}

function PaymentsView({ onSearch, isLoading }) {
  return (
    <>
      <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Ask about payments and fees..." />
      <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', color: '#2D3748', marginBottom: '20px' }}>Payments</h2>

      <Card color="#48BB78" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#718096', marginBottom: '4px' }}>Account Status</div>
            <div style={{ fontSize: '20px', color: '#2D3748', fontWeight: 'bold' }}>Current</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#718096', marginBottom: '4px' }}>Next Payment Due</div>
            <div style={{ fontSize: '20px', color: '#2D3748', fontWeight: 'bold' }}>Jan 1, 2025</div>
          </div>
        </div>
      </Card>

      <h3 style={{ fontSize: '16px', color: '#2D3748', marginBottom: '12px' }}>Recent Transactions</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { date: 'Dec 1, 2024', desc: 'Monthly Tuition - December', amount: '$450.00' },
          { date: 'Nov 15, 2024', desc: 'Activity Fee - Winter Concert', amount: '$25.00' },
          { date: 'Nov 1, 2024', desc: 'Monthly Tuition - November', amount: '$450.00' }
        ].map((tx, i) => (
          <Card key={i} color="#4299E1" style={{ padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#2D3748', fontWeight: '500' }}>{tx.desc}</div>
                <div style={{ fontSize: '12px', color: '#718096' }}>{tx.date}</div>
              </div>
              <div style={{ fontSize: '16px', color: '#2D3748', fontWeight: 'bold' }}>{tx.amount}</div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function ContentManagementView({ onSearch, isLoading }) {
  const [activeTab, setActiveTab] = useState('announcements');
  const [content, setContent] = useState({ announcements: [], customFaqs: [], policyUpdates: [] });
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch content on mount
  useEffect(() => {
    fetch(`${API_URL}/api/admin/content`)
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Failed to fetch content:', err));
  }, []);

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newItem = await res.json();
      setContent(prev => ({ ...prev, announcements: [newItem, ...prev.announcements] }));
      setFormData({});
    } catch (err) {
      console.error('Failed to add announcement:', err);
    }
    setLoading(false);
  };

  const handleAddFaq = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/faqs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newItem = await res.json();
      setContent(prev => ({ ...prev, customFaqs: [newItem, ...prev.customFaqs] }));
      setFormData({});
    } catch (err) {
      console.error('Failed to add FAQ:', err);
    }
    setLoading(false);
  };

  const handleAddPolicy = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/policies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newItem = await res.json();
      setContent(prev => ({ ...prev, policyUpdates: [newItem, ...prev.policyUpdates] }));
      setFormData({});
    } catch (err) {
      console.error('Failed to add policy:', err);
    }
    setLoading(false);
  };

  const handleDelete = async (type, id) => {
    try {
      await fetch(`${API_URL}/api/admin/${type}/${id}`, { method: 'DELETE' });
      setContent(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.id !== id)
      }));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const tabs = [
    { id: 'announcements', label: '📢 Announcements', count: content.announcements?.length || 0 },
    { id: 'customFaqs', label: '❓ Custom FAQs', count: content.customFaqs?.length || 0 },
    { id: 'policyUpdates', label: '📜 Policy Updates', count: content.policyUpdates?.length || 0 }
  ];

  const inputStyle = {
    width: '100%',
    padding: '10px 15px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '12px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#9ACD32',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  };

  return (
    <>
      <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', color: '#2D3748', marginBottom: '10px' }}>Manage Content</h2>
      <p style={{ fontSize: '13px', color: '#718096', marginBottom: '20px' }}>Add announcements, FAQs, and policy updates that the AI will use to answer questions.</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              background: activeTab === tab.id ? '#9ACD32' : 'white',
              color: activeTab === tab.id ? 'white' : '#4A5568',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {tab.label}
            <span style={{
              background: activeTab === tab.id ? 'rgba(255,255,255,0.3)' : '#EDF2F7',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '12px'
            }}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Form */}
        <Card color="#9ACD32">
          <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '16px', color: '#2D3748', fontWeight: 'bold', marginBottom: '15px' }}>
            {activeTab === 'announcements' && '➕ Add Announcement'}
            {activeTab === 'customFaqs' && '➕ Add Custom FAQ'}
            {activeTab === 'policyUpdates' && '➕ Add Policy Update'}
          </h3>

          {activeTab === 'announcements' && (
            <form onSubmit={handleAddAnnouncement}>
              <input
                type="text"
                placeholder="Announcement Title"
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                style={inputStyle}
                required
              />
              <textarea
                placeholder="Announcement Content"
                value={formData.content || ''}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                required
              />
              <select
                value={formData.priority || 'normal'}
                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                style={inputStyle}
              >
                <option value="normal">Normal Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <select
                value={formData.audience || 'all'}
                onChange={e => setFormData({ ...formData, audience: e.target.value })}
                style={inputStyle}
              >
                <option value="all">All Users</option>
                <option value="parents">Parents Only</option>
                <option value="students">Students Only</option>
                <option value="teachers">Teachers Only</option>
              </select>
              <button type="submit" disabled={loading} style={buttonStyle}>
                {loading ? 'Adding...' : 'Add Announcement'}
              </button>
            </form>
          )}

          {activeTab === 'customFaqs' && (
            <form onSubmit={handleAddFaq}>
              <input
                type="text"
                placeholder="Question (e.g., 'When is the next spirit day?')"
                value={formData.question || ''}
                onChange={e => setFormData({ ...formData, question: e.target.value })}
                style={inputStyle}
                required
              />
              <textarea
                placeholder="Answer"
                value={formData.answer || ''}
                onChange={e => setFormData({ ...formData, answer: e.target.value })}
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                required
              />
              <button type="submit" disabled={loading} style={buttonStyle}>
                {loading ? 'Adding...' : 'Add FAQ'}
              </button>
            </form>
          )}

          {activeTab === 'policyUpdates' && (
            <form onSubmit={handleAddPolicy}>
              <input
                type="text"
                placeholder="Policy Title"
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                style={inputStyle}
                required
              />
              <textarea
                placeholder="Policy Content"
                value={formData.content || ''}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                required
              />
              <button type="submit" disabled={loading} style={buttonStyle}>
                {loading ? 'Adding...' : 'Add Policy Update'}
              </button>
            </form>
          )}
        </Card>

        {/* List */}
        <Card color="#4299E1">
          <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '16px', color: '#2D3748', fontWeight: 'bold', marginBottom: '15px' }}>
            Current Items
          </h3>

          {activeTab === 'announcements' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {content.announcements?.length === 0 && (
                <p style={{ fontSize: '13px', color: '#718096', fontStyle: 'italic' }}>No announcements yet. Add one to get started!</p>
              )}
              {content.announcements?.map(item => (
                <div key={item.id} style={{ padding: '12px', background: '#F7FAFC', borderRadius: '8px', borderLeft: `4px solid ${item.priority === 'urgent' ? '#E53E3E' : item.priority === 'high' ? '#F59E0B' : '#9ACD32'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', color: '#2D3748', fontWeight: '600', marginBottom: '4px' }}>{item.title}</h4>
                      <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>{item.content}</p>
                      <div style={{ fontSize: '11px', color: '#A0AEC0', marginTop: '6px' }}>
                        {item.priority.toUpperCase()} • {item.audience} • {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete('announcements', item.id)}
                      style={{ background: 'none', border: 'none', color: '#E53E3E', cursor: 'pointer', fontSize: '16px' }}
                    >×</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'customFaqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {content.customFaqs?.length === 0 && (
                <p style={{ fontSize: '13px', color: '#718096', fontStyle: 'italic' }}>No custom FAQs yet. Add one to get started!</p>
              )}
              {content.customFaqs?.map(item => (
                <div key={item.id} style={{ padding: '12px', background: '#F7FAFC', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', color: '#2D3748', fontWeight: '600', marginBottom: '4px' }}>Q: {item.question}</h4>
                      <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>A: {item.answer}</p>
                    </div>
                    <button
                      onClick={() => handleDelete('faqs', item.id)}
                      style={{ background: 'none', border: 'none', color: '#E53E3E', cursor: 'pointer', fontSize: '16px' }}
                    >×</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'policyUpdates' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {content.policyUpdates?.length === 0 && (
                <p style={{ fontSize: '13px', color: '#718096', fontStyle: 'italic' }}>No policy updates yet. Add one to get started!</p>
              )}
              {content.policyUpdates?.map(item => (
                <div key={item.id} style={{ padding: '12px', background: '#F7FAFC', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', color: '#2D3748', fontWeight: '600', marginBottom: '4px' }}>{item.title}</h4>
                      <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>{item.content}</p>
                      <div style={{ fontSize: '11px', color: '#A0AEC0', marginTop: '6px' }}>
                        Effective: {new Date(item.effectiveDate).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete('policies', item.id)}
                      style={{ background: 'none', border: 'none', color: '#E53E3E', cursor: 'pointer', fontSize: '16px' }}
                    >×</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#EBF8FF', borderRadius: '12px', border: '1px solid #BEE3F8' }}>
        <p style={{ fontSize: '13px', color: '#2B6CB0', margin: 0 }}>
          💡 <strong>Tip:</strong> Content you add here will be automatically included in the AI's knowledge. Parents, students, and teachers can ask about announcements and get accurate answers!
        </p>
      </div>
    </>
  );
}

function ReportsView({ onSearch, isLoading }) {
  return (
    <>
      <MuseBar onSubmit={onSearch} isLoading={isLoading} placeholder="Generate reports..." />
      <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', color: '#2D3748', marginBottom: '20px' }}>Reports</h2>

      <div className="grid-2">
        {[
          { title: 'Enrollment Report', desc: 'Student counts by grade and program', Icon: PieChart, color: '#805AD5' },
          { title: 'Attendance Report', desc: 'Daily and weekly attendance summaries', Icon: CalendarDays, color: '#3182CE' },
          { title: 'Grade Distribution', desc: 'GPA and grade breakdowns by class', Icon: TrendingUp, color: '#38A169' },
          { title: 'Missing Assignments', desc: 'Students with overdue work', Icon: AlertTriangle, color: '#DD6B20' }
        ].map((report, i) => (
          <Card key={i} color={report.color} onClick={() => onSearch(`Generate ${report.title}`)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${report.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <report.Icon size={24} color={report.color} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', color: '#2D3748', fontWeight: 'bold', marginBottom: '4px' }}>{report.title}</h3>
                <div style={{ fontSize: '12px', color: '#718096' }}>{report.desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

// ============ MAIN APP ============

// Custom hook for responsive detection
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

function App() {
  const [currentRole, setCurrentRole] = useState('parent');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isMobile = useIsMobile();
  const config = roleConfig[currentRole];
  const userName = config.userName;

  // Reset nav when role changes
  useEffect(() => {
    setActiveNav('dashboard');
    setMessages([]);
  }, [currentRole]);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [activeNav, isMobile]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleSearch = async (query) => {
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, role: currentRole, sessionId })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}. Make sure the backend server is running.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    // Common views
    if (activeNav === 'calendar') return <CalendarView onSearch={handleSearch} isLoading={isLoading} />;
    if (activeNav === 'classes') return <ClassesView onSearch={handleSearch} isLoading={isLoading} />;

    // Role-specific views
    switch (currentRole) {
      case 'parent':
        if (activeNav === 'children') return <ChildrenView onSearch={handleSearch} isLoading={isLoading} />;
        if (activeNav === 'payments') return <PaymentsView onSearch={handleSearch} isLoading={isLoading} />;
        if (activeNav === 'policies') return <PoliciesView onSearch={handleSearch} isLoading={isLoading} />;
        break;
      case 'student':
        if (activeNav === 'assignments') return <AssignmentsView onSearch={handleSearch} isLoading={isLoading} studentFilter="Emma" />;
        if (activeNav === 'grades') return <GradesView onSearch={handleSearch} isLoading={isLoading} />;
        break;
      case 'teacher':
        if (activeNav === 'students') return <StudentsView onSearch={handleSearch} isLoading={isLoading} role="teacher" />;
        if (activeNav === 'grades') return <GradesView onSearch={handleSearch} isLoading={isLoading} />;
        break;
      case 'admin':
        if (activeNav === 'students') return <StudentsView onSearch={handleSearch} isLoading={isLoading} role="admin" />;
        if (activeNav === 'families') return <FamiliesView onSearch={handleSearch} isLoading={isLoading} />;
        if (activeNav === 'reports') return <ReportsView onSearch={handleSearch} isLoading={isLoading} />;
        if (activeNav === 'content') return <ContentManagementView onSearch={handleSearch} isLoading={isLoading} />;
        break;
    }

    // Default: Dashboard
    return <DashboardView role={currentRole} onSearch={handleSearch} isLoading={isLoading} />;
  };

  const getPageTitle = () => {
    if (activeNav === 'dashboard') {
      // For names with titles (Mrs., Mr., Dr., etc.), show the full name
      const nameParts = userName.split(' ');
      const displayName = nameParts[0].endsWith('.') ? userName : nameParts[0];
      return `${greeting()}, ${displayName}!`;
    }
    const navItem = config.navItems.find(n => n.id === activeNav);
    return navItem ? navItem.label : 'Dashboard';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        currentRole={currentRole}
        userName={userName}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        isMobile={isMobile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main style={{
        marginLeft: isMobile ? 0 : '300px',
        flex: 1,
        padding: isMobile ? '16px' : '30px 40px',
        marginRight: !isMobile && (messages.length > 0 || isLoading) ? '400px' : 0,
        transition: 'margin-right 0.3s ease',
        minWidth: 0
      }}>
        {/* Mobile Header */}
        {isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            padding: '12px 16px',
            margin: '-16px -16px 16px -16px',
            background: 'linear-gradient(135deg, rgba(69, 90, 76, 0.98) 0%, rgba(55, 75, 65, 0.98) 100%)',
            borderRadius: '0 0 20px 20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Menu size={22} color="white" />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(154, 205, 50, 0.2)',
                border: '1.5px solid rgba(154, 205, 50, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={artiosLogo} alt="Artios" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: 'Merriweather, serif', fontSize: '16px', color: 'white', fontWeight: 'bold' }}>
                ArtiosConnect
              </span>
            </div>

            <RoleSwitcher
              value={currentRole}
              onChange={setCurrentRole}
              variant="dark"
            />
          </div>
        )}

        {/* Page Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: isMobile ? '16px' : '25px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <h1 style={{
              fontFamily: 'Merriweather, serif',
              fontSize: isMobile ? '24px' : '32px',
              color: '#2D3748',
              fontWeight: 'bold',
              marginBottom: '6px'
            }}>
              {getPageTitle()}
            </h1>
            {activeNav === 'dashboard' && (
              <p className="gradient-text" style={{
                fontFamily: 'Merriweather, serif',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                fontStyle: 'italic'
              }}>
                Art. Heart. Smart.
              </p>
            )}
          </div>

          {/* Desktop role switcher */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#718096' }}>Viewing as:</span>
              <RoleSwitcher
                value={currentRole}
                onChange={setCurrentRole}
                variant="light"
              />
            </div>
          )}
        </div>

        {renderContent()}
      </main>

      <AIResponsePanel
        messages={messages}
        isLoading={isLoading}
        onClose={() => setMessages([])}
        onAskFollowUp={handleSearch}
        isMobile={isMobile}
      />
    </div>
  );
}

export default App;
