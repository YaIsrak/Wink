"use client";

import PostCard, { LikeProps } from "@/components/post/post-card";
import useInView from "@/hooks/useInView";
import { Comment, Post, Profile } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";
import { PostSkeleton } from "../CustomSkeleton";

export type PostsCardProps = Post & {
  author: Profile;
  likes: LikeProps[];
  comments?: Comment[];
};

export default function PostsComponent() {
  const fetchPosts = async ({ pageParam = 1 }) => {
    const res = await axios.get(`/api/posts?page=${pageParam}&limit=5`);
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["all_posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    refetchInterval: 10000,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 5) {
        return undefined;
      }
      return pages.length + 1;
    },
  });

  const [isVisible, containerRef] = useInView({
    threshold: 0.05,
  });

  if (isVisible) {
    fetchNextPage();
  }

  if (status === "pending") {
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  }

  return (
    <div>
      {data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.map((post: PostsCardProps) => (
            <PostCard key={post.id} post={post} comments={post.comments} />
          ))}
        </Fragment>
      ))}

      {hasNextPage && (
        <div ref={containerRef}>
          <PostSkeleton />
        </div>
      )}
    </div>
  );
}
