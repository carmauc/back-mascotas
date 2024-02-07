require('dotenv').config();

const nodemailer = require('nodemailer');
const cors = require('cors');
// var pdf = require('html-pdf');
const { link } = require('fs');
const path = require('path');
const multer = require('multer');  // Import multer
const puppeteer = require('puppeteer');
const fs = require('fs');
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

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
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


//       const PDFDocument = require('pdfkit');
//       const doc = new PDFDocument();
//       const pdfBuffer = await new Promise((resolve, reject) => {
//         const chunks = [];
//         doc.on('data', (chunk) => chunks.push(chunk));
//         doc.on('end', () => resolve(Buffer.concat(chunks)));
        
//         PDFDocument.from_string(htmlContent, 'out.pdf')

  
//         // Finalizar y cerrar el documento
//         doc.end();
//  });


    // Generar PDF con Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlContent = '<html><body><h1>Hello, Puppeteer!</h1></body></html>';
    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });
    await page.pdf({ path: 'output.pdf', format: 'A4' });
    await browser.close();




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
              // filename: 'formulario.pdf',
              // // content: Buffer.from(htmlContent, 'utf-8'),
              // // content: buffer,
              //               content: outputPath,
              filename: 'formulario.pdf', path: 'output.pdf' 

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



