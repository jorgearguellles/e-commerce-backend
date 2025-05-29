const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");

// Rutas públicas
router.post("/register", authController.register);
router.post("/login", authController.login);

// Rutas protegidas
router.get("/profile", authenticate, authController.getProfile);
router.put("/profile", authenticate, authController.updateProfile);

module.exports = router;
