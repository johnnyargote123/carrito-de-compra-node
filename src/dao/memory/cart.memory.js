import fs from "fs"


import { productsMemory } from "./product.memory.js";
const manager = productsMemory



 class Carts  {

    constructor() {
        this.path = "./files/Carts.json";
        this.Carts = [];
      }
    
      getCarts = async () => {
        if (fs.existsSync(this.path || !this.Carts)) {
          const data = await fs.promises.readFile(this.path, "utf-8");
          const result = JSON.parse(data);
          return result;
        } else {
          return this.Carts;
        }
      }

    createCarts = async() => {
        const consultaCart = await this.getCarts()
        
        const cart = {
            id: this.Carts.length + 1,
            products:  this.productsObject
        }

        if(consultaCart.length === 0){
            cart.id = 1
            }
  
            else{
                cart.id = consultaCart[consultaCart.length - 1].id + 1
            }

            consultaCart.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(consultaCart, null, "\t"))
    }

    getCartById = async(codeId) => {
        if(fs.existsSync(this.path)){
            const consultaCart = await this.getCarts()
            const findCodeCart = consultaCart.find((v) => v.id === codeId);

            if(findCodeCart){
                const filterResult =consultaCart.filter((v) => v.id === codeId)
                return filterResult
              }        
              else{
                return  console.error(`Carrito ${codeId} no encontrado`)
              }

        }

    }


    AddProductToCard = async (codeCartId, codeProductId, quantityProducto) => {
        const consultaCart = await this.getCarts()
        const consultaProducto = await manager.getProduct()
        const cart = consultaCart.find((v) => v.id === codeCartId)
    


        if(Number.isNaN(quantityProducto)){
          quantityProducto = 1
        }
        else{
          quantityProducto
        }

        const index = consultaCart.findIndex((v) => v.id === codeCartId)  

        if (index === -1) {
          console.error(`No se encontro el carrito ${codeCartId} al que desea agregar productos`)
          return
        } else {
          const productToAdd = consultaProducto.find(product => product.id == codeProductId)
      

          const existingProductIndex = cart.products.findIndex((product) => product.id === codeProductId)
          if (!productToAdd) {
            throw new Error('Producto no encontrado')
          } 

          if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantityProducto;
        
            const updatedProduct = {
                id: codeProductId,
                quantity: cart.products[existingProductIndex].quantity
            };
            await fs.promises.writeFile(this.path, JSON.stringify(consultaCart, null, "\t"))
            return consultaCart[index].products = updatedProduct


        }

            else {

            const product = {
              id: codeProductId,
              quantity: quantityProducto
            }
            cart.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(consultaCart, null, "\t"))
            return product
          }
        }
      }

    
}
export  const cartsMemory = new Carts()