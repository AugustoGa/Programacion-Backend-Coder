const fs = require('fs').promises;

class CartManager {
  constructor() {
    this.path = './src/models/cart.json';
  }

  readCarts = async () =>{
    const carts = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(carts);
  }

  writeCarts = async(carts)=>{
    await fs.writeFile(this.path, JSON.stringify(carts));
  }

  generateUniqueId() {
    // Genera un ID único basado en la fecha actual y aleatorio
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  addCarts = async()=>{
    const cartsOlds = await this.readCarts();
    product.id = this.generateUniqueId();
    const cartsConcat = [{id : id , products : []}, ...cartsOlds]
    await this.writeCarts(cartsConcat);
    return 'Carrito Agregado';
  }



}
module.exports = CartManager