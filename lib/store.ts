import { ProfilePropsWithFollowerFollowingAndPost } from "@/components/user/user-profile-info";
import { Notification } from "@prisma/client";
import { create } from "zustand";

// interface
export interface CurrentUserStoreProps {
  user: ProfilePropsWithFollowerFollowingAndPost | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: ProfilePropsWithFollowerFollowingAndPost) => void;
}

export interface NotificationStoreProps {
  notifications: Notification[] | null;
  unReadCount: () => number;
  // eslint-disable-next-line no-unused-vars
  setNotifications: (notifications: Notification[]) => void;
  clearNotifications: () => void;
}

export const useCurrentUserStore = create<CurrentUserStoreProps>()((set) => ({
  user: null,
  setUser: (user: ProfilePropsWithFollowerFollowingAndPost) => set({ user }),
}));

export const useNotificationStore = create<NotificationStoreProps>(
  (set, get) => ({
    notifications: [],
    unReadCount: () => {
      const notifications = get().notifications;

      return (
        notifications?.filter((notification) => !notification.isRead)?.length ||
        0
      );
    },
    setNotifications: (notifications: Notification[]) => set({ notifications }),

    clearNotifications: () => set({ notifications: [] }),
  }),
);
