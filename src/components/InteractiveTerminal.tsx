import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  X, 
  Maximize2, 
  CornerDownLeft
} from 'lucide-react';
import { resumeData } from '../data/resume';
import type { ProjectItem } from '../data/resume';
import { triggerCelebration } from '../utils/confetti';
import { soundEngine } from '../utils/sound';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumePreview: () => void;
  onOpenProject: (project: ProjectItem) => void;
  onNavigate: (sectionId: string) => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onOpenResumePreview,
  onOpenProject,
  onNavigate,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'init-1',
      command: 'system.init',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold font-mono">
            [SYSTEM] FAISAL REHMAN TERMINAL OS [Version 2.5.0-AI.DS]
          </p>
          <p className="text-slate-400 text-xs">
            Visvesvaraya Technological University (VTU) &bull; Bangalore, IN
          </p>
          <p className="text-slate-400 text-xs">
            Type <span className="text-cyan-300 font-mono font-bold">help</span> to list commands, or tap the quick pills below.
          </p>
        </div>
      ),
    },
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  const runCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    soundEngine.playClick();
    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let output: React.ReactNode;

    switch (mainCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-300 font-bold mb-1">Available Terminal Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono">
              <div><span className="text-emerald-400 font-semibold">about</span> - Executive background &amp; summary</div>
              <div><span className="text-emerald-400 font-semibold">skills</span> - Core stacks &amp; tech domains</div>
              <div><span className="text-emerald-400 font-semibold">ai</span> - Google Antigravity &amp; AI Tools stack</div>
              <div><span className="text-emerald-400 font-semibold">projects</span> - View engineering projects catalog</div>
              <div><span className="text-emerald-400 font-semibold">exp</span> - Experience, internships &amp; expos</div>
              <div><span className="text-emerald-400 font-semibold">edu</span> - Degree, VTU &amp; coursework</div>
              <div><span className="text-emerald-400 font-semibold">certs</span> - Accredited certifications</div>
              <div><span className="text-emerald-400 font-semibold">contact</span> - Phone, email &amp; transmission</div>
              <div><span className="text-emerald-400 font-semibold">resume</span> - Open verified PDF CV modal</div>
              <div><span className="text-rose-400 font-semibold">hire</span> - Trigger hiring transmission &amp; confetti</div>
              <div><span className="text-cyan-400 font-semibold">theme &lt;color&gt;</span> - Set theme (cyan/violet/emerald/amber)</div>
              <div><span className="text-slate-400 font-semibold">clear</span> - Clear terminal scrollback</div>
              <div><span className="text-slate-400 font-semibold">exit</span> - Close terminal window</div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        output = (
          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <p className="text-cyan-300 font-bold font-mono">FAISAL REHMAN &bull; AI &amp; Data Science Graduate</p>
            <p>{resumeData.personal.aboutNarrative}</p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300">Degree: B.E. AI &amp; DS (8.2 CGPA)</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300">Class: 2025</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300">Location: Bangalore, India</span>
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-3 text-xs">
            <p className="text-cyan-300 font-bold font-mono">Core Engineering Stacks:</p>
            {resumeData.skillClusters.map(cluster => (
              <div key={cluster.id} className="space-y-1">
                <span className="text-slate-400 font-semibold font-mono uppercase text-[10px] block">
                  [{cluster.name}]
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cluster.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 font-mono text-[11px]">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'ai':
      case 'aitools':
        output = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">[AI TOOLS &amp; PROMPT ENGINEERING ECOSYSTEM]</p>
            <p className="text-slate-300">Faisal is an AI Tools enthusiast and power user leveraging state-of-the-art developer platforms to architect and accelerate engineering pipelines:</p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-800/70 border border-cyan-500/30">
                <span className="text-cyan-400 font-bold">Google Antigravity &amp; Agentic Workflows:</span>
                <span className="text-slate-300 block text-[11px]">Autonomous agent orchestration, multi-modal code generation, and iterative pair-programming pipelines.</span>
              </div>
              <div className="p-2 rounded bg-slate-800/70 border border-indigo-500/30">
                <span className="text-indigo-400 font-bold">Google AI Studio &amp; Gemini Ecosystem:</span>
                <span className="text-slate-300 block text-[11px]">Zero/Few-shot prompt tuning, system instruction modeling, structured JSON schema outputs, and vision-language integration.</span>
              </div>
              <div className="p-2 rounded bg-slate-800/70 border border-emerald-500/30">
                <span className="text-emerald-400 font-bold">Advanced Prompt Engineering:</span>
                <span className="text-slate-300 block text-[11px]">Chain-of-Thought (CoT), ReAct architectures, prompt decomposition, context caching, and test-driven prompting.</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-bold font-mono">Engineering Projects &amp; Case Studies:</p>
            <div className="space-y-2">
              {resumeData.projects.map(p => (
                <div key={p.id} className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-white font-mono">{p.title}</span>
                    <span className="text-[10px] text-cyan-400 font-mono block">{p.type} &bull; {p.technologies.slice(0, 3).join(', ')}</span>
                  </div>
                  <button
                    onClick={() => {
                      onOpenProject(p);
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 shrink-0"
                  >
                    View Dossier
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'exp':
      case 'experience':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-bold font-mono">Experience &amp; Internships Timeline:</p>
            <div className="space-y-1.5 font-mono">
              {resumeData.experience.map(e => (
                <div key={e.id} className="p-2 rounded bg-slate-800/60 border border-slate-700">
                  <span className="text-white font-bold">{e.title}</span>
                  <span className="text-cyan-400 block text-[11px]">{e.organization} &bull; {e.period}</span>
                  <span className="text-slate-300 block text-[11px] mt-0.5">{e.summary}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'edu':
      case 'education':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300 font-mono">
            <p className="text-cyan-300 font-bold">ACADEMIC CREDENTIALS:</p>
            <p className="text-white font-bold">{resumeData.education.degree}</p>
            <p className="text-slate-400">{resumeData.education.institution} &bull; {resumeData.education.university}</p>
            <p className="text-emerald-400 font-bold">Graduation Year: {resumeData.education.year} &bull; CGPA: {resumeData.education.cgpa} / 10.0</p>
            <p className="text-slate-400 text-[11px] pt-1">
              Core Coursework: {resumeData.education.coreCourses.join(', ')}
            </p>
          </div>
        );
        break;

      case 'certs':
      case 'certifications':
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-cyan-300 font-bold">Verified Certifications &amp; Accreditations:</p>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              {resumeData.certifications.map(c => (
                <li key={c.id}>
                  <strong className="text-white">{c.title}</strong> — {c.issuer} {c.dateOrYear && `(${c.dateOrYear})`}
                </li>
              ))}
            </ul>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">DIRECT TRANSMISSION CHANNELS:</p>
            <p>Email: <a href={`mailto:${resumeData.personal.email}`} className="text-cyan-400 underline">{resumeData.personal.email}</a></p>
            <p>Phone: <a href={`tel:${resumeData.personal.phone}`} className="text-cyan-400 underline">{resumeData.personal.phone}</a></p>
            <p>Location: {resumeData.personal.location}</p>
            <p>GitHub: <a href={resumeData.personal.github} target="_blank" rel="noreferrer" className="text-indigo-400 underline">{resumeData.personal.github}</a></p>
            <p>LinkedIn: <a href={resumeData.personal.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">{resumeData.personal.linkedin}</a></p>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        onOpenResumePreview();
        output = (
          <p className="text-xs text-cyan-300 font-mono">
            Launching verified Curriculum Vitae modal viewer (FAISAL_REHMAN.pdf)...
          </p>
        );
        break;

      case 'hire':
      case 'sudo hire':
        triggerCelebration();
        soundEngine.playSuccess();
        output = (
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 border border-emerald-500/40 text-xs font-mono space-y-1 text-white">
            <p className="text-emerald-300 font-bold text-sm">[STATUS: READY] TRANSMISSION RECEIVED: HIRING PIPELINE INITIATED</p>
            <p>Thank you for considering Faisal Rehman for your engineering team.</p>
            <p>Faisal is actively seeking full-time roles in AI, Machine Learning, Full-Stack Architecture, and Software Engineering.</p>
            <div className="pt-2 flex gap-2">
              <a
                href={`mailto:${resumeData.personal.email}?subject=Full-Time Engineering Opportunity for Faisal Rehman`}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs inline-block"
              >
                Send Direct Offer / Interview Invitation
              </a>
            </div>
          </div>
        );
        break;

      case 'globe':
      case '3d':
        onNavigate('skills-globe');
        output = <p className="text-xs text-cyan-300 font-mono">Launching and navigating to Interactive 3D Skills Universe Globe (#skills-globe)...</p>;
        break;

      case 'goto':
      case 'nav': {
        const target = arg || 'projects';
        onNavigate(target);
        output = <p className="text-xs text-cyan-300 font-mono">Navigating viewport to #{target}...</p>;
        break;
      }

      case 'theme': {
        const root = document.documentElement;
        if (arg === 'dark') {
          root.classList.add('dark');
          localStorage.setItem('faisal_portfolio_theme', 'dark');
          output = <p className="text-xs text-cyan-400 font-mono">[THEME] Switched to High-Tech Dark Mode</p>;
        } else if (arg === 'light') {
          root.classList.remove('dark');
          localStorage.setItem('faisal_portfolio_theme', 'light');
          output = <p className="text-xs text-cyan-400 font-mono">[THEME] Switched to Vibe Coder Light Mode</p>;
        } else if (arg === 'violet') {
          root.style.setProperty('--accent-cyan', '#a855f7');
          root.style.setProperty('--accent-indigo', '#c084fc');
          output = <p className="text-xs text-purple-400 font-mono">[THEME] Palette shifted to Cyber Violet</p>;
        } else if (arg === 'emerald') {
          root.style.setProperty('--accent-cyan', '#10b981');
          root.style.setProperty('--accent-indigo', '#34d399');
          output = <p className="text-xs text-emerald-400 font-mono">[THEME] Palette shifted to Emerald Supernova</p>;
        } else if (arg === 'amber') {
          root.style.setProperty('--accent-cyan', '#f59e0b');
          root.style.setProperty('--accent-indigo', '#fbbf24');
          output = <p className="text-xs text-amber-400 font-mono">[THEME] Palette shifted to Solar Flare</p>;
        } else {
          root.style.setProperty('--accent-cyan', '#38bdf8');
          root.style.setProperty('--accent-indigo', '#818cf8');
          output = <p className="text-xs text-cyan-400 font-mono">[THEME] Palette restored to Electric Cyan Nebula</p>;
        }
        break;
      }

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = (
          <p className="text-xs text-rose-400 font-mono">
            command not found: {cmd}. Type <span className="text-cyan-300 font-bold">help</span> to list valid commands.
          </p>
        );
    }

    setHistory(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        command: cmd,
        output,
      },
    ]);
    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(inputVal);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isMaximized 
        ? 'inset-4 sm:inset-8' 
        : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[580px] h-[520px]'
    }`}>
      <div className="w-full h-full bg-slate-950/95 border border-cyan-500/40 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.25)] backdrop-blur-2xl flex flex-col overflow-hidden text-slate-100 font-mono">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 select-none">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer hover:opacity-100" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 cursor-pointer hover:opacity-100" onClick={() => setIsMaximized(prev => !prev)} />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 cursor-pointer hover:opacity-100" onClick={() => runCommand('hire')} />
            </div>
            <div className="flex items-center gap-2 pl-2 text-xs font-bold text-slate-200">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>guest@faisal-rehman:~</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={() => setIsMaximized(prev => !prev)}
              className="p-1 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
              title="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Command Output Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {history.map(item => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <span className="text-emerald-400">guest@faisal:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
              <div className="pl-2 border-l border-slate-800/80">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800 flex flex-wrap gap-1.5 text-[11px]">
          {['help', 'about', 'skills', 'ai', 'projects', 'edu', 'certs', 'resume', 'hire'].map(quickCmd => (
            <button
              key={quickCmd}
              onClick={() => runCommand(quickCmd)}
              className="px-2 py-0.5 rounded-md bg-slate-800/80 text-cyan-300 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/40 transition-colors"
            >
              {quickCmd}
            </button>
          ))}
        </div>

        {/* Interactive CLI Input Line */}
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2 px-4 py-3 bg-slate-900/95 border-t border-slate-800">
          <span className="text-emerald-400 font-bold text-xs select-none">
            guest@faisal:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Type command... (e.g. 'help', 'skills', 'hire')"
            className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder-slate-600 font-mono"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
