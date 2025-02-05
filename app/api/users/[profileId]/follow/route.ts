/* eslint-disable no-console */
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { profileId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (profile.id === params.profileId) {
      return new NextResponse("Cannot follow yourself", { status: 400 });
    }

    await prisma?.follower.create({
      data: {
        followerId: params.profileId,
        followingId: profile.id,
      },
    });

    const follower = await db.profile.findUnique({
      where: {
        id: params.profileId,
      },
      select: {
        name: true,
      },
    });

    await db.notification.create({
      data: {
        isRead: false,
        content: `${follower?.name} followed you!`,
        authorId: profile.id,
      },
    });

    return NextResponse.json({ message: "User followed" });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { profileId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma?.follower.deleteMany({
      where: {
        followerId: params.profileId,
        followingId: profile.id,
      },
    });

    return NextResponse.json({ message: "User followed" });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
