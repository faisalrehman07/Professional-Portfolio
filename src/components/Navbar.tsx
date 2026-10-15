import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  FileDown, 
  Menu, 
  X, 
  Search,
  Globe2,
  Sun,
  Moon
} from 'lucide-react';
import { resumeData } from '../data/resume';
import { soundEngine } from '../utils/sound';

interface NavbarProps {
  onOpenResumePreview: () => void;
  onOpenCommandPalette?: () => void;
  onOpenTerminal?: () => void;
  isSoundEnabled?: boolean;
  onToggleSound?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenResumePreview,
  onOpenCommandPalette,
  theme = 'light',
  onToggleTheme
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills-globe', label: '3D Skills Sphere', special: true },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    soundEngine.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-sm'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            aria-label="Faisal Rehman - Back to top"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-all">
              FR
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Faisal Rehman
              </span>
              <span className="text-[11px] text-blue-600 font-medium tracking-wide flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Software Engineer
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-2xl border border-slate-200 shadow-sm text-xs font-medium">
            {navItems.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/90 border border-blue-200/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.special && <Globe2 className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Dark / Light Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onToggleTheme();
                }}
                className="p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle Dark / Light Theme"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span className="hidden xl:inline text-[11px] font-mono">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-600" />
                    <span className="hidden xl:inline text-[11px] font-mono">Dark</span>
                  </>
                )}
              </button>
            )}

            {/* Quick Search Spotlight (Ctrl + K) */}
            {onOpenCommandPalette && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenCommandPalette();
                }}
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-slate-200 hover:border-blue-400 text-slate-600 hover:text-blue-600 shadow-xs transition-all cursor-pointer"
                title="Open Quick Search (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500">
                  Ctrl+K
                </span>
              </button>
            )}

            {/* Preview Resume Modal CTA */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenResumePreview();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Preview</span>
            </button>

            {/* Primary Download Resume Button */}
            <a
              href={resumeData.personal.resumeUrl}
              download="FAISAL_REHMAN_Resume.pdf"
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all hover:shadow active:scale-95 cursor-pointer"
              title="Download Resume PDF"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl bg-white text-slate-700 border border-slate-200 cursor-pointer shadow-xs"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-blue-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden pt-20 px-4 bg-white/98 backdrop-blur-xl overflow-y-auto animate-fade-in border-b border-slate-200 shadow-xl">
          <div className="flex flex-col gap-2 py-6">
            <div className="px-3 pb-3 border-b border-slate-100 flex items-center justify-between text-xs">
              <span className="text-blue-600 font-semibold flex items-center gap-1.5">
                Navigation
              </span>
              <span className="text-slate-500 font-mono">Faisal Rehman</span>
            </div>

            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`p-3.5 rounded-2xl text-left text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <span>{item.label}</span>
                {item.special && <Globe2 className="w-4 h-4 text-blue-600" />}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              {onToggleTheme && (
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onToggleTheme();
                  }}
                  className="w-full py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>Switch to Light Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-slate-600" />
                      <span>Switch to Dark Theme</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumePreview();
                }}
                className="w-full py-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Preview Resume PDF</span>
              </button>

              <a
                href={resumeData.personal.resumeUrl}
                download="FAISAL_REHMAN_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
