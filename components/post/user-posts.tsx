import { Post, Profile } from "@prisma/client";
import PostCard, { LikeProps } from "./post-card";

export default function UserPosts({
  posts,
}: {
  posts: (Post & { author: Profile; likes?: LikeProps[] })[];
}) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {posts.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          No more posts found 😢
        </div>
      )}
    </div>
  );
}
