const userDao = require('../Dao/userDao')
const { generateToken } = require('../utils/jwt.util')
const { createCart } = require('./cart.service')

const User = new userDao()

const created = async ( newUser ) => {
    try {
        return await User.createdUser( newUser )
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

const newUserCart = async ( userData ) => {
    try {
        const newUser = await created(userData)
        const newCart = await createCart({ products: [] })
        await updateUserCart(newUser._id, newCart._id)
        return newUser
    } catch (error) {
        throw error
    }
}


const loginUser = async ( userData ) =>{
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
}

const updateUserCart = async (userId, cartId) => {
    try {
        const user = await userDao.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.carts = cartId;
        await user.save();
    } catch (error) {
        throw error;
    }
};


module.exports = {
    created,
    allUser,
    userId,
    newUserCart,
    loginUser,
    updateUserCart
}