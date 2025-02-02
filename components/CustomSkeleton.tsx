import { Skeleton } from "./ui/skeleton";

export function PostSkeleton() {
  return (
    <div className="flex gap-4 border-b p-6">
      <Skeleton className="h-10 w-10 shrink-0 overflow-hidden rounded-full" />

      <div className="w-full space-y-2">
        {/* Title */}
        <div className="flex items-center gap-2 text-sm">
          <Skeleton className="h-4 w-12 md:h-6 md:w-16" />
          <Skeleton className="h-4 w-24 md:h-6 md:w-[250px]" />
        </div>
        {/* Actual Content */}
        <Skeleton className="h-20 w-full" />

        {/* Footer */}
        <div className="flex items-center gap-2 md:gap-4">
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="size-5 rounded-full" />
        </div>

        <div className="flex items-center gap-1">
          <Skeleton className="size-4 rounded-full" />

          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function CommentSkeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-10 w-10 shrink-0 overflow-hidden rounded-full" />

      <div className="w-full space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Skeleton className="h-4 w-12 md:w-16" />
          <Skeleton className="h-4 w-24 md:w-[250px]" />
        </div>
        {/* Comment */}
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* time */}
      <Skeleton className="h-4 w-12 md:w-16" />

      <Skeleton className="size-6 shrink-0 rounded-full" />
    </div>
  );
}

export function UserInfoSkeleton() {
  return (
    <div className="flex gap-4 border-b p-6">
      {/* Avatar */}
      <Skeleton className="size-32 shrink-0 rounded-full" />

      {/* Info */}
      <div className="flex-1 space-y-2 text-sm text-muted-foreground">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-16 md:h-6 md:w-20" />
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-12 md:h-6 md:w-16" />
          <Skeleton className="h-4 w-12 md:h-6 md:w-16" />
        </div>
      </div>

      {/* Button */}
      <Skeleton className="h-8 w-16 rounded-full" />
    </div>
  );
}
