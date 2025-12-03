// src/modules/tagged/tagged.routes.ts
import type { FastifyInstance } from "fastify";
import { taggedService } from "./tagged.service";

async function taggedRoutes(fastify: FastifyInstance) {
  const service = taggedService(fastify);

  fastify.get("/tagged/grid", async (_request, reply) => {
    const taggedPosts = await service.getGrid();
    return reply.code(200).send(taggedPosts);
  });
}

export { taggedRoutes };
