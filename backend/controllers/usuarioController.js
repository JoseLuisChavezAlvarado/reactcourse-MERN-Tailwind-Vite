import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js'
import generarJWT from '../helpers/generarJWT.js'
import { emailOlvidePassword, emailRegistro } from '../helpers/email.js'

const registrar = async (req, res) => {

    //EVITAR REGISTROS DUPLICADOS
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({ email })

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message })
    }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        await usuario.save()

        //EVNIAR EMAIL DE CONFIRMACION
        emailRegistro({
            token: usuario.token,
            email: usuario.email,
            nombre: usuario.nombre
        })

        res.json({ msg: 'Usuario creado correctamente, revisa tu email para confirmar tu cuenta' })
    } catch (error) {
        console.log(error);
    }

}

const autenticar = async (req, res) => {

    const { email, password } = req.body

    //COMPROBAR SI EL USUARIO EXISTE
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ msg: error.message })
    }
    //COMPROBAR SI ESTÁ VERIFICADO
    if (!usuario.confirmado) {
        const error = new Error('La cuenta no ha sido confirmada')
        return res.status(404).json({ msg: error.message })
    }

    //COMPROBAR SI EL PASSWORD ES CORRECTO
    if (await usuario.comprobarPassword(password)) {
        //PASA TODAS LAS VALIDACIONES
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    } else {
        const error = new Error('El password es incorrecto')
        return res.status(404).json({ msg: error.message })
    }
}

const confirmar = async (req, res) => {

    const { token } = req.params

    const usuarioConfirmar = await Usuario.findOne({ token })

    if (!usuarioConfirmar) {
        const error = new Error('Token inválido')
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ''

        await usuarioConfirmar.save()
        res.json({ msg: 'Usuario confirmado correctamente' })

    } catch (error) {
        console.log(error);
    }

}

const olvidePassword = async (req, res) => {

    const { email } = req.body

    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuario.token = generarId()
        await usuario.save()

        //ENVIAR EMAIL
        emailOlvidePassword({
            token: usuario.token,
            email: usuario.email,
            nombre: usuario.nombre
        })

        res.json({ msg: 'Hemos enviado un email con las instrucciones' })
    } catch (error) {
        console.log(error);
    }

}

const comprobarToken = async (req, res) => {

    const { token } = req.params

    const usuario = await Usuario.findOne({ token })
    if (!usuario) {
        const error = new Error('El token no es válido')
        return res.status(403).json({ msg: error.message })
    } else {
        return res.json({ msg: 'Token válido y el usuario existe' })
    }
}

const nuevoPassword = async (req, res) => {

    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({ token })
    if (usuario) {
        usuario.password = password
        usuario.token = ''

        try {
            await usuario.save()
            res.json({ msg: 'Password Modificado correctamente' })
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error('El token no es válido')
        return res.status(403).json({ msg: error.message })
    }
}

const perfil = async (req, res) => {
    const { usuario } = req
    res.json(usuario)
}

export { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil }