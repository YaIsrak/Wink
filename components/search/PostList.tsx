import { getPostsByQuery } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default async function PostList({ q }: { q: string }) {
  const posts = await getPostsByQuery(q);

  if (posts.length == 0) return null;

  return (
    <div className="space-y-2 py-4">
      <h3 className="text-lg font-semibold">Posts: </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative flex gap-4 overflow-hidden rounded-xl border p-6"
          >
            <Avatar>
              <AvatarImage src={post.author.imageUrl} />
            </Avatar>

            <div className="w-full space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Link
                  href={`/user/${post.author.id}`}
                  className="text-sm font-semibold hover:underline"
                >
                  {post.author.username}
                </Link>
              </div>

              <p className="text-sm">{post.content}</p>

              {post.imageUrls.length > 0 && (
                <div className="relative mb-4 aspect-video overflow-hidden rounded-md">
                  <div className="relative h-[250px] w-[200px] flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={post.imageUrls[0]}
                      alt={post.content}
                      width={200}
                      height={250}
                      placeholder="blur"
                      blurDataURL="/placeholder.jpg"
                      className="h-full w-full bg-center object-cover"
                    />
                  </div>
                </div>
              )}

              <Button size="sm" className="rounded-xl" asChild>
                <Link href={`/post/${post.id}`}>View</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PostListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="relative flex gap-4 overflow-hidden rounded-xl border p-6">
        <Skeleton className="size-12 shrink-0 rounded-full" />

        <div className="w-full space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Skeleton className="h-4 w-12" />
          </div>

          <Skeleton className="h-16 w-full" />

          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}
