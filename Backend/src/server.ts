import http from "http";
import app from "./express-app";
import { connection } from "../src/database/mongo.connection";

const PORT = process.env.PORT || 3000;
const HOST: any = "0.0.0.0"; // For production only

async function startServer() {
  try {
    await connection(); // connect to database
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      console.log(`Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log("HTTP server closed");
        process.exit(0); // Normal shutdown - Intentionally exiting with code 0
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error: any) {
    console.error("Failed to start server", error);
    process.exit(1); // Exiting with code 1 - Helps kubernetes detect the failure and restart the container
  }
}

startServer();
