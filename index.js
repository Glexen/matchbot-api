const express = require('express')
const pg = require('pg')
const cors = require('cors')
const routesBotSettings = require('./routes/botSetting.js')
const routesLanguageProfile = require('./routes/languageProfile.js')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/botSettings', routesBotSettings)
app.use('/api/languageProfile', routesLanguageProfile)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
