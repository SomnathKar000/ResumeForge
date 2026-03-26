const elevations = {
  base: "bg-surface-mid",
  low: "bg-surface-low",
  high: "bg-surface-high",
  highest: "bg-surface-highest",
};

export default function Card({
  children,
  elevation = "base",
  className = "",
  hover = true,
  padding = "p-6",
  ...props
}) {
  return (
    <div
      className={`
        rounded-2xl
        ${elevations[elevation]}
        ${padding}
        transition-all duration-300 ease-out
        ${hover ? "hover:bg-surface-high hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
