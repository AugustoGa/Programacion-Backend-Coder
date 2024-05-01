const { Router } = require('express')
const HTTP_RESPONSES = require('../contants/http-responses')
const passport = require('passport')
const users = require('../services/users.service')
const authMiddleware = require('../middlewares/private-middleware')

const UserRotuer = Router()

UserRotuer.post('/', passport.authenticate('register', { session: false, failureRedirect : '/api/users/fail-Register'}),  
    async ( req , res ) => {
        try {
            res.status(HTTP_RESPONSES.CREATED).json({ message: 'Usuario registrado exitosamente' , payload: users});
        } catch (error) {
            console.error('Error post UserRouter', error.message)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
        }
    })

    UserRotuer.post('/', async (req, res) => {
        try {
            // Crear el usuario con los datos recibidos
            const newUser = await userService.createUser(req.body);
    
            // Crear un carrito vacío
            const newCart = await cartService.createCart({ products: [] });
    
            // Actualizar la referencia del usuario al carrito recién creado
            await userService.updateUserCart(newUser._id, newCart._id);
    
            res.status(HTTP_RESPONSES.CREATED).json({ message: 'Usuario registrado exitosamente', payload: newUser });
        } catch (error) {
            console.error('Error al crear usuario:', error.message);
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: 'Error al crear usuario' });
        }
    });

    UserRotuer.get('/fail-Register', (req, res) => {
        try {
            console.log('fail register')
            res.status(HTTP_RESPONSES.BAD_REQUEST).json({ message: 'Registration failed' });
        } catch (error) {
            console.log(error)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    });
    

    UserRotuer.put('/', passport.authenticate(authMiddleware, { session: false, failureRedirect : '/api/users/fail-Register'}),  
    async ( req , res ) => {
        try {
            res.status(HTTP_RESPONSES.CREATED).json({ message: 'Usuario registrado exitosamente' , payload: users});
        } catch (error) {
            console.error('Error post UserRouter', error.message)
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR)
        }
    })

module.exports = UserRotuer