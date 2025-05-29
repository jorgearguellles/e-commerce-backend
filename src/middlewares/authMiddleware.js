const AuthService = require("../services/authService");

// Middleware para verificar el token de autenticación
const authenticate = async (req, res, next) => {
  try {
    // Obtener el token del header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verificar el token
    const user = await AuthService.verifyToken(token);

    // Agregar el usuario al request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware para verificar el rol de administrador
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin role required." });
  }
};

// Middleware para verificar si el usuario es el propietario del recurso
const isOwner = (req, res, next) => {
  if (
    req.user &&
    (req.user._id.toString() === req.params.userId || req.user.role === "admin")
  ) {
    next();
  } else {
    res
      .status(403)
      .json({
        message: "Access denied. Not authorized to access this resource.",
      });
  }
};

module.exports = {
  authenticate,
  isAdmin,
  isOwner,
};
