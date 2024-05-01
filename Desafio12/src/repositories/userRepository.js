const UserDao = require('../Dao/userDao')

class UserRepository {
    constructor() {
        this.User = new UserDao()
    }

    async createdUser( newUserDTO ) {
        try {
            return await this.User.createdUser( newUserDTO )
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    async getUsers() {
        try {
            return await this.User.getOneUser()
        } catch (error) {
            console.error(' Error get Users', error)
        }
    }

    async getOneUser( filter ) {
        try {
            return await this.User.getOneUser( filter )
        } catch (error) {
            console.error(' Error get one User', error)  
        }
    }

}
module.exports = UserRepository