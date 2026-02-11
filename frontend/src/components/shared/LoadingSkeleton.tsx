import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'profile' | 'table';
  count?: number;
}

const LoadingSkeleton = ({ type = 'card', count = 3 }: LoadingSkeletonProps) => {
  const renderCardSkeleton = () => (
    <div className="rounded-xl border bg-card p-6 shadow-card">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="flex items-center gap-4 p-4 border-b">
      <Skeleton className="h-10 w-10 rounded-lg" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  );

  const renderProfileSkeleton = () => (
    <div className="flex flex-col items-center p-6">
      <Skeleton className="h-24 w-24 rounded-full mb-4" />
      <Skeleton className="h-6 w-40 mb-2" />
      <Skeleton className="h-4 w-32 mb-4" />
      <div className="w-full space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );

  const renderTableSkeleton = () => (
    <div className="w-full">
      <div className="flex gap-4 p-4 border-b bg-muted/50">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border-b">
          {[1, 2, 3, 4].map((j) => (
            <Skeleton key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'list':
        return Array.from({ length: count }).map((_, i) => (
          <div key={i}>{renderListSkeleton()}</div>
        ));
      case 'profile':
        return renderProfileSkeleton();
      case 'table':
        return renderTableSkeleton();
      default:
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i}>{renderCardSkeleton()}</div>
            ))}
          </div>
        );
    }
  };

  return <div className="animate-pulse">{renderSkeleton()}</div>;
};

export default LoadingSkeleton;
