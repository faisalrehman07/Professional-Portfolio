import React, { useState } from 'react';
import { 
  FileDown, 
  FileText, 
  Mail, 
  MapPin, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Database, 
  Brain, 
  Globe, 
  Briefcase,
  Copy,
  Check,
  Cpu,
  GitBranch
} from 'lucide-react';
import { resumeData } from '../data/resume';
import { soundEngine } from '../utils/sound';
import { useToast } from './Toast';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenResumePreview: () => void;
  onOpenTerminal?: () => void;
  onOpenCommandPalette?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onNavigate, 
  onOpenResumePreview
}) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'stack' | 'deploy' | 'stats'>('stack');
  const [copiedCode, setCopiedCode] = useState(false);
  const { showToast } = useToast();

  const handleCopyCode = () => {
    soundEngine.playSuccess();
    const snippet = activeCodeTab === 'stack' 
      ? `// Stack Configuration: Faisal Rehman
export const engineer = {
  name: "Faisal Rehman",
  role: "Software Engineer",
  cgpa: 8.2, // VTU First Class with Distinction
  stack: ["React", "TypeScript", "Python", ".NET", "MySQL", "Django", "Gemini API"],
  focus: ["Full-Stack Engineering", "Relational DBs", "AI Systems"]
};`
      : activeCodeTab === 'deploy'
      ? `$ npm run build
vite v8.3.2 building for production...
[ok] 2327 modules transformed.
dist/index.html   4.02 kB
dist/bundle.js    1.1 MB (gzip: 296 kB)
[ok] built in 1.64s -- Zero TypeScript errors.`
      : JSON.stringify({
          engineer: "Faisal Rehman",
          cgpa: 8.2,
          projects_shipped: 8,
          core_technologies: 30,
          target_location: "Dubai & UAE / Global",
          status: "Available for Hire"
        }, null, 2);

    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    showToast('Code snippet copied to clipboard!', 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Professional Identity & Positioning */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Status Pill Badge & Live Telemetry */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Software Engineering Roles &bull; Dubai &bull; UAE &bull; Global</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 shadow-2xs">
                <GitBranch className="w-3.5 h-3.5 text-blue-600" />
                <span>8.2 CGPA &bull; Class of 2025</span>
              </div>
            </div>

            {/* Main Name & Titles */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-3">
              FAISAL <br />
              <span className="tech-gradient-text">REHMAN</span>
            </h1>

            {/* Primary & Supporting Titles */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-lg sm:text-xl font-bold text-blue-600">
                Software Engineer
              </span>
              <span className="text-slate-400 font-mono">&bull;</span>
              <span className="text-sm sm:text-base text-slate-600 font-medium">
                Full-Stack Developer | AI &amp; Data Science Graduate
              </span>
            </div>

            {/* Primary Headline */}
            <p className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
              Building Practical Software. Integrating Intelligent AI.
            </p>

            {/* Supporting Introduction */}
            <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-2xl leading-relaxed font-normal">
              I am a Software Engineer and Full-Stack Developer with a degree in Artificial Intelligence and Data Science (8.2 CGPA). Experienced in designing relational database schemas, full-stack web applications (.NET, MySQL, JavaScript), and multi-modal AI integrations.
            </p>

            {/* Status & Highlights Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl mb-8">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3 interactive-card">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Location</span>
                  <span className="font-semibold text-slate-800">{resumeData.personal.location}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3 interactive-card">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Degree &bull; VTU</span>
                  <span className="font-semibold text-slate-800">B.E. AI &amp; DS (8.2)</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 shadow-2xs flex items-center gap-3 interactive-card">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-emerald-700 block text-[10px] uppercase font-bold">Relocation</span>
                  <span className="font-bold text-emerald-900">Dubai &bull; UAE Ready</span>
                </div>
              </div>
            </div>

            {/* Three Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              {/* Action 1: Explore My Projects */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onNavigate('projects');
                }}
                className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Action 2: Contact Me */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onNavigate('contact');
                }}
                className="px-5 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-slate-700 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Contact Me</span>
              </button>

              {/* Action 3: Download Resume */}
              <a
                href={resumeData.personal.resumeUrl}
                download="FAISAL_REHMAN_Resume.pdf"
                onClick={() => soundEngine.playClick()}
                className="px-5 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                title="Download Direct Resume PDF"
              >
                <FileDown className="w-4 h-4 text-emerald-400" />
                <span>Download Resume</span>
              </a>

              {/* Auxiliary Action: Preview Resume */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenResumePreview();
                }}
                className="p-3.5 rounded-xl font-medium text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-all shadow-2xs flex items-center justify-center cursor-pointer"
                title="Preview Resume in Modal"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Domain Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200/90 w-full">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mr-1">
                Engineering Domains:
              </span>
              {[
                { label: 'Full-Stack Development', icon: <Code2 className="w-3.5 h-3.5 text-blue-600" />, target: 'projects' },
                { label: 'Database Engineering (MySQL)', icon: <Database className="w-3.5 h-3.5 text-emerald-600" />, target: 'skills' },
                { label: 'AI & Gemini API Integration', icon: <Brain className="w-3.5 h-3.5 text-indigo-600" />, target: 'projects' },
                { label: 'Interactive 3D Sphere', icon: <Globe className="w-3.5 h-3.5 text-sky-600" />, target: 'skills-globe' }
              ].map(chip => (
                <button
                  key={chip.label}
                  onClick={() => {
                    soundEngine.playClick();
                    onNavigate(chip.target);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all shadow-2xs cursor-pointer"
                >
                  {chip.icon}
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Vibe Coder Interactive Workstation */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl relative overflow-hidden">
              {/* Window Controls & Interactive Code Tabs */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-mono">
                  <button
                    onClick={() => setActiveCodeTab('stack')}
                    className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                      activeCodeTab === 'stack' 
                        ? 'bg-white text-blue-600 font-bold shadow-2xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    stack.ts
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('deploy')}
                    className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                      activeCodeTab === 'deploy' 
                        ? 'bg-white text-blue-600 font-bold shadow-2xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    deploy.sh
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('stats')}
                    className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                      activeCodeTab === 'stats' 
                        ? 'bg-white text-blue-600 font-bold shadow-2xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    status.json
                  </button>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Copy Code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Code Workspace Display */}
              <div className="font-mono text-xs text-slate-800 mb-5 bg-slate-50/90 p-4 rounded-2xl border border-slate-200/80 min-h-[175px] overflow-x-auto leading-relaxed">
                {activeCodeTab === 'stack' && (
                  <div className="space-y-1">
                    <span className="text-purple-600 font-semibold">export const</span>{' '}
                    <span className="text-blue-600 font-semibold">engineer</span> = &#123;
                    <div className="pl-4 text-slate-700 space-y-0.5">
                      <div>name: <span className="text-emerald-700 font-medium">"Faisal Rehman"</span>,</div>
                      <div>title: <span className="text-emerald-700 font-medium">"Software Engineer"</span>,</div>
                      <div>degree: <span className="text-emerald-700 font-medium">"B.E. in AI &amp; Data Science"</span>,</div>
                      <div>cgpa: <span className="text-blue-600 font-bold">8.2</span>,</div>
                      <div>internship: <span className="text-emerald-700 font-medium">"CifTech Solutions (.NET &amp; MySQL)"</span>,</div>
                      <div>stack: <span className="text-indigo-600">["React", "TypeScript", "Python", ".NET", "MySQL"]</span></div>
                    </div>
                    <div>&#125;;</div>
                  </div>
                )}

                {activeCodeTab === 'deploy' && (
                  <div className="space-y-1 text-slate-700">
                    <div className="text-slate-400">$ npm run build</div>
                    <div className="text-blue-600">vite v8.3.2 building for production...</div>
                    <div className="text-emerald-600 font-semibold">[ok] 2327 modules transformed.</div>
                    <div>dist/index.html   <span className="text-slate-400">4.02 kB</span></div>
                    <div>dist/bundle.js    <span className="text-slate-400">1.1 MB (gzip: 296 kB)</span></div>
                    <div className="text-emerald-700 font-bold pt-1">[ok] built in 1.64s &bull; Ready for deployment.</div>
                  </div>
                )}

                {activeCodeTab === 'stats' && (
                  <div className="space-y-0.5 text-slate-700">
                    <div>&#123;</div>
                    <div className="pl-4">
                      <div><span className="text-purple-600">"candidate"</span>: <span className="text-emerald-700">"Faisal Rehman"</span>,</div>
                      <div><span className="text-purple-600">"academic_cgpa"</span>: <span className="text-blue-600 font-bold">8.2</span>,</div>
                      <div><span className="text-purple-600">"production_projects"</span>: <span className="text-indigo-600 font-bold">8</span>,</div>
                      <div><span className="text-purple-600">"verified_technologies"</span>: <span className="text-indigo-600 font-bold">30</span>,</div>
                      <div><span className="text-purple-600">"target_market"</span>: <span className="text-emerald-700">"Dubai, UAE &amp; Global"</span>,</div>
                      <div><span className="text-purple-600">"status"</span>: <span className="text-emerald-700 font-bold">"AVAILABLE"</span></div>
                    </div>
                    <div>&#125;</div>
                  </div>
                )}
              </div>

              {/* 3D Skills Sphere Interactive Teaser Card */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onNavigate('skills-globe');
                }}
                className="w-full p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group cursor-pointer shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold">
                    <Globe className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '14s' }} />
                    <span>3D Interactive Skills Sphere</span>
                  </div>
                  <span className="text-[11px] font-mono text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    <span>Inspect Sphere</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Interactive 3D visualization mapping 30 verified technologies with dynamic relational conduits.
                </p>
              </button>

              {/* Verified Career Metrics */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="text-base font-bold text-slate-900 flex items-center justify-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    <span>8 Projects</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Practical Software</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="text-base font-bold text-blue-600 flex items-center justify-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    <span>8.2 CGPA</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">VTU Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => {
              soundEngine.playClick();
              onNavigate('about');
            }}
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors group cursor-pointer"
            aria-label="Scroll down to About section"
          >
            <span className="text-[11px] tracking-widest uppercase font-semibold text-slate-500">
              Explore Background &amp; Projects
            </span>
            <div className="w-5 h-8 rounded-full border border-slate-300 flex items-start justify-center p-1 bg-white shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
