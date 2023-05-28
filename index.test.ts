import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "./index";
import { UNSAFE_userCredentials } from "./constants";

describe("Server Tests", () => {
  let accessToken;
  let refreshToken;

  beforeEach(async () => {
    const response = await request(app)
      .post("/token")
      .send({ ...UNSAFE_userCredentials });
    accessToken = response.body.token.accessToken;
    refreshToken = response.body.token.refreshToken;
  });

  afterEach(async () => {
    accessToken = "";
    refreshToken = "";
  });

  describe("GET /about via /token flow", () => {
    it('should return "Hello World" with a valid JWT token', async () => {
      const response = await request(app)
        .get("/about")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello World");
    });

    it("should return 401 unauthorized without a valid JWT token", async () => {
      const response = await request(app).get("/about");
      expect(response.status).toBe(401);
    });

    it("should return 401 unauthorized with a invalid JWT token", async () => {
      const response = await request(app)
        .get("/about")
        .set("Authorization", `Bearer invalid_access_token`);
      expect(response.status).toBe(401);
    });
  });

  describe("GET /about via /refresh flow", () => {
    it('should return "Hello World" with a valid JWT token', async () => {
      const initialResponse = await request(app)
        .get("/about")
        .set("Authorization", `Bearer expired_access_token`);

      expect(initialResponse.status).toBe(401);

      const refreshTokenResponse = await request(app)
        .post("/refresh")
        .send({ refreshToken });
      accessToken = refreshTokenResponse.body.token.accessToken;

      const response = await request(app)
        .get("/about")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello World");
    });
  });
});
