"use client";

import useCurrentUser from "@/hooks/use-current-user";
import useNotification from "@/hooks/use-notification";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useCurrentUser();
  useNotification();
  return <>{children}</>;
}
