const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Obtener el carrito del usuario
const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate(
    "items.product",
    "name price stock images"
  );

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  return cart;
};

// Agregar producto al carrito
const addToCart = async (userId, productId, quantity = 1) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Producto no encontrado");
  if (product.stock < quantity) throw new Error("Stock insuficiente");

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ product: productId, quantity, price: product.price }],
    });
  } else {
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price = product.price;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }
  }

  await cart.save();
  return getCart(userId);
};

// Actualizar cantidad de un producto en el carrito
const updateCartItem = async (userId, productId, quantity) => {
  if (quantity < 1) throw new Error("La cantidad debe ser mayor a 0");

  const product = await Product.findById(productId);
  if (!product) throw new Error("Producto no encontrado");
  if (product.stock < quantity) throw new Error("Stock insuficiente");

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Carrito no encontrado");

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex === -1) throw new Error("Producto no encontrado en el carrito");

  cart.items[itemIndex].quantity = quantity;
  cart.items[itemIndex].price = product.price;

  await cart.save();
  return getCart(userId);
};

// Eliminar producto del carrito
const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Carrito no encontrado");

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();
  return getCart(userId);
};

// Vaciar el carrito
const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Carrito no encontrado");

  cart.items = [];
  await cart.save();
  return getCart(userId);
};

// Calcular el total del carrito
const getCartTotal = async (userId) => {
  const cart = await getCart(userId);
  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { cart, total };
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartTotal,
};
