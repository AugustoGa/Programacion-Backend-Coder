const { v4: uuidv4 } = require('uuid')

class newTiketDTO {
    constructor( total , user ) {
        this.code = uuidv4()
        this.amount = total
        this.purchase_datetime = user.purchase_datetime
        this.purchaser = user.purchaser
    }
}
module.exports = newTiketDTO