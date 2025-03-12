const express = require('express')
const productsController = require('./controllers/products-controller')

const router = express.Router()

router.get('/products', productsController.index)
router.get('/products/show/:id', productsController.show)
router.get('/products/showByBrand/:brand', productsController.showByBrand)
router.post('/products', productsController.register)
router.delete('/products/:id', productsController.delete)

module.exports = router