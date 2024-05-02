const UserRepository = require('../repositories/userRepository')
const { generateToken } = require('../utils/jwt.util')
const Cart = require('./cart.service')
const MessageManager = require('../repositories/repository');

const User = new UserRepository()

const createUser = async ( newUserDTO ) => {
    try {
        const existingUser = await userId({ email: newUserDTO.email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const newUser = await User.createdUser( newUserDTO )
        const newCart = await Cart.createCart({ products: [] })
        const UserCart = await updateUserCart(newUser._id, newCart._id)
        await MessageManager.sendMessage(UserCart)
        return UserCart
    } catch (error) {
        throw error
    }
}

const updateUserCart = async ( uid, cid ) => {
    try {
    return await User.updateUserCart(uid, cid)
    } catch (error) {
        throw error
    }
}

const userId = async ( filter ) => {
    try {
        return await User.getOneUser( filter )
    } catch (error) {
        throw error
    }
}

const allUser = async () => {
    try {
        return await User.getUsers()
    } catch (error) {
        throw error
    }
}


const loginUser = async ( userData ) =>{
    try {
        const { email, password } = userData
        const lowercaseEmail = email.toLowerCase()
        const user = await userId({ email })

        const tokenInf = {
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            email: lowercaseEmail,
            role: user.role
        };
        const token = generateToken(tokenInf)
        return { token }
    } catch (error) {
        throw error
    }
}




module.exports = {
    createUser,
    allUser,
    userId,
    loginUser,
    updateUserCart
}