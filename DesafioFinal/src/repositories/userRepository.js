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

    async updateUserCart( userId, cartId ) {
        try {
            const updatedUser = await this.User.updateUserCart(userId, cartId);
            console.log('User cart updated:', updatedUser);
            return updatedUser;
        } catch (error) {
            console.error(' Error updateUserCart', error)  
            throw new Error('Failed to update user cart');
        }
    }

    async findByIdDocuments (id){
        try {
            return await this.User.findByIdDocuments(id).populate('documents')
        } catch (error) {
            throw new Error('Error al obtener el usuario de la base de datos')
        }
    }

    async findByEmail(email) {
        try {
            const userByEmail = await this.User.findByEmail({ email })
            return userByEmail
        } catch (error) {
            throw new Error('Error buscar el usuario por email')
        }  
    }

    async updatePassword(email, newPassword) {
        try {
            const result = await this.User.updatePassword({ email }, { password: newPassword })
            return result
        } catch (error) {
            throw new Error('Error cambiar password')
        }  
    }

    async toggleUserRole(id) {
        try {
            const user = await this.toggleUserRole(id)
            if (!user) {
                throw new Error('Usuario no encontrado')
            }

            user.role = user.role === 'user' ? 'premium' : 'user'
            await user.save()
    
            return user
        } catch (error) {
            console.error (error)       
         }
    }

    async lastConnection(uid) {
        try {
            const user = await this.User.lastConnection(uid)
            if (!user) {
                throw new Error('Usuario no encontrado')
            }
            const now = new Date()
            now.setUTCHours(now.getUTCHours() - 3)
            user.last_connection = now
            await user.save()
            return user
        } catch (error) {
            console.error (error)       
         }
    }

    async uploadImage(uid, file) {
        try {
             const documentData = {
                name: file.filename, 
                reference: file.path 
            }
            const user = await this.User.uploadImage(uid, {
                $push: { documents: documentData }
            }, { new: true })
            return user
        } catch (error) {
            console.error (error)       
         }
    }

    async uploadImages(uid, files) {
        try {
            const documentDataArray = files.map(file => ({
                name: file.filename,
                reference: file.path
            }))
    
            const user = await this.User.uploadImages(uid, {
                $push: { documents: { $each: documentDataArray } }
            }, { new: true })
    
            return user
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async deleteUsers(users) {
        try {
            const usersDelete = []    
            const now = new Date()
            now.setUTCHours(now.getUTCHours() - 3)
            const nowTimestamp = now.getTime()
            const twoDaysAgo = nowTimestamp - (2 * 24 * 60 * 60 * 1000)
            users.forEach(user => {
                if (user.role !== 'admin' && user.status !==false) { 
                    const lastConnectionTimestamp = user.last_connection.getTime()
                    if (lastConnectionTimestamp < twoDaysAgo) {
                        usersDelete.push(user)
                    }
                }
            })
            if (usersDelete.length > 0) {
                for (const userDelete of usersDelete) {
                    const uid = userDelete._id
                    const foundUser = await this.User.getOneUser(uid)
                    if (foundUser) {   
                        foundUser.status = false     
                        await foundUser.save()
                        console.log(`Usuario ${foundUser.email} borrado correctamente`)
                        transport.sendMail({
                            from: userEmail,
                            to: foundUser.email,
                            subject: 'Usuario deshabilitado por inactividad',
                            html: `
                                <h1>Hola ${foundUser.first_name}</h1>
                                <p style="margin-bottom: 20px;">Se ha desactivado tu usuario por inactividad.</p>
                            `,
                        })
                    }
                }
                return { status: 'success'}
            } else {
                return { status: 'error'}
            }
        } catch (error) {
            console.error('Error al eliminar los usuarios:', error)
            return { status: 'error', message: error.message }
        }
    }

    async deleteUser(uid) {
        try {
            const foundUser = await this.User.getOneUser(uid)
            if (foundUser.role !== 'admin' && foundUser.status !==false) {   
                foundUser.status = false     
                await foundUser.save()
                console.log(`Usuario ${foundUser.email} borrado correctamente`)
                transport.sendMail({
                    from: userEmail,
                    to: foundUser.email,
                    subject: 'Usuario deshabilitado',
                    html: `
                        <h1>Hola ${foundUser.first_name}</h1>
                        <p style="margin-bottom: 20px;">Tu usuario fue eliminado por el administrador.</p>
                    `,
                })
                return { status: 'success'}
            } else {
                return { status: 'error'}
            }
        } catch (error) {
            console.error (error)       
         }
    }
}
module.exports = UserRepository