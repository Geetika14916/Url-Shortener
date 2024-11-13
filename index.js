const express = require("express");
const port = 8001;
const app = express();
const Url = require("./models/url");
const urlRouter = require("./routers/url");
const { makeConnection } = require("./connection");
const mongoUrl = "mongodb://127.0.0.1:27017/urlDatabase";
makeConnection(mongoUrl)
  .then(() => console.log("Database Successfully Connected"))
  .catch((err) => console.log(`Error ${err} encountered`));

app.use(express.json());

app.use("/url", urlRouter);
app.use("/:shortId", urlRouter);
app.listen(port, () => {
  console.log("Server Started");
});
