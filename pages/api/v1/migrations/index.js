import migrationRunner from "node-pg-migrate";
import { join } from "path";
import db from "infra/database.js";

async function migrations(request, response) {
  const client = await db.getClient();
  const migrations = await migrationRunner({
    dbClient: client,
    dryRun: getDryRun(request),
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });
  await client.end();
  response.status(200).json(migrations);
}

function getDryRun(request) {
  if (request.method === "POST") {
    return false;
  }
  return true;
}

export default migrations;
