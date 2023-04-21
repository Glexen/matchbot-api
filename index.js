const express = require('express')
const pg = require('pg')
const cors = require('cors')
const routesBotSetting = require('./routes/botSetting.js')
const routesLanguageProfile = require('./routes/languageProfile.js')
const routesFormField = require('./routes/formField.js')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/botSetting', routesBotSetting)
app.use('/api/languageProfile', routesLanguageProfile)
app.use('/api/formField', routesFormField)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
