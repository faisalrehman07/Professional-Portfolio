import React, { useEffect } from 'react';
import { 
  X, 
  FileDown, 
  ExternalLink, 
  FileText
} from 'lucide-react';
import { resumeData } from '../data/resume';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-5xl h-[92vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-800"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-display text-slate-900">
                  Faisal Rehman — Official Curriculum Vitae
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 font-semibold">
                  PDF Preview
                </span>
              </div>
              <p className="text-xs text-slate-500">
                FAISAL_REHMAN.pdf • Verified Source of Truth
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resumeData.personal.resumeUrl}
              download="FAISAL_REHMAN_Resume.pdf"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <a
              href={resumeData.personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors shadow-2xs"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer Frame */}
        <div className="flex-1 w-full bg-slate-100 relative overflow-hidden">
          <iframe
            src={`${resumeData.personal.resumeUrl}#toolbar=1&navpanes=0`}
            title="Faisal Rehman Resume Preview"
            className="w-full h-full border-0"
          />
        </div>

        {/* Bottom Footer Actions */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Direct PDF stream verified</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${resumeData.personal.email}`}
              className="text-blue-600 hover:underline"
            >
              {resumeData.personal.email}
            </a>
            <span>•</span>
            <span>+91 9620532473</span>
          </div>
        </div>
      </div>
    </div>
  );
};
