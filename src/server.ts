// src/server.ts
import Fastify from "fastify";
import databasePlugin from "./core/database/database.plugin";

// route modules
import { postsRoutes } from "./modules/posts/posts.routes";
import { reelsRoutes } from "./modules/reels/reels.routes";
import { taggedRoutes } from "./modules/tagged/tagged.routes";
import { highlightsRoutes } from "./modules/highlights/highlights.routes";

const fastify = Fastify({
  logger: true,
});

// register DB plugin
fastify.register(databasePlugin);

// register routes
fastify.register(postsRoutes);
fastify.register(reelsRoutes);
fastify.register(taggedRoutes);
fastify.register(highlightsRoutes);

// simple health check
fastify.get("/", async () => {
  return { hello: "world" };
});

const port = 3000;

const start = async () => {
  try {
    await fastify.listen({ port });
    console.log(`🚀 Server is now listening on http://127.0.0.1:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
