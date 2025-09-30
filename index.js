const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Configuración de SendGrid ---
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API Key configurada.');
} else {
  console.warn('ADVERTENCIA: SENDGRID_API_KEY no encontrada. El envío de emails está deshabilitado.');
}

// --- Middlewares ---
app.use(express.json());

// --- Configuración de CORS ---
// Es crucial para permitir que tu frontend (en otro dominio) se comunique con esta API.
const frontendURL = 'https://coffee-pre-order-app.onrender.com';
app.use(cors({
  origin: frontendURL
}));

// --- Conexión a MongoDB ---
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('ERROR CRÍTICO: La variable de entorno MONGODB_URI no está definida.');
  process.exit(1); // Detiene la aplicación si no hay base de datos
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas.'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// --- Definición del Modelo de Datos (Schema) ---
const orderSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  employeeEmail: { type: String, required: true },
  coffeeType: { type: String, required: true },
  size: { type: String, required: true },
  milk: { type: String, required: true },
  pickupTime: { type: String, required: true },
  verificationCode: { type: String, required: true },
  status: { type: String, required: true, enum: ['Pending', 'Confirmed'], default: 'Pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);


// --- Rutas de la API ---

// 1. Endpoint para CREAR un nuevo pedido
app.post('/api/orders', async (req, res) => {
  try {
    const orderDetails = req.body;

    if (!orderDetails.employeeEmail || !orderDetails.employeeName) {
      return res.status(400).json({ success: false, message: 'Faltan datos del empleado.' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newOrder = new Order({
      ...orderDetails,
      verificationCode: verificationCode,
      status: 'Pending'
    });

    await newOrder.save();

    // --- Envío de email REAL con SendGrid ---
    if (process.env.SENDGRID_API_KEY) {
      const msg = {
        to: orderDetails.employeeEmail,
        from: 'Rafyperez@hotmail.com', // Reemplaza con tu email verificado en SendGrid
        subject: `Tu código de verificación para Café R&P: ${verificationCode}`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #3C2A21;">Hola ${orderDetails.employeeName},</h2>
                <p>Gracias por tu pedido en Café R&P. Usa el siguiente código para confirmar tu pedido:</p>
                <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; text-align: center; background-color: #F5EFE6; padding: 15px; border-radius: 8px;">
                    ${verificationCode}
                </p>
                <p>¡Esperamos verte pronto!</p>
            </div>
        `
      };
      sgMail.send(msg).catch(emailError => {
        console.error("Error al enviar el email con SendGrid:", emailError);
      });
    } else {
        console.log(`🔑 (SIMULADO) Tu código de verificación es: ${verificationCode}`);
    }

    res.status(201).json({
      success: true,
      orderId: newOrder._id,
      message: 'Pedido recibido. Por favor, verifica tu email para el código de confirmación.'
    });

  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al crear el pedido.' });
  }
});


// 2. Endpoint para VERIFICAR un pedido
app.post('/api/orders/verify', async (req, res) => {
  try {
    const { orderId, code } = req.body;

    if (!orderId || !code) {
      return res.status(400).json({ success: false, message: 'Faltan el ID del pedido o el código.' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ success: false, message: 'El ID del pedido es inválido.' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Pedido no encontrado.' });
    }

    if (order.status === 'Confirmed') {
        return res.status(400).json({ success: false, message: 'Este pedido ya ha sido confirmado.' });
    }

    if (order.verificationCode === code) {
      order.status = 'Confirmed';
      await order.save();
      console.log(`🎉 Pedido ${orderId} confirmado correctamente.`);
      return res.status(200).json({ success: true, message: 'Pedido confirmado exitosamente.', orderStatus: 'Confirmed' });
    } else {
      console.log(`❌ Intento de verificación fallido para el pedido ${orderId}.`);
      return res.status(400).json({ success: false, message: 'El código de verificación es incorrecto.' });
    }
  } catch (error) {
    console.error("Error al verificar el pedido:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al verificar el pedido.' });
  }
});


// --- Iniciar el servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor de API escuchando en el puerto ${PORT}`);
});