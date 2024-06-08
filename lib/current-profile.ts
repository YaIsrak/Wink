import { db } from "@/prisma/db";
import { auth } from "@clerk/nextjs/server";

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const profile = await db.profile.findFirst({
    where: {
      userId,
    },
  });

  return profile;
};
