import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAllUsers } from "@/lib/actions";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { format } from "timeago.js";

export default async function UsersPage() {
  const currentProfile = await currentUser();
  const users = await getAllUsers();

  if (
    currentProfile?.emailAddresses[0].emailAddress !==
    "israkdreamstar@gmail.com"
  ) {
    redirect("/explore");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Users:</h1>

      <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
        {users.map((user) => (
          <div key={user.id} className="rounded-2xl border p-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user.imageUrl} />
              </Avatar>
              <Link href={`/user/${user.id}`} className="hover:underline">
                <p className="text-xs">{user.username}</p>
                <p className="text-sm font-semibold">{user.name}</p>
              </Link>
            </div>

            <div className="p-6 text-sm">
              <h4 className="text-lg font-semibold">Info:</h4>
              <p>{user.email}</p>
              <p>
                {user.createdAt.toDateString()} - {format(user.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
