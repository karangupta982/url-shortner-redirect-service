import client from "../config/db.js";

export const findUrlByShortId = async (shortId) => {
  const query = "SELECT * FROM urls WHERE short_id = ?";
  const result = await client.execute(query, [shortId], { prepare: true });
  return result.rows[0];
};
