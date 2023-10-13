import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { Server } from "http";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});
let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database connected successfully");
    server = app.listen(config.port, () => {
      console.log(`application listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }
  process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection is detected,we are closing our server");
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

//console.log(x)

process.on("SIGTERM", () => {
  console.log("SIGTEAM is received");
  if (server) {
    server.close();
  }
});
