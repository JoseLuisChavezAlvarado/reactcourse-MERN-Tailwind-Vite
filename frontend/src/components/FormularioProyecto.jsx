import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from './Alerta'
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const FormularioProyecto = () => {

    const [id, setId] = useState(null)

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    const params = useParams()

    //==========================================================================
    useEffect(() => {
        if (params.id) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])


    //==========================================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        //PASAR LOS DATOS HACIA EL PROVIDER
        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })

        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }

    return (
        <form
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}>

            {
                alerta.msg &&
                <Alerta alerta={alerta} />
            }

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor='nombre'>Nombre del Proyecto</label>

                <input
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    onChange={e => setNombre(e.target.value)}
                    placeholder='Nombre del Proyecto'
                    value={nombre}
                    id='nombre'
                    type="text"
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor='descripcion'>Descripción</label>

                <textarea
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    onChange={e => setDescripcion(e.target.value)}
                    placeholder='Descripción del Proyecto...'
                    value={descripcion}
                    id="descripcion"
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor='fecha-entrega'>Fecha de Entrega</label>

                <input
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    onChange={e => setFechaEntrega(e.target.value)}
                    placeholder='Descripción del Proyecto...'
                    value={fechaEntrega}
                    type='date'
                    id='fecha-entrega'
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor='cliente'>Nombre del Cliente</label>

                <input
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    onChange={e => setCliente(e.target.value)}
                    placeholder='Nombre del Cliente'
                    value={cliente}
                    id='cliente'
                    type="text"
                />
            </div>

            <input
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700"
                value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                type="submit" />

        </form>
    );
}

export default FormularioProyecto;