const axios = require("axios")
const cheerio = require("cheerio")

const products = []

async function getPriceByURL(URL) {

    const response = await axios(URL)
    const html = response.data

    const $ = cheerio.load(html)

    const title = $(".pwc-h3.col-h3.product-name.pwc-font--primary-extrabold.mb-0").text().trim()
    // const brand = $(".col-12 .ct-pdp--brand.col-pdp--brand") // Não consegui implementar o brand.
    const price = $(".value").attr('content')
    const quantity = `${$(".ct-pdp--unit.col-pdp--unit").text().trim()}`

    console.log(brand)

    return products.push({title, price, quantity})
}

getPriceByURL('https://www.continente.pt/produto/farinha-de-trigo-fina-com-fermento-branca-de-neve-2004428.html')