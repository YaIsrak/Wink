import { Comment, Profile } from "@prisma/client";
import Link from "next/link";
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

      <div className="w-full space-y-2">
        <div className="flex items-center gap-2 text-sm">
          {/* Username */}
          <Link
            href={`/user/${author.id}`}
            className="font-medium hover:underline"
          >
            {author.username}
          </Link>
          {/* time */}
          <p className="text-xs text-muted-foreground">
            {format(comment.createdAt)}
          </p>
        </div>
        {/* Comment */}
        <p className="flex-1 text-sm">{comment.content}</p>
      </div>

      {/* Comment more button */}
      {comment.authorId === author.id && (
        <CommentDeleteButton commentId={comment.id} />
      )}
    </div>
  );
}
