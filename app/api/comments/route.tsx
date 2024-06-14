/* eslint-disable no-console */
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { comment, postId } = await req.json();

    if (!comment || !postId) {
      return new NextResponse("Comment or postId is missing", { status: 400 });
    }

    const post = await db.comment.create({
      data: {
        content: comment,
        authorId: profile.id,
        postId: postId,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
