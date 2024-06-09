import PostCard from "@/components/post/post-card";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/prisma/db";
import { redirect } from "next/navigation";
import PagePostForm from "./_components/pagePostForm";

export default async function MainPage() {
  const profile = await currentProfile();

  if (!profile) return redirect("/sign-in");

  const posts = await db.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-6">
      <div className="col-span-1 min-h-screen border-x md:col-span-4">
        <PagePostForm />
        {/* Posts */}

        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No posts found 😢
          </div>
        )}
      </div>

      {/* Discution */}
      <div className="col-span-2 hidden md:block"></div>
    </div>
  );
}
