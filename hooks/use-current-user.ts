import { useCurrentUserStore, useNotificationStore } from "@/lib/store";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

export default function useCurrentUser() {
  const { user, setUser } = useCurrentUserStore();
  const { clearNotifications } = useNotificationStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentProfile = await axios.get(`/api/users/currentUser`);

        if (user?.id !== currentProfile.data.id) {
          clearNotifications();
        }
        setUser(currentProfile.data);
      } catch (error: any) {
        toast.error("Failed to get current user", {
          description: error.message,
        });
      }
    };
    fetchUser();
  }, [clearNotifications, setUser, user?.id]);

  return { user };
}
