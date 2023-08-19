
import config from "../config/config.js";
let productDAO
let cartsDAO

switch (config.persistence) {
    case "MONGO":
            //const connection = mongoose.connect(config.dbUrl)
            const productsMongo = await import( "./mongo/products.mongo.js")
            const cartsMongo = await import( "./mongo/carts.mongo.js")
            cartsDAO = cartsMongo.cartsMongo
            productDAO = productsMongo.productMongo
        break;

    case "MEMORY":
            const cartsMemory = await import("./memory/cart.memory.js")
            const productsMemory = await import("./memory/product.memory.js")
            cartsDAO = cartsMemory.cartsMemory
            productDAO = productsMemory.productsMemory
        break;
}




export { productDAO, cartsDAO}