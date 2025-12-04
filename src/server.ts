// src/server.ts
import Fastify from "fastify";
import databasePlugin from "./core/database/database.plugin";

// route modules
import { postsRoutes } from "./modules/posts/posts.routes";
import { reelsRoutes } from "./modules/reels/reels.routes";
import { taggedRoutes } from "./modules/tagged/tagged.routes";
import { highlightsRoutes } from "./modules/highlights/highlights.routes";

import multipart from "@fastify/multipart";
import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";

const fastify = Fastify({
  logger: true,
});

async function buildServer() {
  // 1. register DB plugin (adds fastify.db and fastify.transactions)
  await fastify.register(databasePlugin);

  // 2. register multipart BEFORE routes
  await fastify.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // optional, 10MB
    },
  });

  // 3. register all route modules
  await fastify.register(postsRoutes);
  await fastify.register(reelsRoutes);
  await fastify.register(taggedRoutes);
  await fastify.register(highlightsRoutes);

  // simple health-check
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
