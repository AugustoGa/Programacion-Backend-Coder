const fs = require('fs').promises;

class ProductManager {
  constructor() {
    this.path = './src/models/products.json';
  }

  readProducts = async () =>{
    const products = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(products);
  }

  writeProducts = async(product)=>{
    await fs.writeFile(this.path, JSON.stringify(product));
  }

  createdProducts = async (product) => {
    try {
        const productOlds = await this.readProducts();
        product.id = this.generateUniqueId();
        const productAll = [...productOlds, product];
        await this.writeProducts(productAll);
        return 'Producto Agregado';
    } catch (error) {
      console.error('Error al escribir productos:', error);
        throw error; // Puedes manejar el error de la manera que desees
    }
  }

  exist = async (id) => {
    const products = await this.readProducts();
    return products.find(prod => prod.id === id);
  }

  getProducts = async()=>{
    return await this.readProducts();
  }

  getProductsById = async(id)=>{
    const productById = await this.exist(id);
    if(!productById) return 'Producto no encontrado';
    return productById;
  }


  generateUniqueId() {
    // Genera un ID único basado en la fecha actual y aleatorio
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  deleteProducts = async(id)=>{
    const products = await this.readProducts();
    let existProducts = products.some(prod => prod.id === id); //devuelve true o false
    if(existProducts){
        let filterProducts = products.filter(prod => prod.id != id)
        await this.writeProducts(filterProducts);
        return 'Producto Eliminado'
    }else{
        return 'Producto a eliminar no encontrado'
    }
    
  }

  
  updateProduct = async (id, product) => {
    await this.deleteProducts(id);
  
    const productOlds = await this.readProducts();
    const products = [{...product, id : id}, ...productOlds];
  
    await this.writeProducts(products);
    return 'Producto actualizado';
  }



}

module.exports = ProductManager;