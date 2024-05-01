const fs = require('fs');

class ProductManager {
    constructor(path) {
      this.products = [];
      this.idCounter = 1;
      this.path = path;
    }
  
    //cargar productos desde el archivo al instanciar la clase
    loadProducts(){
      try{
        const data = fs.readFileSync(this.path, 'utf-8');
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

    saveToFile(){
      try{
        const data = JSON.stringify(this.products, null , 2);
        fs.writeFileSync(this.path, data, 'utf-8');
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

    updateProduct(id, updateProduct){
      const index = this.products.findIndex((product) => product.id === id);
      if(index !== -1){
        updateProduct.id = id;
        this.products[index] = updateProduct;
        this.saveToFile();
        console.log('Product update', updateProduct);
      }else{
        console.error('Product not found to update');
      }
    }

    deleteProduct(id){
      const index = this.products.findIndex((product) => product.id === id);
      if(index !== -1){
        const deleteProduct = this.products.splice(index,1)[0];
        this.saveToFile();
        console.log('Product Delete', deleteProduct);
      }else{
        console.error('Product not found when deleting');
      }
    }
  }

// Ejemplo de uso
const productManager = new ProductManager('productos.json');

productManager.addProduct({
  title: 'Producto 1',
  description: 'Descripción 1',
  price: 19.99,
  thumbnail: '/img1.jpg',
  code: 'P1',
  stock: 50
});

productManager.addProduct({
  title: 'Producto 2',
  description: 'Descripción 2',
  price: 29.99,
  thumbnail: '/img2.jpg',
  code: 'P2',
  stock: 30
});

productManager.getProducts();

const productIdToUpdate = 1;
const updatedProduct = {
  title: 'Producto 1 Actualizado',
  description: 'Nueva descripción',
  price: 25.99,
  thumbnail: '/img1_updated.jpg',
  code: 'P1',
  stock: 40
};

productManager.updateProduct(productIdToUpdate, updatedProduct);

const productIdToDelete = 2;
productManager.deleteProduct(productIdToDelete);