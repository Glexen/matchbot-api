const express = require("express")
const {bots, interactions} = require("../db/botSetting.js")
const router = express.Router()
const {User, FormData} = require("../db/user.js")
const {languageProfile, UiElements} = require("../db/languageProfile.js")
const { Op } = require("sequelize")
const sequelize = require("../db") 
require("dotenv").config()


module.exports = router

router.get("/:id/users/:telegramId", async (req, res) => {
  const botId = req.params.id
  const telegramId = req.params.telegramId

  const bot = await bots.findByPk(botId) 
  const user = await User.findOne({
    where: { botsId: botId, telegramId: telegramId },
    include: [
      { model: FormData, as: "formData" },
      { model: languageProfile, as: "languageProfile" },
    ],
  })

  res.json(user)
})


router.delete("/:id/users/:telegramId", async (req, res) => {
  const botId = req.params.id
  const telegramId = req.params.telegramId

  const bot = await bots.findByPk(botId) // Assuming you have a Bot model defined
  const deletedRowCount = await User.destroy({
    where: { botsId: botId, telegramId: telegramId },
  })

  res.status(204).send()
})


router.put("/:id/users/:telegramId", async (req, res) => {
  const botId = req.params.id
  const telegramId = req.params.telegramId

  const bot = await bots.findByPk(botId) 

  const [updatedRowCount, updatedUsers] = await User.update(
    req.body,
    {
      where: { botsId: botId, telegramId: telegramId },
      returning: true,
    }
  )

  res.json(updatedUsers[0])
})

router.get("/:id/users/:telegramid/randoms", async (req, res) => {
  const botId = req.params.id
  const excludedTelegramId = req.params.telegramid

  const bot = await bots.findByPk(botId) 
  const randomUser = await User.findOne({
    where: {
      botsId: botId,
      telegramId: { [Op.ne]: excludedTelegramId }, 
    },
    include: [
      { model: FormData, as: "formData" },
      { model: languageProfile, as: "languageProfile" },
    ],
    order: sequelize.random(), // Get a random user
  })
  res.json(randomUser)
})

router.post("/:id/users", async (req, res) => {
  const botId = req.params.id

  const bot = await bots.findByPk(botId) 
  const newUser = await User.create({
    telegramId: req.body.telegramId,
    botsId: botId,
    isActive: true,
    languageProfileId: req.body.languageProfileId,
  })
  res.status(201).json(newUser)
})

router.get("/:id/users", async (req, res) => {
  const botId = req.params.id

  const bot = await bots.findByPk(botId) 
  const users = await User.findAll({
    where: { botsId: botId },
    include: [
      { model: FormData, as: "formData" },
      { model: languageProfile, as: "languageProfile" },
    ],
  })

  res.json(users)
})

router.put("/:pk", async (req, res) => {
  let setting = await bots.findByPk(req.params.pk)
  setting.botToken = req.body.botToken
  await setting.save()
  res.send(200)
})

router.post("", async (req, res) => {
  const { botToken } = req.body

  const newInteraction = await interactions.create({
    like: "like",
    dislike: "dislike",
    likeMessage: "like + message",
    report: "report",
  })

  const newBot = await bots.create({
    botToken,
    interactionsId: newInteraction.id,
  })

  res.status(201)
})

router.patch("/interections/:pk", async (req, res) => {
  const botPrimaryKey = req.params.pk
  const botToUpdate = await bots.findByPk(botPrimaryKey)
  const existingInteraction = await interactions.findByPk(botToUpdate.interactionsId)
  existingInteraction.like = req.body.like || existingInteraction.like
  existingInteraction.dislike = req.body.dislike || existingInteraction.dislike
  existingInteraction.likeMessage = req.body.likeMessage || existingInteraction.likeMessage
  existingInteraction.report = req.body.report || existingInteraction.report

  await existingInteraction.save()
  res.send(200)
})

router.get("/interections/:pk", async (req, res) => {
  const botPrimaryKey = req.params.pk
  const bot = await bots.findByPk(botPrimaryKey, {
    include: interactions, 
  })
  const botInteractions = bot.interactions

  res.status(200).json({
    interactions: botInteractions,
  })
})

router.get("/:pk", async (req, res) => {
  const bot = await bots.findByPk(req.params.pk)
  res.send(JSON.stringify(bot, null, 2))
})

router.get("/:pk/languageProfiles", async (req, res) => {
  const botId = req.params.pk // Assuming the URL parameter is the bot's primary key

  const bot = await bots.findByPk(botId, {
    include: {
      model: languageProfile,
      as: "languageProfiles",
    },
  })
  res.json(bot.languageProfiles)
})

router.post("/:pk/languageProfiles", async (req, res) => {
  const botId = req.params.pk 
  const newLanguageProfile = await languageProfile.create({
    name: req.body.name, 
    botId: botId,
  })
  const defaultUIElements = {
    helloMessage: "Default Hello Message",
    buttonMenu: "Menu",
    buttonSearch: "Search",
    buttonYes: "Yes",
    buttonNo: "No",
    buttonRestartForm: "Restart Form",
    buttonEditForm: "Edit Form",
    languageProfileId: newLanguageProfile.id,
  }

  await UiElements.create(defaultUIElements)
  res.status(201).json(newLanguageProfile)
})