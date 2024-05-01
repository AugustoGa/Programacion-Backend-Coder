const CartsDao = require('../DAO/cartsDao')


const cartsDao = new CartsDao();



const inserOne = async () =>{
    try {
        const newCart = await cartsDao.cartAdd()
        return newCart
    } catch (error) {
        throw new Error('Error al cargar carrito')
    }
}

const getAll = async () =>{
    try {
        const cart = await cartsDao.getCarts()
        return cart
    } catch (error) {
        throw new Error('Error al buscar el carrito')
    }
}

const getOne = async (id) =>{
    try {
        const cart = await cartsDao.getCartById(id)
        return cart
    } catch (error) {
        throw new Error('Error al buscar por id ')
    }
}

const Add = async (id , updateData) =>{
    try {
        const cart = await cartsDao.addProductInCart({ _id: id }, updateData)
        return cart
    } catch (error) {
        throw new Error('error Add Cart ')
    }
}

const deleteCart = async (id) =>{
    try {
        const cart = await cartsDao.cartDelete({ _id : id })
        console.log(cart ,'Cart Delete ')
        return cart
    } catch (error) {
        throw new Error('Error al deleteCart')
    }
}

    //Elimina la cantidad de productos del cart en caso de tener 1 solo producto elimina el carrito
const removeProductFromCart = async ( cid , pid ) =>{
    try {
        const cart = await cartsDao.getCartById( cid );
        const mutableProducts = [...cart.products];
        //Encuentra el indice del producto a eliminar
        const indexToRemove = mutableProducts.findIndex( prod => prod.product.toString().startsWith( pid ));
        console.log('indice del producto a eliminar: ' , indexToRemove );
        if( indexToRemove !== 1 ){
            const productRemove = cart.products[indexToRemove];
            if ( productRemove.quantity > 1 ){
                productRemove.quantity -= 1; //Si la cantidad es mayor que 1 , disminuye la cantidad
            }else {
                cart.products.slice( indexToRemove , 1 );
            }
        }
        await cart.save();
        console.log('Producto removido del carrito con exito');
    } catch (error) {
        throw new Error('Error al removerProductFromCarts')
    }
}

const updateCart = async (id, updateProd) => {
    try {
        const cart = await cartsDao.getCartById(id);

        if (!cart) {
            console.log("El carrito no existe en la base de datos");
            return { success: false, message: "Carrito no encontrado." };
        }

        // Verifica si updateProd está definido antes de iterar
        if (updateProd && Array.isArray(updateProd)) {
            updateProd.forEach(updatePro => {
                const productExist = cart.products.find(prod => prod.prodId === updatePro.productId);

                if (productExist) {
                    // Actualiza la cantidad directamente
                    productExist.quantity = updatePro.quantity;
                } else {
                    // Si el producto no existe, agrégalo al carrito
                    cart.products.push({
                        prodId: updatePro.productId,
                        quantity: updatePro.quantity
                    });
                }
            });
        } else {
            console.log("La información de actualización de productos no está definida o no es un array.");
            return { success: false, message: "Datos de actualización de productos incorrectos." };
        }

        // Guarda el carrito actualizado en la base de datos
        await cart.save();
        console.log("Carrito actualizado con éxito");

        return {
            success: true,
            message: "Carrito actualizado correctamente"
        };
    } catch (error) {
        throw new Error('Error updateCart');
    }
};

const updateProductInCart = async ( id , pid , newQuantity) =>{
    try {
        const cart = await cartsDao.getCartById(id)
        if(!cart) {
            console.log('El carrito no existe en la BD')
            return { success : false, message  : 'Carrito no encontrado'}
        }
        const productIndex = cart.products.findIndex( product = product.id == pid)
        if(productIndex === -1){
            return { success : false, message  : 'Producto no encontrado en el carrito'}
        }
        cart.products[productIndex].quantity = newQuantity
        await cart.save();
        return { success : true, message : 'Carrito actualizado correctamente'}
    } catch (error) {
        throw new Error('Error updateProductInCart')
    }
}


module.exports = { inserOne , getAll , getOne , Add , deleteCart , removeProductFromCart , updateCart , updateProductInCart }