import fs from "fs"
import socket from "../../socket.js";
 class Products  {

    constructor(){
        this.path = "./files/Products.json"
        this.products = []
 
    }

    getProductPage = async() => {
        if(fs.existsSync(this.path || !this.products)){
            const data = await fs.promises.readFile(this.path, "utf-8")
            const result = JSON.parse(data)
            socket.io.emit("product", result)
            return result
            
        }
        else{
            return this.products
        }
      };

      addProduct = async(title, description, code, price,  thumbnail, status,  stock, category,) => {

        const productos = await this.getProduct()

        const product = {
            id: this.products.length + 1,
            title: title,
            description: description,
            code: code,
            price: price,
            thumbnails: thumbnail,
            status: status,
            stock: stock,
            category: category
          };

  
          const findCode = productos.find((v) => v.code === code);
          if (!findCode) {

            
          if(productos.length === 0){
            product.id = 1
            }

            else{
                product.id = productos[productos.length - 1].id + 1
            }

            productos.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))

            socket.io.emit("add-product", product)
        }
        if (findCode) {
          console.log("------------------------------------->")
          console.log("No se puede repetir el codigo:", code );
        }

      }




      getProductById = async(codeId) => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, "utf-8")
            const result = JSON.parse(data)
            const findCode = result.find((v) => v.id === codeId);

            if(findCode){
              const filterResult = result.filter((v) => v.id === codeId)
              return filterResult
            }        
            else{
              throw new Error(`Producto ${codeId} no encontrado`);
            }

           
        }

      }

      UpdateProducId = async(codeId,title, description, code,price, thumbnail, status, stock,  category) => {
        const data = await fs.promises.readFile(this.path, "utf-8")
        const result = JSON.parse(data)
        const index = result.findIndex((v) => v.id === codeId)

        if(index === -1){
          console.error(`No se encontro el producto ${codeId}  a actualizar`)
          return 
        }
        else{
                 // valores que se desean cambiar


        result[index].title = title === undefined ? result[index].title : title
        result[index].description = description === undefined ? result[index].description : description
        result[index].code = code === undefined ? result[index].code : code
        result[index].price = price === undefined ? result[index].price : price
        result[index].thumbnails = thumbnail === undefined ? result[index].thumbnails : thumbnail
        result[index].status = status === undefined ? result[index].status : status
        result[index].stock = stock === undefined ? result[index].stock : stock
        result[index].category = category === undefined ? result[index].category : category


        // modelo del producto a actualizar
        const updatedProduct = {
            id: result[index].id,
            title: result[index].title,
            description: result[index].description,
            code: result[index].code,
            price: result[index].price,
            thumbnails: result[index].thumbnails,
            status: result[index].status,
            stock: result[index].stock,
            category: result[index].category
        };

               // validacion de existencia del producto a actualizar 
               if (index !== -1) {
                result[index] = updatedProduct;
              } else {
                throw new Error(`El producto con id ${codeId} no se encontro`);
              }
            
            await fs.promises.writeFile(this.path, JSON.stringify(result, null, "\t"))
            return updatedProduct
 
        }

      }

    deleteProductId = async(codeId) => {
        const data = await fs.promises.readFile(this.path, "utf-8")
        const result = JSON.parse(data)
        const ProducToDelete = result.find((v) => v.id === codeId)


        if (!ProducToDelete) {
            console.log(`El producto ${codeId} no existe asi que no se puede borrar`)
          }
          else{
            result.splice(result.indexOf(ProducToDelete), 1)
            await fs.promises.writeFile(this.path, JSON.stringify(result, null, "\t"))
            socket.io.emit("remove-product", ProducToDelete.id)
            return ProducToDelete
          }
    }

}

export  const productsMemory = new Products()