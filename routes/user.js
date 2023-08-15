const {User, FormData} = require("../db/user.js")
const express = require("express")
const router = express.Router()
const {languageProfile, UiElements} = require("../db/languageProfile.js")
const { sequelize } = require("../db/db.js")
const FormField = require("../db/formField.js")

module.exports = router

router.get("/:userid/formData", async (req, res) => {
  const userId = req.params.userid

  const user = await User.findByPk(userId, {
    include: [{ model: FormData, as: "formData" }],
  })

  res.json(user.formData)
})

router.get("/:userid/languageProfiles", async (req, res) => {
  const userId = req.params.userid

  const user = await User.findByPk(userId, {
    include: [{ model: languageProfile, as: "languageProfile" }],
  })
  res.json(user.languageProfile)
})

router.post("/:userid/formFields/:formFieldsId/formData", async (req, res) => {
  const userId = req.params.userid
  const formFieldId = req.params.formFieldsId

  const user = await User.findByPk(userId)
  const formField = await FormField.findByPk(formFieldId)

  const newFormData = await FormData.create({
    value: req.body.value,
    formField_id: formFieldId,
    user_id: userId,
  })

  res.status(201).json(newFormData)
})