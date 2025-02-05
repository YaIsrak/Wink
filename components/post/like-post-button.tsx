"use client";

import { useNotificationStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { sendGAEvent } from "@next/third-parties/google";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function LikePostButton({ postId }: { postId: string }) {
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { clearNotifications } = useNotificationStore();
  const router = useRouter();

  const MotionButton = motion(Button);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}/like`);
        setIsLiked(res.data.isLiked);
        setLikeCount(res.data.likeCount);
      } catch (error: any) {
        toast.error("Error in fetching like status", {
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchLikeStatus();
  }, [postId, isLiked, likeCount]);

  const handleLike = async () => {
    try {
      const res = await axios.post(`/api/posts/${postId}/like`);
      setIsLiked(!isLiked);
      setLikeCount(res.data.likeCount);

      sendGAEvent({
        action: "like_post",
        value: {
          postId: postId,
        },
      });
      clearNotifications();

      router.refresh();
    } catch (error: any) {
      toast.error("Error in liking or disliking post", {
        description: error.message,
      });
    }
  };

  return (
    <MotionButton
      variant="ghost"
      size={"icon"}
      disabled={loading}
      className={cn(
        "space-x-2 rounded-full",
        isLiked ? "text-rose-500 hover:text-rose-500" : "text-primary",
      )}
      onClick={handleLike}
      whileTap={{
        scale: 0.9,
      }}
    >
      {loading ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <>
          {isLiked ? (
            <IoHeart className="h-5 w-5" />
          ) : (
            <IoMdHeartEmpty className="h-5 w-5" />
          )}
        </>
      )}
    </MotionButton>
  );
}
