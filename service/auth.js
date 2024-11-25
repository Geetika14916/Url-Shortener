const jwt = require("jsonwebtoken");
const sKey = "sensitive";
function setUser(user) {
  return jwt.sign({ _id: user._id, email: user.email }, sKey);
}
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, sKey);
  } catch {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
