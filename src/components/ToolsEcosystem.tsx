import React, { useState } from 'react';
import { 
  Terminal, 
  PieChart, 
  BarChart, 
  Workflow, 
  CheckSquare, 
  Cloud, 
  FileText, 
  Calendar,
  Layers, 
  Info,
  Cpu,
  Boxes
} from 'lucide-react';
import { resumeData } from '../data/resume';
import type { ToolItem } from '../data/resume';

export const ToolsEcosystem: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Terminal': return <Terminal className="w-6 h-6 text-amber-400" />;
      case 'PieChart': return <PieChart className="w-6 h-6 text-blue-400" />;
      case 'BarChart': return <BarChart className="w-6 h-6 text-yellow-400" />;
      case 'Workflow': return <Workflow className="w-6 h-6 text-cyan-400" />;
      case 'CheckSquare': return <CheckSquare className="w-6 h-6 text-blue-400" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-cyan-400" />;
      case 'FileText': return <FileText className="w-6 h-6 text-indigo-400" />;
      case 'Calendar': return <Calendar className="w-6 h-6 text-emerald-400" />;
      default: return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 bg-slate-950/50 relative overflow-hidden interactive-card">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-2.5 backdrop-blur-md">
                <Boxes className="w-3.5 h-3.5" />
                <span>AI Tools &amp; Developer Toolchain</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Developer Software &amp; AI Platform Ecosystem
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
                Platforms and software environments including Google Antigravity, Google AI Studio, prompt engineering pipelines, and agile devtools.
              </p>
            </div>

            <div className="text-xs font-medium text-slate-300 flex items-center gap-2 bg-slate-900/90 px-3.5 py-2 rounded-2xl border border-slate-800 shadow-md">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Click any tool to inspect purpose</span>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {resumeData.tools.map((tool, idx) => {
              const isSelected = selectedTool?.name === tool.name;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedTool(tool)}
                  className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-300 group cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)] scale-105'
                      : 'bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 hover:bg-slate-850 hover:scale-105'
                  }`}
                >
                  <div className="p-3 rounded-2xl bg-slate-800/90 mb-2.5 transition-transform group-hover:scale-110 shadow-sm">
                    {getToolIcon(tool.icon)}
                  </div>
                  <span className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase mt-1 font-medium tracking-wider">
                    {tool.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Tool Details Panel */}
          {selectedTool && (
            <div className="mt-6 p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-sm">
                  {getToolIcon(selectedTool.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h4 className="text-sm sm:text-base font-bold text-white font-display">
                      {selectedTool.name}
                    </h4>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700">
                      {selectedTool.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    {selectedTool.purpose}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTool(null)}
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 transition-colors shrink-0 cursor-pointer"
              >
                Close details
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
