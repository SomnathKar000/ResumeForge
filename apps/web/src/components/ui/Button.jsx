const variants = {
  primary:
    "bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-semibold shadow-[0_4px_20px_rgba(97,94,254,0.3)] hover:shadow-[0_8px_30px_rgba(97,94,254,0.45)] hover:scale-[1.02] active:scale-[0.98]",
  secondary:
    "bg-transparent text-primary border border-outline-variant/25 hover:bg-primary/10 hover:border-primary/40 active:scale-[0.98]",
  tertiary:
    "bg-transparent text-primary hover:underline underline-offset-4 decoration-primary/50",
  danger:
    "bg-tertiary-container text-on-tertiary-container font-semibold hover:bg-tertiary-container/80 active:scale-[0.98]",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-label cursor-pointer
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="w-5 h-5 flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
