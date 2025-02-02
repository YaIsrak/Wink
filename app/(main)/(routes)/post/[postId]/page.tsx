import CommentForm from "@/components/comment/comment-form";
import { CommentList } from "@/components/comment/CommentList";
import { CommentSkeleton, PostSkeleton } from "@/components/CustomSkeleton";
import PostCard from "@/components/post/post-card";
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
      <Suspense fallback={<PostSkeleton />}>
        <PostCard post={post} />
      </Suspense>
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
