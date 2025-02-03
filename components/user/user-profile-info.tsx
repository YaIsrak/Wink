import { Follower, Profile } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import UserPageFunctionalButton from "./user-page-functional-button";

export type ProfilePropsWithFollowerFollowingAndPost = Profile & {
  followers: Follower[];
  following: Follower[];
};

export default async function UserProfileInfo({
  profileId,
  profile,
}: {
  profileId: string;
  profile: ProfilePropsWithFollowerFollowingAndPost;
}) {
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
          <Link href={`/user/${profileId}/followers`}>
            <span className="font-semibold text-primary">
              {profile.followers.length}
            </span>{" "}
            Followers
          </Link>
          <Link href={`/user/${profileId}/following`}>
            <span className="font-semibold text-primary">
              {profile.following.length}
            </span>{" "}
            Following
          </Link>
        </div>
      </div>

      {/* Button */}
      <UserPageFunctionalButton profileId={profileId} profile={profile} />
    </div>
  );
}
