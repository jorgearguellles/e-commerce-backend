const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
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
 *           description: Precio unitario del producto
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del carrito
 *         user:
 *           type: string
 *           description: ID del usuario propietario del carrito
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Obtener el carrito del usuario
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: No autorizado
 */
router.get("/", authenticate, cartController.getCart);

/**
 * @swagger
 * /cart/items:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto a agregar
 *               quantity:
 *                 type: number
 *                 description: Cantidad del producto
 *     responses:
 *       200:
 *         description: Producto agregado al carrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
router.post("/items", authenticate, cartController.addToCart);

/**
 * @swagger
 * /cart/items/{itemId}:
 *   put:
 *     summary: Actualizar cantidad de un producto en el carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del item en el carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: Nueva cantidad del producto
 *     responses:
 *       200:
 *         description: Cantidad actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Item no encontrado en el carrito
 */
router.put("/items/:itemId", authenticate, cartController.updateCartItem);

/**
 * @swagger
 * /cart/items/{itemId}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del item en el carrito
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Item no encontrado en el carrito
 */
router.delete("/items/:itemId", authenticate, cartController.removeFromCart);

// Vaciar el carrito
router.delete("/", cartController.clearCart);

// Obtener el total del carrito
router.get("/total", cartController.getCartTotal);

module.exports = router;
