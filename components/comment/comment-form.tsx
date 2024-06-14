"use client";

import { useModal } from "@/hooks/use-modal-store";
import { PostsCardProps } from "../post/Posts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function CommentForm({ post }: { post: PostsCardProps }) {
  const { onOpen } = useModal();

  return (
    <div className="border-b">
      <div
        className="flex w-1/2 items-center gap-4 p-6"
        onClick={() => onOpen("createComment", { post })}
      >
        <Avatar>
          <AvatarFallback>W</AvatarFallback>
          <AvatarImage src={post.author.imageUrl} />
        </Avatar>

        <div>
          <p className="text-sm text-muted-foreground">Write something...</p>
        </div>
      </div>
    </div>
  );
}
