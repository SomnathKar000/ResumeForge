export default function Input({
  label,
  id,
  error,
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="font-label text-xs uppercase tracking-widest text-on-surface-variant"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full px-4 py-3
          bg-surface-low text-on-surface
          font-body text-sm
          rounded-lg outline-none
          placeholder:text-outline
          transition-all duration-300
          focus:ring-2 focus:ring-primary/40 focus:shadow-[0_0_12px_rgba(194,193,255,0.15)]
          ${error ? "ring-2 ring-error/60 bg-error-container/10" : ""}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs font-label text-error mt-0.5">{error}</span>
      )}
    </div>
  );
}
