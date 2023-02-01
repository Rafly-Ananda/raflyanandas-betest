if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Server Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const { redisInit } = require("./server/lib/redis");
const { mongooseInit } = require("./server/lib/mongoose");
// Router
const userRouter = require("./server/routes/user");
const apiTokenRouter = require("./server/routes/apiToken");

// Configs
const { API_VERSION } = require("./server/configs/config");
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(`/api/${API_VERSION}/users`, userRouter);
app.use(`/api/${API_VERSION}/token`, apiTokenRouter);

// Server Init
(() => {
  redisInit();
  mongooseInit();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} . . .`);
  });
})();
