const passport = require('passport');
const jwt = require('passport-jwt');
const LocalStrategy = require('passport-local');
const GithubStrategy = require('passport-github2');
const { ghClientId, ghClientSecret } = require('./db.config');
const { createHash, useValidPassword } = require('../utils/cryp-password.util');
const { userId, created } = require('../services/user.service');
const newUserDTO = require('../Dto/newUserDto');



const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        usernameField: 'email', 
        passReqToCallback: true 
    }, async (req, username, password, done) => {
        try {
            const existingUser = await userId({ email : username });
            if (existingUser) {
                return done(null, false, { message: 'El correo electrónico ya está en uso' });
            }
            const newUserInf = await newUserDTO(req.body, password)
            const newUser = created(newUserInf)
            return done ( null , false )
        } catch (error) {
            return done(error); 
        }
    }));

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, 
        async (username, password, done) => {
            try {
                console.log('Intento de inicio de sesión con correo electrónico:', username);
                console.log('Contraseña proporcionada:', password);
                const user = await userId({ email: username });
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
            const user = await userId({ email: email });
            if (!user) {
                const newUserInfo = {
                    first_name: name,
                    email: email,
                    githubId: id,
                    githubUsername: login,
                };
                const newUser = await created(newUserInfo);
                return done(null, newUser);
            }
            return done(null, user);
        } catch (error) {
            console.log(error);
        }
    }));

        passport.use('logout', new LocalStrategy({
            passReqToCallback: true 
        }, async (req, done) => {
            try {
                req.logout(); 
                return done(null, true); 
            } catch (error) {
                return done(error); 
            }
        }));
};

module.exports = initializePassport;