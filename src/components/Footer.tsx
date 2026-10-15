import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  FileDown,
  Globe2
} from 'lucide-react';
import { resumeData } from '../data/resume';
import { soundEngine } from '../utils/sound';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/80 backdrop-blur-md pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-200 items-start">
          {/* Brand & Identity */}
          <div className="md:col-span-6 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-display font-bold text-xs shadow-xs">
                FR
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-slate-900">
                FAISAL REHMAN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
              Software Engineer &bull; Full-Stack Developer with a background in Artificial Intelligence and Data Science from VTU. Building practical applications, integrating APIs, and managing database systems.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{resumeData.personal.location} &bull; Open to Roles (Dubai &amp; UAE / Global)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-900 block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <a href="#hero" className="hover:text-blue-600 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-600 transition-colors">About Me</a>
              </li>
              <li>
                <a href="#skills-globe" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>3D Skills Sphere</span>
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-600 transition-colors">Technical Skills</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-600 transition-colors">Featured Projects</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-blue-600 transition-colors">Professional Experience</a>
              </li>
              <li>
                <a href="#education" className="hover:text-blue-600 transition-colors">Education</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-3 space-y-3.5">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-900 block mb-2">
              Direct Channels
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href={resumeData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 hover:text-slate-900 transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-slate-600" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub: /faisalrehman07</span>
              </a>
              <a
                href={resumeData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 hover:text-blue-600 transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64c0-.91-.73-1.64-1.64-1.64a1.64 1.64 0 0 0-1.64 1.64c0 .91.73 1.64 1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                </svg>
                <span>LinkedIn: /in/faisal-rehman</span>
              </a>
              <a
                href={`mailto:${resumeData.personal.email}`}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>{resumeData.personal.email}</span>
              </a>
              <a
                href={`tel:${resumeData.personal.phone}`}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 hover:text-indigo-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-indigo-600" />
                <span>{resumeData.personal.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} Faisal Rehman. Professional Software Engineer Portfolio. Source of truth: verified resume.
          </p>

          <div className="flex items-center gap-3">
            <a
              href={resumeData.personal.resumeUrl}
              download="FAISAL_REHMAN_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-2xs"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-600" />
              <span>Download Resume PDF</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
              title="Return to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
