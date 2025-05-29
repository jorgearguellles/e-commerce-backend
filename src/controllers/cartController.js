const CartService = require("../services/cartService");

// Obtener el carrito del usuario
const getCart = async (req, res) => {
  try {
    const cart = await CartService.getCart(req.user._id);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Agregar producto al carrito
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await CartService.addToCart(req.user._id, productId, quantity);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar cantidad de un producto en el carrito
const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await CartService.updateCartItem(
      req.user._id,
      productId,
      quantity
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar producto del carrito
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await CartService.removeFromCart(req.user._id, productId);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Vaciar el carrito
const clearCart = async (req, res) => {
  try {
    const cart = await CartService.clearCart(req.user._id);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener el total del carrito
const getCartTotal = async (req, res) => {
  try {
    const { cart, total } = await CartService.getCartTotal(req.user._id);
    res.json({ cart, total });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartTotal,
};
