import CommentForm from "@/components/comment/comment-form";
import { CommentList } from "@/components/comment/CommentList";
import PostCard from "@/components/post/post-card";
import { CommentSkeleton } from "@/components/post/PostSkeleton";
import { getPostById } from "@/lib/actions";
import { currentProfile } from "@/lib/current-profile";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const profile = await currentProfile();
  if (!profile) redirect("/sign-in");

  const post = await getPostById(params.postId);
  if (!post) notFound();

  return (
    <div className="min-h-screen border-x">
      <PostCard post={post} />
      <CommentForm post={post} />

      {/* Comments */}
      <Suspense
        fallback={
          <div className="space-y-6 p-6">
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
        }
      >
        <CommentList postId={post.id} />
      </Suspense>
    </div>
  );
}
