const express = require('express'),
    router = express.Router(),
    ProductController = require('../controllers/product.controller')



    router.get('/', ProductController.index)
    router.post('/', ProductController.store)
    router.get('/:id', ProductController.show)
    router.patch('/:id', ProductController.update)
    router.put('/:id', ProductController.replace)
    router.delete('/:id', ProductController.destroy)



    module.exports = router