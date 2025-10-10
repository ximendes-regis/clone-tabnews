test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const body = await response.json();
  console.log(body);
  expect(body.update_at).toBeDefined();

  const parsedDate = new Date(body.update_at).toISOString();
  expect(body.update_at).toEqual(parsedDate);

  expect(body.dependencies.database.version).toBeDefined();
  expect(body.dependencies.database.max_connections).toBeDefined();
  expect(body.dependencies.database.opened_connections).toEqual(1);
});
