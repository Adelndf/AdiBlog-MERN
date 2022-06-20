const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./server/config/db");
const userRoute = require("./server/routes/users");
const postRoute = require("./server/routes/posts");
const { errorHandler } = require("./server/middleware/error");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is online at port ${PORT}`);
});

// express.json & urlencoded is for Reading the body..
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// The routes
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

// Override the default Error handler for express
app.use(errorHandler);
