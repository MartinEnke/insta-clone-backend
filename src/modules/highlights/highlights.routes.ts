import type { FastifyInstance } from "fastify";
import { highlightsService } from "./highlights.service";

async function highlightsRoutes(fastify: FastifyInstance) {
  const service = highlightsService(fastify);

  fastify.get("/highlights", async (_request, reply) => {
    const highlights = await service.getAll();
    return reply.code(200).send(highlights);
  });

  fastify.get<{
    Params: { id: string };
  }>("/highlights/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const highlight = await service.getById(id);

    if (!highlight) {
      return reply.code(404).send({ message: "Highlight not found" });
    }

    return reply.code(200).send(highlight);
  });
}

export { highlightsRoutes };
