import React from 'react';
import {
  Calendar,
  ExternalLink,
  Users,
  Home,
  BookOpen,
  Info,
  FileText,
  Heart,
  Phone,
  Mail,
  GraduationCap,
  HelpCircle,
  CheckCircle,
  Download,
} from 'lucide-react';

// Icon mapping for dynamic icon rendering
const iconMap = {
  calendar: Calendar,
  external: ExternalLink,
  users: Users,
  home: Home,
  book: BookOpen,
  info: Info,
  file: FileText,
  heart: Heart,
  phone: Phone,
  mail: Mail,
  graduation: GraduationCap,
  help: HelpCircle,
  check: CheckCircle,
  download: Download,
};

/**
 * IconComponent
 * Renders a Lucide icon by name
 *
 * @param {Object} props
 * @param {string} props.name - Icon name from iconMap
 * @param {number} props.size - Icon size in pixels
 * @param {string} props.className - Additional CSS classes
 */
const IconComponent = ({ name, size = 20, className = '' }) => {
  const Icon = iconMap[name] || ExternalLink;
  return <Icon size={size} className={className} />;
};

export default IconComponent;
export { iconMap };
