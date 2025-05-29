const orderService = require("../services/orderService");

// Crear una orden
defaultCreateOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod } = req.body;
    const order = await orderService.createOrder(
      userId,
      shippingAddress,
      paymentMethod
    );
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las órdenes del usuario
defaultGetOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderService.getOrdersByUser(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una orden por ID
defaultGetOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const isAdmin = req.user.role === "admin";
    const order = await orderService.getOrderById(orderId, userId, isAdmin);
    res.json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Actualizar el estado de una orden
defaultUpdateOrderStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const { status } = req.body;
    const isAdmin = req.user.role === "admin";

    // Obtener la orden para verificar el propietario
    const order = await orderService.getOrderById(orderId, userId, isAdmin);

    // Si no es admin, solo permitir ciertos estados
    if (!isAdmin) {
      const allowedStatuses = ["cancelled"];
      if (!allowedStatuses.includes(status)) {
        return res.status(403).json({
          message: "No autorizado para actualizar a este estado",
        });
      }
    }

    const updatedOrder = await orderService.updateOrderStatus(orderId, status);
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cancelar una orden (usuario o admin)
defaultCancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const isAdmin = req.user.role === "admin";
    const order = await orderService.cancelOrder(orderId, userId, isAdmin);
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder: defaultCreateOrder,
  getOrdersByUser: defaultGetOrdersByUser,
  getOrderById: defaultGetOrderById,
  updateOrderStatus: defaultUpdateOrderStatus,
  cancelOrder: defaultCancelOrder,
};
