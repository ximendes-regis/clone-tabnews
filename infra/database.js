import { Client } from "pg";
import { database, password, user } from "pg/lib/defaults";

async function query(queryObject) {
  const client = new Client({
    host: process.env.HOST,
    port: process.env.PORT,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
  });
  await client.connect();
  const result = await client.query(queryObject);
  client.end();
  return result;
}

export default {
  query: query,
};
