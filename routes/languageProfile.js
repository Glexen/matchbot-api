const {languageProfile, UiElements} = require("../db/languageProfile.js")
const formField = require("../db/formField.js")
const express = require("express")
const router = express.Router()

router.get("/:id/formFields", async (req, res) => {
  const profileId = req.params.id

  const profile = await languageProfile.findByPk(profileId, {
    include: [{ model: formField, as: "formFields" }],
  })

  res.json(profile.formFields)
})

router.post("/:id/formFields", async (req, res) => {
  const profileId = req.params.id

  const profile = await languageProfile.findByPk(profileId)
  const newFormField = await formField.create({
    question: req.body.question,
    isOptional: req.body.isOptional,
    nameField: req.body.nameField,
    languageProfileId: profileId,
    type: req.body.type,
  })

  res.status(201).json(newFormField)
})

router.get("/:id", async (req, res) => {
  const profileId = req.params.id
  const profile = await languageProfile.findByPk(profileId, {
    include: [{ model: UiElements, as: "uiElements" }],
  })
  res.json(profile)
})

router.patch("/:id", async (req, res) => {
  const profileId = req.params.id
  const [updatedRowCount, updatedProfiles] = await languageProfile.update(
    req.body,
    {
      where: { id: profileId },
      returning: true,
    }
  )
  res.json(updatedProfiles[0])
})

router.delete("/:id", async (req, res) => {
  const profileId = req.params.id
  const deletedRowCount = await languageProfile.destroy({
    where: { id: profileId },
  })
  res.status(204).send()
})

router.get("/:id", async (req, res) => {
  const uiElementId = req.params.id

  const uiElement = await UiElements.findByPk(uiElementId, {
    include: [{ model: languageProfile, as: "languageProfile" }],
  })


  res.json(uiElement)
})

router.patch("/:id", async (req, res) => {
  const uiElementId = req.params.id
  const [updatedRowCount, updatedUiElements] = await UiElements.update(
    req.body,
    {
      where: { id: uiElementId },
      returning: true,
    }
  )

  res.json(updatedUiElements[0])
})

module.exports = router