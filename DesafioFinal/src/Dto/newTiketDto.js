const { v4: uuidv4 } = require('uuid')

class newTiketDTO {
    constructor( total , user ) {
        this.code = uuidv4()
        this.amount = total
        this.purchaser = user.email
    }
}
module.exports = newTiketDTO