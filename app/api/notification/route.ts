import { currentProfile } from "@/lib/current-profile";
import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const notifications = await db.notification.findMany({
      where: {
        authorId: profile?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notifications);
  } catch (error: any) {
    console.error(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
