"use client";

import { ProfilePropsWithFollowerFollowingAndPost } from "@/components/user/user-profile-info";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useCurrentUser() {
  const [user, setUser] = useState<ProfilePropsWithFollowerFollowingAndPost>();

  useEffect(() => {
    const fetchUser = async () => {
      const currentProfile = await axios.get(`/api/users/currentUser`);
      setUser(currentProfile.data);
    };
    fetchUser();
  }, []);

  return { user };
}
