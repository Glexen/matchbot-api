const languageProfile = require("../db/languageProfile.js")
const express = require("express")
const router = express.Router()

module.exports = router

router.put("", async (req, res) => {
  let language = await languageProfile.findByPk(req.body.id)
  language.name = req.body.name
  language.helloMessage = req.body.helloMessage
  language.buttonNames = {
    accountSettings: req.body.accountSettings,
    menu: req.body.menu,
    back: req.body.back,
    startSearch: req.body.startSearch,
    editForm: req.body.editForm,
    restartForm: req.body.restartForm,
    editFormField: req.body.editFormField,
    activate: req.body.activate,
    deactivate: req.body.deactivate,
    yes: req.body.yes,
    no: req.body.no,
  }
  await language.save()
  res.send(200)
})

router.put("/buttonName/:buttonName", async (req, res) => {
  const language = await languageProfile.findByPk(req.body.languageProfileId)
  const buttonNames = JSON.parse(JSON.stringify(language.buttonNames))
  buttonNames[req.params.buttonName] = req.body[req.params.buttonName]
  language.buttonNames = buttonNames
  await language.save()
  res.sendStatus(200)
})

router.put("/helloMessage/:pk", async (req, res) => {
  const language = await languageProfile.findByPk(req.params.pk)
  language.helloMessage = req.body.helloMessage
  await language.save()
  res.sendStatus(200)
})


router.post("", async (req, res) => {
  let language = await languageProfile.build({
    name: req.body.name,
    helloMessage: "Hello, I`m bot",
    buttonNames: {
      accountSettings: "Settings",
      menu: "Menu",
      back: "Back",
      startSearch: "Start search",
      editForm: "Edit account form",
      restartForm: "Restart my account",
      deleteAccount: "Delete my account",
      yes: "Yes",
      no: "No",
    },
  })
  language.save()
  res.send(200)
})

router.get("", async (req, res) => {
  let languages = await languageProfile.findAll()
  res.send(JSON.stringify(languages, null, 2))
})

router.get("/:pk", async (req, res) => {
  let language = await languageProfile.findByPk(req.params.pk)
  res.send(JSON.stringify(language, null, 2))
})

router.get("/helloMessage/:pk", async (req, res) => {
  const language = await languageProfile.findByPk(req.params.pk)
  res.send(JSON.stringify(language.helloMessage))
})