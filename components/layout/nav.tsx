import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import Navbar from "./navbar";

export default async function Nav() {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }
  return <Navbar />;
}
