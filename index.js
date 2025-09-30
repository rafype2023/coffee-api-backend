const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// --- Middlewares ---
app.use(express.json());

// --- Configuración de CORS ---
// ⬇️ IMPORTANTE: Reemplaza esta URL con la URL de tu frontend en Render.com
const frontendURL = 'https://coffee-pre-order-app.onrender.com'; 
app.use(cors({
  origin: frontendURL
}));


// --- Almacenamiento en Memoria (para simplicidad) ---
// En una aplicación real, usarías una base de datos (PostgreSQL, MongoDB, etc.)
const ordersStore = new Map();


// --- Rutas de la API ---

// 1. Endpoint para CREAR un nuevo pedido
app.post('/api/orders', (req, res) => {
  try {
    const orderDetails = req.body;

    // Validación simple
    if (!orderDetails.employeeEmail || !orderDetails.employeeName) {
      return res.status(400).json({ success: false, message: 'Faltan datos del empleado.' });
    }

    const orderId = `ORDER-${Date.now()}`;
    // Genera un código de 6 dígitos
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    ordersStore.set(orderId, {
      details: orderDetails,
      code: verificationCode,
      status: 'Pending'
    });

    // --- Simulación de envío de correo ---
    // En una app real, aquí enviarías un email al usuario.
    // Para este proyecto, lo mostraremos en los logs del servidor de Render.
    console.log(`✅ Pedido recibido de: ${orderDetails.employeeEmail}`);
    console.log(`🔑 Su código de verificación es: ${verificationCode}`);
    // ------------------------------------

    res.status(201).json({
      success: true,
      orderId: orderId,
      message: 'Pedido recibido. Por favor, verifica tu email para el código de confirmación.'
    });

  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
});


// 2. Endpoint para VERIFICAR un pedido
app.post('/api/orders/verify', (req, res) => {
  try {
    const { orderId, code } = req.body;

    if (!orderId || !code) {
      return res.status(400).json({ success: false, message: 'Faltan el ID del pedido o el código.' });
    }

    const orderData = ordersStore.get(orderId);

    if (!orderData) {
      return res.status(404).json({ success: false, message: 'Pedido no encontrado.' });
    }

    if (orderData.code === code) {
      orderData.status = 'Confirmed';
      ordersStore.set(orderId, orderData);
      console.log(`🎉 Pedido ${orderId} confirmado correctamente.`);
      return res.status(200).json({ success: true, message: 'Pedido confirmado exitosamente.', orderStatus: 'Confirmed' });
    } else {
      console.log(`❌ Intento de verificación fallido para el pedido ${orderId}.`);
      return res.status(400).json({ success: false, message: 'El código de verificación es incorrecto.' });
    }
  } catch (error) {
    console.error("Error al verificar el pedido:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
});


// --- Iniciar el servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor de API escuchando en el puerto ${PORT}`);
});