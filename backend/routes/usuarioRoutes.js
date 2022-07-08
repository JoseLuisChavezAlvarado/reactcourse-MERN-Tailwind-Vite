import express from "express"
import { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from "../controllers/usuarioController.js"
import checkAuth from "../middleware/checkAuth.js"

const router = express.Router()

//CREACION, REGISTRO Y CONFIRMACIÓN DE USUARIOS
router.post('/', registrar)
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

//RUTAS PROTEGIDAS POR MIDDLEWARE
router.get('/perfil', checkAuth, perfil)

export default router