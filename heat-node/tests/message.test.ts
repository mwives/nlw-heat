import request from "supertest";

import { app } from "../src/app";

describe("Message", () => {
  it("shouldn't create a message if not authenticated", async () => {
    const response = await request(app).post("/messages").expect(401);
    expect(response.body.error).toBe("Token missing");
  });

  it("should get the last 3 messages", async () => {
    const response = await request(app).get("/messages/last3").expect(200);

    expect(response.body).not.toBeNull();

    if (response.body.length > 0) {
      expect(Object.keys(response.body[0])).toStrictEqual([
        "id",
        "text",
        "created_at",
        "user_id",
        "user",
      ]);

      if (response.body.length > 3) {
        fail(new Error("It shouldn't get more than 3 messages."))
      }
    }
  });
});
