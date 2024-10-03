const express = require('express'),
        router = express.Router(),
        UserController = require('../controllers/users.controller'),
        VerifyJWT = require('../middleware/verifyJWT');


router.use(VerifyJWT)
router.get('/', UserController.indexUsers)

module.exports = router