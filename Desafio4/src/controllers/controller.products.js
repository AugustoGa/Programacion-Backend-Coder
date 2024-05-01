const { response } = require("express");
const ProductManager = require('../service/service.products');



const productManager = new ProductManager('./src/model/productos.json');


const getItems = async (req, res)=>{
    try{
        await productManager.loadProducts();
        const limit = req.query.limit;
        const products = limit 
        ? productManager.getProducts().splice(0, limit)
         : productManager.getProducts();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({error: ' Internal Server Error'});
    }

};

const getItem = async(req, res)=>{
    try{
        await productManager.loadProducts();

        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);

        if(product){
            res.json(product);
        }else{
            res.status(404).json({error: 'Product not found'});
        }
    }catch(error){
        res.status(500).json({error: ' Internal Server Error'});
    }
};
const postItem = async (req, res) => {
  try {
    await productManager.loadProducts();

    const { 
      title, 
      description, 
      price, 
      thumbnail, 
      code, 
      stock, 
      status ,
      category} = req.body;
    
    console.log(req.body);


    // Crear un objeto para el nuevo producto
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      category,
      status,
      stock,
    };

    // Agregar el nuevo producto al manager
    productManager.addProduct(newProduct);


    res.json({ payload: newProduct });
    res.status(201).json(`Created new Product  ${newProduct}`);
  } catch (error) {
    console.error(error); // Agrega una impresión de error para ayudar a identificar la causa del error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProduct = async (req, res) => {
  try{
    await productManager.loadProducts();
    const {id} = req.params;
    const productUpdate = await productManager.updateProduct(id, req.body);
    res.status(200).json({ message: `Successfully modified product ${productUpdate}` });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: " Internal Server Error "});
  }
};

const deleteItem = async (req, res) => {
  try{
    await productManager.loadProducts();
    const { id } = req.params;
    const productDeleted = await productManager.deleteProduct(id);
    console.log("Producto despues de la eliminacion" , productManager.getProducts());
    if(productDeleted){
      res.status(204).end(); // Send a 204 (No Content) response only if a product was deleted
    }else{
      res.status(404).json({ error: "Product not found"});
    }
  }catch(error){
    console.error(error);
    res.status(500).json({ error: " Internal Server Error "});
  }
};
// codigo viejo:
// const deleteItem = async(req, res)=>{
//   try{
//     await productManager.loadProducts();
//     const { id } = req.params;
//     const DeleteProd = await productManager.deleteProduct(id);
//     console.log('Productos después de la eliminación:', productManager.getProducts());
//     res.status(204).end();
//     res.send(DeleteProd);
//  console.log('Productos después de la eliminación:', productManager.getProducts());
//   }catch(error){
//     console.error(error)
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


module.exports = { getItem , getItems ,  postItem , deleteItem , updateProduct };


