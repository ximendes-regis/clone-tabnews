import db from "infra/database.js";
import orchestrador from "tests/orchestrador.js";

beforeAll(async () => {
  await orchestrador.waitForAllServices();
  await db.query("drop schema public cascade; create schema public");
});

test("GET to api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
