const passport = require('passport');
const LocalStrategy = require('passport-local');
const GithubStrategy = require('passport-github2');
const { ghClientId, ghClientSecret } = require('./db.config');
const {  useValidPassword } = require('../utils/cryp-password.util');
const User = require('../services/user.service');
const newUserDTO = require('../Dto/newUserDto');



const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        usernameField: 'email', 
        passReqToCallback: true 
    }, async (req, username, password, done) => {
        try {
            const existingUser = await User.userId({ email : username });
            if (existingUser) {
                return done(null, false, { message: 'El correo electrónico ya está en uso' });
            }
            const newUserInf =  new newUserDTO(req.body, password)
            const newUser = await User.createUser(newUserInf)
            return done ( null , newUser )
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
                const user = await User.userId({ email: username });
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
                console.log('Contraseña correcta');
                const uid = user._id
                await UserService.lastConnection(uid)
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
            const user = await User.userId({ email: email });
            if (!user) {
                const newUserInfo = {
                    first_name: name,
                    email: email,
                    githubId: id,
                    githubUsername: login,
                };
                const newUser = await User.createUser(newUserInfo);
                return done(null, newUser);
            }
            await UserService.lastConnection(user._id)
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

        passport.serializeUser((user, done) => {
            done(null, user._id)
        })
    
        passport.deserializeUser(async (id, done) => {
            try {
                const user = await User.userId(id)
                done(null, user)
            } catch (error) {
                done(error)
            }
        } )
};

module.exports = initializePassport;