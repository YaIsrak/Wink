import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProfilePropsWithFollowerFollowingAndPost } from "./user-profile-info";

export default function UserImageGallery({
  profile,
}: {
  profile: ProfilePropsWithFollowerFollowingAndPost;
}) {
  const imageArray = profile.posts.filter((post) => post.imageUrls.length > 0);
  return (
    <div className="grid grid-cols-3 gap-1 px-2">
      {imageArray.map((post) => (
        <Link
          href={`/post/${post.id}`}
          key={post.id}
          className="relative aspect-square"
        >
          {post.imageUrls.length > 1 && (
            <Copy className="absolute left-2 top-2 z-10 size-4 text-white" />
          )}
          <Image
            src={post.imageUrls[0]}
            alt={post.content}
            fill
            className="object-cover"
          />
        </Link>
      ))}
    </div>
  );
}
