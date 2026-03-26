import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Result() {
  return (
    <div className="font-body text-on-surface min-h-screen flex flex-col" style={{ backgroundColor: '#000000' }}>
      <Navbar variant="minimal" />

      <main className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center justify-center">
        {/* Success Content Area */}
        <div className="w-full max-w-2xl bg-[#0f0f0f] rounded-2xl p-8 md:p-12 shadow-2xl border border-outline-variant/10">
          {/* Success Icon/Visual */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full" />
              <div className="relative bg-secondary-container/20 p-6 rounded-full">
                <span
                  className="material-symbols-outlined text-secondary text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            </div>
          </div>

          {/* Header Section */}
          <div className="text-center space-y-3 mb-12">
            <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight font-headline">
              Your resume is ready!
            </h1>
            <p className="text-[#a0a0a0] text-lg font-medium">
              Tailored and optimized for this job
            </p>
          </div>

          {/* Resume Preview Card (Editorial Approach) */}
          <div className="mb-12 group cursor-pointer">
            <div className="bg-surface-bright rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-8 border border-outline-variant/5 group-hover:bg-surface-bright/80 transition-colors">
              <div className="bg-white w-48 h-64 md:w-64 md:h-80 shadow-2xl rounded-sm p-4 relative overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
                {/* Abstract Resume Content Representation */}
                <div className="h-4 w-1/2 bg-slate-200 mb-6" />
                <div className="space-y-2 mb-8">
                  <div className="h-2 w-full bg-slate-100" />
                  <div className="h-2 w-full bg-slate-100" />
                  <div className="h-2 w-3/4 bg-slate-100" />
                </div>
                <div className="h-3 w-1/3 bg-slate-200 mb-4" />
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-100" />
                  <div className="h-2 w-5/6 bg-slate-100" />
                </div>
                {/* Success Overlay */}
                <div className="absolute bottom-0 right-0 p-4">
                  <div className="bg-secondary text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    ATS 98%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex flex-col items-center gap-6">
            {/* Primary Download CTA */}
            <button className="w-full max-w-sm py-5 px-8 bg-white text-black font-bold text-lg rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                download
              </span>
              Download Resume PDF
            </button>

            {/* Secondary Actions */}
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/"
                className="text-[#a0a0a0] hover:text-white text-sm font-medium transition-colors underline-offset-4 hover:underline"
              >
                Generate another
              </Link>
              <div className="flex items-center gap-8 mt-4 pt-8 border-t border-outline-variant/10 w-full justify-center">
                <button className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">edit</span>
                  EDIT DETAILS
                </button>
                <button className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">share</span>
                  SHARE LINK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section (Bento Grid Style) */}
        <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-[#111111] p-6 rounded-2xl border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary mb-3 block">auto_awesome</span>
            <h3 className="text-white font-bold mb-1">AI Analysis</h3>
            <p className="text-[#a0a0a0] text-sm">
              Keywords match 92% of the job description requirements.
            </p>
          </div>
          <div className="bg-[#111111] p-6 rounded-2xl border border-outline-variant/10">
            <span className="material-symbols-outlined text-secondary mb-3 block">tips_and_updates</span>
            <h3 className="text-white font-bold mb-1">Next Steps</h3>
            <p className="text-[#a0a0a0] text-sm">
              We recommend tailoring your cover letter for maximum impact.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
