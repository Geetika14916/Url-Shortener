const { get } = require("mongoose");
const { getUser } = require("../service/auth");

// function checkAuthentication(req, res, next) {
//   const authorizationHeaderValue = req.headers["authorization"];
//   req.user = null;
//   if (
//     !authorizationHeaderValue ||
//     !authorizationHeaderValue.startsWith("Bearer")
//   ) {
//     return next();
//   }

//   const token = authorizationHeaderValue.split("Bearer")[1];
//   const user = getUser(token);
//   req.user = user;
//   return next();
// }

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
    return next();
  };
}
async function checkAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const user = getUser(tokenCookie);

  req.user = user;
  return next();
}
// async function checkAuth(req, res, next) {
//   const userUid = req.cookies.uid;

//   const user = getUser(userUid);

//   req.user = user;
//   next();
// }

module.exports = {
  // restrictToLoggedinUserOnly,
  // checkAuth,

  checkAuthentication,
  restrictTo,
};
