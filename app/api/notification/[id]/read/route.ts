import { currentProfile } from "@/lib/current-profile";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse("Notification Id is Missing", { status: 400 });
    }

    const notification = await db.notification.update({
      where: {
        id: params.id,
      },
      data: {
        isRead: true,
      },
    });

    revalidatePath("/notification");

    return NextResponse.json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error: any) {
    console.error(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
