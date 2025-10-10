import db from "infra/database.js";

async function status(request, response) {
  const dbName = process.env.POSTGRES_DB;
  const dbVersion = await db.query("SHOW server_version");
  const updatedAt = new Date().toISOString();
  const dbMaxConnections = await db.query("SHOW max_connections");
  const dbMaxConnectionsValue = parseInt(
    dbMaxConnections.rows[0].max_connections,
  );
  const dbOpenedConnections = await db.query({
    text: "SELECT count(*)::integer FROM pg_stat_activity WHERE datname = $1",
    values: [dbName],
  });

  response.status(200).json({
    update_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersion.rows[0].server_version,
        max_connections: dbMaxConnectionsValue,
        opened_connections: dbOpenedConnections.rows[0].count,
      },
    },
  });
}

export default status;
