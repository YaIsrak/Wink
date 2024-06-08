/* eslint-disable no-console */
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.postId) {
      return new NextResponse("Post Id is Missing", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("User Id is Missing", { status: 400 });
    }

    const post = await db.post.delete({
      where: {
        id: params.postId,
        author: {
          userId: userId,
        },
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
