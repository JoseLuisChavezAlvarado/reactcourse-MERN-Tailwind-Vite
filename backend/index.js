import dotenv from 'dotenv';
import express from "express";
import conectarDB from "./config/db.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express()
app.use(express.json())
dotenv.config()
conectarDB()

//ROUTING
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})