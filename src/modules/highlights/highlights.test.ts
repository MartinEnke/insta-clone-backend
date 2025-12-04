import Fastify from "fastify";
import { highlightsRoutes } from "./highlights.routes";

describe("Highlights routes", () => {
  it("should return all highlights with a 200 status code", async () => {
    const app = Fastify();

    const mockHighlights = [
      {
        id: 1,
        cover_image_url: "http://example.com/highlight1.jpg",
        title: "Vacation",
        created_at: "2025-01-01 10:00:00",
      },
      {
        id: 2,
        cover_image_url: "http://example.com/highlight2.jpg",
        title: "Studio",
        created_at: "2025-01-01 11:00:00",
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
        getGrid: jest.fn(),
      },
      highlights: {
        getAll: jest.fn().mockReturnValue(mockHighlights),
        getById: jest.fn(),
        create: jest.fn(),
      },
    });

    app.register(highlightsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/highlights",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockHighlights);
  });

  it("should return a single highlight by id with a 200 status code", async () => {
    const app = Fastify();

    const mockHighlight = {
      id: 1,
      cover_image_url: "http://example.com/highlight1.jpg",
      title: "Vacation",
      created_at: "2025-01-01 10:00:00",
    };

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
        getGrid: jest.fn(),
      },
      highlights: {
        getAll: jest.fn(),
        getById: jest.fn().mockReturnValue(mockHighlight),
        create: jest.fn(),
      },
    });

    app.register(highlightsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/highlights/1",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockHighlight);
  });
});
