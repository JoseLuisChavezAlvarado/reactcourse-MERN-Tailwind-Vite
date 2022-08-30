import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'

const agregarTarea = async (req, res) => {

    const { proyecto } = req.body
    let existeProyecto

    try {
        existeProyecto = await Proyecto.findById(proyecto)
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'El token obtenido con coincide con el formato especificado' })
    }

    if (!existeProyecto) {
        const error = new Error('El proyecto no existe')
        return res.status(404).json({ msg: error.message })
    }

    if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No tienes los permisos adecuados')
        return res.status(401).json({ msg: error.message })
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body)

        //ALMACENAR EL ID EN EL PROYECTO
        existeProyecto.tareas.push(tareaAlmacenada._id)
        await existeProyecto.save()

        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error);
    }
}

const obtenerTarea = async (req, res) => {

    const { id } = req.params
    let tarea

    try {
        tarea = await Tarea.findById(id).populate('proyecto')

        if (!tarea) {
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({ msg: error.message })
        }

        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no permitida')
            return res.status(401).json({ msg: error.message })
        }

        res.json(tarea)

    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'El token obtenido con coincide con el formato especificado' })
    }

}

const actualizarTarea = async (req, res) => {

    const { id } = req.params
    let tarea

    try {
        tarea = await Tarea.findById(id).populate('proyecto')

        if (!tarea) {
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({ msg: error.message })
        }

        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no permitida')
            return res.status(401).json({ msg: error.message })
        }

        tarea.fechaEntrega = req.body.prifechaEntregaoridad || tarea.fechaEntrega
        tarea.descripcion = req.body.descripcion || tarea.descripcion
        tarea.prioridad = req.body.prioridad || tarea.prioridad
        tarea.nombre = req.body.nombre || tarea.nombre

        try {
            const tareaAlmacenada = await tarea.save()
            res.json(tareaAlmacenada)
        } catch (error) {
            console.log(error);
            return res.status(401).json({ msg: 'Ocurrió un error al actualizar' })
        }

    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'El token obtenido con coincide con el formato especificado' })
    }

}

const eliminarTarea = async (req, res) => {

    const { id } = req.params
    let tarea

    try {
        tarea = await Tarea.findById(id).populate('proyecto')

        if (!tarea) {
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({ msg: error.message })
        }

        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no permitida')
            return res.status(401).json({ msg: error.message })
        }

        try {
            await tarea.deleteOne()
            res.json({ msg: 'La tarea se eliminó correctamente' })
        } catch (error) {
            console.log(error);
            return res.status(401).json({ msg: 'Ocurrió un error al actualizar' })
        }

    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'El token obtenido con coincide con el formato especificado' })
    }
}

const cambiarEstado = async (req, res) => { }

export { agregarTarea, obtenerTarea, actualizarTarea, eliminarTarea, cambiarEstado }