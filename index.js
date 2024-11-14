const express = require("express");
const port = 8001;
const path = require("path");
const app = express();
const Url = require("./models/url");
const urlRouter = require("./routers/url");
const testRouter = require("./routers/staticRouter");
const { makeConnection } = require("./connection");
const mongoUrl = "mongodb://127.0.0.1:27017/urlDatabase";
makeConnection(mongoUrl)
  .then(() => console.log("Database Successfully Connected"))
  .catch((err) => console.log(`Error ${err} encountered`));

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/test", testRouter);
app.use("/url", urlRouter);
app.listen(port, () => {
  console.log("Server Started");
});
