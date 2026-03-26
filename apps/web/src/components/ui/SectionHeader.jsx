export default function SectionHeader({
  title,
  subtitle,
  action,
  className = "",
}) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div>
        {subtitle && (
          <p className="font-label text-xs uppercase tracking-[0.05em] text-primary mb-2">
            {subtitle}
          </p>
        )}
        <h2 className="font-headline text-2xl font-semibold text-white leading-tight">
          {title}
        </h2>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
