import { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { ResumePreviewModal } from './components/ResumePreviewModal';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillUniversalGlobe } from './components/SkillUniversalGlobe';
import { SkillConstellation } from './components/SkillConstellation';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { BeyondCode } from './components/BeyondCode';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ToastProvider } from './components/Toast';
import type { ProjectItem } from './data/resume';
import { soundEngine } from './utils/sound';
import { Terminal, Search } from 'lucide-react';
import { useTheme } from './hooks/useTheme';

export function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(soundEngine.getSoundEnabled());
  const [contactSubject, setContactSubject] = useState('');
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);

  const toggleSound = () => {
    const nextVal = !isSoundEnabled;
    setIsSoundEnabled(nextVal);
    soundEngine.setSoundEnabled(nextVal);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactProject = (projectTitle: string) => {
    setContactSubject(`Inquiry regarding project: ${projectTitle}`);
    handleNavigate('contact');
  };

  // Global keyboard shortcut for Command Palette (Ctrl+K or Cmd+K) and Terminal (`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundEngine.playClick();
        setCommandPaletteOpen(prev => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === '`') {
        e.preventDefault();
        soundEngine.playClick();
        setTerminalOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-slate-900 dark:text-slate-100 relative selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 antialiased font-sans transition-colors duration-300">
      {/* Precision Pointer Cursor */}
      <CustomCursor />

      {/* Modern Professional Ambient Dot Grid & Soft Accents */}
      <CosmicBackground />

      {/* Sticky Header Navigation */}
      <Navbar
        onOpenResumePreview={() => setResumePreviewOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Quick Search Spotlight Modal (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onOpenResumePreview={() => setResumePreviewOpen(true)}
        onOpenProject={proj => setSelectedProject(proj)}
        onToggleTerminal={() => setTerminalOpen(prev => !prev)}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Interactive CLI Developer Bio Terminal */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenResumePreview={() => setResumePreviewOpen(true)}
        onOpenProject={proj => setSelectedProject(proj)}
        onNavigate={handleNavigate}
      />

      {/* Resume PDF Interactive Preview Modal */}
      <ResumePreviewModal
        isOpen={resumePreviewOpen}
        onClose={() => setResumePreviewOpen(false)}
      />

      {/* Technical Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactProject={handleContactProject}
      />

      {/* Main Professional Portfolio Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero 
          onNavigate={handleNavigate} 
          onOpenResumePreview={() => setResumePreviewOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* 2. Executive About Me Section */}
        <About />

        {/* 3. Interactive 3D Skills Sphere */}
        <SkillUniversalGlobe 
          theme={theme}
          onSelectNode={handleNavigate}
          onFilterProject={(tech) => {
            setSelectedTechFilter(tech);
            handleNavigate('projects');
          }}
        />

        {/* 4. Technical Skills Section */}
        <SkillConstellation onNavigateProjects={() => handleNavigate('projects')} />

        {/* 5. Featured & Additional Projects */}
        <Projects
          onSelectProject={proj => setSelectedProject(proj)}
          selectedTechFilter={selectedTechFilter}
          onClearTechFilter={() => setSelectedTechFilter(null)}
        />

        {/* 6. Professional Experience Timeline */}
        <ExperienceTimeline />

        {/* 7. Education & VTU Degree */}
        <Education />

        {/* 8. Training & Professional Development */}
        <Certifications />

        {/* 9. Beyond Code */}
        <BeyondCode />

        {/* 10. Contact Section */}
        <Contact initialSubject={contactSubject} />
      </main>

      {/* Floating Action Buttons for Fast Terminal & Search Access */}
      <aside aria-label="Quick launch tools" className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => {
            soundEngine.playClick();
            setTerminalOpen(prev => !prev);
          }}
          className="p-3 rounded-2xl bg-white/95 hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-md transition-all hover:scale-105 backdrop-blur-md flex items-center gap-2 text-xs font-mono font-bold cursor-pointer hover:text-blue-600"
          title="Toggle Terminal CLI Console (`)"
        >
          <Terminal className="w-4 h-4 text-blue-600" />
          <span>CLI</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setCommandPaletteOpen(true);
          }}
          className="p-3 rounded-2xl bg-white/95 hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-md transition-all hover:scale-105 backdrop-blur-md flex items-center gap-2 text-xs font-medium cursor-pointer hover:text-blue-600"
          title="Open Quick Search (Ctrl+K)"
        >
          <Search className="w-4 h-4 text-blue-600" />
          <span className="font-mono text-[11px] text-slate-500">Ctrl+K</span>
        </button>
      </aside>

      {/* Clean Light Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
