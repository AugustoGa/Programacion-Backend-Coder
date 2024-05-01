const CartDao = require('../Dao/cartDao')

class CartRepository {
    constructor() {
        this.Cart = new CartDao()
    }

    async cartCreated() {
        try {
            return await this.Cart.cartCreated({ products: [] })
        } catch (error) {
            console.error('Error cartAdd',error);
        }
    }

    async tiketCreated ( tiket ) {
        try {
            return await this.Cart.tiketCreated( tiket )
        } catch (error) {
            console.error('Error Tiket Created',error);
        }
    }

    async getCarts (){
        try {
            return await this.Cart.getCarts()
        } catch (error) {
            console.error('Error getCarts',error);
        }
    }

    async getCartById ( id ){
        try {
            return await this.Cart.getCartById( id )
        } catch (error) {
            console.error('Error getCartById',error);
        }
    }

    async cartDelete(id) {
        try {
            return await this.Cart.cartDelete(id);
        } catch (error) {
            console.error('Error cartDelete', error);
            throw error;
        }
    }
    
    async updateCart(id, updateProd) {
        try {
            return await this.Cart.updateCart(id, updateProd);
        } catch (error) {
            console.error('Error updateCart', error);
            throw error;
        }
    }
    
    async updateProductInCart(id, pid, newQuantity) {
        try {
            return await this.Cart.updateProductInCart(id, pid, newQuantity);
        } catch (error) {
            console.error('Error updateProductInCart', error);
            throw error;
        }
    }
    
    async removeProductFromCart(cid, pid) {
        try {
            return await this.Cart.removeProductFromCart(cid, pid);
        } catch (error) {
            console.error('Error removeProductFromCart', error);
            throw error;
        }
    }

}
module.exports = CartRepository