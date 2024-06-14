import { ProfilePropsWithFollowerFollowingAndPost } from "../user/user-profile-info";
import { PostsCardProps } from "./Posts";

import PostCard from "./post-card";

export default function UserPosts({
  profile,
}: {
  profile: ProfilePropsWithFollowerFollowingAndPost;
}) {
  return (
    <div>
      {profile.posts.map((post: PostsCardProps) => (
        <PostCard key={post.id} post={post} />
      ))}

      {profile.posts.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          No more posts found 😢
        </div>
      )}
    </div>
  );
}
