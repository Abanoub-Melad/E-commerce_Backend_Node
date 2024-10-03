const express = require('express'),
    router = express.Router(),
    OrderController = require('../controllers/order.controller')

    router.get('/', OrderController.index)
    router.post('/', OrderController.store)
    router.get('/', OrderController.show)
    router.delete('/', OrderController.destroy)
    module.exports = router