export default function ProgressBeam({ progress = 0, className = "" }) {
  return (
    <div className={`w-full h-0.5 overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-secondary via-primary to-tertiary rounded-full transition-all duration-700 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
