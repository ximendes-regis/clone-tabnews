import { Client } from "pg";
import { database, password, user } from "pg/lib/defaults";

async function query(queryObject) {
  const client = new Client({
    host: process.env.HOST,
    port: process.env.PORT,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.end();
  }
}

export default {
  query: query,
};
