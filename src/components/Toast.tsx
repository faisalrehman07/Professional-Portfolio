import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Info, Zap, X } from 'lucide-react';

interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'cosmic';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info' | 'cosmic') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'cosmic' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast notification overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full px-4 sm:px-0">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border shadow-2xl backdrop-blur-xl animate-bounce-in transition-all ${
              toast.type === 'cosmic'
                ? 'bg-slate-900/95 border-purple-500/40 text-purple-200 shadow-[0_0_25px_rgba(168,85,247,0.2)]'
                : toast.type === 'info'
                ? 'bg-slate-900/95 border-cyan-500/40 text-cyan-200 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900/95 border-emerald-500/40 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'cosmic' ? (
                <Zap className="w-5 h-5 text-purple-400 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-5 h-5 text-cyan-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              <span className="text-xs sm:text-sm font-medium text-slate-100">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: () => {},
    };
  }
  return context;
}
