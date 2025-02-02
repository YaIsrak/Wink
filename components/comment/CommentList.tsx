import { getCommentsByPostId } from "@/lib/actions";
import CommentCard from "./comment-card";

export async function CommentList({ postId }: { postId: string }) {
  const comments = await getCommentsByPostId(postId);

  return (
    <div className="space-y-6 p-6">
      {comments.length > 0 ? (
        comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            author={comment.author}
          />
        ))
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          No comment found
        </p>
      )}
    </div>
  );
}
