"use client";

import NotiCard from "@/components/notification/NotiCard";
import { useNotificationStore } from "@/lib/store";

export default function NotificationPage() {
  const { notifications } = useNotificationStore();

  return (
    <div className="min-h-screen border-x">
      <h2 className="px-6 py-9 text-3xl font-bold">
        Activities ({notifications?.length})
      </h2>

      {notifications?.map((notification) => (
        <NotiCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
