import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import redirectRoutes from "./routes/redirectRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5003;

app.use("/api/v1/redirect", redirectRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Redirect service running on port ${PORT}`));
});
