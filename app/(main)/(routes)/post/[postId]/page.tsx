import CommentCard from "@/components/comment/comment-card";
import CommentForm from "@/components/comment/comment-form";
import PostCard from "@/components/post/post-card";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/prisma/db";
import { redirect } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const profile = await currentProfile();

  if (!profile) redirect("/sign-in");

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

  const comments = await db.comment.findMany({
    where: {
      postId: post.id,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen border-x">
      <PostCard post={post} />
      <CommentForm post={post} />

      {/* Comments */}
      <div className="space-y-6 p-6">
        {comments.length > 0 ? (
          comments?.map((comment) => (
            <>
              <CommentCard
                key={comment.id}
                comment={comment}
                author={comment.author}
              />
            </>
          ))
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            No comment found
          </p>
        )}
      </div>
    </div>
  );
}
