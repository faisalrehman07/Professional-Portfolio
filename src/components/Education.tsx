import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';
import { resumeData } from '../data/resume';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-slate-50/30 backdrop-blur-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3 shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900">
            Engineering Degree &amp; <span className="tech-gradient-text">Academics</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Bachelor of Engineering (B.E.) degree from Visvesvaraya Technological University with an academic major in Artificial Intelligence and Data Science.
          </p>
        </div>

        {/* Education Showcase Card */}
        <div className="p-8 sm:p-11 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden interactive-card card-shine">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Degree Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold uppercase px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Bachelor of Engineering (B.E.)
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>Graduation: {resumeData.education.year}</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                  {resumeData.education.degree}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-sm text-blue-700 mt-2">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Building2 className="w-4 h-4" />
                    {resumeData.education.institution}
                  </span>
                  <span className="hidden sm:inline text-slate-400">&bull;</span>
                  <span className="text-slate-500 font-medium">{resumeData.education.university}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Comprehensive 4-year undergraduate curriculum blending core computing fundamentals, software engineering, relational databases, AI systems, and applied data analytics.
              </p>

              {/* Coursework Matrix */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Key Coursework &amp; Subject Areas</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {resumeData.education.coreCourses.map((course, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: CGPA HUD Badge & Academic Rigor */}
            <div className="lg:col-span-5 flex flex-col justify-between p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-500 block mb-2">
                  Cumulative Grade Point Average
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-display font-extrabold text-blue-600">
                    {resumeData.education.cgpa}
                  </span>
                  <span className="text-slate-500 text-base font-semibold">/ 10.0 CGPA</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full w-[82%]" />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Participated in IEEE Project Expo 2025 &amp; Mini Project Expo 2024</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Lead Developer on Academic Major Project (rPPG Stress Prediction)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
                <span className="text-xs font-semibold text-slate-800">
                  Visvesvaraya Technological University (VTU)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
