import React from 'react';
import { 
  MapPin, 
  Languages, 
  Code2, 
  UserCheck, 
  GraduationCap, 
  Briefcase, 
  Database, 
  Globe2, 
  Cpu, 
  Plane 
} from 'lucide-react';
import { resumeData } from '../data/resume';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/30 backdrop-blur-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-3 shadow-2xs">
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Profile &amp; Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900">
            About <span className="tech-gradient-text">Me</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            A software engineer grounded in practical application development, relational databases, AI integration, and professional communication.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
          {/* Left Column: First-Person Narrative & Documented Milestones */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden interactive-card card-shine">
              <div className="flex items-center gap-2 text-xs text-slate-500 border-b border-slate-100 pb-3 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="font-semibold text-slate-800">Engineering Background &amp; Focus</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mb-4 leading-snug">
                &ldquo;Building practical, dependable software with modern full-stack architectures and intelligent AI integration.&rdquo;
              </h3>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a <strong className="text-slate-900 font-semibold">Software Engineer and Full-Stack Developer</strong> with a Bachelor of Engineering (B.E.) in <strong className="text-blue-700 font-semibold">Artificial Intelligence and Data Science</strong> from Navkis College of Engineering, affiliated with Visvesvaraya Technological University (VTU), graduating with an aggregate <strong className="text-slate-900 font-semibold">CGPA of 8.2/10</strong>.
                </p>

                <p>
                  My professional experience includes working as a <strong className="text-slate-900 font-semibold">Digital Advisor on the Email and Social Media team at [24]7.ai</strong> in Bengaluru. In this customer-oriented digital service environment, I developed disciplined written communication, professional email etiquette, and agile collaboration within structured operational workflows.
                </p>

                <p>
                  During my full-stack development internship at <strong className="text-blue-700 font-semibold">CifTech Solutions Pvt. Ltd.</strong>, I developed a comprehensive <strong className="text-slate-900 font-semibold">Hospital Management System</strong> utilizing <strong className="text-indigo-700 font-semibold">.NET and MySQL</strong>. This experience solidified my ability to plan application lifecycles, engineer normalized relational database schemas, implement business logic, and debug complex workflows.
                </p>

                <p>
                  I actively develop practical software projects—such as a <strong className="text-slate-900 font-semibold">Personal AI Voice Assistant</strong> powered by the Gemini API, a <strong className="text-slate-900 font-semibold">Hotel Management Website</strong> with table booking and food ordering, a <strong className="text-slate-900 font-semibold">Finance Tracking Wallet</strong>, and a <strong className="text-slate-900 font-semibold">Car Parking Management System</strong>. I leverage modern developer environments to integrate multi-modal AI capabilities seamlessly into real-world applications.
                </p>

                <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/90 flex items-start gap-3 mt-4 text-blue-950">
                  <Plane className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
                    <strong>Career Target:</strong> I am actively pursuing software engineering and full-stack development opportunities, with a primary focus on <strong className="text-blue-950 font-bold">Dubai and the UAE</strong>, while remaining keen on international engineering roles where I can deliver practical software solutions.
                  </p>
                </div>
              </div>

              {/* 4 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8 pt-6 border-t border-slate-100">
                {[
                  { 
                    title: "Full-Stack Development", 
                    desc: "Hands-on experience with .NET, MySQL, JavaScript, HTML/CSS, and structured CRUD architectures.", 
                    icon: <Code2 className="w-4 h-4 text-blue-600" /> 
                  },
                  { 
                    title: "AI Integration & APIs", 
                    desc: "Connecting Gemini API endpoints, Google AI Studio, prompt engineering, and ML pipelines into applications.", 
                    icon: <Cpu className="w-4 h-4 text-indigo-600" /> 
                  },
                  { 
                    title: "Database Engineering", 
                    desc: "Relational database schema modeling, SQL query design, and data integrity with MySQL.", 
                    icon: <Database className="w-4 h-4 text-emerald-600" /> 
                  },
                  { 
                    title: "Professional Communication", 
                    desc: "Experience from [24]7.ai in written email etiquette, issue resolution, and collaborative team processes.", 
                    icon: <Briefcase className="w-4 h-4 text-purple-600" /> 
                  }
                ].map((pillar, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 flex items-start gap-3 hover:border-blue-300 transition-all hover:bg-white shadow-2xs">
                    <div className="p-2 rounded-xl bg-white border border-slate-200 shrink-0 mt-0.5 shadow-2xs">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{pillar.title}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 interactive-card">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Languages</span>
                  <span className="text-sm font-bold text-slate-800">English, Hindi, Kannada, Urdu</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {resumeData.languages.map(lang => (
                  <div key={lang.name} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="font-semibold text-slate-900">{lang.name}</span>
                    <span className="text-[11px] text-slate-500">({lang.proficiency})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden interactive-card">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Candidate Profile</h4>
                </div>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
                  8.2 CGPA
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Formal Degree:</span>
                  <span className="text-xs font-semibold text-slate-900 text-right">B.E. in AI &amp; Data Science</span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">University Affiliation:</span>
                  <span className="text-xs font-semibold text-slate-900 text-right">VTU (Visvesvaraya Tech Univ)</span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Institution:</span>
                  <span className="text-xs font-semibold text-slate-900 text-right">Navkis College of Engineering</span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Cumulative GPA:</span>
                  <span className="text-xs font-bold text-blue-700 text-right">8.2 / 10.0</span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Industry Internship:</span>
                  <span className="text-xs font-semibold text-slate-900 text-right">CifTech Solutions (.NET &amp; MySQL)</span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Customer Advisory:</span>
                  <span className="text-xs font-semibold text-slate-900 text-right">[24]7.ai (Email &amp; Social Media)</span>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Security Training:</span>
                  <span className="text-xs font-semibold text-slate-900 text-right">NICC (Web VAPT Training)</span>
                </div>

                <div className="flex items-start justify-between py-2">
                  <span className="text-xs text-slate-500 font-medium">Current Base:</span>
                  <span className="text-xs font-semibold text-slate-900 text-right flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Bengaluru, India</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Target Alignment Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 border border-blue-200/90 shadow-sm">
              <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs mb-3">
                <Globe2 className="w-4 h-4 text-blue-600" />
                <span>Geographical &amp; Career Objective</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                {resumeData.personal.careerObjective}
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-medium">
                <span className="px-2.5 py-1 rounded-lg bg-blue-100/70 text-blue-800 border border-blue-200">
                  Dubai &bull; UAE
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-100/70 text-indigo-800 border border-indigo-200">
                  International Relocation
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100/70 text-emerald-800 border border-emerald-200">
                  Immediate Availability
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
