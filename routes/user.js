const user = require("../db/user.js")
const express = require("express")
const router = express.Router()
const languageProfile = require("../db/languageProfile.js")
const { sequelize } = require("../db/db.js")

module.exports = router

router.post("", async (req, res) => {
  const newUser = await user.build({
    telegramId: req.body.telegramId,
    form: {},
    isActive: false,
    languageProfileId: req.body.languageProfileId
  })
  newUser.save()
  res.sendStatus(200)
})

router.get("/random/:telegramId", async (req, res) => {
  const allUsers = await user.findAll();
  const { telegramId } = req.params;

  const filteredUsers = allUsers.filter(user => user.telegramId !== telegramId && user.isActive);
  const randomUser = filteredUsers[Math.floor(Math.random() * filteredUsers.length)];

  if (randomUser) {
    res.send(JSON.stringify(randomUser, null, 2));
  } else {
    res.sendStatus(404); // No random user found matching the condition
  }
});


router.get("", async (req, res) => {
  const users = await user.findAll()
  res.send(JSON.stringify(users, null, 2))
})

router.get("/:telegramId", async (req, res) => {
  const findUser = await user.findOne({
    where: {
      telegramId: req.params.telegramId
    }
  });
  if (findUser){
    res.send(JSON.stringify(findUser, null, 2))
  }else{
    res.sendStatus(404)
  }
})

router.put("/languageProfile/:pk", async (req, res) => {
  const findUser = await user.findByPk(req.params.pk)
  findUser.languageProfileId = req.body.languageProfileId
  findUser.save()
  res.sendStatus(200)
})

router.put("/isActive/:telegramId", async (req, res) => {
  const findUser = await user.findOne({
    where: {
    telegramId: req.params.telegramId
  }})
  findUser.isActive = req.body.isActive
  findUser.save()
  res.sendStatus(200)
})

router.put("/form/:telegramId", async (req, res) => {
  const findUser = await user.findOne({
    where: {
    telegramId: req.params.telegramId
  }})
  findUser.form = req.body.form
  findUser.save()
  res.sendStatus(200)
})

router.get("/languageProfile/:telegramId", async (req, res) => {
  const findUser = await user.findOne({ where: {
    telegramId: req.params.telegramId
  } })
  const languageProfileFindId = findUser.languageProfileId
  const languageProfileFind = await languageProfile.findByPk(languageProfileFindId)
  res.send(JSON.stringify(languageProfileFind, null, 2))
})




router.delete("/:telegramId", async (req, res) => {
  const findUser = await user.findOne({ where: {
    telegramId: req.params.telegramId} })
  findUser.destroy()
  res.sendStatus(200)
})


