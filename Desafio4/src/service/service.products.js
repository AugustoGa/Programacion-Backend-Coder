const fs = require('fs');

class ProductManager {
    constructor(path) {
      this.products = [];
      this.idCounter = 1;
      this.path = path;
    }
  
    //cargar productos desde el archivo al instanciar la clase
    async loadProducts(){
      try{
        if (!this.path) {
          throw new Error('La ruta del archivo no está definida en ProductManager');
        }
        const data = await fs.readFileSync(this.path, 'utf-8');
        if(data){
          this.products = JSON.parse(data);
          // Actualizar el contador de id
          if(this.products.length > 0){
            this.idCounter = Math.max(...this.products.map(product => product.id))+1;
          }
        }else{
          console.log("Error")
        }
      }catch(error){
        // Si el archivo no existe, crea un archivo JSON vacío
        console.error("Error loading products", error);
        this.products = [];
      }

    }

    async saveToFile(){
      try{
        const data = JSON.stringify(this.products, null , 2);
        await fs.writeFileSync(this.path, data, 'utf-8');
      }catch(error){
        console.error("Error saving file" , error.message);
      }
    }
    addProduct(product){
      //ID Autoincrementable
      product.id = this.idCounter++;
      this.products.push(product);
      this.saveToFile();
      console.log('Product added', product);
    }

    getProducts() {
      console.log('Lista de productos:', this.products);
      return this.products;
    }

    getProductById(id) {
      const foundProduct = this.products.find((product) => product.id === id);
      if (foundProduct) {
        console.log(`Product found with ID ${id}:`, foundProduct);
        return foundProduct;
      } else {
        console.error('Product not found');
        return null;
      }
    }

    async updateProduct(id, updateProduct){
        try{
            const index = this.products.findIndex((product) => Number(product.id)===Number(id));
            if(index !== -1){
                updateProduct.id = Number(id);
                console.log(id);
                this.products[index] = updateProduct;
                await this.saveToFile();
                console.log('Product update', updateProduct);
            }else{
              console.error('Product not found to update');
            }
        }catch(error){
            console.error("Error update product", error);
            throw error;
        }
    }

    async deleteProduct(id){
        try{
            const index = this.products.findIndex((product)=> Number(product.id)===Number(id));
            if (index !== -1){
                const [deletedProduct] = this.products.splice(index,1);
                await this.saveToFile();
                console.log("Product Delete", deletedProduct);
                return true;
            }else{
                console.error("Product not found when deleting");
                return false;
            }
        }catch(error){
            console.error("Error deleting product", error);
            throw error;
        }
    }
}

module.exports = ProductManager;


    // ! Codigo viejo

// deleteProduct(id){
//   const index = this.products.findIndex((product) => product.id === id);
//   if(index !== -1){
//     const deleteProduct = this.products.splice(index,1)[0];
//     this.saveToFile();
//     console.log('Product Delete', deleteProduct);
//   }else{
//     console.error('Product not found when deleting');
//   }
// }

//? Aca cambie el splice y le asigne Number del id a Number del index. Y le agregue el await al saveToFile,
//? que lo modifique mas arriba tambien para que sea async.