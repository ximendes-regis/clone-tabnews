import db from "infra/database.js";

async function status(request, response) {
  const queryResult = await db.query("SELECT 2 + 3 as result");
  console.log(queryResult.rows);
  response.status(200).json({ status: "ok" });
}

export default status;
