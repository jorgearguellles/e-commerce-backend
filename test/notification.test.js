const fetch = require("node-fetch");

const API_URL = "http://localhost:3000/api";
let authToken;
let orderId;
let productId;

// Función helper para imprimir resultados
const printResult = (title, data) => {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(data, null, 2));
};

// Login para obtener token
const login = async () => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@example.com",
      password: "password123",
    }),
  });
  const data = await response.json();
  authToken = data.token;
  printResult("Login Exitoso", data);
};

// Crear un producto de prueba
const createProduct = async () => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      name: "Test Product for Notification",
      description: "Test Description",
      price: 99.99,
      stock: 10,
      category: "Test Category",
      images: ["https://example.com/test.jpg"],
    }),
  });
  const data = await response.json();
  productId = data._id;
  printResult("Producto Creado", data);
};

// Agregar producto al carrito
const addToCart = async () => {
  const response = await fetch(`${API_URL}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      productId,
      quantity: 2,
    }),
  });
  const data = await response.json();
  printResult("Producto Agregado al Carrito", data);
};

// Crear una orden para generar notificaciones
const createOrder = async () => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      shippingAddress: {
        street: "Test Street",
        city: "Test City",
        state: "Test State",
        zipCode: "12345",
        country: "Test Country",
      },
      paymentMethod: "credit_card",
    }),
  });
  const data = await response.json();
  orderId = data._id;
  printResult("Orden Creada", data);
};

// Obtener todas las notificaciones
const getNotifications = async () => {
  const response = await fetch(`${API_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  printResult("Notificaciones Obtenidas", data);
};

// Obtener notificaciones no leídas
const getUnreadNotifications = async () => {
  const response = await fetch(`${API_URL}/notifications/unread`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  printResult("Notificaciones No Leídas", data);
};

// Marcar una notificación como leída
const markNotificationAsRead = async (notificationId) => {
  const response = await fetch(
    `${API_URL}/notifications/${notificationId}/read`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  const data = await response.json();
  printResult("Notificación Marcada como Leída", data);
};

// Marcar todas las notificaciones como leídas
const markAllNotificationsAsRead = async () => {
  const response = await fetch(`${API_URL}/notifications/read-all`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  printResult("Todas las Notificaciones Marcadas como Leídas", data);
};

// Función principal para ejecutar las pruebas
const runTests = async () => {
  console.log("Iniciando pruebas de notificaciones...\n");

  try {
    // Login y preparar datos
    await login();
    await createProduct();
    await addToCart();
    await createOrder();

    // Esperar un momento para que se procesen las notificaciones
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Probar endpoints de notificaciones
    await getNotifications();
    await getUnreadNotifications();

    // Obtener ID de la primera notificación no leída
    const unreadResponse = await fetch(`${API_URL}/notifications/unread`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const unreadData = await unreadResponse.json();

    if (unreadData.length > 0) {
      await markNotificationAsRead(unreadData[0]._id);
    }

    await markAllNotificationsAsRead();

    // Verificar estado final
    await getNotifications();
    await getUnreadNotifications();
  } catch (error) {
    console.error("Error durante las pruebas:", error);
  }
};

// Ejecutar las pruebas
runTests();
