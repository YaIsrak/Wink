"use client";

import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function ReadButton({
  notificationId,
}: {
  notificationId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRead() {
    setLoading(true);
    try {
      await axios.post(`/api/notification/${notificationId}/read`);
      router.refresh();
    } catch (error: any) {
      toast.error("Failed to mark notification as read", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleRead}
      disabled={loading}
      variant={"outline"}
      size={"sm"}
    >
      Read
      {loading && <Loader className="ml-2 size-4 animate-spin" />}
    </Button>
  );
}
