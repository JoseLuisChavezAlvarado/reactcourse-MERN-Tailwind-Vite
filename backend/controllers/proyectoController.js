import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario)

    res.json(proyectos)
}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()
        return res.json(proyectoAlmacenado)

    } catch (error) {
        console.log(error);
    }

    res.json(req.usuario)
}

const obtenerProyecto = async (req, res) => {

    const { id } = req.params

    try {

        const proyecto = await Proyecto.findById(id)

        if (!proyecto) {
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({ msg: error.message })
        }

        if (proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción inválida')
            return res.status(401).json({ msg: error.message })
        }

        res.json(proyecto)

    } catch (error) {
        console.error(error.message);
        return res.status(404).json({ msg: 'Proyecto no encontrado' })
    }

}

const editarProyecto = async (req, res) => {

    const { id } = req.params

    try {

        const proyecto = await Proyecto.findById(id)

        if (!proyecto) {
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({ msg: error.message })
        }

        if (proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción inválida')
            return res.status(401).json({ msg: error.message })
        }

        proyecto.nombre = req.body.nombre || proyecto.nombre
        proyecto.descripcion = req.body.descripcion || proyecto.descripcion
        proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
        proyecto.cliente = req.body.cliente || proyecto.cliente

        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)

    } catch (error) {
        console.error(error.message);
        return res.status(404).json({ msg: 'Proyecto no encontrado' })
    }

}

const eliminarProyecto = async (req, res) => {

    const { id } = req.params

    try {

        const proyecto = await Proyecto.findById(id)

        if (!proyecto) {
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({ msg: error.message })
        }

        if (proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción inválida')
            return res.status(401).json({ msg: error.message })
        }

        await proyecto.deleteOne()
        res.json({ msg: 'Proyecto eliminado' })

    } catch (error) {
        console.error(error.message);
        return res.status(404).json({ msg: 'Proyecto no encontrado' })
    }

}

const agregarColaborador = async (req, res) => {

}

const eliminarColaborador = async (req, res) => {

}

export { obtenerProyectos, nuevoProyecto, obtenerProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador }