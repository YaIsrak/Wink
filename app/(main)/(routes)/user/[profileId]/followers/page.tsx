import FollowUser from "@/components/follow/FollowUser";
import { UsersListSkeleton } from "@/components/search/UserList";
import { getUserById } from "@/lib/actions";
import { Suspense } from "react";

export default async function FollowersPage({
  params,
}: {
  params: { profileId: string };
}) {
  const user = await getUserById(params.profileId);

  if (!user) {
    return null;
  }
  return (
    <div className="min-h-screen border-x p-6">
      <h1 className="text-2xl font-bold md:text-3xl">
        People {user.name} follow:
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {user?.followers.map((followerUser) => (
          <Suspense
            key={followerUser.id}
            fallback={
              <>
                <UsersListSkeleton />
                <UsersListSkeleton />
              </>
            }
          >
            <FollowUser
              key={followerUser.id}
              userId={followerUser.followerId}
            />
          </Suspense>
        ))}

        {user?.followers.length === 0 && <p>No followers yet</p>}
      </div>
    </div>
  );
}
