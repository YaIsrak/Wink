"use server";

import { db } from "@/prisma/db";

// info: Posts
export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        likes: {
          include: {
            user: true,
          },
        },
      },
    });

    return post;
  } catch (error) {
    throw error;
  }
};

// info: Comments
export const getCommentsByPostId = async (postId: string) => {
  try {
    const comments = await db.comment.findMany({
      where: {
        postId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  } catch (error) {
    throw error;
  }
};
