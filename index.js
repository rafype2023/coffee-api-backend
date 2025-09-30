const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Configuración de SendGrid ---
// La API Key se toma de las variables de entorno de Render.com
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API Key configurada.');
} else {
  console.warn('ADVERTENCIA: SENDGRID_API_KEY no encontrada. El envío de emails está deshabilitado.');
}


// --- Middlewares ---
app.use(express.json());

// --- Configuración de CORS ---
const frontendURL = 'https://coffee-pre-order-app.onrender.com'; 
app.use(cors({
  origin: frontendURL
}));


// --- Almacenamiento en Memoria ---
const ordersStore = new Map();


// --- Rutas de la API ---

// 1. Endpoint para CREAR un nuevo pedido
app.post('/api/orders', async (req, res) => { // Convertida a async para esperar el envío del email
  try {
    const orderDetails = req.body;

    if (!orderDetails.employeeEmail || !orderDetails.employeeName) {
      return res.status(400).json({ success: false, message: 'Faltan datos del empleado.' });
    }

    const orderId = `ORDER-${Date.now()}`;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    ordersStore.set(orderId, {
      details: orderDetails,
      code: verificationCode,
      status: 'Pending'
    });

    // --- Envío de email REAL con SendGrid ---
    if (process.env.SENDGRID_API_KEY) {
      const msg = {
        to: orderDetails.employeeEmail,
        // ⬇️ IMPORTANTE: Debes verificar este email en tu cuenta de SendGrid
        from: 'rafyperez@hotmail.com', 
        subject: `Tu código de verificación para Café R&P: ${verificationCode}`,
        html: `
          <div style="font-family: sans-serif; text-align: center; padding: 20px;">
            <h2>Hola ${orderDetails.employeeName},</h2>
            <p>Gracias por tu pedido en Café R&P. Usa el siguiente código para confirmarlo:</p>
            <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
              ${verificationCode}
            </p>
            <p>Si no has sido tú, por favor ignora este mensaje.</p>
          </div>
        `,
      };

      try {
        await sgMail.send(msg);
        console.log(`✅ Email de verificación enviado a: ${orderDetails.employeeEmail}`);
      } catch (emailError) {
        console.error("Error al enviar el email con SendGrid:", emailError);
        // Aún así, continuamos para que la app funcione, pero avisamos del error.
        // En una app más crítica, podrías querer revertir el pedido aquí.
      }
    } else {
        // Mantenemos el log si SendGrid no está configurado, para poder seguir probando.
        console.log(`🔑 (SIMULADO) Tu código de verificación es: ${verificationCode}`);
    }
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
