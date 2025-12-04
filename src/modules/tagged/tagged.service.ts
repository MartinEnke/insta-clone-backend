// src/modules/tagged/tagged.service.ts
import type { FastifyInstance } from "fastify";

const taggedService = (fastify: FastifyInstance) => {
  return {
    async getGrid() {
      fastify.log.info("Fetching tagged posts grid");
      // uses DB transactions wired in database.plugin.ts
      return fastify.transactions.tagged.getGrid();
    },
  };
};

export { taggedService };
