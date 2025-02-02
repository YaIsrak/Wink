"use client";

import PostCard, { LikeProps } from "@/components/post/post-card";
import { usePostScroll } from "@/hooks/use-post-scroll";
import { Comment, Post, Profile } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ElementRef, useRef } from "react";
import { PostSkeleton } from "../CustomSkeleton";

export type PostsCardProps = Post & {
  author: Profile;
  likes: LikeProps[];
  comments?: Comment[];
};

export default function PostsComponent() {
  const containerRef = useRef<ElementRef<"div">>(null);

  // Fetching post fn
  const fetchPosts = async ({ pageParam = 1 }) => {
    const res = await axios.get(`/api/posts?page=${pageParam}&limit=30`);
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return undefined;
      return pages.length + 1;
    },
    refetchInterval: 1000,
    initialPageParam: undefined,
  });

  usePostScroll({
    containerRef,
    shouldLoadMore: hasNextPage && !isFetchingNextPage,
    loadMore: fetchNextPage,
  });

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
    <div ref={containerRef}>
      {data?.pages[0]?.map((post: PostsCardProps) => (
        <PostCard key={post.id} post={post} comments={post.comments} />
      ))}

      {isFetchingNextPage && <div>Loading more posts...</div>}

      {!hasNextPage && !isFetching && (
        <div className="py-8 text-center text-muted-foreground">
          No more posts found 😢
        </div>
      )}
    </div>
  );
}
