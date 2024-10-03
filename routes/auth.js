const express = require('express'),
    router = express.Router(),
    AuthController = require('../controllers/auth.controller')




    router.post('/register' , AuthController.register)
    router.post('/login' , AuthController.login)
    router.get('/refresh' , AuthController.refreshToken)
    router.post('/logout' , AuthController.logout)

module.exports = router