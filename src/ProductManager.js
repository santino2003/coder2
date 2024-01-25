const fs = require("fs/promises")
const paths = require("path")
class ProductManager{
    constructor(pathBase){
       this.pathDB = pathBase
    }

    async getProducts () {
        try {
            const allProducts = await fs.readFile(this.pathDB)
            if(allProducts.length !== 0){
                return JSON.parse(allProducts)
            }else{
                return []
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(
        title,
        description,
        price,
        code,
        stock,
        category,
        status = true,
        thumbnail,
    )
    
    {
        try {
            const product = {
                title,
                description,
                price,
                code,
                stock,
                category,
                status,
                thumbnail,
            }
            
    
            const allProducts = await this.getProducts()
            
            if(allProducts.products.length ===0){
                product.id = 1
                allProducts.products.push(product)
                await fs.writeFile(this.pathDB, JSON.stringify(allProducts))
            }else{
                product.id = allProducts.products[allProducts.products.length -1].id +1
                const codigoRep = allProducts.products.find(producto => producto.code === code);
                if(codigoRep){
                    console.log('Codigo repetido')
                }else{
                    allProducts.products.push(product)
                    await fs.writeFile(this.pathDB, JSON.stringify(allProducts))
                }
            }
        } catch (error) {
            console.log(error)
        }
       

    
            
        
        
    }

    async getProductById (id){
        try {
            const allProducts = await this.getProducts()
            const productoEncontrado = allProducts.products.find(producto => producto.id === id);
            if (productoEncontrado) {
                return productoEncontrado;
              } else {
               
                console.log("Not found");
              }
        } catch (error) {
            console.log(error)
        }


    }

    async updateProduct(id,product){
        try {
            
            const allProducts = await this.getProducts()
            const productoEncontrado = allProducts.products.find(producto => producto.id === id);
            console.log(product)
            if(productoEncontrado){
                Object.keys(product).forEach(campo => {
                    
                    if (productoEncontrado.hasOwnProperty(campo)){
                        
                        productoEncontrado[campo] = product[campo]
                    }
                   
                })
                await fs.writeFile(this.pathDB, JSON.stringify(allProducts))

            }else{
                console.log("id invalido")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            const allProducts = await this.getProducts()
            
            const productosFiltrados = allProducts.products.filter(producto => producto.id !== id)
            const guararJson = {
                products: productosFiltrados
            }
            
            await fs.writeFile(this.pathDB, JSON.stringify(guararJson))
        } catch (error) {
            console.log(error)
        }
    }
}
// const productmanager =  async () => {
//     try {
//         const pathBase = paths.join(__dirname, 'db.json')
//         const manager = new ProductManager(pathBase)
//         console.log(await manager.updateProduct(3,'stock',1))
//     } catch (error) {
//         console.log(error)
//     }
// }

// productmanager()

module.exports = ProductManager