import React, { useState } from 'react';
import { 
  Brain, 
  Code2, 
  BarChart3, 
  ShieldCheck, 
  Layers, 
  Search,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { resumeData } from '../data/resume';

export const SkillConstellation: React.FC<{ onNavigateProjects?: () => void }> = () => {
  const [activeClusterId, setActiveClusterId] = useState<string>('ai-tools-prompting');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCluster = resumeData.skillClusters.find(c => c.id === activeClusterId) || resumeData.skillClusters[0];

  const getClusterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'Brain': return <Brain className="w-5 h-5 text-indigo-600" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-blue-600" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-rose-600" />;
      default: return <Layers className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/40 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Technical Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900">
            Skill Architecture &amp; <span className="tech-gradient-text">Core Stacks</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            A structured matrix of full-stack frameworks, database systems, AI &amp; machine learning architectures, and developer tooling.
          </p>
        </div>

        {/* Category Selector Pills */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10 pb-4 border-b border-slate-200">
          {resumeData.skillClusters.map(cluster => {
            const isActive = cluster.id === activeClusterId;
            return (
              <button
                key={cluster.id}
                onClick={() => {
                  setActiveClusterId(cluster.id);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm scale-105'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 shadow-2xs'
                }`}
              >
                {getClusterIcon(cluster.icon)}
                <span>{cluster.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {cluster.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Domain Overview Banner */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 interactive-card">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs shrink-0">
              {getClusterIcon(activeCluster.icon)}
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  {activeCluster.name}
                </h3>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  Active Domain
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {activeCluster.description}
              </p>
            </div>
          </div>

          {/* Search Filter for Skills */}
          <div className="w-full md:w-72 relative shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search skills & technologies..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Dynamic Skill Cards Grid with Rich Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCluster.skills
            .filter(sk => 
              sk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              sk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              sk.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map((skill, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between interactive-card card-shine group shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-50 text-blue-700 border border-slate-200">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {skill.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Interconnected Technology Matrix */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 relative overflow-hidden interactive-card shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 block mb-1">
                Domain Versatility
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                Core Industry &amp; Technology Matrix
              </h3>
            </div>
            <span className="text-xs font-medium text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              7 Core Vectors &bull; VTU &amp; Industry Exposure
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {resumeData.industryExpertise.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between hover:border-blue-300 hover:shadow-xs transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <h4 className="text-sm font-bold text-slate-900">{exp.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
