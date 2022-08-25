import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {

    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    //INFORMACION DEL EMAIL
    await transport.sendMail({
        from: '"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: 'Uptask - Confirma tu cuenta',
        text: 'Compurba tu cuenta en Uptask',
        html: `
            <p>Hola: ${nombre} Compureba tu cuenta en uptask<p/>
            <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace</p>
            <a href='${process.env.FRONTEND_URL}/confirmar/${token}'>Comprobar cuenta</a>
            <p>Si tu no creaste esta cuenta puedes ignorar el mensaje</p>
        `
    })

}

export const emailOlvidePassword = async (datos) => {

    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    //INFORMACION DEL EMAIL
    await transport.sendMail({
        from: '"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: 'Uptask - Reestablece tu Password',
        text: 'Reestablece tu password',
        html: `
            <p>Hola: ${nombre} has solicitado resstablecer tu password<p/>
            <p>Sigue el siguiente enlace para generar un nuevo password</p>
            <a href='${process.env.FRONTEND_URL}/nuevo-password/${token}'>Reestablecer Password</a>
            <p>Si tu no solicitaste este cambio puedes ignorar el mensaje</p>
        `
    })

}