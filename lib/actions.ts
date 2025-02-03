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
  } catch (error: any) {
    throw new Error(`Failed to fetch post ${error.message}`);
  }
};

export const getPostsByUserId = async (authorId: string) => {
  try {
    const posts = await db.post.findMany({
      where: { authorId },
      include: {
        author: true,
        likes: {
          include: {
            user: true,
          },
        },
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    throw new Error(`Failed to fetch posts ${error}`);
  }
};

export const getPostsByQuery = async (query: string) => {
  try {
    const posts = await db.post.findMany({
      where: {
        content: { contains: query, mode: "insensitive" },
      },
      include: {
        author: true,
        likes: {
          include: {
            user: true,
          },
        },
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    throw new Error(`Failed to fetch posts ${error}`);
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
    throw new Error(`Failed to fetch comments ${error}`);
  }
};

// info: Users
export const getUserById = async (id: string) => {
  try {
    const profile = await db.profile.findUnique({
      where: {
        id,
      },
      include: {
        followers: true,
        following: true,
      },
    });

    return profile;
  } catch (error) {
    throw new Error(`Failed to fetch user ${error}`);
  }
};

export const getUsersByQuery = async (query: string) => {
  try {
    const users = await db.profile.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { username: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        followers: true,
        following: true,
      },
    });

    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users ${error}`);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.profile.findMany({
      include: {
        followers: true,
        following: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users ${error}`);
  }
};

// export const getUserFollowingById = async (id: string) => {
//   try {
//     const user = await db.profile.findUnique({
//       where: {
//         id,
//       },
//       include: {
//         following: true,
//       },
//     });

//     return user?.following;
//   } catch (error) {
//     throw new Error(`Failed to fetch user following ${error}`);
//   }
// };
