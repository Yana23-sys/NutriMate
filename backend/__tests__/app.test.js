const app = require("../app")
const request = require("supertest")

describe("invalid endpoint", () => {
    test("404 status and error message when given an endpoint that doesn't exist", () => {
      return request(app)
        .get("/api/not-a-route")
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe("path not found");
        });
    });
  });
  