import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Brain, 
  X,
  ChevronRight,
  BookOpen,
  Calendar,
  Building
} from 'lucide-react';
import { resumeData } from '../data/resume';
import type { CertificationItem } from '../data/resume';
import { soundEngine } from '../utils/sound';

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cybersecurity': return <ShieldCheck className="w-5 h-5 text-rose-600" />;
      case 'AI & Prompt Engineering': return <Brain className="w-5 h-5 text-blue-600" />;
      case 'Expos & Competitions': return <Award className="w-5 h-5 text-amber-600" />;
      default: return <BookOpen className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section id="training" className="py-20 relative overflow-hidden bg-slate-50/40 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Development &amp; Participation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900">
            Training &amp; <span className="tech-gradient-text">Professional Development</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Documented technical exhibitions, institutional cyber security training, and technology workshops from my resume.
          </p>
        </div>

        {/* Training Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {resumeData.certifications.map(cert => (
            <div
              key={cert.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedCert(cert);
              }}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group interactive-card card-shine shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-blue-50 transition-all shadow-2xs">
                    {getCategoryIcon(cert.category)}
                  </div>
                  {cert.dateOrYear && (
                    <span className="text-[11px] font-mono text-slate-500 font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                      {cert.dateOrYear}
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-1">
                  {cert.title}
                </h3>

                <p className="text-xs text-blue-700 font-medium mb-3">
                  {cert.issuer}
                </p>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-slate-100">
                  {cert.skillsCovered.slice(0, 2).map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {sk}
                    </span>
                  ))}
                  {cert.skillsCovered.length > 2 && (
                    <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5">
                      +{cert.skillsCovered.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Details */}
        {selectedCert && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedCert(null)}
          >
            <div 
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-800 space-y-5"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600">
                    {getCategoryIcon(selectedCert.category)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-blue-700">
                      {selectedCert.category}
                    </span>
                    <h3 className="text-lg font-bold font-display text-slate-900">
                      {selectedCert.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-blue-600" />
                  <span><strong>Organization / Issuer:</strong> {selectedCert.issuer}</span>
                </div>
                {selectedCert.dateOrYear && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span><strong>Period / Year:</strong> {selectedCert.dateOrYear}</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedCert.description}
              </p>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-2 font-semibold">
                  Skills &amp; Topics Documented:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skillsCovered.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition-colors cursor-pointer shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
