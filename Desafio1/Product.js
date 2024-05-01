class ProductManager {
    constructor() {
      this.products = [];
      this.idCounter = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios");
        return;
      }
  
      // Validar que no se repita el campo "code"
      const foundProduct = this.products.find((product) => product.code === code);
      if (foundProduct) {
        console.error("Ya existe un producto con ese código");
        return;
      }
  
      // Agregar el producto al arreglo
      const newProduct = {
        id: this.idCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
      console.log("Producto agregado:", newProduct);
    }
  
    getProducts() {
      console.log("Lista de productos:", this.products);
      return this.products;
    }
  
    getProductById(id) {
      const foundProduct = this.products.find((product) => product.id === id);
  
      if (foundProduct) {
        console.log(`Producto encontrado con ID ${id}:`, foundProduct);
        return foundProduct;
      } else {
        console.error("Producto no encontrado");
        return null;
      }
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
  productManager.addProduct("Producto 1", "Descripción 1", 19.99, "/img1.jpg", "P1", 50);
  productManager.addProduct("Producto 2", "Descripción 2", 29.99, "/img2.jpg", "P2", 30);
  
  productManager.getProducts();
  
  const productIdToFind = 1;
  productManager.getProductById(productIdToFind);
  
  
  