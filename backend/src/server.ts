import app from "./app";
import dotenv from "dotenv";
import cron from "node-cron";
import { welcomeUser } from "./api-v1/services/welcome-email.service";

dotenv.config();

const port = process.env.PORT;

cron.schedule("*/1 * * * *", () => {
  console.log("running task every 10 seconds");
    welcomeUser()
});

app.listen(port, () => {
  console.log(`[server] app is running at http://localhost:${port}...`);
});
