import type { FastifyInstance } from "fastify";
import type { CreatePostDto, Post } from "./posts.types";

const postsService = (fastify: FastifyInstance) => {
  return {
    create: async (postData: CreatePostDto): Promise<Post> => {
      fastify.log.info("Creating a new post");
      // This will use the MOCK `transactions` in our test,
      // and the REAL `transactions` in our live application.
      const post = fastify.transactions.posts.create(postData);
      return post as Post;
    },

    getAll: async (): Promise<Post[]> => {
      fastify.log.info("Fetching all posts");
      const posts = fastify.transactions.posts.getAll();
      return posts as Post[];
    },
  };
};

export { postsService };
