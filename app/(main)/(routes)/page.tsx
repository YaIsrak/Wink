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
  });

  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="col-span-4 min-h-screen border-x">
        <PagePostForm />
        {/* Posts */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Discution */}
      <div className="col-span-2"></div>
    </div>
  );
}
