const { default: mongoose } = require("mongoose");
const urlSchema = new mongoose.Schema(
  {
    shortid: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model("url", urlSchema);

module.exports = Url;