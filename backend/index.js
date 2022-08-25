import dotenv from 'dotenv';
import express from "express";
import conectarDB from "./config/db.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import cors from 'cors'

const app = express()
app.use(express.json())
dotenv.config()
conectarDB()

//CONFIGURAR CORS
const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('CORS Error'))
        }
    }
}
app.use(cors(corsOptions))

//ROUTING
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})