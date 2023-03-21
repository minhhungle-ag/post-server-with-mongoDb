const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectMongo = require("./utils/db/init_mongo");
const postRouter = require("./api/router/post");
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

connectMongo();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATH, DELETE");
    return res.status(200).json({});
  }

  next();
});

app.use("/api/posts", postRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

const server = http.createServer(app);

server.listen(port, () => console.log("SERVER START AT PORT :" + port));
