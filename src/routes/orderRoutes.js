const express = require("express");
const router = express.Router();
const { authenticate, isAdmin } = require("../middlewares/authMiddleware");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - product
 *         - quantity
 *         - price
 *       properties:
 *         product:
 *           type: string
 *           description: ID del producto
 *         quantity:
 *           type: number
 *           description: Cantidad del producto
 *         price:
 *           type: number
 *           description: Precio unitario al momento de la compra
 *     ShippingAddress:
 *       type: object
 *       required:
 *         - street
 *         - city
 *         - state
 *         - zipCode
 *         - country
 *       properties:
 *         street:
 *           type: string
 *           description: Calle y número
 *         city:
 *           type: string
 *           description: Ciudad
 *         state:
 *           type: string
 *           description: Estado/Provincia
 *         zipCode:
 *           type: string
 *           description: Código postal
 *         country:
 *           type: string
 *           description: País
 *     Order:
 *       type: object
 *       required:
 *         - user
 *         - items
 *         - shippingAddress
 *         - total
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de la orden
 *         user:
 *           type: string
 *           description: ID del usuario que realizó la orden
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         shippingAddress:
 *           $ref: '#/components/schemas/ShippingAddress'
 *         status:
 *           type: string
 *           enum: [pending, paid, shipped, delivered, cancelled]
 *           description: Estado actual de la orden
 *         total:
 *           type: number
 *           description: Total de la orden
 *         paymentMethod:
 *           type: string
 *           description: Método de pago utilizado
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *             properties:
 *               shippingAddress:
 *                 $ref: '#/components/schemas/ShippingAddress'
 *               paymentMethod:
 *                 type: string
 *                 description: Método de pago
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Datos inválidos o carrito vacío
 *       401:
 *         description: No autorizado
 */
router.post("/", authenticate, createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener todas las órdenes del usuario
 *     tags: [Orders]
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
 *         description: Cantidad de órdenes por página
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, paid, shipped, delivered, cancelled]
 *         description: Filtrar por estado
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *       401:
 *         description: No autorizado
 */
router.get("/", authenticate, getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtener una orden específica
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Detalles de la orden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Orden no encontrada
 */
router.get("/:id", authenticate, getOrderById);

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Actualizar el estado de una orden
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, shipped, delivered, cancelled]
 *                 description: Nuevo estado de la orden
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Estado inválido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos para actualizar el estado
 *       404:
 *         description: Orden no encontrada
 */
router.put("/:id/status", authenticate, isAdmin, updateOrderStatus);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Cancelar una orden
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden cancelada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Orden no encontrada
 */
router.delete("/:id", authenticate, cancelOrder);

module.exports = router;
