import { currentProfile } from "@/lib/current-profile";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
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

    // Manually deleting related likes before deleting the post
    await db.like.deleteMany({
      where: {
        postId: params.postId,
      },
    });

    // Manually deleting related comments before deleting the post
    await db.comment.deleteMany({
      where: {
        postId: params.postId,
      },
    });

    const post = await db.post.delete({
      where: {
        id: params.postId,
      },
    });

    revalidatePath("/explore");

    return NextResponse.json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error: any) {
    console.error(error.message);
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

    revalidatePath("/explore");

    return NextResponse.json({
      message: "Post updated successfully",
      post,
    });
  } catch (error: any) {
    console.error(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
