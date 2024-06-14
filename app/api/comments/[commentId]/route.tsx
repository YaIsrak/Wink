/* eslint-disable no-console */
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { commentId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.commentId) {
      return new NextResponse("Comment Id is Missing", { status: 400 });
    }

    const post = await db.comment.delete({
      where: {
        id: params.commentId,
        authorId: profile.id,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
