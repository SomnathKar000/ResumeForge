export default function ResumePreview() {
  return (
    <div className="bg-surface-bright rounded-2xl p-8 flex items-start justify-center min-h-[500px]">
      {/* The centered "page" */}
      <div className="w-full max-w-md bg-surface-lowest rounded-xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <div className="w-32 h-2.5 bg-primary-container/40 rounded-full mb-3" />
          <div className="w-48 h-1.5 bg-surface-highest rounded-full mb-2" />
          <div className="w-36 h-1.5 bg-surface-high rounded-full" />
        </div>

        {/* Divider — using spacing, not a line */}
        <div className="h-4" />

        {/* Section: Experience */}
        <div className="mb-5">
          <div className="w-20 h-1.5 bg-primary/30 rounded-full mb-3" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-24 h-1.5 bg-surface-highest rounded-full" />
                  <div className="w-16 h-1 bg-surface-high rounded-full" />
                </div>
                <div className="w-full h-1 bg-surface-high rounded-full mb-1.5" />
                <div className="w-5/6 h-1 bg-surface-high rounded-full mb-1.5" />
                <div className="w-3/4 h-1 bg-surface-high rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Section: Skills */}
        <div className="mb-5">
          <div className="w-14 h-1.5 bg-primary/30 rounded-full mb-3" />
          <div className="flex flex-wrap gap-2">
            {[16, 20, 12, 24, 14, 18].map((w, i) => (
              <div
                key={i}
                className="h-5 bg-surface-highest rounded-full"
                style={{ width: `${w * 4}px` }}
              />
            ))}
          </div>
        </div>

        {/* Section: Education */}
        <div>
          <div className="w-18 h-1.5 bg-primary/30 rounded-full mb-3" />
          <div className="flex items-center gap-2 mb-2">
            <div className="w-28 h-1.5 bg-surface-highest rounded-full" />
            <div className="w-12 h-1 bg-surface-high rounded-full" />
          </div>
          <div className="w-full h-1 bg-surface-high rounded-full mb-1.5" />
          <div className="w-2/3 h-1 bg-surface-high rounded-full" />
        </div>
      </div>
    </div>
  );
}
