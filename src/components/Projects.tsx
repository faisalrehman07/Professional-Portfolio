import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  Bot, 
  Hospital, 
  HeartPulse, 
  BadgePercent, 
  Car, 
  Wallet, 
  ArrowRight, 
  FolderGit2, 
  Search, 
  X, 
  Copy, 
  Check,
  Utensils,
  Layers,
  Cpu
} from 'lucide-react';
import { resumeData } from '../data/resume';
import type { ProjectItem } from '../data/resume';
import { soundEngine } from '../utils/sound';
import { useToast } from './Toast';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
  selectedTechFilter?: string | null;
  onClearTechFilter?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ 
  onSelectProject,
  selectedTechFilter,
  onClearTechFilter
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'additional'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [localTechFilter, setLocalTechFilter] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { showToast } = useToast();

  const activeTechFilter = selectedTechFilter || localTechFilter;

  // Icon resolver
  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-amber-600" />;
      case 'Hospital':
        return <Hospital className="w-5 h-5 text-indigo-600" />;
      case 'Wallet':
        return <Wallet className="w-5 h-5 text-emerald-600" />;
      case 'Car':
        return <Car className="w-5 h-5 text-blue-600" />;
      case 'BadgePercent':
        return <BadgePercent className="w-5 h-5 text-purple-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-blue-600" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-600" />;
      default:
        return <Code2 className="w-5 h-5 text-blue-600" />;
    }
  };

  // Custom technical visual illustrations for projects in clean light mode
  const renderProjectVisual = (project: ProjectItem) => {
    switch (project.id) {
      case 'personal-ai-voice-assistant':
        return (
          <div className="h-36 w-full rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 border border-blue-200/90 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-blue-400 transition-colors shadow-2xs">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono text-blue-700 uppercase tracking-wider bg-blue-100/70 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                Gemini Multi-Modal API
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
            </div>
            {/* Audio Waveform Graphic */}
            <div className="flex items-center justify-center gap-1.5 py-3 z-10">
              {[40, 65, 30, 85, 95, 60, 100, 75, 45, 90, 35, 70].map((h, i) => (
                <span 
                  key={i} 
                  className="w-1.5 rounded-full bg-gradient-to-t from-blue-600 to-indigo-500 shadow-2xs"
                  style={{ height: `${h * 0.4}px` }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 z-10">
              <span>Google AI Studio</span>
              <span className="text-blue-700 font-semibold">Speech Recognition</span>
            </div>
          </div>
        );

      case 'hotel-management-website':
        return (
          <div className="h-36 w-full rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 border border-amber-200/90 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-amber-400 transition-colors shadow-2xs">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono text-amber-800 uppercase tracking-wider bg-amber-100/70 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                Table Booking &bull; Food Orders
              </span>
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="grid grid-cols-3 gap-2 my-auto z-10">
              <div className="p-2 rounded-xl bg-white border border-amber-200 text-center shadow-2xs">
                <div className="text-[10px] text-slate-500 font-medium">Tables</div>
                <div className="text-xs font-bold text-amber-700">Reserved</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-emerald-200 text-center shadow-2xs">
                <div className="text-[10px] text-slate-500 font-medium">Menu</div>
                <div className="text-xs font-bold text-emerald-700">Catalog</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-blue-200 text-center shadow-2xs">
                <div className="text-[10px] text-slate-500 font-medium">Order</div>
                <div className="text-xs font-bold text-blue-700">Cart</div>
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-500 z-10">
              Client-Side State &bull; Responsive UI
            </div>
          </div>
        );

      case 'hospital-management-system':
        return (
          <div className="h-36 w-full rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/60 border border-indigo-200/90 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-indigo-400 transition-colors shadow-2xs">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono text-indigo-800 uppercase tracking-wider bg-indigo-100/70 px-2 py-0.5 rounded border border-indigo-200 font-semibold">
                .NET &bull; MySQL Relational DB
              </span>
              <span className="text-[10px] font-mono text-blue-700 font-semibold">CifTech Solutions</span>
            </div>
            <div className="flex items-center justify-between gap-2 my-auto z-10">
              <div className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-800 shadow-2xs font-semibold">
                [Patients] -&gt; [Records]
              </div>
              <span className="text-indigo-600 font-mono text-xs font-bold">JOIN</span>
              <div className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-800 shadow-2xs font-semibold">
                [Workflows]
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-500 z-10 flex justify-between">
              <span>Healthcare Operations</span>
              <span className="text-emerald-700 font-semibold">Normalized 3NF</span>
            </div>
          </div>
        );

      case 'finance-tracking-wallet':
        return (
          <div className="h-36 w-full rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 border border-emerald-200/90 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-emerald-400 transition-colors shadow-2xs">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                Ledger &bull; Analytics
              </span>
              <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="space-y-1.5 my-auto z-10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[11px]">Income Allocation</span>
                <span className="text-emerald-700 font-mono font-bold">+ Tracked</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full w-3/4 rounded-full" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Expenses Breakdown</span>
                <span className="text-slate-700 font-semibold">Monthly Budget</span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-500 z-10">
              Personal Financial Analytics &bull; CRUD
            </div>
          </div>
        );

      case 'car-parking-management':
        return (
          <div className="h-32 w-full rounded-2xl bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border border-blue-200/90 p-3.5 flex flex-col justify-between relative overflow-hidden group-hover:border-blue-400 transition-colors shadow-2xs">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono text-blue-800 uppercase tracking-wider bg-blue-100/70 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                Parking Slot Grid
              </span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                14 / 20 Available
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 my-auto z-10">
              {['Slot 01 (Occ)', 'Slot 02 (Free)', 'Slot 03 (Free)', 'Slot 04 (Occ)'].map((slot, i) => (
                <div 
                  key={i} 
                  className={`py-1 text-center rounded text-[10px] font-mono font-semibold border ${
                    slot.includes('Occ') 
                      ? 'bg-rose-50 text-rose-700 border-rose-200' 
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {slot.includes('Occ') ? 'BUSY' : 'FREE'}
                </div>
              ))}
            </div>
            <div className="text-[11px] font-mono text-slate-500 z-10 flex justify-between">
              <span>SQL Transaction Ledger</span>
              <span className="text-blue-700 font-semibold">Auto-Billing</span>
            </div>
          </div>
        );

      case 'loan-eligibility-prediction':
        return (
          <div className="h-32 w-full rounded-2xl bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/60 border border-purple-200/90 p-3.5 flex flex-col justify-between relative overflow-hidden group-hover:border-purple-400 transition-colors shadow-2xs">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono text-purple-800 uppercase tracking-wider bg-purple-100/70 px-2 py-0.5 rounded border border-purple-200 font-semibold">
                Neural Classifier &bull; Keras
              </span>
              <span className="text-[10px] font-mono text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                92.4% ROC-AUC
              </span>
            </div>
            <div className="flex items-center justify-between gap-1 my-auto z-10 text-[10px] font-mono">
              <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">Input [X]</span>
              <span className="text-purple-600 font-bold">-&gt;</span>
              <span className="px-2 py-1 rounded bg-purple-100/80 border border-purple-200 text-purple-800 font-semibold">Dense(64)</span>
              <span className="text-purple-600 font-bold">-&gt;</span>
              <span className="px-2 py-1 rounded bg-emerald-100/80 border border-emerald-200 text-emerald-800 font-semibold">Eligible [1]</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 z-10 flex justify-between">
              <span>Credit &amp; Income Correlation</span>
              <span className="text-purple-700 font-semibold">TensorFlow Pipeline</span>
            </div>
          </div>
        );

      case 'heart-rate-stress-rppg':
        return (
          <div className="h-32 w-full rounded-2xl bg-gradient-to-br from-rose-50/70 via-white to-amber-50/50 border border-rose-200/90 p-3.5 flex flex-col justify-between relative overflow-hidden group-hover:border-rose-400 transition-colors shadow-2xs">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono text-rose-800 uppercase tracking-wider bg-rose-100/70 px-2 py-0.5 rounded border border-rose-200 font-semibold">
                rPPG Optical Pulse Extraction
              </span>
              <span className="text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                72 BPM &bull; Calm
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 py-1.5 z-10">
              {[20, 35, 75, 25, 90, 45, 20, 80, 30, 85, 20, 60, 25, 70].map((val, i) => (
                <span 
                  key={i} 
                  className="w-1 rounded-full bg-rose-500/80" 
                  style={{ height: `${val * 0.28}px` }} 
                />
              ))}
            </div>
            <div className="text-[11px] font-mono text-slate-500 z-10 flex justify-between">
              <span>Contactless Video Feed</span>
              <span className="text-rose-700 font-semibold">Fourier Analysis</span>
            </div>
          </div>
        );

      case 'self-manual-driven-rover':
        return (
          <div className="h-32 w-full rounded-2xl bg-gradient-to-br from-cyan-50/70 via-white to-sky-50/60 border border-cyan-200/90 p-3.5 flex flex-col justify-between relative overflow-hidden group-hover:border-cyan-400 transition-colors shadow-2xs">
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono text-cyan-900 uppercase tracking-wider bg-cyan-100/70 px-2 py-0.5 rounded border border-cyan-200 font-semibold">
                Dual Mode: Auto &bull; Manual
              </span>
              <span className="text-[10px] font-mono text-cyan-800 font-bold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                2.4GHz Telemetry
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 my-auto z-10 text-[10px] font-mono">
              <div className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">
                Sonar &gt; 15cm: Clear
              </div>
              <span className="text-cyan-700 font-bold">&gt;&gt;</span>
              <div className="px-2 py-1 rounded bg-cyan-100/80 border border-cyan-200 text-cyan-900 font-semibold">
                PWM 85% Forward
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-500 z-10 flex justify-between">
              <span>Embedded Hardware C/C++</span>
              <span className="text-cyan-700 font-semibold">H-Bridge Drivers</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-32 w-full rounded-2xl bg-slate-50 border border-slate-200 p-3.5 flex flex-col justify-between group-hover:border-slate-300 transition-colors shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                {project.type}
              </span>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                {getProjectIcon(project.iconName)}
              </div>
            </div>
            <div className="text-xs font-mono text-slate-700 font-medium line-clamp-1">
              {project.technologies.slice(0, 3).join(' • ')}
            </div>
          </div>
        );
    }
  };

  // Filtered lists
  const featuredProjects = useMemo(() => {
    return resumeData.projects.filter(p => p.featured);
  }, []);

  const additionalProjects = useMemo(() => {
    return resumeData.projects.filter(p => !p.featured);
  }, []);

  // Filter based on tab, search, and tech
  const applyFilters = (list: ProjectItem[]) => {
    return list.filter(p => {
      // Tech filter
      if (activeTechFilter) {
        const hasTech = p.technologies.some(t => 
          t.toLowerCase().includes(activeTechFilter.toLowerCase())
        );
        if (!hasTech) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDesc = p.shortDescription.toLowerCase().includes(q);
        const matchesTech = p.technologies.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesTech) return false;
      }

      return true;
    });
  };

  const filteredFeatured = useMemo(() => applyFilters(featuredProjects), [featuredProjects, activeTechFilter, searchQuery]);
  const filteredAdditional = useMemo(() => applyFilters(additionalProjects), [additionalProjects, activeTechFilter, searchQuery]);

  const handleCopySummary = (p: ProjectItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${p.title} (${p.type})\n${p.shortDescription}\nTech: ${p.technologies.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(p.id);
    showToast(`Copied summary for ${p.title}!`, 'success');
    soundEngine.playSuccess();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setLocalTechFilter(null);
    if (onClearTechFilter) onClearTechFilter();
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-50/30 backdrop-blur-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3 shadow-2xs">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Practical Engineering Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900">
            Software <span className="tech-gradient-text">Projects</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Practical applications, database systems, AI-powered integrations, and academic research architectures documented across my engineering experience.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 mb-10 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search projects by keyword or tech (e.g. 'Gemini', 'MySQL', '.NET', 'Voice')..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Gallery Section Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200">
              {[
                { id: 'all', label: 'All Projects (8)' },
                { id: 'featured', label: 'Featured (4)' },
                { id: 'additional', label: 'Additional (4)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tech Filter Notification Banner */}
          {activeTechFilter && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <span>Filtering projects utilizing:</span>
                <strong className="text-blue-900 bg-white px-2 py-0.5 rounded border border-blue-200 font-mono">
                  {activeTechFilter}
                </strong>
              </div>
              <button
                onClick={handleClearFilters}
                className="text-xs text-blue-700 hover:text-blue-900 underline font-medium cursor-pointer"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* 1. FEATURED PROJECTS SECTION */}
        {(activeTab === 'all' || activeTab === 'featured') && filteredFeatured.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                  Featured Core Projects
                </h3>
              </div>
              <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 font-semibold">
                Primary Showcase
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {filteredFeatured.map(project => (
                <div
                  key={project.id}
                  className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group interactive-card card-shine shadow-sm hover:shadow-lg"
                >
                  <div>
                    {/* Technical Visual / Illustration */}
                    <div className="mb-6">
                      {renderProjectVisual(project)}
                    </div>

                    {/* Category & Copy Bar */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {project.type}
                      </span>
                      <button
                        onClick={(e) => handleCopySummary(project, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                        title="Copy Summary"
                      >
                        {copiedId === project.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                      {project.title}
                    </h4>

                    {/* Mandated Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div>
                    {/* Relevant Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-100">
                      {project.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-50 text-slate-700 border border-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Dual Action Buttons: View Details & GitHub */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          onSelectProject(project);
                        }}
                        className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundEngine.playClick()}
                          className="p-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                          title="Open GitHub Profile / Repository"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. ADDITIONAL ENGINEERING PROJECTS SECTION */}
        {(activeTab === 'all' || activeTab === 'additional') && filteredAdditional.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                  Additional Engineering &amp; Academic Projects
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-600 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
                Academic &amp; Systems Research
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredAdditional.map(project => (
                <div
                  key={project.id}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group interactive-card card-shine shadow-xs hover:shadow-md"
                >
                  <div>
                    {/* Technical Micro Visual */}
                    <div className="mb-5">
                      {renderProjectVisual(project)}
                    </div>

                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-blue-50 transition-colors">
                          {getProjectIcon(project.iconName)}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold block">
                            {project.category}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                            {project.title}
                          </h4>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleCopySummary(project, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                        title="Copy Summary"
                      >
                        {copiedId === project.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-slate-100">
                      {project.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-50 text-slate-700 border border-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          onSelectProject(project);
                        }}
                        className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold bg-white border border-slate-300 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundEngine.playClick()}
                          className="p-2.5 rounded-xl bg-white border border-slate-300 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
                          title="Open GitHub Profile / Repository"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty Search State */}
        {filteredFeatured.length === 0 && filteredAdditional.length === 0 && (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-base text-slate-800 font-semibold mb-2">No projects matched your search criteria.</p>
            <p className="text-xs text-slate-500 mb-4">Try clearing the search query or selecting &ldquo;All Projects&rdquo;.</p>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold cursor-pointer"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
