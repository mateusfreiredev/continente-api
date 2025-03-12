const products = require("../models/products")

module.exports = {
    
    // GET /products
    index: (req,res) => {
        const allProducts = products.getAllProducts()

        res.status(200).json(allProducts)
    },

    // GET /products/show/:id
    show: (req,res) => {
        const { id } = req.params
        
        const product = products.getProductById(+id)
        
        if(!product) return res.status(404).json({ message: 'Product not found!' })

        res.status(200).json(product)
    },

    // GET /products/showByBrand/:brand
    showByBrand: (req,res) => {
        const { brand } = req.params
        
        const productsList = products.getProductsByBrand(brand)
        
        if(!productsList) return res.status(404).json({ message: 'No products found for this brand!' })

        res.status(200).json(productsList)
    },

    // POST /products
    register: async (req, res) => {
        const { URL, id } = req.body
        
        if(typeof URL !== 'string' || typeof id !== 'number'){
            return res.status(400).json({ message: 'Invalid fields!' })
        }
    
        const registeredProduct = await products.registerProduct(URL, id)

        if(!registeredProduct) {
            return res.status(400).json({ message: 'Product already registered!' })
        }

        res.status(201).json(registeredProduct)
    },

    // DELETE /products/:id
    delete: (req,res) => {
        const { id } = req.params
        
        const product = products.getProductById(+id)
        
        if(!product) return res.status(404).json({ message: 'Product not found!' })
        
        const deletedProduct = products.deleteProduct(+id)

        if(!deletedProduct) return res.status(400).json({ message: "Couldn't delete product!"})

        res.status(201).json(deletedProduct)
    }
}