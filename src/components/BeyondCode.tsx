import React from 'react';
import { 
  Laptop, 
  Gamepad2, 
  Cpu, 
  Camera, 
  Activity, 
  Mic, 
  Compass, 
  Code2
} from 'lucide-react';
import { resumeData } from '../data/resume';

export const BeyondCode: React.FC = () => {
  const getPursuitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Orbit': return <Code2 className="w-5 h-5 text-blue-600" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-indigo-600" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-purple-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-600" />;
      case 'Camera': return <Camera className="w-5 h-5 text-rose-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-600" />;
      case 'Mic': return <Mic className="w-5 h-5 text-blue-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-sky-600" />;
      default: return <Code2 className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="beyond" className="py-24 relative overflow-hidden bg-slate-50/30 backdrop-blur-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Interests &amp; Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900">
            Beyond Code &amp; <span className="tech-gradient-text">Perspectives</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Creative and cognitive pursuits that fuel problem-solving, analytical curiosity, team leadership, resilience, and engineering perspective.
          </p>
        </div>

        {/* Pursuit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {resumeData.beyondCode.map((pursuit, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-300 group flex flex-col justify-between interactive-card card-shine shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-blue-50 transition-all shadow-2xs">
                    {getPursuitIcon(pursuit.icon)}
                  </div>
                  <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {pursuit.category}
                  </span>
                </div>

                <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {pursuit.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pursuit.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-blue-600 font-medium">
                <span>Active Pursuit</span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
