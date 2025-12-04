import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { reelsService } from "./reels.service";

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = reelsService(fastify);

  fastify.get("/reels/grid", async (_request, reply) => {
    const reels = await service.getAll();
    return reply.code(200).send(reels);
  });
};

export { reelsRoutes };
