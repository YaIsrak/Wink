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

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.postId) {
      return new NextResponse("Post Id is Missing", { status: 400 });
    }

    const post = await db.post.delete({
      where: {
        id: params.postId,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const profile = await currentProfile();
    const { content } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        content,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
