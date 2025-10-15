import { Client } from "pg";

async function query(queryObject) {
  let client = await getClient();

  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.end();
  }
}

async function getClient() {
  const client = new Client({
    host: process.env.HOST,
    port: process.env.PORT,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    ssl: true,
  });
  await client.connect();
  return client;
}

const db = {
  query,
  getClient,
};

export default db;
