"use client";

import { useNotificationStore } from "@/lib/store";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

export default function useNotification() {
  const { notifications, setNotifications } = useNotificationStore();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (notifications?.length === 0) {
        try {
          const { data } = await axios.get("/api/notification");
          setNotifications(data);
        } catch (error: any) {
          toast.error("Failed to fetch notifications", {
            description: error.message,
          });
        }
      }
    };

    fetchNotifications();
  }, [notifications, setNotifications]);

  return {
    notifications,
  };
}
