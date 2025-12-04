// src/modules/tagged/tagged.test.ts
import Fastify from "fastify";
import { taggedRoutes } from "./tagged.routes";

describe("GET /tagged/grid", () => {
  it("should return a list of tagged posts with a 200 status code", async () => {
    const app = Fastify();

    const mockTaggedPosts = [
      {
        id: 1,
        img_url: "http://example.com/img-1.jpg",
        caption: "Tagged post 1",
        tagged_by: "friend_1",
        created_at: "2025-01-01 10:00:00",
      },
      {
        id: 2,
        img_url: "http://example.com/img-2.jpg",
        caption: "Tagged post 2",
        tagged_by: "friend_2",
        created_at: "2025-01-01 10:05:00",
      },
    ];

    app.decorate("transactions", {
      posts: {
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
      },
      reels: {
        create: jest.fn(),
        getAll: jest.fn(),
      },
      tagged: {
        create: jest.fn(),
        getGrid: jest.fn().mockReturnValue(mockTaggedPosts),
      },
      highlights: {
        create: jest.fn(),
        getById: jest.fn(),
        getAll: jest.fn(),
      },
    });

    app.register(taggedRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/tagged/grid",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockTaggedPosts);
  });
});
