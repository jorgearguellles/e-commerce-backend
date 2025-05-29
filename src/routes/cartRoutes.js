const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate } = require("../middlewares/authMiddleware");

// Todas las rutas requieren autenticación
router.use(authenticate);

// Obtener el carrito
router.get("/", cartController.getCart);

// Agregar producto al carrito
router.post("/items", cartController.addToCart);

// Actualizar cantidad de un producto
router.put("/items/:productId", cartController.updateCartItem);

// Eliminar producto del carrito
router.delete("/items/:productId", cartController.removeFromCart);

// Vaciar el carrito
router.delete("/", cartController.clearCart);

// Obtener el total del carrito
router.get("/total", cartController.getCartTotal);

module.exports = router;
