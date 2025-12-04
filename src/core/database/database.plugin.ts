// src/core/database/database.plugin.ts
import BetterSqlite3 from "better-sqlite3";
import type { Database } from "better-sqlite3";
import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { createTransactions, type Transactions } from "./database.transactions";

declare module "fastify" {
  interface FastifyInstance {
    db: Database;
    transactions: Transactions;
  }
}

async function databasePlugin(fastify: FastifyInstance) {
  const db = new BetterSqlite3("database.db");

  // --- POSTS TABLE ---
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // --- REELS TABLE ---
  db.exec(`
    CREATE TABLE IF NOT EXISTS reels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_url TEXT NOT NULL,
      thumbnail_url TEXT NOT NULL,
      caption TEXT,
      views INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // ---------- SEED REELS IF EMPTY ----------
  const { count: reelCount } = db
    .prepare("SELECT COUNT(*) as count FROM reels")
    .get() as { count: number };

  if (reelCount === 0) {
    const insertReel = db.prepare(
      "INSERT INTO reels (video_url, thumbnail_url, caption, views) VALUES (@video_url, @thumbnail_url, @caption, @views)"
    );

    const sampleReels = [
      {
        video_url: "https://example.com/cat-reel.mp4", // placeholder
        thumbnail_url:
          "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
        caption: "Cat reel 🐱",
        views: 123,
      },
    ];

    const insertManyReels = db.transaction(
      (rows: {
        video_url: string;
        thumbnail_url: string;
        caption: string;
        views: number;
      }[]) => {
        for (const row of rows) insertReel.run(row);
      }
    );

    insertManyReels(sampleReels);
  }

  // --- TAGGED POSTS TABLE ---
  db.exec(`
    CREATE TABLE IF NOT EXISTS tagged_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      tagged_by TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // --- HIGHLIGHTS TABLE ---
  db.exec(`
    CREATE TABLE IF NOT EXISTS highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cover_image_url TEXT NOT NULL,
      title TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // ---------- SEED HIGHLIGHTS IF EMPTY ----------
  const { count: highlightCount } = db
    .prepare("SELECT COUNT(*) as count FROM highlights")
    .get() as { count: number };

  if (highlightCount === 0) {
    const insertHighlight = db.prepare(
      "INSERT INTO highlights (cover_image_url, title) VALUES (@cover_image_url, @title)"
    );

    const sampleHighlights = [
      {
        cover_image_url:
          "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
        title: "Cute Cat",
      },
      {
        cover_image_url:
          "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
        title: "Beach Vibes",
      },
    ];

    const insertMany = db.transaction((rows: { cover_image_url: string; title: string }[]) => {
      for (const row of rows) insertHighlight.run(row);
    });

    insertMany(sampleHighlights);
  }

  const transactions = createTransactions(db);

  fastify.decorate("db", db);
  fastify.decorate("transactions", transactions);
}

export default fp(databasePlugin);
