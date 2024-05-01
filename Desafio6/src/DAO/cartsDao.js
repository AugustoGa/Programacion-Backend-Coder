const CartsModel = require("../models/carts.model");
const ProductsDao = require("./productDao");
const mongoose = require("mongoose");

// Añadir la instancia de ProductsDao
const productsDao = new ProductsDao();

class CartsDao {
  async cartAdd() {
    try {
      const newCart = {
        products: [],
      };
      await CartsModel.create(newCart);
    } catch (error) {
      console.error("Error al crear el carro", error);
    }
  }

  async getCartById(id) {
    try {
      // Cambiar Carts por CartsModel
      return await CartsModel.findById(id);
    } catch (error) {
      console.error("Error al obtener el id del carrito", error);
    }
  }

  async addProductInCart(cid, pid) {
    try {
      // Verificar si el carrito existe
      const cart = await CartsModel.findById(cid);

      if (cart) {
        // Verificar si el producto existe en la lista de productos generales
        const product = await productsDao.getProductById(pid);

        if (product) {
          // Verificar si el producto ya está en el carrito
          const productIndex = cart.products.findIndex(
            (prod) => prod.product.toString() === pid.toString()
          );

          if (productIndex !== -1) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            cart.products[productIndex].quantity++;
          } else {
            // Si el producto no está en el carrito, agregarlo
            cart.products.push({
              product: new mongoose.Types.ObjectId(pid),
              quantity: 1,
            });
          }

          // Guardar el carrito actualizado en la base de datos
          await cart.save();
          console.log("Producto agregado al carrito con éxito");

          return {
            success: true,
            message: "Producto agregado correctamente al carrito",
          };
        } else {
          console.log("El producto no existe en la base de datos");
          return {
            success: false,
            message: "El producto no existe en la lista general de productos.",
          };
        }
      } else {
        console.log("El carrito no existe en la base de datos");
        return { success: false, message: "Carrito no encontrado." };
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      return { success: false, message: "Error interno del servidor" };
    }
  }
}

module.exports = CartsDao;
