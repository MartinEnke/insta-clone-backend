import type { FastifyInstance } from "fastify";
import type { Reel } from "./reels.types";

const reelsService = (fastify: FastifyInstance) => {
  return {
    getAll: async (): Promise<Reel[]> => {
      fastify.log.info("Fetching all reels");
      const reels = fastify.transactions.reels.getAll();
      return reels as Reel[];
    },
  };
};

export { reelsService };
