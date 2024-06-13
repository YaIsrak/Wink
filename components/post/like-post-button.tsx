"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function LikePostButton({ postId }: { postId: string }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const router = useRouter();

  const MotionButton = motion(Button);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}/like`);
        setIsLiked(res.data.isLiked);
        setLikeCount(res.data.likeCount);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchLikeStatus();
  }, [postId, isLiked, likeCount]);

  const handleLike = async () => {
    try {
      const res = await axios.post(`/api/posts/${postId}/like`);
      setIsLiked(!isLiked);
      setLikeCount(res.data.likeCount);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <MotionButton
      variant="ghost"
      size={"sm"}
      className={cn(
        "space-x-2 rounded-full",
        isLiked ? "text-rose-500 hover:text-rose-500" : "text-primary",
      )}
      onClick={handleLike}
      whileTap={{
        scale: 0.9,
      }}
    >
      {isLiked ? (
        <IoHeart className="h-5 w-5" />
      ) : (
        <IoMdHeartEmpty className="h-5 w-5" />
      )}
      <span>{likeCount}</span>
    </MotionButton>
  );
}
