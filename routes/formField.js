const formField = require("../db/formField.js")
const languageProfile = require("../db/languageProfile.js").languageProfile
const express = require("express")
const router = express.Router()

router.get("/:pk", async (req, res) => {
  const formFieldId = req.params.pk

  const field = await formField.findByPk(formFieldId, {
    include: [{ model: languageProfile, as: "languageProfile" }],
  })
  res.json(field)
})

router.put("/:pk", async (req, res) => {
  const formFieldId = req.params.pk
  const [updatedRowCount, updatedFormFields] = await formField.update(
    req.body,
    {
      where: { id: formFieldId },
      returning: true,
    }
  )
  res.json(updatedFormFields[0])
})

router.delete("/:pk", async (req, res) => {
  const formFieldId = req.params.pk

  const deletedRowCount = await formField.destroy({
    where: { id: formFieldId },
  })
  res.status(204).send()
})

module.exports = router