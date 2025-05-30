const Order = require("../models/Order");
const Cart = require("../models/Cart");
const notificationService = require("./notificationService");

// Crear una orden a partir del carrito del usuario
defaultCreateOrder = async (
  userId,
  shippingAddress,
  paymentMethod = "none"
) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    throw new Error("El carrito está vacío");
  }
  const items = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const order = await Order.create({
    user: userId,
    items,
    shippingAddress,
    status: "pending",
    total,
    paymentMethod,
  });
  // Vaciar el carrito después de crear la orden
  cart.items = [];
  await cart.save();
  return order;
};

// Obtener todas las órdenes de un usuario
const getOrdersByUser = async (userId) => {
  return await Order.find({ user: userId }).sort({ createdAt: -1 });
};

// Obtener una orden por ID
const getOrderById = async (orderId, userId, isAdmin = false) => {
  const order = await Order.findById(orderId)
    .populate("items.product")
    .populate("user");
  if (!order) throw new Error("Orden no encontrada");
  if (!isAdmin && order.user._id.toString() !== userId.toString()) {
    throw new Error("No autorizado para ver esta orden");
  }
  return order;
};

// Actualizar el estado de una orden
const updateOrderStatus = async (orderId, status) => {
  const validStatuses = [
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
  ];
  if (!validStatuses.includes(status)) {
    throw new Error("Estado no válido");
  }

  const order = await Order.findById(orderId).populate("user");
  if (!order) throw new Error("Orden no encontrada");

  // Validar transiciones de estado
  const currentStatus = order.status;
  if (currentStatus === "cancelled") {
    throw new Error("No se puede actualizar una orden cancelada");
  }
  if (currentStatus === "delivered" && status !== "cancelled") {
    throw new Error("No se puede actualizar una orden entregada");
  }

  order.status = status;
  await order.save();

  // Crear notificación para el usuario
  await notificationService.createNotification(
    order.user._id,
    "order_status",
    "Actualización de Orden",
    `Tu orden #${order._id} ha sido actualizada a: ${status}`,
    { orderId: order._id, status }
  );

  return order;
};

// Cancelar una orden (usuario o admin)
const cancelOrder = async (orderId, userId, isAdmin = false) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Orden no encontrada");
  if (!isAdmin && order.user.toString() !== userId.toString()) {
    throw new Error("No autorizado para cancelar esta orden");
  }
  order.status = "cancelled";
  await order.save();
  return order;
};

module.exports = {
  createOrder: defaultCreateOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};
