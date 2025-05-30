# E-commerce API

API REST para un sistema de e-commerce desarrollado con Node.js y Express, implementando arquitectura limpia y patrones de diseño modernos.

[![GitHub](https://img.shields.io/github/license/jorgearguellles/e-commerce-backend)](https://github.com/jorgearguellles/e-commerce-backend/blob/main/LICENSE)
[![GitHub](https://img.shields.io/github/stars/jorgearguellles/e-commerce-backend)](https://github.com/jorgearguellles/e-commerce-backend/stargazers)
[![GitHub](https://img.shields.io/github/forks/jorgearguellles/e-commerce-backend)](https://github.com/jorgearguellles/e-commerce-backend/network/members)

## 🚀 Características

- Gestión de productos con CRUD
- Sistema de usuarios y autenticación JWT
- Carrito de compras
- Sistema de órdenes
- Documentación de API con Swagger
- Validación de datos y manejo de errores
- Roles y permisos de usuario

## 🛠 Tecnologías

- **Backend Framework**: Node.js con Express
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Documentación**: Swagger/OpenAPI
- **Validación**: Express Validator
- **Seguridad**: Helmet, CORS
- **Logging**: Morgan

## 🏗 Arquitectura

El proyecto sigue una arquitectura en capas con los siguientes componentes:

```
src/
├── config/         # Configuraciones (DB, Swagger, etc.)
├── controllers/    # Controladores (Manejo de requests/responses)
├── models/         # Modelos de datos (Mongoose schemas)
├── routes/         # Rutas de la API
├── services/       # Lógica de negocio
└── middlewares/    # Middlewares personalizados
```

### Patrones de Diseño Implementados

1. **MVC (Model-View-Controller)**

   - Models: Schemas de Mongoose
   - Controllers: Manejo de requests
   - Views: JSON responses

2. **Service Layer Pattern**

   - Lógica de negocio separada
   - Reutilización de código

3. **Middleware Pattern**
   - Autenticación
   - Validación
   - Manejo de errores

## 🔒 Seguridad

- Autenticación JWT
- Encriptación de contraseñas con bcrypt
- Protección contra ataques comunes (Helmet)
- Validación de datos de entrada
- Manejo seguro de errores

## 📊 Base de Datos

### Modelos Principales

1. **User**

   - Autenticación y autorización
   - Roles y permisos
   - Perfil de usuario

2. **Product**

   - Catálogo de productos
   - Inventario
   - Categorías

3. **Order**

   - Gestión de órdenes
   - Estados de orden
   - Historial de compras

4. **Cart**
   - Carrito de compras
   - Items y cantidades
   - Cálculo de totales

## 🚀 Instalación

1. Clonar el repositorio

```bash
git clone git@github.com:jorgearguellles/e-commerce-backend.git
cd e-commerce-backend
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno
   Crear un archivo `.env` en la raíz del proyecto:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-key-change-in-production
NODE_ENV=development
```

4. Iniciar el servidor

```bash
npm run dev
```

## 📚 Guía de Uso de la API

### Documentación de la API

La documentación completa de la API está disponible en Swagger UI:

```
http://localhost:3000/api-docs
```

### Autenticación y Acceso a Endpoints Protegidos

1. **Registro de Usuario**

   - Endpoint: `POST /api/auth/register`
   - Body:
     ```json
     {
       "name": "Usuario Ejemplo",
       "email": "usuario@ejemplo.com",
       "password": "contraseña123"
     }
     ```

2. **Inicio de Sesión**

   - Endpoint: `POST /api/auth/login`
   - Body:
     ```json
     {
       "email": "usuario@ejemplo.com",
       "password": "contraseña123"
     }
     ```
   - Respuesta: Token JWT
     ```json
     {
       "token": "eyJhbGciOiJIUzI1NiIs...",
       "user": {
         "id": "...",
         "name": "Usuario Ejemplo",
         "email": "usuario@ejemplo.com"
       }
     }
     ```

3. **Acceso a Endpoints Protegidos**
   - En Swagger UI:
     1. Haz clic en "Authorize"
     2. Ingresa el token: `Bearer tu-token-jwt`
     3. Haz clic en "Authorize"
   - En Postman/HTTP:
     - Header: `Authorization: Bearer tu-token-jwt`

## 📦 Despliegue

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👨‍💻 Desarrollador

- **Jorge Arias Argüelles**
  - [LinkedIn](https://www.linkedin.com/in/jorgeariasarguelles/)
  - [GitHub](https://github.com/jorgearguellles)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Swagger](https://swagger.io/)
