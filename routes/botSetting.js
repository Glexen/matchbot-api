const express = require("express");
const botSetting = require("../db/botSetting.js");
const router = express.Router();

module.exports = router;

// reset endpoint, use only in testing
router.get("/start", async (req, res) => {
  await botSetting.destroy({ where: {} });
  const setting = await botSetting.build({
    id: 1,
    botToken: "Token",
    emojies: {
      like: "👍",
      dislike: "👎",
      message: "📝",
      report: "‼️",
    },
  });
  setting.save();
  res.send(200);
});

// update data endpoint
router.put("/update", async (req, res) => {
  let setting = await botSetting.findByPk(1);
  setting.botToken = req.body.botToken;
  setting.emojies = {
    like: req.body.like,
    dislike: req.body.dislike,
    message: req.body.message,
    report: req.body.report,
  };
  await setting.save();
  res.send(200);
});

// get data endpoint
router.get("/get", async (req, res) => {
  const setting = await botSetting.findByPk(1);
  res.send(JSON.stringify(bot, null, 2));
});