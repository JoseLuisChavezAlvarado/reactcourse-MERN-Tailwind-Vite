import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"
import Usuario from "../models/Usuario.js"

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find({
        '$or': [
            { 'colaboradores': { $in: req.usuario } },
            { 'creador': { $in: req.usuario } },
        ]
    }).select('-tareas')

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

        const proyecto = await Proyecto.findById(id).populate('tareas').populate('colaboradores', 'nombre email')

        if (!proyecto) {
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({ msg: error.message })
        }

        if (proyecto.creador.toString() !== req.usuario._id.toString()
            && !proyecto.colaboradores.some(colaborador => colaborador._id.toString() === req.usuario._id.toString())) {
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

const buscarColaborador = async (req, res) => {

    const { email } = req.body

    const usuario = await Usuario.findOne({ email }).select('-confirmado -createdAt -updatedAt -password -token -__v')

    if (!usuario) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({ msg: error.message })
    }

    res.json(usuario)
}

const agregarColaborador = async (req, res) => {

    const { email } = req.body
    const proyecto = await Proyecto.findById(req.params.id)
    const usuario = await Usuario.findOne({ email }).select('-confirmado -createdAt -updatedAt -password -token -__v')

    //VERIFICAR QUE EL PROYECTO EXISTE
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({ msg: error.message })
    }

    //VERIFICAR SI LA SOLICITUD ES DEL CREADOR DEL PROYECTO
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no válida')
        return res.status(401).json({ msg: error.message })
    }

    //VERIFICAR SI EL USUARIO QUE SE AÑADE COMO COLABORADOR EXIOSTE
    if (!usuario) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({ msg: error.message })
    }

    //VERIFICAR QUE EL USUARIO QUE SE DESA AÑADIR NO ES EL CREADOR DEL PROYECTO
    if (proyecto.creador.toString() === usuario._id.toString()) {
        const error = new Error('El creador del proyecto no puede ser colaborador')
        return res.status(400).json({ msg: error.message })
    }

    //VERIFICAR QUE EL USUARIO NO ESTÉ AÑADIDO A LA LISTA DE COLABORADORES
    if (proyecto.colaboradores.includes(usuario._id)) {
        const error = new Error('El usuario ya pertenece al proyecto')
        return res.status(400).json({ msg: error.message })
    }

    //AÑADIR COLABORADOR
    proyecto.colaboradores.push(usuario._id)
    await proyecto.save()

    //ENVIAR RESPUESTA  
    res.json({ msg: 'Colaborador agregado correctamente...' })
}

const eliminarColaborador = async (req, res) => {

    const proyecto = await Proyecto.findById(req.params.id)

    //VERIFICAR QUE EL PROYECTO EXISTE
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({ msg: error.message })
    }

    //VERIFICAR SI LA SOLICITUD ES DEL CREADOR DEL PROYECTO
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no válida')
        return res.status(401).json({ msg: error.message })
    }

    //ELIMINAR COLABORADOR
    proyecto.colaboradores.pull(req.body.id)
    await proyecto.save()

    //ENVIAR RESPUESTA  
    res.json({ msg: 'Colaborador eliminado correctamente...' })

}

export { obtenerProyectos, nuevoProyecto, obtenerProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador, buscarColaborador }