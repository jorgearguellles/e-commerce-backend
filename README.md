# E-commerce API

API REST para un sistema de e-commerce desarrollado con Node.js y Express.

## Características

- Gestión de productos
- Sistema de usuarios y autenticación
- Carrito de compras
- Sistema de pagos
- Gestión de órdenes

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- JWT para autenticación

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

## API Endpoints

(Se irán documentando a medida que se desarrollen)

## Licencia

MIT
