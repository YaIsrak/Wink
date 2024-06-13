"use client";

import { Profile } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useCurrentUser() {
  const [user, setUser] = useState<Profile>();

  useEffect(() => {
    const fetchUser = async () => {
      const currentProfile = await axios.get(`/api/users/currentUser`);
      setUser(currentProfile.data);
    };
    fetchUser();
  }, []);

  return { user };
}
