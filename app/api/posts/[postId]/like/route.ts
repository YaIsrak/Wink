/* eslint-disable no-console */
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingLike = await db.like.findFirst({
      where: {
        postId: params.postId,
        userId: profile.id,
      },
    });

    if (existingLike) {
      await db.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      await db.like.create({
        data: {
          postId: params.postId,
          userId: profile.id,
        },
      });
    }

    const likeCount = await db.like.count({
      where: {
        postId: params.postId,
      },
    });

    return NextResponse.json({ likeCount });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingLike = await db.like.findFirst({
      where: {
        postId: params.postId,
        userId: profile.id,
      },
    });

    const likeCount = await db.like.count({
      where: {
        postId: params.postId,
      },
    });

    return NextResponse.json({ isLiked: !!existingLike, likeCount });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
