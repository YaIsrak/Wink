import UserPagePostTab from "@/components/user/user-page-post-tab";
import UserProfileInfo from "@/components/user/user-profile-info";
import { db } from "@/prisma/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { profileId: string };
}) {
  const profile = await db.profile.findUnique({
    where: { id: params.profileId },
  });

  return {
    title: profile?.username,
    description: profile?.bio,
  };
}

export default async function UserPage({
  params,
}: {
  params: { profileId: string };
}) {
  const currentUser = await auth();
  if (!currentUser) {
    return redirect("/sign-in");
  }

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
          likes: {
            include: {
              user: true,
            },
          },
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
