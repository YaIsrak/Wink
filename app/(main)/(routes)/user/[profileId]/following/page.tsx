import FollowUser from "@/components/follow/FollowUser";
import { UsersListSkeleton } from "@/components/search/UserList";
import { getUserById } from "@/lib/actions";
import { Suspense } from "react";

export default async function FollowingPage({
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
        {user?.following.map((followingUser) => (
          <Suspense
            key={followingUser.id}
            fallback={
              <>
                <UsersListSkeleton />
                <UsersListSkeleton />
              </>
            }
          >
            <FollowUser
              key={followingUser.id}
              userId={followingUser.followerId}
            />
          </Suspense>
        ))}

        {user?.following.length == 0 && <p>No following</p>}
      </div>
    </div>
  );
}
