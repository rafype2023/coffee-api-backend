<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2685.1">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Menlo; -webkit-text-stroke: #000000}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Menlo; -webkit-text-stroke: #000000; min-height: 14.0px}
    p.p3 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Menlo; color: #136002; -webkit-text-stroke: #136002}
    p.p4 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Menlo; color: #7c0010; -webkit-text-stroke: #7c0010}
    span.s1 {font-kerning: none; color: #0000ff; background-color: #fffffe; -webkit-text-stroke: 0px #0000ff}
    span.s2 {font-kerning: none; background-color: #fffffe}
    span.s3 {font-kerning: none; color: #7c0010; background-color: #fffffe; -webkit-text-stroke: 0px #7c0010}
    span.s4 {font-kerning: none; color: #125c5a; background-color: #fffffe; -webkit-text-stroke: 0px #125c5a}
    span.s5 {font-kerning: none; color: #156536; background-color: #fffffe; -webkit-text-stroke: 0px #156536}
    span.s6 {font-kerning: none}
    span.s7 {font: 12.0px 'Apple Color Emoji'; font-kerning: none; background-color: #fffffe}
    span.s8 {font-kerning: none; background-color: #fffffe; -webkit-text-stroke: 0px #000000}
    span.s9 {font: 12.0px 'Apple Color Emoji'; font-kerning: none; color: #7c0010; background-color: #fffffe; -webkit-text-stroke: 0px #7c0010}
  </style>
</head>
<body>
<p class="p1"><span class="s1">const</span><span class="s2"> express = require(</span><span class="s3">'express'</span><span class="s2">);</span></p>
<p class="p1"><span class="s1">const</span><span class="s2"> cors = require(</span><span class="s3">'cors'</span><span class="s2">);</span></p>
<p class="p1"><span class="s1">const</span><span class="s2"> app = express();</span></p>
<p class="p1"><span class="s1">const</span><span class="s2"> </span><span class="s4">PORT</span><span class="s2"> = process.env.</span><span class="s4">PORT</span><span class="s2"> || </span><span class="s5">3001</span><span class="s2">;</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p3"><span class="s2">// --- Middlewares ---</span></p>
<p class="p1"><span class="s2">app.use(express.json());</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p3"><span class="s2">// --- Configuración de CORS ---</span></p>
<p class="p3"><span class="s2">// </span><span class="s7">⬇️</span><span class="s2"> IMPORTANTE: Reemplaza esta URL con la URL de tu frontend en Render.com</span></p>
<p class="p4"><span class="s1">const</span><span class="s8"> frontendURL = </span><span class="s2">'https://coffee-pre-order-app.onrender.com'</span><span class="s8">;<span class="Apple-converted-space"> </span></span></p>
<p class="p1"><span class="s2">app.use(cors({</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">  </span>origin: frontendURL</span></p>
<p class="p1"><span class="s2">}));</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p3"><span class="s2">// --- Almacenamiento en Memoria (para simplicidad) ---</span></p>
<p class="p3"><span class="s2">// En una aplicación real, usarías una base de datos (PostgreSQL, MongoDB, etc.)</span></p>
<p class="p1"><span class="s1">const</span><span class="s2"> ordersStore = </span><span class="s1">new</span><span class="s2"> </span><span class="s4">Map</span><span class="s2">();</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p3"><span class="s2">// --- Rutas de la API ---</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p3"><span class="s2">// 1. Endpoint para CREAR un nuevo pedido</span></p>
<p class="p1"><span class="s2">app.post(</span><span class="s3">'/api/orders'</span><span class="s2">, (req, res) =&gt; {</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">  </span></span><span class="s1">try</span><span class="s2"> {</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">const</span><span class="s2"> orderDetails = req.body;</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p3"><span class="s8"><span class="Apple-converted-space">    </span></span><span class="s2">// Validación simple</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">if</span><span class="s2"> (!orderDetails.employeeEmail || !orderDetails.employeeName) {</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span></span><span class="s1">return</span><span class="s2"> res.status(</span><span class="s5">400</span><span class="s2">).json({ success: </span><span class="s1">false</span><span class="s2">, message: </span><span class="s3">'Faltan datos del empleado.'</span><span class="s2"> });</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">const</span><span class="s2"> orderId = </span><span class="s3">`ORDER-</span><span class="s2">${</span><span class="s4">Date</span><span class="s2">.now()}</span><span class="s3">`</span><span class="s2">;</span></p>
<p class="p3"><span class="s8"><span class="Apple-converted-space">    </span></span><span class="s2">// Genera un código de 6 dígitos</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">const</span><span class="s2"> verificationCode = </span><span class="s4">Math</span><span class="s2">.floor(</span><span class="s5">100000</span><span class="s2"> + </span><span class="s4">Math</span><span class="s2">.random() * </span><span class="s5">900000</span><span class="s2">).toString();</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>ordersStore.</span><span class="s1">set</span><span class="s2">(orderId, {</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span>details: orderDetails,</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span>code: verificationCode,</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span>status: </span><span class="s3">'Pending'</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>});</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p3"><span class="s8"><span class="Apple-converted-space">    </span></span><span class="s2">// --- Simulación de envío de correo ---</span></p>
<p class="p3"><span class="s8"><span class="Apple-converted-space">    </span></span><span class="s2">// En una app real, aquí enviarías un email al usuario.</span></p>
<p class="p3"><span class="s8"><span class="Apple-converted-space">    </span></span><span class="s2">// Para este proyecto, lo mostraremos en los logs del servidor de Render.</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>console.log(</span><span class="s3">`</span><span class="s9">✅</span><span class="s3"> Pedido recibido de: </span><span class="s2">${orderDetails.employeeEmail}</span><span class="s3">`</span><span class="s2">);</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>console.log(</span><span class="s3">`</span><span class="s9">🔑</span><span class="s3"> Su código de verificación es: </span><span class="s2">${verificationCode}</span><span class="s3">`</span><span class="s2">);</span></p>
<p class="p3"><span class="s8"><span class="Apple-converted-space">    </span></span><span class="s2">// ------------------------------------</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>res.status(</span><span class="s5">201</span><span class="s2">).json({</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span>success: </span><span class="s1">true</span><span class="s2">,</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span>orderId: orderId,</span></p>
<p class="p4"><span class="s8"><span class="Apple-converted-space">      </span>message: </span><span class="s2">'Pedido recibido. Por favor, verifica tu email para el código de confirmación.'</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>});</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">  </span>} </span><span class="s1">catch</span><span class="s2"> (error) {</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>console.error(</span><span class="s3">"Error al crear el pedido:"</span><span class="s2">, error);</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>res.status(</span><span class="s5">500</span><span class="s2">).json({ success: </span><span class="s1">false</span><span class="s2">, message: </span><span class="s3">'Error interno del servidor.'</span><span class="s2"> });</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p1"><span class="s2">});</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p3"><span class="s2">// 2. Endpoint para VERIFICAR un pedido</span></p>
<p class="p1"><span class="s2">app.post(</span><span class="s3">'/api/orders/verify'</span><span class="s2">, (req, res) =&gt; {</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">  </span></span><span class="s1">try</span><span class="s2"> {</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">const</span><span class="s2"> { orderId, code } = req.body;</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">if</span><span class="s2"> (!orderId || !code) {</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span></span><span class="s1">return</span><span class="s2"> res.status(</span><span class="s5">400</span><span class="s2">).json({ success: </span><span class="s1">false</span><span class="s2">, message: </span><span class="s3">'Faltan el ID del pedido o el código.'</span><span class="s2"> });</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">const</span><span class="s2"> orderData = ordersStore.</span><span class="s1">get</span><span class="s2">(orderId);</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">if</span><span class="s2"> (!orderData) {</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span></span><span class="s1">return</span><span class="s2"> res.status(</span><span class="s5">404</span><span class="s2">).json({ success: </span><span class="s1">false</span><span class="s2">, message: </span><span class="s3">'Pedido no encontrado.'</span><span class="s2"> });</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">if</span><span class="s2"> (orderData.code === code) {</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span>orderData.status = </span><span class="s3">'Confirmed'</span><span class="s2">;</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span>ordersStore.</span><span class="s1">set</span><span class="s2">(orderId, orderData);</span></p>
<p class="p4"><span class="s8"><span class="Apple-converted-space">      </span>console.log(</span><span class="s2">`</span><span class="s7">🎉</span><span class="s2"> Pedido </span><span class="s8">${orderId}</span><span class="s2"> confirmado correctamente.`</span><span class="s8">);</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span></span><span class="s1">return</span><span class="s2"> res.status(</span><span class="s5">200</span><span class="s2">).json({ success: </span><span class="s1">true</span><span class="s2">, message: </span><span class="s3">'Pedido confirmado exitosamente.'</span><span class="s2">, orderStatus: </span><span class="s3">'Confirmed'</span><span class="s2"> });</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>} </span><span class="s1">else</span><span class="s2"> {</span></p>
<p class="p4"><span class="s8"><span class="Apple-converted-space">      </span>console.log(</span><span class="s2">`</span><span class="s7">❌</span><span class="s2"> Intento de verificación fallido para el pedido </span><span class="s8">${orderId}</span><span class="s2">.`</span><span class="s8">);</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">      </span></span><span class="s1">return</span><span class="s2"> res.status(</span><span class="s5">400</span><span class="s2">).json({ success: </span><span class="s1">false</span><span class="s2">, message: </span><span class="s3">'El código de verificación es incorrecto.'</span><span class="s2"> });</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">  </span>} </span><span class="s1">catch</span><span class="s2"> (error) {</span></p>
<p class="p4"><span class="s8"><span class="Apple-converted-space">    </span>console.error(</span><span class="s2">"Error al verificar el pedido:"</span><span class="s8">, error);</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">    </span>res.status(</span><span class="s5">500</span><span class="s2">).json({ success: </span><span class="s1">false</span><span class="s2">, message: </span><span class="s3">'Error interno del servidor.'</span><span class="s2"> });</span></p>
<p class="p1"><span class="s2"><span class="Apple-converted-space">  </span>}</span></p>
<p class="p1"><span class="s2">});</span></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p2"><span class="s6"></span><br></p>
<p class="p3"><span class="s2">// --- Iniciar el servidor ---</span></p>
<p class="p1"><span class="s2">app.listen(</span><span class="s4">PORT</span><span class="s2">, () =&gt; {</span></p>
<p class="p4"><span class="s8"><span class="Apple-converted-space">  </span>console.log(</span><span class="s2">`</span><span class="s7">🚀</span><span class="s2"> Servidor de API escuchando en el puerto </span><span class="s8">${</span><span class="s4">PORT</span><span class="s8">}</span><span class="s2">`</span><span class="s8">);</span></p>
<p class="p1"><span class="s2">});</span></p>
</body>
</html>
