import { app } from "./app.js";
import { pool } from "./config/db.js";
import { env } from "./config/env.js";

async function start() {
  await pool.query("SELECT 1");
  app.listen(env.port, () => {
    console.log(`SmartPlacify API running on http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start SmartPlacify API", error);
  process.exit(1);
});
