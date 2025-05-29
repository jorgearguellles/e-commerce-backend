const AuthService = require("../services/authService");

// Registrar nuevo usuario
const register = async (req, res) => {
  try {
    const { user, token } = await AuthService.register(req.body);
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);
    res.json({
      message: "Login exitoso",
      user,
      token,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

// Obtener perfil del usuario
const getProfile = async (req, res) => {
  try {
    const user = await AuthService.getProfile(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Actualizar perfil del usuario
const updateProfile = async (req, res) => {
  try {
    const user = await AuthService.updateProfile(req.user._id, req.body);
    res.json({
      message: "Perfil actualizado exitosamente",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
