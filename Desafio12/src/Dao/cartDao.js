const Cart = require('../models/carts.model')
const ProductDao = require('./productsDao')
const Tiket = require('../models/tiket.model')

const Product = new ProductDao()

class CartDao{
    async cartCreated() {
        try {
            const newCart = await Cart.create({ products: [] })
            return newCart
        } catch (error) {
            console.error('Error cartAdd',error);
        }
    }


    async tiketCreated ( tiket ) {
        try {
            const newTiket = await Tiket.create( tiket )
            return newTiket 
        } catch (error) {
            console.error('Error Tiket Created',error);
        }
    }


    async getCarts (){
        try {
            return await Cart.find()
        } catch (error) {
            console.error('Error getCarts',error);
        }
    }

    async getCartById ( id ){
        try {
            return await Cart.findById( id )
        } catch (error) {
            console.error('Error getCartById',error);
        }
    }

    async addProductInCart ( cid , pid ){
        try {
            const cart = await Cart.findById( cid )
            if ( cart ){
                const product = await Product.getProductById( pid )
                if ( product ){
                    const productIndex = cart.products.findIndex(
                        (prod) => prod.product.toString() === pid.toString())
                }
                if ( productIndex !== 1 ){
                    cart.products[productIndex].quantity++;
                }else {
                    cart.products.push({
                        product : new mongoose.Types.ObjectId( pid ),
                        quantity : 1,
                    })
                }
                await cart.save()
                console.log('Product add in cart')
            }else {
                console.log('Product no exist ')
            }
        } catch (error) {
            console.error('Error add product in cart ', error)
        }
    }

    async cartDelete ( id ){
        try {
            return await Cart.deleteOne( id )
        } catch (error) {
            console.error('Error cartDelete', error)
        }
    }

    async updateCart ( id , updateProd) {
        try {
            const cart = await this.getCartById(id)
            if ( !cart ) {
                console.log('Cart not exist db')
            }
            if ( updateProd && Array.isArray(updateProd)) {
                updateProd.forEach(updatePro => {
                    const productExist = cart.products.find(prod => prod.prodId === updatePro.productId)
                    if ( productExist ) {
                        productExist.quantity = updatePro.quantity
                    } else {
                        cart.products.push({
                            prodId : updatePro.productId,
                            quantity: updatePro.quantity
                        })
                    }
                })
            } else {
                console.log('Error inf product')
            }
            await cart.save()
            console.log('Cart Update')

        } catch (error) {
            console.error('Error updateCart', error)
        }
    }

    async updateProductInCart ( id , pid , newQuantity ) {
        try {
            const cart = await this.getCartById(id)
            if ( !cart ) {
                console.log('Cart not exist')
            }
            const productIndex = cart.products.findIndex( product = product.id == pid)
            if ( productIndex === -1 ) {
                console.log('Product not found in cart')
            }
            cart.products.save()
            console.log('Cart update exist')
        } catch (error) {
            console.error('Error updateProductInCart', error)
        }
    }

    async removeProductFromCart ( cid , pid ) {
        try {
            const cart = await this.getCartById( cid )
            const mutableProducts = [...cart.products]
            const indexToRemove = mutableProducts.findIndex( prod => prod.product.toString().startsWith( pid ))
            console.log('index of the product to eliminate' , indexToRemove)
            if ( indexToRemove !== 1 ) {
                const productRemove = cart.products[indexToRemove]
                if ( productRemove.quantity > 1) {
                    productRemove.quantity -=1
                }else {
                    cart.products.slice ( indexToRemove , 1)
                }
            }
            await cart.save()
            console.log('Product removed from cart successfully')
        } catch (error) {
            console.error('Error removeProductFromCart', error)
        }
    }

}

module.exports = CartDao