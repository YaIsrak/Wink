import PostCard from "@/components/post/post-card";
import { db } from "@/prisma/db";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  // Fetching post
  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      author: true,
      likes: {
        include: {
          user: true,
        },
      },
    },
  });

  // Redirect if post not found
  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Post not found 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen border-x">
      <PostCard post={post} />
    </div>
  );
}
