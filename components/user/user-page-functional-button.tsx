"use client";

import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/use-current-user";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ProfilePropsWithFollowerFollowingAndPost } from "./user-profile-info";

const whileTap = {
  scale: 0.9,
};

export default function UserPageFunctionalButton({
  profileId,
  profile,
}: {
  profileId: string;
  profile: ProfilePropsWithFollowerFollowingAndPost;
}) {
  const router = useRouter();
  const MotionButton = motion(Button);
  const { onOpen } = useModal();
  const { user } = useCurrentUser();

  const [isFollowing, setIsFollowing] = useState(
    profile.followers.some((follower) => follower.followerId === user?.id),
  );

  const handleFollow = async () => {
    try {
      if (!isFollowing) {
        // Handle Following the user
        await axios.post(`/api/users/${profileId}/follow`);
        setIsFollowing(true);
        toast.success("Followed successfully");
        router.refresh();
      } else {
        // Handle Unfollowing the user
        await axios.delete(`/api/users/${profileId}/follow`);
        setIsFollowing(false);
        toast.success("Unfollowed successfully");
        router.refresh();
      }
    } catch (error: any) {
      toast.error("Failed to follow user", {
        description: error.message,
      });
    }
  };

  if (user?.id === profileId) {
    return (
      <MotionButton
        whileTap={whileTap}
        className="rounded-full"
        onClick={() => onOpen("editProfile", { profile })}
      >
        Edit
      </MotionButton>
    );
  }

  return (
    <MotionButton
      whileTap={whileTap}
      variant={isFollowing ? "outline" : "default"}
      className="rounded-full"
      onClick={handleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </MotionButton>
  );
}
