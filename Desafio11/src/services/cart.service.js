const cartDao = require('../Dao/cartDao')

const Cart = new cartDao

const createCart = async () => {
    try {
        return await Cart.cartCreated()
    } catch (error) {
        throw error
    }
}

const cartId = async ( id ) => {
    try {
        return await Cart.getCartById( id )
    } catch (error) {
        throw error
    }
}

const allCarts = async () => {
    try {
        return await Cart.getCarts()
    } catch (error) {
        throw error
    }
}

const productInCart = async ( cid , pid ) => {
    try {
        return await Cart.addProductInCart( cid , pid )
    } catch (error) {
        throw error
    }
}

const deleted = async ( id ) => {
    try {
        return await Cart.cartDelete( id )
    } catch (error) {
        throw error
    }
}

const cartUpdate = async ( id , updateProd ) => {
    try {
        return await Cart.updateCart( id , updateProd )
    } catch (error) {
        throw error
    }
}

const updatePro = async ( id , pid , newQuantity ) => {
    try {
        return await Cart.updateProductInCart( id , pid , newQuantity )
    } catch (error) {
        throw error 
    }
}

const removed = async ( cid , pid ) => {
    try {
        return await Cart.removeProductFromCart( cid , pid )
    } catch (error) {
        throw error
    }
}

module.exports = {
    createCart, 
    cartId,
    allCarts,
    productInCart,
    deleted,
    cartUpdate,
    updatePro,
    removed
}