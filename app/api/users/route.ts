/* eslint-disable no-console */
import { db } from "@/prisma/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, username, bio, imageUrl, userId, email } = await req.json();

    if (!name || !username || !bio || !imageUrl || !userId || !email) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const profile = await db.profile.create({
      data: {
        name,
        username,
        bio,
        imageUrl,
        userId,
        email,
      },
    });

    return NextResponse.json(profile);
  } catch (error: any) {
    console.log("USER_CREATE_ERROR:", error.message);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// eslint-disable-next-line no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const users = await db.profile.findMany();

    return NextResponse.json(users);
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
