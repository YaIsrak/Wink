import PagePostForm from "@/components/post/pagePostForm";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import Posts from "../../../../components/post/Posts";

export default async function MainPage() {
  const profile = await currentProfile();

  if (!profile) return redirect("/sign-in");

  return (
    <div className="col-span-1 min-h-screen shrink-0 border-x lg:col-span-4">
      <PagePostForm />
      <Posts />
    </div>
  );
}
