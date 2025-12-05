import Fastify from "fastify";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";

import databasePlugin from "./core/database/database.plugin";
import { postsRoutes } from "./modules/posts/posts.routes";
import { reelsRoutes } from "./modules/reels/reels.routes";
import { taggedRoutes } from "./modules/tagged/tagged.routes";
import { highlightsRoutes } from "./modules/highlights/highlights.routes";

const fastify = Fastify({
  logger: true,
});

async function buildServer() {
  await fastify.register(databasePlugin);

  await fastify.register(multipart, {
    limits: { fileSize: 10 * 1024 * 1024 },
  });

  // ✅ Serve everything in /public at http://localhost:3000/*
  await fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), "public"),
    prefix: "/", // so /uploads/... works
  });

  await fastify.register(postsRoutes);
  await fastify.register(reelsRoutes);
  await fastify.register(taggedRoutes);
  await fastify.register(highlightsRoutes);

  fastify.get("/", async () => {
    return { status: "ok" };
  });

  return fastify;
}

const port = 3000;

async function start() {
  try {
    await buildServer();
    await fastify.listen({ port });
    console.log(`🚀 Server is now listening on http://127.0.0.1:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
