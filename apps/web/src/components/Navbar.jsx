import { Link } from 'react-router-dom';

export default function Navbar({ variant = 'full' }) {
  if (variant === 'minimal') {
    return (
      <nav className="fixed top-0 w-full z-50 bg-[#1c1b1b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white font-headline">
            ResumeForge
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-on-surface-variant text-sm font-medium">Draft saved</span>
            <div className="h-8 w-8 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/20">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1c1b1b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white font-headline">
            ResumeForge
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <a className="font-headline text-sm font-semibold tracking-tight text-[#c2c1ff] border-b-2 border-[#c2c1ff] pb-1" href="#">
              Editor
            </a>
            <a className="font-headline text-sm font-medium tracking-tight text-[#c7c4d8] hover:text-white transition-colors" href="#">
              Templates
            </a>
            <a className="font-headline text-sm font-medium tracking-tight text-[#c7c4d8] hover:text-white transition-colors" href="#">
              Pricing
            </a>
            <a className="font-headline text-sm font-medium tracking-tight text-[#c7c4d8] hover:text-white transition-colors" href="#">
              Support
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-on-primary-container text-surface-container-lowest font-headline font-bold px-6 py-2 rounded-xl scale-95 active:scale-90 transition-transform hover:opacity-90">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
