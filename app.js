// import express dan router
// import express dan router
import express from "express";
import router from "./routes/api.js";  // update to use import syntax

// import dotenv dan menjalankan method config
import dotenv from "dotenv"; // update to use import syntax
dotenv.config();

// destructing object process.env
const { APP_PORT } = process.env;

// membuat object express
const app = express();

// menggunakan middleware
app.use(express.json());

// menggunakan routing (router)
app.use(router);

// mendefinisikan port
app.listen(APP_PORT, () =>
  console.log(`Server running at: http://localhost:${APP_PORT}`)
);
