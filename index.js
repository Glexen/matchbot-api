const express = require('express');
const pg = require('pg');
const routesBotSettings = require('./routes/botSettings.js');
const routesLanguageProfile = require('./routes/languageProfile.js');

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

app.use('/api/botSettings', routesBotSettings)
app.use('/api/languageProfile', routesLanguageProfile)
