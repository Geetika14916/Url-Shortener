const express = require("express");
const port = 8001;
const path = require("path");
const app = express();
const Url = require("./models/url");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const { makeConnection } = require("./connection");
const mongoUrl = "mongodb://127.0.0.1:27017/urlDatabase";
makeConnection(mongoUrl)
  .then(() => console.log("Database Successfully Connected"))
  .catch((err) => console.log(`Error ${err} encountered`));

//Routers
const urlRouter = require("./routers/url");
const testRouter = require("./routers/staticRouter");
const userRouter = require("./routers/user");

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", checkAuth, testRouter);
app.use("/url", restrictToLoggedinUserOnly, urlRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log("Server Started");
});
