const express = require("express")
const router = express.Router()
const { languageProfile, UiElements } = require("../db/languageProfile.js")

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
