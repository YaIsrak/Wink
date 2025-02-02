import { PostSkeleton, UserInfoSkeleton } from "@/components/CustomSkeleton";
import UserPagePostTab from "@/components/user/user-page-post-tab";
import UserProfileInfo from "@/components/user/user-profile-info";
import { getUserById } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { profileId: string };
}) {
  const profile = await getUserById(params.profileId);

  return {
    title: profile?.name,
    description: profile?.bio,
  };
}

export default async function UserPage({
  params,
}: {
  params: { profileId: string };
}) {
  const currentUser = await auth();
  if (!currentUser) redirect("/sign-in");

  const profile = await getUserById(params.profileId);
  if (!profile) return <div>User not found</div>;

  return (
    <div className="min-h-screen border-x">
      <Suspense fallback={<UserInfoSkeleton />}>
        <UserProfileInfo profileId={params.profileId} profile={profile} />
      </Suspense>

      <Suspense
        fallback={
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
        }
      >
        <UserPagePostTab profile={profile} />
      </Suspense>
    </div>
  );
}
