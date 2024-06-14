import { Comment, Profile } from "@prisma/client";
import { format } from "timeago.js";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentDeleteButton from "./comment-delete-button";

export default function CommentCard({
  comment,
  author,
}: {
  comment: Comment;
  author: Profile;
}) {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarFallback>W</AvatarFallback>
        <AvatarImage src={author.imageUrl} />
      </Avatar>

      {/* Comment */}
      <p className="flex-1 text-sm">{comment.content}</p>

      {/* time */}
      <p className="text-xs text-muted-foreground">
        {format(comment.createdAt)}
      </p>

      {/* Comment more button */}
      {comment.authorId === author.id && (
        <CommentDeleteButton commentId={comment.id} />
      )}
    </div>
  );
}
