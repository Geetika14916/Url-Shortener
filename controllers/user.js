const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const { setUser, getUser } = require("../service/auth");
async function createUser(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function loginUser(req, res) {
  const { name, password } = req.body;
  const user = await User.findOne({ name, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or password",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);

  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = {
  createUser,
  loginUser,
};
