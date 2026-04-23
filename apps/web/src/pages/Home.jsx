import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useResumeGen from "../hooks/useResumeGen";

export default function Home() {
  const { handleGenerate } = useResumeGen();

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleGenerateClick = () => {
    // handleGenerate(file, jobDescription);
    console.log(file, jobDescription);
  };

  return (
    <>
      <Navbar variant="full" />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
            Tailor your resume for every job
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed">
            Upload your resume, paste the job description — get an ATS-friendly
            resume in seconds.
          </p>
        </header>

        {/* Main Tool Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Card: Upload Resume */}
          <section className="bg-surface-container-low p-8 rounded-2xl group transition-all duration-300 hover:bg-surface-container border border-transparent hover:border-outline-variant/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-white">
                Upload Resume
              </h2>
              <span className="material-symbols-outlined text-primary">
                description
              </span>
            </div>
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 rounded-2xl py-16 px-6 bg-surface-container-lowest/50 group-hover:border-primary/40 transition-colors">
              <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-full mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl text-primary">
                  upload
                </span>
              </div>
              <p className="font-body font-medium text-white mb-2">
                Drop your PDF or DOCX here
              </p>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Max size 5MB
              </p>
              <input
                accept=".pdf,.docx"
                className="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                value={file}
                onChange={handleFileChange}
              />
            </div>
          </section>

          {/* Right Card: Job Description */}
          <section className="bg-surface-container-low p-8 rounded-2xl transition-all duration-300 hover:bg-surface-container border border-transparent hover:border-outline-variant/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-white">
                Job Description
              </h2>
              <span className="material-symbols-outlined text-tertiary">
                work
              </span>
            </div>
            <div className="h-full">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3 block">
                Paste content below
              </label>
              <textarea
                className="w-full h-64 bg-surface-container-lowest border-none rounded-2xl p-6 text-on-surface font-body resize-none focus:ring-1 focus:ring-primary/40 focus:bg-surface-container-high transition-all focus:outline-none"
                placeholder="Paste the full job description, requirements, and responsibilities here..."
                value={jobDescription}
                onChange={handleJobDescriptionChange}
              />
            </div>
          </section>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-24">
          <Link
            to="/result"
            className="w-full md:w-auto min-w-[320px] bg-on-primary-container text-surface-container-lowest font-headline text-lg font-bold py-5 px-12 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-primary/10"
            onClick={handleGenerateClick}
          >
            Generate Resume
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
          </Link>
        </div>

        {/* Feature Grid (Editorial Style) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="text-primary mb-4">
              <span className="material-symbols-outlined text-3xl">
                psychology
              </span>
            </div>
            <h3 className="font-headline text-white text-lg font-bold mb-2">
              AI-Powered Optimization
            </h3>
            <p className="font-body text-on-surface-variant text-sm leading-relaxed">
              Our advanced models analyze keywords and semantics to align your
              experience with job requirements perfectly.
            </p>
          </div>
          <div className="p-6">
            <div className="text-secondary mb-4">
              <span className="material-symbols-outlined text-3xl">
                verified
              </span>
            </div>
            <h3 className="font-headline text-white text-lg font-bold mb-2">
              ATS-Proof Formatting
            </h3>
            <p className="font-body text-on-surface-variant text-sm leading-relaxed">
              Eliminate the guesswork. We format your resume to sail through
              every Applicant Tracking System on the market.
            </p>
          </div>
          <div className="p-6">
            <div className="text-tertiary mb-4">
              <span className="material-symbols-outlined text-3xl">speed</span>
            </div>
            <h3 className="font-headline text-white text-lg font-bold mb-2">
              Instant Iterations
            </h3>
            <p className="font-body text-on-surface-variant text-sm leading-relaxed">
              Apply for 10 jobs in 10 minutes. Tailor each application with
              precision and unprecedented speed.
            </p>
          </div>
        </section>

        {/* Live Preview Decoration */}
        <section className="mt-32 relative overflow-hidden rounded-[2rem] bg-surface-bright h-[500px] flex items-center justify-center border border-outline-variant/10">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCy5ma4JpRdXRR5H3imJQav64BHffEnHYMH3rHWbT2w9DCU7ycb0eUKK4z0jFeOil312aUOPGZzznXJeJt_7CeHtuD0mUaG4JjLXYDgvncgmvs14GanJcXhQsnSm35REpwr-056CdQ3BZtSEPXpuuB92np8xO02dv-mHI4po2kKcusHLz6vyR2b9OROx4ZViaaRQCdP_u5PkFIvj9iDeyfoN3VZ04XLuf4VnyiFybwQ0ZtqnYpmiL2bjJdTmpq-X3aeFr_ESVRDVA')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative bg-surface-container-lowest w-3/4 max-w-2xl h-[400px] rounded-xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] p-12 border border-outline-variant/5">
            <div className="flex gap-4 items-center mb-8 border-b border-outline-variant/20 pb-6">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest" />
              <div>
                <div className="h-4 w-48 bg-surface-container-highest rounded mb-2" />
                <div className="h-3 w-32 bg-surface-container-low rounded" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-2 w-full bg-surface-container-low rounded" />
              <div className="h-2 w-full bg-surface-container-low rounded" />
              <div className="h-2 w-3/4 bg-surface-container-low rounded" />
              <div className="pt-6 space-y-4">
                <div className="h-3 w-40 bg-primary/20 rounded" />
                <div className="h-2 w-full bg-surface-container-low rounded" />
                <div className="h-2 w-5/6 bg-surface-container-low rounded" />
              </div>
            </div>
            <div className="absolute top-1/2 -right-12 bg-secondary-container/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl transform rotate-3">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-white"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="text-white font-headline font-bold text-sm">
                  ATS SCORE: 98%
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
