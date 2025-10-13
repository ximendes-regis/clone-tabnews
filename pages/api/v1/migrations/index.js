import migrationRunner from "node-pg-migrate";
import { join } from "path";
import db from "infra/database.js";

async function migrations(request, response) {
  const client = await db.getClient();
  try {
    const allowedMethods = ["GET", "POST"];
    if (!allowedMethods.includes(request.method)) {
      return response.status(405).json({
        error: "Method not allowed",
      });
    }

    const migrations = await migrationRunner({
      dbClient: client,
      dryRun: getDryRun(request),
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    await client.end();
    return response.status(200).json(migrations);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

function getDryRun(request) {
  if (request.method === "POST") {
    return false;
  }
  return true;
}

export default migrations;
