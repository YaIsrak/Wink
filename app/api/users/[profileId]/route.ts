/* eslint-disable no-console */
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string } },
) {
  try {
    const profile = await currentProfile();
    const { userId, name, username, bio } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!userId || !name || !username) {
      return new NextResponse("User Id or name is missing", { status: 400 });
    }

    const updatedProfile = await db.profile.update({
      where: {
        id: params.profileId,
      },
      data: {
        name,
        username,
        bio,
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
