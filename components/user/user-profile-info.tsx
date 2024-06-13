import { db } from "@/prisma/db";
import { Avatar, AvatarImage } from "../ui/avatar";
import UserPageFunctionalButton from "./user-page-functional-button";

export default async function UserProfileInfo({
  profileId,
}: {
  profileId: string;
}) {
  // Fetch profile
  const profile = await db.profile.findUnique({
    where: { id: profileId },
    include: {
      followers: true,
      following: true,
    },
  });

  if (!profile) {
    // Handle the case where the profile is not found
    return <div>Profile not found</div>;
  }

  return (
    <div className="flex gap-4 border-b p-6">
      {/* Avatar */}
      <Avatar className="size-32">
        <AvatarImage src={profile?.imageUrl} />
      </Avatar>

      {/* Info */}
      <div className="flex-1 space-y-2 text-sm text-muted-foreground">
        <h1 className="text-xl font-semibold text-primary">{profile.name}</h1>
        <h3>@{profile.username}</h3>
        <p>{profile.bio}</p>
        <div className="flex gap-2">
          <p>
            <span className="font-semibold text-primary">
              {profile.followers.length}
            </span>{" "}
            Followers
          </p>
          <p>
            <span className="font-semibold text-primary">
              {profile.following.length}
            </span>{" "}
            Following
          </p>
        </div>
      </div>

      {/* Button */}
      <UserPageFunctionalButton profileId={profileId} profile={profile} />
    </div>
  );
}
