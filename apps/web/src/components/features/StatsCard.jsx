export default function StatsCard({ icon, label, value, change, positive }) {
  return (
    <div className="bg-surface-mid rounded-2xl p-6 transition-all duration-300 hover:bg-surface-high group">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-surface-highest flex items-center justify-center text-primary transition-colors duration-300 group-hover:bg-primary-container/20">
          {icon}
        </div>
        {change !== undefined && (
          <span
            className={`text-xs font-label font-medium px-2 py-1 rounded-full ${
              positive
                ? "text-secondary bg-secondary-container/15"
                : "text-tertiary bg-tertiary-container/15"
            }`}
          >
            {positive ? "↑" : "↓"} {change}%
          </span>
        )}
      </div>
      <p className="font-display text-2xl font-bold text-white mb-1 tracking-tight">
        {value}
      </p>
      <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
