const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");

// Todas las rutas requieren autenticación
router.use(authMiddleware.authenticate);

// Obtener todas las notificaciones del usuario
router.get("/", notificationController.getNotifications);

// Obtener notificaciones no leídas
router.get("/unread", notificationController.getUnreadNotifications);

// Marcar una notificación como leída
router.put("/:id/read", notificationController.markAsRead);

// Marcar todas las notificaciones como leídas
router.put("/read-all", notificationController.markAllAsRead);

module.exports = router;
