"use client";

import PostCard, { LikeProps } from "@/components/post/post-card";
import { Comment, Post, Profile } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ElementRef, Fragment, useEffect, useRef } from "react";
import { PostSkeleton } from "../CustomSkeleton";

export type PostsCardProps = Post & {
  author: Profile;
  likes: LikeProps[];
  comments?: Comment[];
};

export default function PostsComponent() {
  const containerRef = useRef<ElementRef<"div">>(null);

  const fetchPosts = async ({ pageParam = 1 }) => {
    const res = await axios.get(`/api/posts?page=${pageParam}&limit=5`);
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["all_posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  useEffect(() => {
    const onIntersection = (items: IntersectionObserverEntry[]) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting) {
        fetchNextPage();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && containerRef.current) {
      observer.observe(containerRef.current);
    }

    // clean up
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
