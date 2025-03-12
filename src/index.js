const axios = require("axios")
const cheerio = require("cheerio")

const products = []

async function getPriceByURL(URL, ID) {

    const response = await axios(URL)
    const html = response.data

    const $ = cheerio.load(html)

    const title = $(".pwc-h3.col-h3.product-name.pwc-font--primary-extrabold.mb-0").text().trim()
    const brand = $('.ct-pdp--brand.col-pdp--brand').text().trim() 
    const price = $(".value").attr('content')
    const quantity = $(".ct-pdp--unit.col-pdp--unit").text().trim()

    return products.push({ ID, title, brand, price, quantity })
}

async function teste() {
    await getPriceByURL('https://www.continente.pt/produto/farinha-de-trigo-fina-com-fermento-branca-de-neve-2004428.html', 80)

    return console.log(products)
}

teste()