const express = require('express')
const botSettings = require('../db/botSettings.js')
const router = express.Router()

module.exports = router;
// reset endpoint, use only in testing
router.get('/start', async (req, res) => {
    console.log('start')
    await botSettings.destroy({where: {}})
    let bot = await botSettings.build({'id': 1,
                    'botToken': 'Token', 
                    'emojies':
                        {'like':'👍',
                        'dislike':'👎',
                        'message':'📝',
                        'report':'‼️'}})
    bot.save()
    res.send(200)
})
// update data endpoint
router.put('/change', async (req, res) => {
    console.log('good')
    let bot = await botSettings.findByPk(1)
    bot.botToken = req.body.botToken;
    bot.emojies = {'like':req.body.like,
                    'dislike':req.body.dislike,
                    'message':req.body.message,
                    'report':req.body.report};
    await bot.save()
    res.send(200)
})
// get data endpoint
router.get('/get', async (req, res) => {
    let bot = await botSettings.findByPk(1)
    res.send(JSON.stringify(bot, null, 2));
})