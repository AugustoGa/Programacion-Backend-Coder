const { createHash } = require('../utils/cryp-password.util')

class newUserDTO {
    constructor( newUser , password) {
        this.first_name = newUser.first_name
        this.last_name = newUser.last_name
        this.email = newUser.email
        this.age = newUser.age
        this.password = createHash (password)
    }
}
module.exports = newUserDTO