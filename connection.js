const mongoose = require("mongoose");
function makeConnection(url) {
  return mongoose.connect(url);
}

module.exports = {
  makeConnection,
};
