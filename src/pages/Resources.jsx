import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Clock,
  BookOpen,
  FileText,
  HelpCircle,
  ChevronRight,
  Calendar,
  UtensilsCrossed
} from 'lucide-react';

const QUICK_LINKS = [
  {
    title: 'FACTS Family Portal',
    description: 'Grades, attendance, schedules',
    url: 'https://factsmgt.com',
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Artios Cafe',
    description: 'Order student lunches',
    url: 'https://artioscafe.com',
    icon: UtensilsCrossed,
    color: 'bg-amber-100 text-amber-600'
  },
  {
    title: 'School Calendar',
    description: 'Events and important dates',
    url: '/calendar',
    internal: true,
    icon: Calendar,
    color: 'bg-purple-100 text-purple-600'
  }
];

const FAQ_ITEMS = [
  {
    question: 'What is the school schedule?',
    answer: 'Elementary students attend on Monday/Wednesday. Jr High & High School students attend on Tuesday/Thursday. Friday is a home learning day with optional enrichment activities.'
  },
  {
    question: 'What time do doors open?',
    answer: 'Doors open at 8:45 AM. Classes begin at 9:00 AM. Dismissal times vary by grade level - check FACTS for your student\'s specific dismissal time.'
  },
  {
    question: 'How do I order lunch?',
    answer: 'Lunch orders can be placed through artioscafe.com. Orders must be submitted by 9:00 AM on the day of service. If you miss the deadline, please send a packed lunch with your student.'
  },
  {
    question: 'What is the dress code?',
    answer: 'Students should wear modest, neat, and clean attire. No clothing with inappropriate graphics or messages. Closed-toe shoes are recommended for safety. Athletic wear is acceptable on PE days.'
  },
  {
    question: 'How do I contact the school?',
    answer: 'For non-urgent matters, email info@artiosacademies.com. For urgent matters, contact the front office directly through the phone number listed in FACTS.'
  },
  {
    question: 'What if my student is absent?',
    answer: 'Please report absences through FACTS or by contacting the front office before 9:00 AM. Provide a reason for the absence and expected return date.'
  }
];

const CONTACT_INFO = {
  name: 'Artios Academies of Sugar Hill',
  email: 'info@artiosacademies.com',
  address: 'Sugar Hill, GA',
  hours: 'Monday-Thursday: 8:30 AM - 3:30 PM'
};

export default function Resources() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link
          to="/"
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="font-semibold text-gray-900">Resources & Info</h1>
      </header>

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Quick Links */}
        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Quick Links</h2>
          <div className="space-y-2">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              const Component = link.internal ? Link : 'a';
              const props = link.internal
                ? { to: link.url }
                : { href: link.url, target: '_blank', rel: 'noopener noreferrer' };

              return (
                <Component
                  key={link.title}
                  {...props}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`p-2 rounded-lg ${link.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{link.title}</p>
                    <p className="text-sm text-gray-500">{link.description}</p>
                  </div>
                  {link.internal ? (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  )}
                </Component>
              );
            })}
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Contact</h2>
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">{CONTACT_INFO.name}</p>
                <p className="text-sm text-gray-500">{CONTACT_INFO.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-blue-600 hover:underline"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <p className="text-sm text-gray-600">{CONTACT_INFO.hours}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <details
                key={index}
                className="bg-white rounded-xl shadow-sm group"
              >
                <summary className="flex items-center gap-3 p-4 cursor-pointer list-none">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-gray-900 flex-1">{item.question}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 pb-4 pl-12">
                  <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Documents */}
        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Documents</h2>
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
            <a
              href="https://factsmgt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="flex-1 text-gray-900">Parent Handbook</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
            <a
              href="https://factsmgt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="flex-1 text-gray-900">Academic Calendar</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
            <a
              href="https://factsmgt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="flex-1 text-gray-900">Supply Lists</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
