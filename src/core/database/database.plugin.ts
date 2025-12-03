// src/core/database/database.plugin.ts
import BetterSqlite3 from "better-sqlite3";
import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { createTransactions, type Transactions } from "./database.transactions";

// Extend Fastify's instance type so TS knows about our extras
declare module "fastify" {
  interface FastifyInstance {
    db: any; // keep simple – BetterSqlite3 instance
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

  const transactions = createTransactions(db);

  fastify.decorate("db", db);
  fastify.decorate("transactions", transactions);
}

export default fp(databasePlugin);
