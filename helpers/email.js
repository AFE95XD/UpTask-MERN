import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email
  const info = await transport.sendMail({
    from: "'UpTask - Administrador de Proyectos' <cuentas@uptask.com>",
    to: email,
    subject: "UpTask - Confirma tu cuenta",
    html: /*html*/ ` 
    <p>Hola ${nombre}, has creado una cuenta en UpTask, para activarla haz click aqui: <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a></p>
    <p>Si no has sido tu, ignora este email</p>`,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email
  const info = await transport.sendMail({
    from: "'UpTask - Administrador de Proyectos' <cuentas@uptask.com>",
    to: email,
    subject: "UpTask - Restablecer tu password",
    text: "Restablecer tu password",
    html: /*html*/ ` 
    <p>Hola ${nombre}, has solicitado restablecer tu password, para restablecerla haz click aqui: <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a></p>
    <p>Si no has sido tu, ignora este email</p>`,
  });
};
