## Progress

### Day 1 – Posts (Backend)
- Set up Fastify + TypeScript project
- Added SQLite database integration
- Implemented `POST /posts` to create a post
- Wrote integration tests for the posts module using Jest + Fastify `inject`

### Day 2 – Posts & Reels
- Added `GET /posts` endpoint to return all posts
- Implemented full `reels` module:
  - SQLite `reels` table
  - Service + routes
  - `GET /reels/grid` endpoint
- Covered posts + reels with integration tests (TDD)

### Day 3 – Tagged & Highlights
- Implemented `tagged` module:
  - `tagged_posts` table
  - Transactions for tagged grid
  - `GET /tagged/grid` endpoint
  - Integration test for `/tagged/grid` with mocked transactions
- Implemented `highlights` module:
  - `highlights` table
  - Transactions for list + detail
  - `GET /highlights` and `GET /highlights/:id`
  - Integration tests for both endpoints
- Centralized DB access through `database.plugin.ts` + `database.transactions.ts`
