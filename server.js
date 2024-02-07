require('dotenv').config();

const nodemailer = require('nodemailer');
const cors = require('cors');
var pdf = require('html-pdf');
const { link } = require('fs');
const path = require('path');
const multer = require('multer');  // Import multer

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

  // Configurar multer para manejar la carga de archivos
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

// const transporter = nodemailer.createTransport({
// host: 'smtp-mail.outlook.com',
// port: 587,
// secure: false, // true para el puerto 465, false para otros puertos
// tls: {
//   ciphers: "SSLv3",
//   rejectUnauthorized: false,
// },   
// auth: {
//       user: 'carmauc339@outlook.com',
//       pass: 'Damocles339',
//       },
//   authMethod: 'LOGIN'
//   });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "carmauc339@gmail.com",
      pass: "nvwy bksp muej ttnj",
    },
  });
    

  // Manejo de solicitudes POST desde tu aplicación de React
app.post('/enviar-correo', upload.fields([
  { name: 'archivo1', maxCount: 1 },
  { name: 'archivo2', maxCount: 1 },
  { name: 'pasaporte1', maxCount: 1 },

]), async (req, res) => {
    try {
      const {  mascota, correo, especie, raza, edad, meses, sexo, numero, peso, color,ident, nombre, microchip, nacimiento, fecha, numeroid, direcciond, ciudadd, estadod, paisd, postal, telefonod, direcciono, ciudado, telefonoo, paisP, nombre2, correo2, numeroid2, paisP2, direccion2, ciudad2, estado2, postal2, telefonod2, fecha2, puerto, aeropuerto, ruta } = req.body;  
      const archivoAdjunto = req.files && req.files['archivo1'] ? req.files['archivo1'][0] : null;
      const archivoAdjunto2 = req.files && req.files['archivo2'] ? req.files['archivo2'][0] : null;
      const pasaporte1 = req.files && req.files['pasaporte1'] ? req.files['pasaporte1'][0] : null;


      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument();
      const pdfBuffer = await new Promise((resolve, reject) => {
        const chunks = [];
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        
        // Agregar contenido al PDF
        doc.text(`Información de la mascota:`);
        doc.text(`- Mascota: ${mascota}`);
        doc.text(`- Especie: ${especie}`);
        doc.text(`- Raza: ${raza}`);
        doc.text(`- Edad: ${edad} años y ${meses} meses`);
        doc.text(`- Sexo: ${sexo}`);
        doc.text(`- Número de microchip: ${numero ? numero : microchip}`);
        doc.text(`- Peso: ${peso} Kg`);
        doc.text(`- Color: ${color}`);
        doc.text(`- Fecha de nacimiento: ${nacimiento}`);
        doc.text(`- Nombre del solicitante: ${nombre}`);
        doc.text(`- Identificación del solicitante: ${ident} ${numeroid}`);
        doc.text(`- Dirección de destino: ${direcciond}`);
        doc.text(`- Ciudad / Estado de destino: ${ciudadd} / ${estadod}`);
        doc.text(`- País de destino: ${paisd}`);
        doc.text(`- Código postal: ${postal}`);
        doc.text(`- Teléfono del solicitante: ${telefonod}`);
        doc.text(`- Correo electrónico del solicitante: ${correo}`);
        // Agregar más contenido según tus necesidades...
  
        // Finalizar y cerrar el documento
        doc.end();
 });
   
//    const htmlContent = 
//    ` <html>
//    <head>
//     <style>
// .styled-table {
//     border-collapse: collapse;
//     width: 100%;
//     text-align: center;
//     font-size: 14px;
//     margin-bottom: 900px;
//   }
  
//   /* Estilo para las celdas encabezado */
//   .styled-table th {
//     background-color: #f2f2f2;
//     padding: 5px;
// 		width:50%;
//     border: 1px solid #ddd;
//   }
  
//   /* Estilo para las celdas de datos */
//   .styled-table td {
//     padding: 5px;
//     border: 1px solid #ddd;
//   }

//   /* Estilo para las filas sombreadas */
//   .styled-table tr:nth-child(even) {
//     background-color: rgba(170, 201, 185, 0.293);
//   }
  
//   .styled-table2 {
//     border-collapse: collapse;
//     width: 100%;
//     margin: auto;
//     text-align: center;
//     font-size: 14px;
//     margin-bottom: 900px;
//   }

//   /* Estilo para las celdas encabezado */
//   .styled-table2 th {
//     background-color: #e47b7b32;
//     padding: 8px;
//     border: 1px solid #ddd;
//   }
  
//   /* Estilo para las celdas de datos */
//   .styled-table2 td {
//     padding: 8px;
//     border: 1px solid #ddd;
//   }

//   .styled-table2 tr:nth-child(even) {
//     background-color: #e47b7b32;
//   }
//   .styled-table3 {
//     border-collapse: collapse;
//     width: 100%;
//     margin: auto;
//     text-align: center;
//     font-size: 14px;
//     margin-bottom: 900px;

//   }

//   /* Estilo para las celdas encabezado */
//   .styled-table3 th {
//     background-color: #7bb6e432;
//     padding: 8px;
//     border: 1px solid #ddd;
//   }
//   .styled-table3 tr:nth-child(even) {
//     background-color: #7bb6e432;
//   }
//   .styled-table3 .titulo {
// background-color: #0E7490;
// color: aliceblue;
// }
  
//   /* Estilo para las celdas de datos */
//   .styled-table3 td {
//     padding: 8px;
//     border: 1px solid #ddd;
//   }

//   .styled-table4 {
//     border-collapse: collapse;
//     width: 100%;
//     margin: auto;
//     text-align: center;
//     font-size: 14px;
//     margin-bottom: 900px;
//   }

//   /* Estilo para las celdas encabezado */
//   .styled-table4 th {
//     background-color: #f49d1c;
//     padding: 8px;
//     border: 1px solid #ddd;
//   }
  
//   /* Estilo para las celdas de datos */
//   .styled-table4 td {
//     padding: 8px;
//     border: 1px solid #ddd;
//   }

//   .styled-table4 tr:nth-child(even) {
//     background-color: #e9c999;
//   }
  
//   body{
//     margin: 80px;
//     font-family:'Lato', sans-serif ;
//   }
//   h1{
//     font-size: 24px;
//     text-align: center;
//     margin-top: 180px;
//   }
//   h2 {
//     font-family:'Lato', sans-serif ;
//     text-align: center;
//     font-size: 14px;
// 		margin-top: 30px;
//   }
//   h3 {
//     margin-top: 120px;
//     font-size: 9px;
//   }
//   p{
//     border-collapse: collapse;
//     width: 100%;
//     margin: auto;
//     text-align: justify;
//     font-size: 9px;
//   }
//  h4{
// 	margin-top:10px !important;
// 	  font-family:'Lato', sans-serif ;
//     text-align: center;
//     font-size: 12px;
// 	 margin-bottom: 40px;
// }
//   </style>
//    </head>

//    <body>
    
//    <table class="styled-table">
//    <thead>
//    <h1 style="color: #2fa05e">CERTIFICADO DE SALUD INTERNACIONAL</h1>
//    <h2>Fecha de Viaje: ${fecha} </h2>
//   </thead>
// <tbody>
//      <tr>
//        <td>${mascota}</td>
//      </tr>
//      <tr>
//        <td>${especie} / ${raza}</td>
//      </tr>
//      <tr>
//       <td>${nacimiento}</td>
//     </tr>
//      <tr>
//        <td>${edad}-${meses}</td>
//      </tr>
//      <tr>
//        <td>${sexo}</td>
//      </tr>
//      <tr>
//       <td>${numero ? numero : microchip}</td>
//      </tr>
//      <tr>
//        <td>${peso}-Kg</td>
//      </tr>
//      <tr>
//        <td>${color}</td>
//      </tr>
//      <tr>
//       <td></td>
//     </tr>
//      <tr>
//        <td>${nombre}</td>
//      </tr>
//      <tr>
//        <td>${ident} ${numeroid}</td>
//      </tr>
//      <tr>
//        <td>${direcciond}</td>
//      </tr>
//      <tr>
//        <td>${ciudadd} / ${estadod}</td>
//      </tr>
//      <tr>
//        <td>${paisd}</td>
//      </tr>
//      <tr>
//        <td>${postal}</td>
//      </tr>
//      <tr>
//        <td>${telefonod}</td>
//      </tr>
//      <tr>
//        <td></td>
//        <td></td>
//      </tr>
//      <tr>
//        <td>${direcciono}</td>
//      </tr>
//        <tr>
//            <td>${ciudado}</td>
//          </tr>
//          <tr>
//            <td>Colombia</td>
//          </tr>
//          <tr>
//        <td>${telefonoo}</td>
//      </tr>
//     </tbody>
//    </table>

   
//    <table class="styled-table2">
//     <thead>
//       <h1 style="color: #cb1f1f;">CERTIFICADO DE RABIA</h1>
//    </thead>
//    <tr>
//      <th>Nombre Mascota(Name)</th>
//      <td>${mascota}</td>
//    </tr>
//    <tr>
//     <th>Microchip</th>
//     <td>${numero ? numero : microchip}</td>
//   </tr>
//    <tr>
//      <th>Raza<br>(Species / Breed)</th>
//      <td>${raza}</td>
//    </tr>
//    <tr>
//     <th>Sexo (Sex)</th>
//     <td>${sexo}</td>
//   </tr>
//    <tr>
//      <th>Fecha de Nacimiento<br>(Date of Birth)<br>(dd/mm/yyyy)</th>
//      <td>${nacimiento}</td>
//    </tr>
//    <tr>
//      <th>Color(Color)</th>
//      <td>${color}</td>
//    </tr>
//    <tr>
//      <th>Nombre Solicitante</th>
//      <td>${nombre}</td>
//    </tr>
//    <tr>
//      <th>Dirección de Destino<br>(Destination Address)</th>
//      <td>${direcciond}</td>
//    </tr>
//    <tr>
//      <th>Ciudad / Estado de Destino<br>(City / State of Destination)</th>
//      <td>${ciudadd} / ${estadod}</td>
//    </tr>
//    <tr>
//      <th>Codigo Postal<br>(Zip Code)</th>
//      <td>${postal}</td>
//    </tr>
//    <tr>
//      <th>Teléfono (Telephone)</th>
//      <td>${telefonod}</td>
//    </tr>
//    <tr>
//     <th>Correo</th>
//     <td>${correo}</td>
//   </tr>
//  </table>
//  <table class="styled-table3">
//   <thead>
//     <h1 style="color: #0E7490">INFORMACIÓN SOLICITUD CDC</h1>
//     <h2>Fecha de Viaje: ${fecha} </h2>
//   </thead>
//  <tr>
//   <th colspan="2" class="titulo">INFORMACIÓN SOLICITANTE DEL PERMISO</th>
// </tr>
//  <tr>
//    <th>Nombre Completo del Solicitante</th>
//    <td>${nombre}</td>
//  </tr>
//  <tr>
//   <th>Dirección de Destino<br>(Destination Address)</th>
//   <td>${direcciond}</td>
// </tr>
// <tr>
//   <th>Ciudad / Estado de Destino<br>(City / State of Destination)</th>
//   <td>${ciudadd} / ${estadod}</td>
// </tr>
// <tr>
//   <th>Codigo Postal<br>(Zip Code)</th>
//   <td>${postal}</td>
// </tr>
// <tr>
//   <th>Teléfono (Telephone)</th>
//   <td>${telefonod}</td>
// </tr>
// <tr>
//   <th>Correo</th>
//   <td>${correo}</td>
// </tr>
// <tr>
//   <th>Pasaporte</th>
//   <td>${numeroid}</td>
// </tr>
// <tr>
//   <th>Pais</th>
//   <td>${paisP}</td>
// </tr>
// <tr><th colspan="2" class="titulo">INFORMACIÓN TITULAR DEL PERMISO</th></tr>
// <tr>
//     <th>Nombre Completo del Titular</th>
//     <td>${nombre2}</td>
//   </tr>
//   <tr>
//    <th>Dirección de Destino<br>(Destination Address)</th>
//    <td>${direccion2}</td>
//  </tr>
//  <tr>
//    <th>Ciudad / Estado de Destino<br>(City / State of Destination)</th>
//    <td>${ciudad2} / ${estado2}</td>
//  </tr>
//  <tr>
//    <th>Codigo Postal<br>(Zip Code)</th>
//    <td>${postal2}</td>
//  </tr>
//  <tr>
//    <th>Teléfono (Telephone)</th>
//    <td>${telefonod2}</td>
//  </tr>
//  <tr>
//    <th>Correo</th>
//    <td>${correo2}</td>
//  </tr>
//  <tr>
//    <th>Pasaporte</th>
//    <td>${numeroid2}</td>
//  </tr>
//  <tr>
//    <th>Pais</th>
//    <td>${paisP2}</td>
//  </tr>
//  <tr>
//   <tr><th colspan="2" class="titulo">INFORMACIÓN MASCOTA</th></tr>
//   <th>Nombre Mascota(Name)</th>
//   <td>${mascota}</td>
// </tr>
// <tr>
//   <th>Fecha de Nacimiento<br>(Date of Birth)<br>(dd/mm/yyyy)</th>
//   <td>${nacimiento}</td>
// </tr>
// <tr>
//   <th>Sexo (Sex)</th>
//   <td>${sexo}</td>
// </tr>
// <tr>
//   <th>Raza<br>(Species / Breed)</th>
//   <td>${raza}</td>
// </tr>
// <tr>
//   <th>Color(Color)</th>
//   <td>${color}</td>
// </tr>
// <tr>
//   <th>Microchip</th>
//   <td>${numero}</td>
// </tr>
// <tr><th colspan="2" class="titulo">INFORMACIÓN ENTRADA</th></tr>
// <tr>
//   <th>Fecha de Entrada</th>
//   <td>${fecha2}</td>
// </tr>
// <tr>
//   <th>Puerto de Entrada</th>
//   <td>${puerto}</td>
// </tr>
// </table>
// <table class="styled-table4">
//   <thead>
//   <h1 style="color: #f49d1c">CERTIFICADO DE SALUD NACIONAL</h1>
//   <h2>Fecha de Viaje: ${fecha} </h2>
//  </thead>
// <tbody>
//     <tr>
//       <td>${mascota}</td>
//     </tr>
//     <tr>
//       <td>${especie} / ${raza}</td>
//     </tr>
//     <tr>
//      <td>${nacimiento}</td>
//    </tr>
//     <tr>
//       <td>${edad}-${meses}</td>
//     </tr>
//     <tr>
//       <td>${sexo}</td>
//     </tr>
//     <tr>
//       <td>${peso}-Kg</td>
//     </tr>
//     <tr>
//       <td>${color}</td>
//     </tr>
//     <tr>
//      <td></td>
//    </tr>
//     <tr>
//       <td>${nombre}</td>
//     </tr>
//     <tr>
//       <td>${ident} ${numeroid}</td>
//     </tr>
//     <tr>
//       <td>${direcciond}</td>
//     </tr>
//     <tr>
//       <td>${ciudadd}</td>
//     </tr>
//     <tr>
//       <td>${direcciono}</td>
//     </tr>
//       <tr>
//           <td>${ciudado}</td>
//         </tr>
//         <tr>
//       <td>${telefonod}</td>
//     </tr>
//    </tbody>
//   </table>
// <h1 style="color: #951fcb;">ANEXO IV</h1>
// <p style=" font-weight: bold;">I.1.	Expedidor / Consignor  COLOMBIA</p>
// <p><strong>Nombre / Name</strong><span style="text-transform: uppercase;"> ${nombre}</span></p>
// <p><strong>Dirección / Address</strong><span style="text-transform: uppercase;"> ${direcciono} <br> ${ciudado}</span></p>
// <p><strong>Tel.</strong> ${telefonoo}</p>
// <br><br>
// <p style=" font-weight: bold;">I.5. Destinatario /  Consignee ESPAÑA</p>
// <p><strong>Nombre / Name</strong><span style="text-transform: uppercase;"> ${nombre}</span></p>
// <p><strong>Dirección / Address</strong><span style="text-transform: uppercase;"> ${direcciond} <br> ${ciudadd}</span></p>
// <p><strong>Código postal / Postal code:</strong> ${postal}</p>
// <p><strong>Tel.</strong> ${telefonod}</p>
// <br><br>
// <p style=" font-weight: bold;">I.14 ${fecha}</p>
// <br><br>
// <p style=" font-weight: bold;">I.18.	Descripción de la mercancía</p>
// <p style=" font-style: italic;">Description of commodity</p>
// <p style="text-transform: uppercase; font-weight: bold;">ESPECIE: ${especie} / RAZA: ${raza}/ SEXO: ${sexo} / MICROCHIP: ${numero} / EDAD: ${edad} ${meses} / NOMBRE: ${mascota} / ANIMAL VIVO</p>
// <br><br>
// <p style=" font-weight: bold;">${especie === 'Canino' ? 'Canis Lupus Familiaris' : 'Felis silvestris catus'} &emsp;&emsp;${sexo}&emsp;${color}&emsp;${raza}&emsp; &emsp;${numero}&emsp;&emsp;MICROCHIP&emsp;&emsp;&emsp;&emsp;&emsp;${nacimiento}</p>
//  </body>
//        </html>
//  `;

 // Configurar opciones para html-pdf
//  const options = { format: 'Letter' };
//    // Generar PDF desde HTML
//    pdf.create(htmlContent, options).toBuffer(async (err, buffer) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error al generar el PDF' });
//     } else {

      const mailOptions = {
        from: 'carmauc339@outlook.com',
        to: 'carmauc339@outlook.com',
        subject: `Certificado de ${mascota} para ${paisd ? paisd : ciudadd}`,
        text: `
        Información PreCiS ICA
        Nro de Identificación Exportador: 
        ${numeroid}

        Nombre de Importador:
        ${nombre}

        Dirección de Destino: 
        ${direcciond}

        Uso del Producto:
        Animales de Compañía

        Oficina de Inspección:
        ${aeropuerto}

        Medio de Transporte:
        Aéreo

        Ruta de Viaje:
        ${ruta}

        Fecha de Salida:
        ${fecha}

        ========================
        
        Especie:
        ${especie}

        Pelaje o Microchip:
        ${numero ? numero : color}

        Raza:
        ${raza}

        Sexo:
        ${sexo}

        Edad:
        ${edad}-${meses}

        País Destino: ${paisd}`,
        attachments: [
            {
              filename: 'formulario.pdf',
              // content: Buffer.from(htmlContent, 'utf-8'),
              // content: buffer,
                            content: pdfBuffer,

            },
          ],
        };

            if (archivoAdjunto) {
              const stream = require('stream');
              const attachmentStream = new stream.PassThrough();
              attachmentStream.end(archivoAdjunto.buffer);
              mailOptions.attachments.push({
                filename: archivoAdjunto.originalname,
                content: attachmentStream,
              });
            }

            if (archivoAdjunto2) {
              const stream = require('stream');
              const attachmentStream = new stream.PassThrough();
              attachmentStream.end(archivoAdjunto2.buffer);
              mailOptions.attachments.push({
                filename: archivoAdjunto2.originalname,
                content: attachmentStream,
              });
            }

            if (pasaporte1) {
              const stream = require('stream');
              const attachmentStream = new stream.PassThrough();
              attachmentStream.end(pasaporte1.buffer);
              mailOptions.attachments.push({
                filename: pasaporte1.originalname,
                content: attachmentStream,
              });
            }

await transporter.sendMail(mailOptions);

res.status(200).json({ message: 'Correo enviado con éxito' });
}
// });} 
catch (error) {
console.error(error);
res.status(500).json({ error: 'Error al enviar el correo' });
}
});

// Inicia el servidor
app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`);
});



