const nodemailer = require('nodemailer');

// Configuración del transportador
const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambia esto al proveedor de correo que uses (e.g., Outlook, Yahoo, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Email del remitente
    pass: process.env.EMAIL_PASS, // Contraseña o App Password
  },
});

// Función para enviar correos
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"Eventos" <${process.env.EMAIL_USER}>`, // Nombre y correo del remitente
      to, // Destinatario
      subject, // Asunto
      text, // Cuerpo del correo
    });

    console.log('Correo enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, error };
  }
};

module.exports = { sendEmail };
