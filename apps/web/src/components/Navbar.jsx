import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1c1b1b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tighter text-white font-headline"
          >
            ResumeForge
          </Link>
        </div>
      </div>
    </nav>
  );
}
