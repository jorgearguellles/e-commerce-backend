const productService = require("../services/productService");

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Buscar productos
const searchProducts = async (req, res) => {
  try {
    const products = await productService.searchProducts(req.query.q);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
};
