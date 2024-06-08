"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

export default function DeletePostModal() {
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deletePost";
  const { post } = data;

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async () => {
    try {
      await axios.delete(`/api/posts/${post?.id}?userId=${user?.id}`);
      toast.success("Post Deleted");
      router.refresh();
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="flex w-96 flex-col items-center border-none shadow-none">
        <h1 className="font-semibold">Delete Post</h1>
        <p className="text-center text-sm text-muted-foreground">
          If you delete this post, you won&apos;t be able to restore it.
        </p>

        <div className="flex items-center gap-2">
          <Button variant={"secondary"} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={onSubmit}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
