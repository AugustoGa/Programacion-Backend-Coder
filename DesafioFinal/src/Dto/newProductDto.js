class newProductDTO {
    constructor( newProduct ) {
        this.title = newProduct.title
        this.description = newProduct.description
        this.thumbnail = newProduct.thumbnail
        this.code = newProduct.code
        this.price = newProduct.price
        this.stock = newProduct.stock
        this.status = newProduct.status
        this.category = newProduct.category
        this.owner = newProduct.owner
    }
}
module.exports = newProductDTO