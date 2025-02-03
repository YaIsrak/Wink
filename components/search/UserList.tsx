import { getUsersByQuery } from "@/lib/actions";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import UserPageFunctionalButton from "../user/user-page-functional-button";

export default async function UserList({ q }: { q: string }) {
  const users = await getUsersByQuery(q);

  if (users.length == 0) return null;

  return (
    <div className="space-y-2 py-4">
      <h3 className="text-lg font-semibold">Users: </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-2 rounded-2xl border p-4"
          >
            <Avatar>
              <AvatarImage src={user.imageUrl} />
            </Avatar>
            <Link href={`/user/${user.id}`} className="hover:underline">
              <p className="text-xs">{user.username}</p>
              <p className="text-sm font-semibold">{user.name}</p>
            </Link>
            <div className="ml-auto">
              <UserPageFunctionalButton profileId={user.id} profile={user} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton
export function UsersListSkeleton() {
  return (
    <div className="space-y-2 py-4">
      <Skeleton className="h-6 w-28" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center gap-2 rounded-2xl border p-4">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="ml-auto">
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border p-4">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="ml-auto">
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
