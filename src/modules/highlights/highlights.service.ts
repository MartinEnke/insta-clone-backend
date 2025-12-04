import type { FastifyInstance } from "fastify";

const highlightsService = (fastify: FastifyInstance) => {
  return {
    getAll: async () => {
      return fastify.transactions.highlights.getAll();
    },
    getById: async (id: number) => {
      return fastify.transactions.highlights.getById(id);
    },
  };
};

export { highlightsService };
