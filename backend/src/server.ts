import app from "./app";
import dotenv from "dotenv";
import cron from "node-cron";
import { sendWelcomeEmail } from "./api-v1/services/welcome-email.service";
import { sendVerificationEmail } from "./api-v1/services/verify-email.service";

dotenv.config();

const port = process.env.PORT;

cron.schedule("*/30 * * * * *", async() => {
  console.log("running task every 30 secs");
  await sendWelcomeEmail();
});

cron.schedule("*/1 * * * *", async() => {
  console.log("running task every minute");
  await sendVerificationEmail();
});

app.listen(port, () => {
  console.log(`[server] app is running at http://localhost:${port}...`);
});
