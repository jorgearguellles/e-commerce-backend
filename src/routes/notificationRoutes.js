const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - user
 *         - type
 *         - title
 *         - message
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de la notificación
 *         user:
 *           type: string
 *           description: ID del usuario destinatario
 *         type:
 *           type: string
 *           enum: [order_status, payment, shipping, system]
 *           description: Tipo de notificación
 *         title:
 *           type: string
 *           description: Título de la notificación
 *         message:
 *           type: string
 *           description: Contenido de la notificación
 *         read:
 *           type: boolean
 *           description: Estado de lectura
 *         data:
 *           type: object
 *           description: Datos adicionales relacionados con la notificación
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Obtener todas las notificaciones del usuario
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de notificaciones por página
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notifications:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notification'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *       401:
 *         description: No autorizado
 */
router.get(
  "/",
  authMiddleware.authenticate,
  notificationController.getNotifications
);

/**
 * @swagger
 * /notifications/unread:
 *   get:
 *     summary: Obtener notificaciones no leídas
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notificaciones no leídas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       401:
 *         description: No autorizado
 */
router.get(
  "/unread",
  authMiddleware.authenticate,
  notificationController.getUnreadNotifications
);

/**
 * @swagger
 * /notifications/{id}/read:
 *   put:
 *     summary: Marcar una notificación como leída
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación marcada como leída
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Notificación no encontrada
 */
router.put(
  "/:id/read",
  authMiddleware.authenticate,
  notificationController.markAsRead
);

/**
 * @swagger
 * /notifications/read-all:
 *   put:
 *     summary: Marcar todas las notificaciones como leídas
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todas las notificaciones marcadas como leídas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Todas las notificaciones han sido marcadas como leídas
 *       401:
 *         description: No autorizado
 */
router.put(
  "/read-all",
  authMiddleware.authenticate,
  notificationController.markAllAsRead
);

module.exports = router;
