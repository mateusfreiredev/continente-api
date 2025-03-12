const axios = require("axios")
const cheerio = require("cheerio")

const products = [] // { id, name, brand, price, quantity }

module.exports = {
    getAllProducts: () => products,

    getProductById: (id) => products.find(product => product.id === id),

    getProductsByBrand: (brand) => products.find(product => product.brand === brand),

    registerProduct: async (URL, id) => {
        const response = await axios(URL)
        
        const html = response.data
        
        const $ = cheerio.load(html)
        
        const name = $(".pwc-h3.col-h3.product-name.pwc-font--primary-extrabold.mb-0").text().trim()
        const brand = $('.ct-pdp--brand.col-pdp--brand').text().trim() 
        const price = $(".value").attr('content')
        const quantity = $(".ct-pdp--unit.col-pdp--unit").text().trim()
        
        const newProduct = { id, name, brand, price, quantity }

        const productAlreadyRegistered_Id = products.find(product => product.id === newProduct.id)

        const productAlreadyRegistered_Name = products.find(product => product.name === newProduct.name)
        
        if(productAlreadyRegistered_Id || productAlreadyRegistered_Name) return null

        products.push(newProduct)

        return newProduct
    },

    deleteProduct: (id) => {
        const productIndex = products.findIndex(product => product.id === id)

        if(productIndex === -1) return null

        const [deletedProduct] = products.splice(productIndex, 1)

        return deletedProduct
    }
}
