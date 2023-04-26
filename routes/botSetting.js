const express = require("express")
const botSetting = require("../db/botSetting.js")
const router = express.Router()

module.exports = router

// reset endpoint, use only in testing
router.get("/start", async (req, res) => {
  await botSetting.destroy({ where: {} })
  const setting = await botSetting.build({
    id: 1,
    botToken: "Token",
    emojies: {
      like: "👍",
      dislike: "👎",
      message: "📝",
      report: "‼️",
    },
  })
  setting.save()
  res.send(200)
})

// update data endpoint
router.put("/update", async (req, res) => {
  let setting = await botSetting.findByPk(1)
  setting.botToken = req.body.botToken
  setting.emojies = {
    like: req.body.like,
    dislike: req.body.dislike,
    message: req.body.message,
    report: req.body.report,
  }
  await setting.save()
  res.send(200)
})

router.put("/updateEmojie/:emojieName", async (req, res) => {
  const setting = await botSetting.findByPk(1)
  const emojies = JSON.parse(JSON.stringify(setting.emojies))
  emojies[req.params.emojieName] = req.body[req.params.emojieName]
  setting.emojies = emojies
  await setting.save()
  res.send(200)
})

router.put("/updateBotToken", async (req, res) => {
  const setting = await botSetting.findByPk(1)
  setting.botToken = req.body.botToken
  await setting.save()
  res.send(200)
})

// get data endpoint
router.get("/get", async (req, res) => {
  const setting = await botSetting.findByPk(1)
  res.send(JSON.stringify(setting, null, 2))
})

router.get("/getBotToken", async (req, res) => {
  const setting = await botSetting.findByPk(1)
  console.log(1)
  res.send(JSON.stringify(setting.botToken))
})
