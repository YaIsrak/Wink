import { getUserById } from "@/lib/actions";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import UserPageFunctionalButton from "../user/user-page-functional-button";

export default async function FollowUser({ userId }: { userId: string }) {
  const user = await getUserById(userId);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-2 rounded-2xl border p-4">
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
        <Link href={`/user/${user?.id}`} className="hover:underline">
          <p className="text-xs">{user?.username}</p>
          <p className="text-sm font-semibold">{user?.name}</p>
        </Link>
        <div className="ml-auto">
          <UserPageFunctionalButton profileId={user?.id} profile={user} />
        </div>
      </div>
    </div>
  );
}
