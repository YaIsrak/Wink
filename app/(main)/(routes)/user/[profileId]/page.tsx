import UserPagePostTab from "@/components/user/user-page-post-tab";
import UserProfileInfo from "@/components/user/user-profile-info";
import { db } from "@/prisma/db";

export default async function UserPage({
  params,
}: {
  params: { profileId: string };
}) {
  // Fetching profile
  const profile = await db.profile.findUnique({
    where: {
      id: params.profileId,
    },
    include: {
      followers: true,
      following: true,
      posts: {
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  // Handle in case profile is not found
  if (!profile) return <div>User not found</div>;

  return (
    <div className="min-h-screen border-x">
      <UserProfileInfo profileId={params.profileId} profile={profile} />

      {/* Posts */}
      <UserPagePostTab profile={profile} />
    </div>
  );
}