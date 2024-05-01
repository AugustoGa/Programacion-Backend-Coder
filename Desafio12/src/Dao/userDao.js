const User = require('../models/users.model');
const CartDao = require('./cartDao')

const Cart = new CartDao()


class UserDao{
    async createdUser( newUserDTO ) {
        try {
            const newCart = await Cart.cartCreated();
            newUser.cart = newCart._id
            return await User.create( newUserDTO )
        } catch (error) {
            console.error('Error created User', error)
            throw new Error('Failed to create user');
        }
    }

    async getUsers() {
        try {
            return await User.find()
        } catch (error) {
            console.error(' Error get Users', error)
        }
    }

    async getOneUser( filter ) {
        try {
            return await User.findOne( filter )
        } catch (error) {
            console.error(' Error get one User', error)  
        }
    }
}

module.exports = UserDao