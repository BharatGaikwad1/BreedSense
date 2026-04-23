import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted shimmer-bg animate-shimmer',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
