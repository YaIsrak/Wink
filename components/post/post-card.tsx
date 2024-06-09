import { Post, Profile } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { IoChatbubbleOutline } from "react-icons/io5";
import { format } from "timeago.js";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import LikePostButton from "./like-post-button";
import PostMoreButton from "./post-more-button";

export interface PostCardProps {
  post: Post & { author: Profile };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="flex gap-4 border-b p-6">
      <Avatar>
        <AvatarImage src={post.author.imageUrl} />
      </Avatar>

      {/* Content */}
      <div className="w-full space-y-2">
        {/* Title */}
        <div className="flex items-center gap-2 text-sm">
          <Link
            href={`/user/${post.author.userId}`}
            className="font-medium hover:underline"
          >
            {post.author.username}
          </Link>
          <p className="text-xs text-muted-foreground">
            {format(post.createdAt)}
          </p>
          <div className="mx-auto"></div>
          <PostMoreButton post={post} />
        </div>
        {/* Actual Content */}
        <p className="text-sm">{post.content}</p>

        {/* Actual Image */}
        {post.imageUrls.length > 0 && (
          <ScrollArea className="w-[26rem]">
            <div className="flex w-max space-x-4 pb-2">
              {post.imageUrls.map((url) => (
                <div key={url} className="relative mb-2">
                  <Image
                    src={url}
                    alt={post.id}
                    width={400}
                    height={400}
                    className="max-h-80 w-full rounded-2xl object-cover"
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        {/* Footer */}
        <div className="flex items-center">
          {/* HeartIcon */}
          <LikePostButton postId={post.id} />

          {/* Comment Icon */}
          <Button
            variant="ghost"
            size={"sm"}
            className="space-x-2 rounded-full"
            asChild
          >
            <Link href={`/post/${post.id}`}>
              <IoChatbubbleOutline className="h-5 w-5" />
              <span>0</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
