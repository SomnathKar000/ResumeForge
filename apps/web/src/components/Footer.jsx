import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] w-full py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-bold text-white font-headline tracking-tighter">
            ResumeForge
          </span>
          <p className="font-body text-xs tracking-wide uppercase text-on-surface-variant">
            © 2024 ResumeForge. Built for Digital Architects.
          </p>
        </div>
        <div className="flex gap-8">
          <Link
            className="font-body text-xs tracking-wide uppercase text-[#c7c4d8] hover:text-[#c2c1ff] transition-colors"
            to="/contact"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
