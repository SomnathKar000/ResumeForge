import Badge from "../ui/Badge";
import ProgressBeam from "../ui/ProgressBeam";

export default function ResumeCard({
  title = "Untitled Resume",
  updatedAt = "Just now",
  status = "draft",
  progress = 0,
  template = "Modern",
}) {
  const statusMap = {
    draft: { label: "Draft", variant: "default" },
    complete: { label: "Complete", variant: "success" },
    review: { label: "In Review", variant: "primary" },
  };

  const { label, variant } = statusMap[status] || statusMap.draft;

  return (
    <div className="group bg-surface-mid rounded-2xl overflow-hidden transition-all duration-300 hover:bg-surface-high hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] cursor-pointer">
      {/* Preview thumbnail area */}
      <div className="relative h-40 bg-surface-lowest flex items-center justify-center overflow-hidden">
        {/* Faux document preview */}
        <div className="w-24 h-32 bg-surface-low rounded-lg p-3 shadow-lg transform group-hover:scale-105 transition-transform duration-500">
          <div className="w-full h-1.5 bg-surface-highest rounded-full mb-2" />
          <div className="w-3/4 h-1 bg-surface-high rounded-full mb-1.5" />
          <div className="w-full h-1 bg-surface-high rounded-full mb-1.5" />
          <div className="w-5/6 h-1 bg-surface-high rounded-full mb-3" />
          <div className="w-1/2 h-1 bg-primary-container/30 rounded-full mb-1.5" />
          <div className="w-full h-1 bg-surface-high rounded-full mb-1.5" />
          <div className="w-4/5 h-1 bg-surface-high rounded-full" />
        </div>

        {/* Template label */}
        <span className="absolute top-3 right-3 px-2 py-1 bg-surface-mid/80 backdrop-blur-sm rounded-lg text-[10px] font-label uppercase tracking-wider text-on-surface-variant">
          {template}
        </span>
      </div>

      {/* Progress beam */}
      <ProgressBeam progress={progress} />

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-headline text-sm font-semibold text-white truncate">
            {title}
          </h3>
          <Badge variant={variant}>{label}</Badge>
        </div>
        <p className="text-xs text-on-surface-variant">Updated {updatedAt}</p>
      </div>
    </div>
  );
}
