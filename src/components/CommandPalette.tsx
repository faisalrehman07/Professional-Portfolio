import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Terminal, 
  FileDown, 
  FileText, 
  Mail, 
  Phone, 
  Home,
  Zap, 
  ArrowRight, 
  Layers, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Compass, 
  Code2,
  Sun,
  Moon
} from 'lucide-react';
import { resumeData } from '../data/resume';
import type { ProjectItem } from '../data/resume';
import { triggerConfetti } from '../utils/confetti';
import { soundEngine } from '../utils/sound';
import { useToast } from './Toast';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenResumePreview: () => void;
  onOpenProject: (project: ProjectItem) => void;
  onToggleTerminal: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Projects' | 'Actions' | 'Social';
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResumePreview,
  onOpenProject,
  onToggleTerminal,
  theme = 'light',
  onToggleTheme
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    // Sections
    {
      id: 'nav-hero',
      title: 'Go to Home / Hero',
      subtitle: 'Introduction, 3D Skill Sphere & Key Highlights',
      category: 'Navigation',
      icon: <Home className="w-4 h-4 text-blue-600" />,
      action: () => onNavigate('hero'),
    },
    {
      id: 'nav-about',
      title: 'Go to About Me',
      subtitle: 'Background narrative, degree, and career focus',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-indigo-600" />,
      action: () => onNavigate('about'),
    },
    {
      id: 'nav-skills-globe',
      title: 'Launch 3D Skills Sphere',
      subtitle: 'Interactive 3D Three.js sphere with 30 resume technologies',
      category: 'Navigation',
      icon: <Zap className="w-4 h-4 text-blue-600" />,
      action: () => onNavigate('skills-globe'),
    },
    {
      id: 'nav-skills',
      title: 'Go to Skill Architecture',
      subtitle: 'Full-Stack, Databases, AI/ML & Toolchains',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-blue-600" />,
      action: () => onNavigate('skills'),
    },
    {
      id: 'nav-projects',
      title: 'Go to Featured Projects',
      subtitle: 'Hospital management, voice assistant, wallet, hotel portal',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-emerald-600" />,
      action: () => onNavigate('projects'),
    },
    {
      id: 'nav-experience',
      title: 'Go to Experience Timeline',
      subtitle: '[24]7.ai Digital Team, CifTech (.NET & MySQL), NICC',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-amber-600" />,
      action: () => onNavigate('experience'),
    },
    {
      id: 'nav-education',
      title: 'Go to Education & VTU Degree',
      subtitle: 'B.E. in AI & Data Science (8.2 CGPA)',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4 text-sky-600" />,
      action: () => onNavigate('education'),
    },
    {
      id: 'nav-certifications',
      title: 'Go to Training & Certifications',
      subtitle: 'Cybersecurity, AI tools, GUVI, be10X, IEEE Expo',
      category: 'Navigation',
      icon: <Award className="w-4 h-4 text-amber-600" />,
      action: () => onNavigate('training'),
    },
    {
      id: 'nav-beyond',
      title: 'Go to Beyond Code & Pursuits',
      subtitle: 'Problem-solving, game development, IoT rover, public speaking',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-purple-600" />,
      action: () => onNavigate('beyond'),
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact',
      subtitle: 'Reach out via email, phone, or direct message form',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-rose-600" />,
      action: () => onNavigate('contact'),
    },

    // Projects Direct Open
    ...resumeData.projects.map(p => ({
      id: `proj-${p.id}`,
      title: p.title,
      subtitle: `${p.type} • ${p.technologies.slice(0, 3).join(', ')}`,
      category: 'Projects' as const,
      icon: <Code2 className="w-4 h-4 text-blue-600" />,
      action: () => onOpenProject(p),
    })),

    // Quick Actions
    {
      id: 'act-resume-preview',
      title: 'Preview Resume PDF',
      subtitle: 'Read the official curriculum vitae in a modal',
      category: 'Actions',
      icon: <FileText className="w-4 h-4 text-blue-600" />,
      action: () => onOpenResumePreview(),
    },
    {
      id: 'act-resume-download',
      title: 'Download Resume (PDF)',
      subtitle: 'Directly download FAISAL_REHMAN.pdf',
      category: 'Actions',
      icon: <FileDown className="w-4 h-4 text-emerald-600" />,
      action: () => {
        window.open(resumeData.personal.resumeUrl, '_blank');
        showToast('Initiating resume download...', 'success');
      },
    },
    {
      id: 'act-toggle-theme',
      title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      subtitle: 'Toggle between clean light and sleek dark mode',
      category: 'Actions',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />,
      action: () => {
        if (onToggleTheme) onToggleTheme();
        showToast(theme === 'dark' ? 'Switched to Light Theme' : 'Switched to Dark Theme', 'success');
      },
    },
    {
      id: 'act-cli',
      title: 'Launch Interactive Terminal CLI',
      subtitle: 'Developer command-line interface',
      category: 'Actions',
      icon: <Terminal className="w-4 h-4 text-slate-700" />,
      action: () => onToggleTerminal(),
    },
    {
      id: 'act-copy-email',
      title: 'Copy Email Address',
      subtitle: resumeData.personal.email,
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-blue-600" />,
      action: () => {
        navigator.clipboard.writeText(resumeData.personal.email);
        triggerConfetti();
        showToast('Copied email to clipboard!', 'success');
      },
    },
    {
      id: 'act-copy-phone',
      title: 'Copy Phone Number',
      subtitle: resumeData.personal.phone,
      category: 'Actions',
      icon: <Phone className="w-4 h-4 text-indigo-600" />,
      action: () => {
        navigator.clipboard.writeText(resumeData.personal.phone);
        triggerConfetti();
        showToast('Copied phone number to clipboard!', 'success');
      },
    },

    // External Profiles
    {
      id: 'soc-github',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/faisalrehman07',
      category: 'Social',
      icon: (
        <svg className="w-4 h-4 fill-current text-slate-700" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
      action: () => window.open(resumeData.personal.github, '_blank'),
    },
    {
      id: 'soc-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/faisal-rehman-377731237',
      category: 'Social',
      icon: (
        <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64c0-.91-.73-1.64-1.64-1.64a1.64 1.64 0 0 0-1.64 1.64c0 .91.73 1.64 1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
        </svg>
      ),
      action: () => window.open(resumeData.personal.linkedin, '_blank'),
    },
  ];

  const filtered = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        soundEngine.playClick();
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-900/50 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 bg-slate-50/80">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, project, or section... (e.g. 'hospital', 'skills', 'resume')"
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 shrink-0">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              No matching commands or projects found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundEngine.playClick();
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                    isSelected 
                      ? 'bg-blue-50 border border-blue-200 text-blue-900 shadow-2xs' 
                      : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-xl border ${
                      isSelected 
                        ? 'bg-blue-100 border-blue-200' 
                        : 'bg-slate-100 border-slate-200'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-semibold truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-normal uppercase px-2 py-0.2 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-1 text-blue-600 text-xs shrink-0 pl-2 font-medium">
                      <span>Jump</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; Navigate</span>
            <span>&crarr; Select</span>
            <span>ESC Close</span>
          </div>
          <span className="hidden sm:inline text-blue-600 font-medium">
            Faisal Rehman Quick Search
          </span>
        </div>
      </div>
    </div>
  );
};
