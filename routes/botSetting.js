const express = require("express")
const botSetting = require("../db/botSetting.js")
const router = express.Router()
require("dotenv").config()

const botSettingPk = process.env.BOTSETTING_PK


module.exports = router


// update data endpoint
router.put("", async (req, res) => {
  let setting = await botSetting.findByPk(botSettingPk)
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

router.put("/emojies/:emojieName", async (req, res) => {
  const setting = await botSetting.findByPk(botSettingPk)
  const emojies = JSON.parse(JSON.stringify(setting.emojies))
  emojies[req.params.emojieName] = req.body[req.params.emojieName]
  setting.emojies = emojies
  await setting.save()
  res.send(200)
})

router.put("/botToken", async (req, res) => {
  const setting = await botSetting.findByPk(botSettingPk)
  setting.botToken = req.body.botToken
  await setting.save()
  res.send(200)
})

// get data endpoint
router.get("", async (req, res) => {
  const setting = await botSetting.findByPk(botSettingPk)
  res.send(JSON.stringify(setting, null, 2))
})

router.get("/botToken", async (req, res) => {
  const setting = await botSetting.findByPk(botSettingPk)
  res.send(JSON.stringify(setting.botToken))
})

router.get("/emojies", async (req, res) => {
  const setting = await botSetting.findByPk(botSettingPk)
  res.send(JSON.stringify(setting.emojies))
})
