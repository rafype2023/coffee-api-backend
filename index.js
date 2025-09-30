<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2685.1">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Menlo; -webkit-text-stroke: #000000; min-height: 14.0px}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Menlo; -webkit-text-stroke: #000000}
    p.p3 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Menlo; color: #0f7001; -webkit-text-stroke: #0f7001}
    p.p4 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Menlo; color: #900112; -webkit-text-stroke: #900112}
    span.s1 {font-kerning: none}
    span.s2 {font-kerning: none; color: #0000ff; background-color: #fffffe; -webkit-text-stroke: 0px #0000ff}
    span.s3 {font-kerning: none; background-color: #fffffe}
    span.s4 {font-kerning: none; color: #900112; background-color: #fffffe; -webkit-text-stroke: 0px #900112}
    span.s5 {font-kerning: none; color: #0e6e6d; background-color: #fffffe; -webkit-text-stroke: 0px #0e6e6d}
    span.s6 {font-kerning: none; color: #137646; background-color: #fffffe; -webkit-text-stroke: 0px #137646}
    span.s7 {font-kerning: none; color: #000000; background-color: #fffffe; -webkit-text-stroke: 0px #000000}
  </style>
</head>
<body>
<p class="p1"><span class="s1"></span><br></p>
<p class="p2"><span class="s2">const</span><span class="s3"> express = require(</span><span class="s4">'express'</span><span class="s3">);</span></p>
<p class="p2"><span class="s2">const</span><span class="s3"> cors = require(</span><span class="s4">'cors'</span><span class="s3">);</span></p>
<p class="p2"><span class="s2">const</span><span class="s3"> app = express();</span></p>
<p class="p2"><span class="s2">const</span><span class="s3"> </span><span class="s5">PORT</span><span class="s3"> = process.env.</span><span class="s5">PORT</span><span class="s3"> || </span><span class="s6">3001</span><span class="s3">;</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p3"><span class="s3">// --- Middlewares ---</span></p>
<p class="p2"><span class="s3">app.use(express.json());</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p3"><span class="s3">// --- Configuración de CORS ---</span></p>
<p class="p3"><span class="s3">// ⬇️ IMPORTANTE: Reemplaza esta URL con la URL de tu frontend en Render.com</span></p>
<p class="p4"><span class="s2">const</span><span class="s7"> frontendURL = </span><span class="s3">'https://coffee-pre-order-app.onrender.com'</span><span class="s7">;<span class="Apple-converted-space"> </span></span></p>
<p class="p2"><span class="s3">app.use(cors({</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">  </span>origin: frontendURL</span></p>
<p class="p2"><span class="s3">}));</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p3"><span class="s3">// --- Almacenamiento en Memoria (para simplicidad) ---</span></p>
<p class="p3"><span class="s3">// En una aplicación real, usarías una base de datos (PostgreSQL, MongoDB, etc.)</span></p>
<p class="p2"><span class="s2">const</span><span class="s3"> ordersStore = </span><span class="s2">new</span><span class="s3"> </span><span class="s5">Map</span><span class="s3">();</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p3"><span class="s3">// --- Rutas de la API ---</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p3"><span class="s3">// 1. Endpoint para CREAR un nuevo pedido</span></p>
<p class="p2"><span class="s3">app.post(</span><span class="s4">'/api/orders'</span><span class="s3">, (req, res) =&gt; {</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">  </span></span><span class="s2">try</span><span class="s3"> {</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span></span><span class="s2">const</span><span class="s3"> orderDetails = req.body;</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p3"><span class="s7"><span class="Apple-converted-space">    </span></span><span class="s3">// Validación simple</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span></span><span class="s2">if</span><span class="s3"> (!orderDetails.employeeEmail || !orderDetails.employeeName) {</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span></span><span class="s2">return</span><span class="s3"> res.status(</span><span class="s6">400</span><span class="s3">).json({ success: </span><span class="s2">false</span><span class="s3">, message: </span><span class="s4">'Faltan datos del empleado.'</span><span class="s3"> });</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span></span><span class="s2">const</span><span class="s3"> orderId = </span><span class="s4">`ORDER-</span><span class="s3">${</span><span class="s5">Date</span><span class="s3">.now()}</span><span class="s4">`</span><span class="s3">;</span></p>
<p class="p3"><span class="s7"><span class="Apple-converted-space">    </span></span><span class="s3">// Genera un código de 6 dígitos</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span></span><span class="s2">const</span><span class="s3"> verificationCode = </span><span class="s5">Math</span><span class="s3">.floor(</span><span class="s6">100000</span><span class="s3"> + </span><span class="s5">Math</span><span class="s3">.random() * </span><span class="s6">900000</span><span class="s3">).toString();</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>ordersStore.</span><span class="s2">set</span><span class="s3">(orderId, {</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span>details: orderDetails,</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span>code: verificationCode,</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span>status: </span><span class="s4">'Pending'</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>});</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p3"><span class="s7"><span class="Apple-converted-space">    </span></span><span class="s3">// --- Simulación de envío de correo ---</span></p>
<p class="p3"><span class="s7"><span class="Apple-converted-space">    </span></span><span class="s3">// En una app real, aquí enviarías un email al usuario.</span></p>
<p class="p3"><span class="s7"><span class="Apple-converted-space">    </span></span><span class="s3">// Para este proyecto, lo mostraremos en los logs del servidor de Render.</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>console.log(</span><span class="s4">`✅ Pedido recibido de: </span><span class="s3">${orderDetails.employeeEmail}</span><span class="s4">`</span><span class="s3">);</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>console.log(</span><span class="s4">`🔑 Su código de verificación es: </span><span class="s3">${verificationCode}</span><span class="s4">`</span><span class="s3">);</span></p>
<p class="p3"><span class="s7"><span class="Apple-converted-space">    </span></span><span class="s3">// ------------------------------------</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>res.status(</span><span class="s6">201</span><span class="s3">).json({</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span>success: </span><span class="s2">true</span><span class="s3">,</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span>orderId: orderId,</span></p>
<p class="p4"><span class="s7"><span class="Apple-converted-space">      </span>message: </span><span class="s3">'Pedido recibido. Por favor, verifica tu email para el código de confirmación.'</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>});</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">  </span>} </span><span class="s2">catch</span><span class="s3"> (error) {</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>console.error(</span><span class="s4">"Error al crear el pedido:"</span><span class="s3">, error);</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>res.status(</span><span class="s6">500</span><span class="s3">).json({ success: </span><span class="s2">false</span><span class="s3">, message: </span><span class="s4">'Error interno del servidor.'</span><span class="s3"> });</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p2"><span class="s3">});</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p3"><span class="s3">// 2. Endpoint para VERIFICAR un pedido</span></p>
<p class="p2"><span class="s3">app.post(</span><span class="s4">'/api/orders/verify'</span><span class="s3">, (req, res) =&gt; {</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">  </span></span><span class="s2">try</span><span class="s3"> {</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span></span><span class="s2">const</span><span class="s3"> { orderId, code } = req.body;</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span></span><span class="s2">if</span><span class="s3"> (!orderId || !code) {</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span></span><span class="s2">return</span><span class="s3"> res.status(</span><span class="s6">400</span><span class="s3">).json({ success: </span><span class="s2">false</span><span class="s3">, message: </span><span class="s4">'Faltan el ID del pedido o el código.'</span><span class="s3"> });</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span></span><span class="s2">const</span><span class="s3"> orderData = ordersStore.</span><span class="s2">get</span><span class="s3">(orderId);</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span></span><span class="s2">if</span><span class="s3"> (!orderData) {</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span></span><span class="s2">return</span><span class="s3"> res.status(</span><span class="s6">404</span><span class="s3">).json({ success: </span><span class="s2">false</span><span class="s3">, message: </span><span class="s4">'Pedido no encontrado.'</span><span class="s3"> });</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span></span><span class="s2">if</span><span class="s3"> (orderData.code === code) {</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span>orderData.status = </span><span class="s4">'Confirmed'</span><span class="s3">;</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span>ordersStore.</span><span class="s2">set</span><span class="s3">(orderId, orderData);</span></p>
<p class="p4"><span class="s7"><span class="Apple-converted-space">      </span>console.log(</span><span class="s3">`🎉 Pedido </span><span class="s7">${orderId}</span><span class="s3"> confirmado correctamente.`</span><span class="s7">);</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span></span><span class="s2">return</span><span class="s3"> res.status(</span><span class="s6">200</span><span class="s3">).json({ success: </span><span class="s2">true</span><span class="s3">, message: </span><span class="s4">'Pedido confirmado exitosamente.'</span><span class="s3">, orderStatus: </span><span class="s4">'Confirmed'</span><span class="s3"> });</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>} </span><span class="s2">else</span><span class="s3"> {</span></p>
<p class="p4"><span class="s7"><span class="Apple-converted-space">      </span>console.log(</span><span class="s3">`❌ Intento de verificación fallido para el pedido </span><span class="s7">${orderId}</span><span class="s3">.`</span><span class="s7">);</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">      </span></span><span class="s2">return</span><span class="s3"> res.status(</span><span class="s6">400</span><span class="s3">).json({ success: </span><span class="s2">false</span><span class="s3">, message: </span><span class="s4">'El código de verificación es incorrecto.'</span><span class="s3"> });</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">  </span>} </span><span class="s2">catch</span><span class="s3"> (error) {</span></p>
<p class="p4"><span class="s7"><span class="Apple-converted-space">    </span>console.error(</span><span class="s3">"Error al verificar el pedido:"</span><span class="s7">, error);</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">    </span>res.status(</span><span class="s6">500</span><span class="s3">).json({ success: </span><span class="s2">false</span><span class="s3">, message: </span><span class="s4">'Error interno del servidor.'</span><span class="s3"> });</span></p>
<p class="p2"><span class="s3"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p2"><span class="s3">});</span></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"></span><br></p>
<p class="p3"><span class="s3">// --- Iniciar el servidor ---</span></p>
<p class="p2"><span class="s3">app.listen(</span><span class="s5">PORT</span><span class="s3">, () =&gt; {</span></p>
<p class="p4"><span class="s7"><span class="Apple-converted-space">  </span>console.log(</span><span class="s3">`🚀 Servidor de API escuchando en el puerto </span><span class="s7">${</span><span class="s5">PORT</span><span class="s7">}</span><span class="s3">`</span><span class="s7">);</span></p>
<p class="p2"><span class="s3">});</span></p>
<p class="p1"><span class="s1"></span><br></p>
</body>
</html>
