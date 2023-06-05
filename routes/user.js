const user = require("../db/user.js")
const express = require("express")
const router = express.Router()

module.exports = router

router.post("", async (req, res) => {
  const newUser = await user.build({
    telegramId: req.body.telegramId,
    form: {},
    isActive: true,
    languageProfileId: req.body.languageProfileId
  })
  newUser.save()
  res.sendStatus(200)
})

router.get("", async (req, res) => {
  const users = await user.findAll()
  res.send(JSON.stringify(users, null, 2))
})

router.get("/:pk", async (req, res) => {
  const findUser = await user.findByPk(req.params.pk)
  res.send(JSON.stringify(findUser, null, 2))
})

router.put("/languageProfile/:pk", async (req, res) => {
  const findUser = await user.findByPk(req.params.pk)
  findUser.languageProfileId = req.body.languageProfileId
  findUser.save()
  res.sendStatus(200)
})

router.put("/isActive/:pk", async (req, res) => {
  const findUser = await user.findByPk(req.params.pk)
  findUser.isActive = req.body.isActive
  findUser.save()
  res.sendStatus(200)
})

router.put("/form/:pk", async (req, res) => {
  const findUser = await user.findByPk(req.params.pk)
  findUser.form = req.body.form
  findUser.save()
  res.sendStatus(200)
})

router.delete("/:pk", async (req, res) => {
  const findUser = await user.findByPk(req.params.pk)
  findUser.destroy()
  res.sendStatus(200)
})