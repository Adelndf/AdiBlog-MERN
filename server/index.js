const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const { errorHandler } = require("./middleware/error");

const app = express();
app.use(cors());
connectDB();

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
