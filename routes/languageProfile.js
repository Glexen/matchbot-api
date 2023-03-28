const languageProfile = require('../db/languageProfile.js')
const express = require('express')
const router = express.Router()

module.exports = router;

router.get('/test', function(req, res){
    res.send("test ok")

})