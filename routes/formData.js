const {User, FormData} = require("../db/user.js")
const express = require("express")
const router = express.Router()
const {languageProfile, UiElements} = require("../db/languageProfile.js")
const { sequelize } = require("../db/db.js")
const FormField = require("../db/formField.js")

router.get("/:id", async (req, res) => {
  const formDataId = req.params.id
  
  const formData = await FormData.findByPk(formDataId)
  res.json(formData)
})
  

router.patch("/:id", async (req, res) => {
  const formDataId = req.params.id
  const [updatedRowCount, updatedFormData] = await FormData.update(
    req.body,
    {
      where: { id: formDataId },
      returning: true,
    }
  )
  
  res.json(updatedFormData[0])
})

module.exports = router