const passport = require('passport');
const jwt = require('passport-jwt');
const LocalStrategy = require('passport-local');
const GithubStrategy = require('passport-github2');
const { SECRET } = require('../utils/jwt.util');
const extractJwt = require('../utils/extractJwt.util');
const { ghClientId, ghClientSecret } = require('./db.config');
const UserService = require('../services/users.service');
const { createHash, useValidPassword } = require('../utils/cryp-password.util');

const userService = new UserService()

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        usernameField: 'email', // Campo del formulario que contiene el correo electrónico
        passReqToCallback: true 
    }, async (req, username, password, done) => {
        try {
            
            const { first_name, last_name , email ,age } = req.body;
            
            // Verifica si ya existe un usuario con el correo electrónico proporcionado
            const existingUser = await userService.getOneUser({ email : username });
            if (existingUser) {
                return done(null, false, { message: 'El correo electrónico ya está en uso' });
            }
    
            // Crea un nuevo usuario con la información proporcionada
            const newUserInf = {
                first_name,
                last_name,
                email,
                password: createHash(password), // Guarda la contraseña como hash
                age,
            };

            const newUser = await userService.createdUser(newUserInf)
    
            // Retorna el usuario recién creado
            return done(null, newUser);
        } catch (error) {
            return done(error); // Si ocurre un error, pasa el error al middleware de Passport
        }
    }));

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, 
        async (username, password, done) => {
            try {
                console.log('Intento de inicio de sesión con correo electrónico:', username);
                console.log('Contraseña proporcionada:', password);
                const user = await userService.getOneUser({ email: username });
                console.log('Correo electrónico recibido:', username);
                if (!user) {
                    console.log('Usuario no existe');
                    return done(null, false);
                }
    
                const passwordCorrect = useValidPassword(user, password);
                if (!passwordCorrect) {
                    console.log('Contraseña incorrecta');
                    return done(null, false);
                }
    
                // La contraseña es correcta
                console.log('Contraseña correcta');
                return done(null, user);
            } catch (error) {
                console.error('Error en la estrategia de login:', error);
                return done(error);
            }
        }
    ));

    passport.use('github', new GithubStrategy({
        clientID: ghClientId,
        clientSecret: ghClientSecret,
        callbackURL: 'http://localhost:3000/api/auth/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const { id, login, name, email } = profile._json;
            const user = await Users.findOne({ email: email });
            if (!user) {
                const newUserInfo = {
                    first_name: name,
                    email: email,
                    githubId: id,
                    githubUsername: login,
                };
                const newUser = await Users.create(newUserInfo);
                return done(null, newUser);
            }
            return done(null, user);
        } catch (error) {
            console.log(error);
        }
    }));
};

module.exports = initializePassport;