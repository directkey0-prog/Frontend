const SkeletonBlock = ({ className = '' }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <div
        key={i}
        className={`h-3 bg-gray-200 rounded animate-pulse ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
      />
    ))}
  </div>
);

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
    <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
      <div className="flex gap-3 mt-3">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
        <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
      </div>
      <div className="h-8 bg-gray-200 rounded animate-pulse w-full mt-4" />
    </div>
  </div>
);

const SkeletonPropertyDetail = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="aspect-[16/9] bg-gray-200 rounded-2xl animate-pulse" />
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
        <div className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    </div>
  </div>
);

const SkeletonTable = ({ rows = 5 }) => (
  <div className="space-y-3">
    <div className="h-10 bg-gray-200 rounded animate-pulse" />
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="h-14 bg-gray-100 rounded animate-pulse" />
    ))}
  </div>
);

export { SkeletonBlock, SkeletonText, SkeletonCard, SkeletonPropertyDetail, SkeletonTable };
