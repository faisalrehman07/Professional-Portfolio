import React, { useState } from 'react';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar, 
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { resumeData } from '../data/resume';
import { soundEngine } from '../utils/sound';

export const ExperienceTimeline: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([
    resumeData.experience[0].id, 
    resumeData.experience[1].id,
    resumeData.experience[2].id
  ]);

  const toggleExpand = (id: string) => {
    soundEngine.playClick();
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'Professional Experience':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Internship':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-white/40 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span>Professional Career</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900">
            Professional <span className="tech-gradient-text">Experience</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Documented timeline of full-stack software development, digital advisory communications, and cybersecurity training.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8">
          {resumeData.experience.map(exp => {
            const isExpanded = expandedIds.includes(exp.id);
            return (
              <div key={exp.id} className="relative group">
                {/* Clean Node Dot on Timeline Spine */}
                <span className="absolute -left-[32px] sm:-left-[40px] top-6 w-4 h-4 rounded-full bg-white border-2 border-blue-600 group-hover:border-blue-700 group-hover:scale-110 shadow-sm transition-all flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                </span>

                {/* Timeline Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 interactive-card card-shine shadow-xs">
                  {/* Card Header Bar */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${getBadgeColor(exp.category)}`}>
                          {exp.badge}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
                        {exp.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                        <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
                          <Building className="w-3.5 h-3.5" />
                          <span>{exp.organization}</span>
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1 text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{exp.location}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button 
                        className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
                        aria-label={isExpanded ? "Collapse experience card" : "Expand experience card"}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Summary Narrative */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 pt-4 border-t border-slate-100">
                    {exp.summary}
                  </p>

                  {/* Expandable Documented Responsibilities */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-slate-100 space-y-4 animate-fade-in">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                        Documented Responsibilities &amp; Highlights:
                      </h4>

                      <div className="space-y-2.5">
                        {exp.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-medium">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills Acquired / Exercised */}
                      <div className="pt-3">
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
                          Competencies Exercised:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skillsGained.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
