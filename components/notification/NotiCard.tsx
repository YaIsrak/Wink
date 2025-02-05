import { cn } from "@/lib/utils";
import { Notification } from "@prisma/client";
import { BellIcon } from "lucide-react";
import { format } from "timeago.js";
import ReadButton from "./ReadButton";

export default function NotiCard({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div key={notification.id} className="flex items-center gap-4 border-y p-6">
      <div
        className={cn(
          "flex size-8 items-center justify-center rounded-full bg-primary text-white",
          notification.isRead &&
            "border-2 border-primary bg-transparent text-primary",
        )}
      >
        <BellIcon className="size-4" />
      </div>
      <div>
        <p>{notification.content}</p>
        <p className="text-xs text-muted-foreground">
          {format(notification.createdAt)}
        </p>
      </div>

      <div className="mx-auto" />

      {!notification.isRead && (
        <>
          <p className="text-xs text-muted-foreground">Unread</p>
          <ReadButton notificationId={notification.id} />
        </>
      )}
    </div>
  );
}
