
const CartManager = require("../service/service.carts");
const ProductManager = require('../service/service.products')

const productManager = new ProductManager('./src/model/productos.json');

const cartManager = new CartManager('./src/model/carts.json');


const addCarts= async (req, res)=>{
  try{
  const cartsOld = await cartManager.loadCarts();
  const newCart = {
    id: cartManager.generateUniqueId(),
    products: []
  }
  const cartsConcat = [newCart, ...cartsOld];
  await cartManager.saveToFile(cartsConcat)
  console.log('Product added to Cart', newCart);
  res.status(201).json(newCart); // Devuelve el nuevo carrito en la respuesta
  } catch (error) {
  console.error('Error adding cart', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
};

const getItemsCarts = async (req, res)=>{
  try{
      await cartManager.loadCarts();
      const limit = req.query.limit;
      const cart = limit 
      ? cartManager.getProductsCart().splice(0, limit)
       : cartManager.getProductsCart();
      res.status(200).json(cart);
  }catch(error){
      res.status(500).json({error: ' Internal Server Error'});
  }
};

const getItemCart = async(req, res)=>{
  try{
      await cartManager.loadCarts();

      const cartId = parseInt(req.params.id);
      const cart = cartManager.getProductsCartById(cartId);

      if(cart){
          res.json(cart);
      }else{
          res.status(404).json({error: 'Product not found'});
      }
  }catch(error){
      res.status(500).json({error: ' Internal Server Error'});
  }
};

const addProductToCart = async (req, res) => {
  try {
    await cartManager.loadCarts();
    await productManager.loadProducts();

    const cartId = req.params.id;
    const productId = req.params.productid;
    const quantity = req.body.quantity || 1;

    // Verificar si el carrito existe antes de agregar el producto
    const cartExists = await cartManager.exist(cartId);
    if (!cartExists) {
      throw new Error('Cart not found');
    }

    const addedProduct = await cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ addedProduct });
  } catch (error) {
    console.error('Error adding product to cart', error);
    res.status(400).json({ error: error.message });
  }
};










  








module.exports = { getItemCart , getItemsCarts  , addProductToCart , addCarts};