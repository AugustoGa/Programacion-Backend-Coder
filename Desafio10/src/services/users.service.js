const UsersModel = require('../models/users.model')
const CartService = require('./carts.service')

const cartService = new CartService()

class UserService{
    async createdUser(newUser) {
        try {
            const newCart = await cartService.cartCreate();
            newUser.carts = newCart._id;
            return await UsersModel.create(newUser);
        } catch (error) {
            console.error('Error created User', error);
            throw new Error('Failed to create user');
        }
    }

    async getUsers (){
        try {
            return await UsersModel.find()
        } catch (error) {
            console.error(' Error get Users', error)
        }
    }

    async getOneUser (filter){
        try {
            return await UsersModel.findOne(filter)
        } catch (error) {
            console.error(' Error get one User', error)  
        }
    }
}

module.exports = UserService