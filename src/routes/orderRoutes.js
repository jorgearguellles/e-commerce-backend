const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

// Todas las rutas requieren autenticación
router.use(authMiddleware.authenticate);

// Crear una orden
router.post("/", orderController.createOrder);

// Obtener todas las órdenes del usuario autenticado
router.get("/", orderController.getOrdersByUser);

// Obtener una orden por ID
router.get("/:id", orderController.getOrderById);

// Actualizar el estado de una orden (solo admin)
router.put("/:id/status", orderController.updateOrderStatus);

// Cancelar una orden (usuario o admin)
router.delete("/:id", orderController.cancelOrder);

module.exports = router;
