const { nanoid } = require("nanoid"); // CommonJS require
const Url = require("../models/url");

async function generateNewUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "Url Required" });
  }
  const shortID = nanoid(8);
  await Url.create({
    shortid: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", {
    id: shortID,
  });
}

async function redirectToUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortid: shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );
  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  res.redirect(entry.redirectUrl);
}

async function giveAnalytics(req, res) {
  const shortid = req.params.shortId;
  const result = await Url.findOne({ shortid });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  generateNewUrl,
  redirectToUrl,
  giveAnalytics,
};
