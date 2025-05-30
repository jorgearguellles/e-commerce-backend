const notificationService = require("../services/notificationService");

// Obtener todas las notificaciones del usuario
const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getUserNotifications(
      req.user.id
    );
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener notificaciones no leídas
const getUnreadNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getUnreadNotifications(
      req.user.id
    );
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Marcar una notificación como leída
const markAsRead = async (req, res) => {
  try {
    const notification = await notificationService.markAsRead(
      req.params.id,
      req.user.id
    );
    if (!notification) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }
    res.json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Marcar todas las notificaciones como leídas
const markAllAsRead = async (req, res) => {
  try {
    const result = await notificationService.markAllAsRead(req.user.id);
    res.json({
      message: "Todas las notificaciones han sido marcadas como leídas",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
};
