const Product = require("../models/Product");

// Crear producto
const createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

// Obtener todos los productos
const getAllProducts = async (query = {}) => {
  return Product.find(query).sort({ createdAt: -1 });
};

// Obtener producto por ID
const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Producto no encontrado");
  return product;
};

// Actualizar producto
const updateProduct = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new Error("Producto no encontrado");
  return product;
};

// Eliminar producto
const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Producto no encontrado");
  return product;
};

// Buscar productos
const searchProducts = async (searchTerm) => {
  const regex = new RegExp(searchTerm, "i");
  return Product.find({
    $or: [{ name: regex }, { description: regex }, { category: regex }],
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
};
