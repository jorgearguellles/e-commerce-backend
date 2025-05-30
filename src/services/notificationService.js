const Notification = require("../models/Notification");
const User = require("../models/User");

// Crear una nueva notificación
const createNotification = async (userId, type, title, message, data = {}) => {
  const notification = await Notification.create({
    user: userId,
    type,
    title,
    message,
    data,
  });

  // TODO: Implementar envío de email y push notification
  // await sendEmail(userId, title, message);
  // await sendPushNotification(userId, title, message);

  return notification;
};

// Obtener todas las notificaciones de un usuario
const getUserNotifications = async (userId) => {
  return await Notification.find({ user: userId }).sort({ createdAt: -1 });
};

// Obtener notificaciones no leídas de un usuario
const getUnreadNotifications = async (userId) => {
  return await Notification.find({ user: userId, read: false }).sort({
    createdAt: -1,
  });
};

// Marcar una notificación como leída
const markAsRead = async (notificationId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { read: true },
    { new: true }
  );
};

// Marcar todas las notificaciones como leídas
const markAllAsRead = async (userId) => {
  return await Notification.updateMany(
    { user: userId, read: false },
    { read: true }
  );
};

module.exports = {
  createNotification,
  getUserNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
};
