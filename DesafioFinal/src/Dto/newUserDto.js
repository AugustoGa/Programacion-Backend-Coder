const { createHas } = require("../utils/cryp-password.util")


class newUserDTO {
    constructor( newUser , password) {
        this.first_name = newUser.first_name
        this.last_name = newUser.last_name
        this.email = newUser.email
        this.age = newUser.age
        this.password = createHas(password)
        this.role = newUser.role
        this.status = true
    }
}
module.exports = newUserDTO