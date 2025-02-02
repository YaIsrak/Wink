import PostList, { PostListSkeleton } from "@/components/search/PostList";
import {
  default as UserList,
  UsersListSkeleton,
} from "@/components/search/UserList";
import { Suspense } from "react";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { q } = searchParams;

  return (
    <div className="min-h-screen border-x p-6">
      <div>
        <h1 className="text-3xl font-bold">Search</h1>
        <p className="text-sm text-muted-foreground">of &quot;{q}&quot;</p>
      </div>

      {/* users */}
      <Suspense
        fallback={
          <>
            <UsersListSkeleton />
            <UsersListSkeleton />
          </>
        }
      >
        <UserList q={q} />
      </Suspense>

      {/* posts */}
      <Suspense
        fallback={
          <>
            <PostListSkeleton />
            <PostListSkeleton />
          </>
        }
      >
        <PostList q={q} />
      </Suspense>
    </div>
  );
}
