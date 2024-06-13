/* eslint-disable no-console */
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

// eslint-disable-next-line no-unused-vars
export async function GET(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(profile);
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
