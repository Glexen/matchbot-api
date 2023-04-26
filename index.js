const express = require('express')
const pg = require('pg')
const cors = require('cors')
const routesBotSetting = require('./routes/botSetting.js')
const routesLanguageProfile = require('./routes/languageProfile.js')
const routesFormField = require('./routes/formField.js')

const version = 'v1'

const app = express()
app.use(cors())
app.use(express.json())

app.use(`/api/${version}/botSetting`, routesBotSetting)
app.use(`/api/${version}/languageProfile`, routesLanguageProfile)
app.use(`/api/${version}/formField`, routesFormField)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
