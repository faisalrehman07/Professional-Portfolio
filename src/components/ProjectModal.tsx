import React, { useEffect, useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Layers, 
  Building, 
  Award,
  Tag,
  Copy,
  Check,
  Send
} from 'lucide-react';
import type { ProjectItem } from '../data/resume';
import { soundEngine } from '../utils/sound';
import { triggerConfetti } from '../utils/confetti';
import { useToast } from './Toast';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContactProject?: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  onClose,
  onContactProject 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'outcomes'>('overview');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setActiveTab('overview');
      setCopied(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyDossier = () => {
    const text = `=== PROJECT DOSSIER: ${project.title} ===
Category: ${project.category} (${project.type})
Affiliation: ${project.affiliation || 'Independent Engineering'}
Technologies: ${project.technologies.join(', ')}

Overview:
${project.fullDescription}

Key Features:
${project.features.map(f => `• ${f}`).join('\n')}

Deliverables & Outcomes:
${project.outcomes.map(o => `• ${o}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    soundEngine.playSuccess();
    triggerConfetti();
    showToast(`Dossier copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-800 flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200 bg-slate-50/80">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-500 font-medium">
              {project.type}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyDossier}
              className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer shadow-2xs"
              title="Copy Complete Project Dossier"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline font-sans font-medium">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-6 pt-2 gap-2 text-xs font-mono">
          {[
            { id: 'overview', label: '1. Overview & Architecture' },
            { id: 'features', label: '2. Core Features' },
            { id: 'outcomes', label: '3. Deliverables & Outcomes' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`pb-3 px-3 border-b-2 font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-white">
          {/* Title & Affiliation */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-2 leading-snug">
              {project.title}
            </h3>
            {project.affiliation && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-700 font-mono font-medium">
                <Building className="w-4 h-4" />
                <span>Affiliation / Context: {project.affiliation}</span>
              </div>
            )}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Full Narrative */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-700 leading-relaxed space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">Project Overview</h4>
                <p className="whitespace-pre-line">{project.fullDescription}</p>
              </div>

              {/* Technologies Used */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2 font-semibold">
                  <Tag className="w-3.5 h-3.5 text-blue-600" />
                  <span>Technology Stack &amp; Methodologies</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 flex items-center gap-2 font-semibold">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Core Architectural Features ({project.features.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'outcomes' && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 flex items-center gap-2 font-semibold">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>Verified Deliverables &amp; Outcomes</span>
              </h4>
              <div className="space-y-3">
                {project.outcomes.map((outcome, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 text-xs sm:text-sm text-slate-800 flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="leading-relaxed font-medium">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-blue-600 hover:border-blue-400 transition-colors shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Repository</span>
              </a>
            )}
            <span>Documented in Resume</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onContactProject && (
              <button
                onClick={() => {
                  onContactProject(project.title);
                  onClose();
                }}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Inquire About Project</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-xs"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
