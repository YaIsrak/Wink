import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@clerk/nextjs/server";
import PagePostForm from "../post/pagePostForm";
import UserPosts from "../post/user-posts";
import UserImageGallery from "./user-image-gallery";
import { ProfilePropsWithFollowerFollowingAndPost } from "./user-profile-info";

export default async function UserPagePostTab({
  profile,
}: {
  profile: ProfilePropsWithFollowerFollowingAndPost;
}) {
  const user = await auth();
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="posts">
          Posts
        </TabsTrigger>
        <TabsTrigger className="w-full" value="photos">
          Photos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts">
        <div className="col-span-1 min-h-screen shrink-0 border-x lg:col-span-4">
          {profile.userId === user.userId && <PagePostForm />}
          {/* <PagePostForm /> */}
          <UserPosts profile={profile} />
        </div>
      </TabsContent>
      <TabsContent value="photos">
        <UserImageGallery profile={profile} />
      </TabsContent>
    </Tabs>
  );
}
