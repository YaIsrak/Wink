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

    const { content, imageUrls } = await req.json();

    if (!content) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    console.log(content, imageUrls);

    const post = await db.post.create({
      data: {
        content,
        imageUrls: imageUrls,
        authorId: profile.id,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
