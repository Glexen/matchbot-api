const formField = require("../db/formField.js")
const languageProfile = require("../db/languageProfile.js")
const express = require("express")
const router = express.Router()

module.exports = router

router.post("", async (req, res) => {
  let field = await formField.build({
    question: req.body.question,
    isOptional: req.body.isOptional,
    nameField: req.body.nameField,
    languageProfileId: req.body.languageProfileId,
  })
  field.save()
  res.send(200)
})

router.get("/:languageId", async (req, res) => {
  let language = await languageProfile.findByPk(req.params.languageId, {
    include: formField,
  })
  let result = []
  language.formFields.forEach((field) => {
    result.push(field)
  })
  res.send(JSON.stringify(result, null, 2))
})

router.post("", async (req, res) => {
  let field = await formField.build({
    question: "",
    isOptional: false,
    nameField: "",
    languageProfileId: req.body.languageProfileId,
  })
  field.save()
  res.send(200)
})

router.put("", async (req, res) => {
  let fields = await formField.findAll()
  for (let i = 0; i < fields.length; i++) {
    fields[i].question = req.body[`question${fields[i].id}`]
    fields[i].nameField = req.body[`nameField${fields[i].id}`]
    fields[i].isOptional = req.body[`isOptional${fields[i].id}`]
    fields[i].type = req.body[`type${fields[i].id}`]
    fields[i].save()
  }
  res.send(200)
})

router.delete("/:id", async function (req, res) {
  let field = await formField.findByPk(req.params.id)
  field.destroy()
  res.send(200)
})
