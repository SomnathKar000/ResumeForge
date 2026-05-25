import { useEffect } from "react";

export default function Snackbar({ message, isOpen, onClose, duration = 6000 }) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 px-4 w-full max-w-sm">
      <div className="animate-slide-up flex items-center gap-3 bg-[#1c1b1b]/95 backdrop-blur-md border border-[#ffb4ab]/30 px-4 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Error Icon */}
        <span className="material-symbols-outlined text-[#ffb4ab] text-2xl shrink-0">
          error
        </span>
        
        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <p className="font-label text-[10px] uppercase tracking-widest text-[#a0a0a0] mb-0.5 font-bold">
            Failed to Generate
          </p>
          <p className="font-body text-sm text-on-surface leading-snug">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-on-surface-variant hover:text-white transition-colors shrink-0 p-1.5 hover:bg-surface-container-high rounded-xl"
          aria-label="Close error message"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  );
}
