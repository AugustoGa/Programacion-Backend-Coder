const User = require('../models/users.model');
const CartDao = require('./cartDao')

const Cart = new CartDao()


class UserDao{
    async createdUser( newUserDTO ) {
        try {
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

    async updateUserCart( userId, cartId ) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, { $set: { carts: cartId } }, { new: true });
            console.log('User updated:', updatedUser);
            return updatedUser;
        } catch (error) {
            console.error(' Error updateUserCart', error)  
            throw new Error('Failed to update user cart');
        }
    }
}

module.exports = UserDao