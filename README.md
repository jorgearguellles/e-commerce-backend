# E-commerce API

API REST para un sistema de e-commerce desarrollado con Node.js y Express.

## Características

- Gestión de productos
- Sistema de usuarios y autenticación
- Carrito de compras
- Sistema de pagos
- Gestión de órdenes
- Sistema de notificaciones

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- JWT para autenticación
- Swagger para documentación

## Instalación

1. Clonar el repositorio

```bash
git clone [url-del-repositorio]
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

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

## Estructura del Proyecto

```
src/
├── config/         # Configuraciones
├── controllers/    # Controladores
├── models/         # Modelos de datos
├── routes/         # Rutas de la API
├── services/       # Lógica de negocio
└── middlewares/    # Middlewares
```

## Guía de Uso de la API

### Documentación de la API

La documentación completa de la API está disponible en Swagger UI cuando el servidor está corriendo:

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
   - Respuesta: Recibirás un token JWT
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

     1. Haz clic en el botón "Authorize" en la parte superior
     2. Ingresa el token JWT en el formato: `Bearer tu-token-jwt`
     3. Haz clic en "Authorize"
     4. Ahora puedes acceder a todos los endpoints protegidos

   - En Postman o cualquier cliente HTTP:
     1. Agrega el header: `Authorization: Bearer tu-token-jwt`

### Endpoints Principales

#### Productos

- `GET /api/products` - Listar productos
- `POST /api/products` - Crear producto (requiere admin)
- `GET /api/products/:id` - Obtener producto
- `PUT /api/products/:id` - Actualizar producto (requiere admin)
- `DELETE /api/products/:id` - Eliminar producto (requiere admin)

#### Carrito

- `GET /api/cart` - Ver carrito
- `POST /api/cart/items` - Agregar producto al carrito
- `PUT /api/cart/items/:id` - Actualizar cantidad
- `DELETE /api/cart/items/:id` - Eliminar producto del carrito

#### Órdenes

- `POST /api/orders` - Crear orden
- `GET /api/orders` - Listar órdenes del usuario
- `GET /api/orders/:id` - Ver detalle de orden
- `PUT /api/orders/:id/status` - Actualizar estado (requiere admin)

#### Notificaciones

- `GET /api/notifications` - Ver notificaciones
- `PUT /api/notifications/:id/read` - Marcar como leída
- `PUT /api/notifications/read-all` - Marcar todas como leídas

### Roles de Usuario

- **Usuario Normal**: Puede ver productos, gestionar su carrito y realizar órdenes
- **Admin**: Acceso completo a todas las funcionalidades, incluyendo gestión de productos y órdenes

## Desarrollo

Para ejecutar en modo desarrollo:

```bash
npm run dev
```

## Producción

Para ejecutar en modo producción:

```bash
npm start
```

## Licencia

MIT
