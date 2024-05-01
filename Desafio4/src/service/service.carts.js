
const fs = require('fs');


class CartManager {
    constructor() {
      this.path = './src/model/carts.json';
    }

    async loadCarts() {
      try {
        console.log('Loading carts from file:', this.path);
        const data = await fs.promises.readFile(this.path , 'utf-8');
        console.log('Data loaded successfully:', data);
        return data ? JSON.parse(data) : [];
      } catch(error) {
        console.error("Error loading Cart", error);
        this.path = [];
      }
    }
    


    async saveToFile(carts){
      try{
        const data = JSON.stringify(carts, null , 2);
        await fs.writeFileSync(this.path, data);
      }catch(error){
        console.error("Error saving file" , error.message);
      }
    }

    generateUniqueId() {
      // Genera un ID único basado en la fecha actual y aleatorio
      return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    async exist (id){
      const carts = await this.loadCarts();

      if (!carts || !Array.isArray(carts)) {
        return null;
    }    
    return carts.find(cart => cart.id === id);
    }


    async getProductsCart() {
      try {
        const carts = await this.loadCarts();
        const allProducts = carts.reduce((products, cart) => products.concat(cart.products || []), []);
        console.log('Lista de productos:', allProducts);
        return allProducts;
      } catch (error) {
        console.error('Error getting products from cart', error);
        throw error;
      }
    }

    async getProductsCartById(id) {
      try {
        const carts = await this.loadCarts();
        const foundProduct = carts.reduce((products, cart) => products.concat(cart.products || []), [])
          .find(product => product.id === id);
        if (foundProduct) {
          console.log(`Product found with ID ${id}:`, foundProduct);
          return foundProduct;
        } else {
          console.error('Product not found');
          return null;
        }
      } catch (error) {
        console.error('Error getting product by ID from cart', error);
        throw error;
      }
    }


    async addProductToCart(cartId, productId, quantity) {
      try {
        const allCarts = await this.loadCarts();
        const cartIndex = allCarts.findIndex(c => c.id === cartId);
  
        if (cartIndex === -1) {
          throw new Error('Cart not found');
        }
  
        const cart = allCarts[cartIndex];
        cart.products = cart.products || [];
        const productIndex = cart.products.findIndex(p => p.id === productId);
  
        if (productIndex !== -1) {
          cart.products[productIndex].quantity += quantity;
        } else {
          cart.products.push({ id: productId, quantity });
        }
  
        await this.saveToFile(allCarts);
        return cart;
      } catch (error) {
        console.error('Error adding product to cart', error);
        throw error;
      }
    }
    
  }

module.exports = CartManager;
