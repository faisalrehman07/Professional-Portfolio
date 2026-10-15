import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Clock, 
  ArrowUpRight, 
  MessageSquare, 
  Phone 
} from 'lucide-react';
import { resumeData } from '../data/resume';
import { triggerConfetti } from '../utils/confetti';
import { soundEngine } from '../utils/sound';
import { useToast } from './Toast';

interface ContactProps {
  initialSubject?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialSubject = '' }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [bengaluruTime, setBengaluruTime] = useState('');
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject,
    message: ''
  });
  const [prevSubject, setPrevSubject] = useState(initialSubject);

  if (initialSubject !== prevSubject) {
    setPrevSubject(initialSubject);
    setFormData(prev => ({ ...prev, subject: initialSubject }));
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setBengaluruTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    soundEngine.playSuccess();
    triggerConfetti();
    if (type === 'email') {
      setCopiedEmail(true);
      showToast('Copied email to clipboard!', 'success');
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      showToast('Copied phone to clipboard!', 'success');
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEngine.playSuccess();
    triggerConfetti();
    showToast('Launching your email client to send message...', 'success');

    const mailtoUrl = `mailto:${resumeData.personal.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Hello Faisal,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-white/40 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3 shadow-2xs">
            <Send className="w-3.5 h-3.5 text-blue-600" />
            <span>Direct Channels</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-3">
            Let&rsquo;s Build <span className="tech-gradient-text">Something Meaningful</span>.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
            I'm interested in opportunities to contribute to software development, full-stack applications, and practical AI-powered solutions.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Communication Channels & Live Status */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between group interactive-card shadow-xs">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <button
                  onClick={() => copyToClipboard(resumeData.personal.email, 'email')}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">
                  Email Address
                </span>
                <a
                  href={`mailto:${resumeData.personal.email}`}
                  className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors break-all"
                >
                  {resumeData.personal.email}
                </a>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group interactive-card shadow-xs">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <button
                  onClick={() => copyToClipboard(resumeData.personal.phone, 'phone')}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPhone ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">
                  Contact Number (From Resume)
                </span>
                <a
                  href={`tel:${resumeData.personal.phone}`}
                  className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  {resumeData.personal.phone}
                </a>
              </div>
            </div>

            {/* LinkedIn Profile Card */}
            <a
              href={resumeData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between group block interactive-card shadow-xs"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64c0-.91-.73-1.64-1.64-1.64a1.64 1.64 0 0 0-1.64 1.64c0 .91.73 1.64 1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">LinkedIn Profile</span>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    linkedin.com/in/faisal-rehman-377731237
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            {/* GitHub Profile Card */}
            <a
              href={resumeData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-400 transition-all flex items-center justify-between group block interactive-card shadow-xs"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">GitHub Profile</span>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    github.com/faisalrehman07
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            {/* Location & Local Clock */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-slate-800 font-semibold">{resumeData.personal.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{bengaluruTime || 'IST (UTC+5:30)'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-lg interactive-card">
              <h3 className="text-xl font-bold font-display text-slate-900 mb-2 flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Send a Direct Message</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Connect regarding software development, full-stack engineering, or AI integration roles. 
                Submitting this form prepares a pre-filled direct message in your email client addressed to Faisal.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Full-Stack Software Engineering Opportunity - Dubai"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message, project specifications, or role details here..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-2xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Faisal Rehman</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
