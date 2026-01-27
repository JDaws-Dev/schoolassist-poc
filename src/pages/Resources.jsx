import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  Clock,
  BookOpen,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Calendar,
  UtensilsCrossed,
  Building2
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

// Section Header Component for consistent styling
function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {Icon && (
        <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      )}
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}

// Animated FAQ Item Component
function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-gray-200 transition-colors">
      <button
        onClick={onToggle}
        className="flex items-center gap-3 p-4 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      >
        <div className={`p-1.5 rounded-lg transition-colors ${isOpen ? 'bg-blue-100' : 'bg-gray-100'}`}>
          <HelpCircle className={`w-4 h-4 transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-500'}`} />
        </div>
        <span className="font-medium text-gray-900 flex-1 text-sm">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pl-14 border-t border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed pt-3">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Resources() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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

      <div className="px-4 py-6 max-w-lg mx-auto space-y-8">
        {/* Quick Links */}
        <section>
          <SectionHeader
            icon={ExternalLink}
            title="Quick Links"
            subtitle="Access important resources"
          />
          <div className="space-y-3">
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
                  className="group flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100
                           hover:shadow-lg hover:border-blue-200 hover:bg-gradient-to-r hover:from-white hover:to-blue-50/50
                           transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <div className={`p-2.5 rounded-xl ${link.color} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{link.title}</p>
                    <p className="text-sm text-gray-500 truncate">{link.description}</p>
                  </div>
                  {link.internal ? (
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  ) : (
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  )}
                </Component>
              );
            })}
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <SectionHeader
            icon={Building2}
            title="Contact Us"
            subtitle="Get in touch with the school"
          />
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* School Name Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
              <h3 className="font-semibold text-white text-lg">{CONTACT_INFO.name}</h3>
              <p className="text-blue-100 text-sm mt-0.5">{CONTACT_INFO.address}</p>
            </div>

            {/* Contact Details */}
            <div className="p-5 space-y-4">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-4 p-3 rounded-xl bg-white border border-gray-100
                         hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
                  <p className="text-blue-600 font-medium group-hover:text-blue-700">{CONTACT_INFO.email}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </a>

              <div className="flex items-center gap-4 p-3 rounded-xl bg-white border border-gray-100">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Office Hours</p>
                  <p className="text-gray-900 font-medium">{CONTACT_INFO.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <SectionHeader
            icon={HelpCircle}
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions"
          />
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQ === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </section>

        {/* Documents */}
        <section>
          <SectionHeader
            icon={FileText}
            title="Documents"
            subtitle="Important school documents"
          />
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {[
              { name: 'Parent Handbook', color: 'text-blue-600 bg-blue-100' },
              { name: 'Academic Calendar', color: 'text-purple-600 bg-purple-100' },
              { name: 'Supply Lists', color: 'text-amber-600 bg-amber-100' }
            ].map((doc, index, arr) => (
              <a
                key={doc.name}
                href="https://factsmgt.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 transition-all
                          ${index !== arr.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className={`p-2 rounded-lg ${doc.color} group-hover:scale-110 transition-transform`}>
                  <FileText className="w-5 h-5" />
                </div>
                <span className="flex-1 font-medium text-gray-900 group-hover:text-blue-700 transition-colors">{doc.name}</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
