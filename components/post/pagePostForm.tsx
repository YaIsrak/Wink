"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@clerk/nextjs";

export default function PagePostForm() {
  const { onOpen } = useModal();
  const { user } = useUser();

  return (
    <div
      className="flex cursor-pointer items-center gap-4 border-b p-6"
      onClick={() => onOpen("createPost")}
    >
      <Avatar>
        <AvatarImage src={user?.imageUrl} />
      </Avatar>

      <div className="text-muted-foreground">What&apos;s on your mind?</div>
      <Button variant={"secondary"} className="ml-auto">
        Post
      </Button>
    </div>
  );
}
