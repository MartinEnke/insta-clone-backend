// src/core/database/database.transactions.ts

export function createTransactions(db: any) {
    const statements = {
      // --- POSTS ---
      createPost: db.prepare(
        "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
      ),
      getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
      getAllPosts: db.prepare("SELECT * FROM posts ORDER BY created_at DESC"),
  
      // --- REELS ---
      createReel: db.prepare(
        "INSERT INTO reels (video_url, thumbnail_url, caption, views) " +
          "VALUES (@video_url, @thumbnail_url, @caption, @views) RETURNING *"
      ),
      getAllReels: db.prepare("SELECT * FROM reels ORDER BY created_at DESC"),
  
      // --- TAGGED POSTS ---
      createTagged: db.prepare(
        "INSERT INTO tagged_posts (img_url, caption, tagged_by) " +
          "VALUES (@img_url, @caption, @tagged_by) RETURNING *"
      ),
      getTaggedGrid: db.prepare(
        "SELECT * FROM tagged_posts ORDER BY created_at DESC"
      ),
  
      // --- HIGHLIGHTS ---
      createHighlight: db.prepare(
        "INSERT INTO highlights (cover_image_url, title) " +
          "VALUES (@cover_image_url, @title) RETURNING *"
      ),
      getHighlightById: db.prepare(
        "SELECT * FROM highlights WHERE id = ?"
      ),
      getAllHighlights: db.prepare(
        "SELECT * FROM highlights ORDER BY created_at DESC"
      ),
    };
  
    return {
      posts: {
        create: (data: any) => statements.createPost.get(data),
        getById: (id: number) => statements.getPostById.get(id),
        getAll: () => statements.getAllPosts.all(),
      },
      reels: {
        create: (data: any) => statements.createReel.get(data),
        getAll: () => statements.getAllReels.all(),
      },
      tagged: {
        create: (data: any) => statements.createTagged.get(data),
        getGrid: () => statements.getTaggedGrid.all(),
      },
      highlights: {
        create: (data: any) => statements.createHighlight.get(data),
        getById: (id: number) => statements.getHighlightById.get(id),
        getAll: () => statements.getAllHighlights.all(),
      },
    };
  }
  
  export type Transactions = ReturnType<typeof createTransactions>;
  