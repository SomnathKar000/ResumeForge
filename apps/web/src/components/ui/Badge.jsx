const variants = {
  default: "bg-surface-highest text-on-surface-variant",
  primary: "bg-primary-container/20 text-primary",
  success: "bg-secondary-container/20 text-secondary",
  warning: "bg-tertiary/20 text-tertiary",
  error: "bg-error-container/30 text-error",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}) {
  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        font-label text-xs font-medium uppercase tracking-wider
        rounded-full
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
