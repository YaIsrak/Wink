/* eslint-disable no-console */
import { currentProfile } from "@/lib/current-profile";
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

    await prisma?.follower.create({
      data: {
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
