const Product = require("../models/Product");

class ProductService {
  // Crear un nuevo producto
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  // Obtener todos los productos
  async getAllProducts(query = {}) {
    try {
      return await Product.find(query).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  // Obtener un producto por ID
  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  }

  // Actualizar un producto
  async updateProduct(id, updateData) {
    try {
      const product = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  // Eliminar un producto
  async deleteProduct(id) {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }

  // Buscar productos
  async searchProducts(searchTerm) {
    try {
      return await Product.find(
        { $text: { $search: searchTerm } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
    } catch (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
