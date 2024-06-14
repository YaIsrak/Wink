"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CommentDeleteButton({
  commentId,
}: {
  commentId: string;
}) {
  const router = useRouter();

  const handleDeleteComment = async () => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      toast.success(`Comment deleted`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Trash
        className="size-4 cursor-pointer text-rose-400 transition hover:text-rose-600"
        onClick={handleDeleteComment}
      />
    </>
  );
}
