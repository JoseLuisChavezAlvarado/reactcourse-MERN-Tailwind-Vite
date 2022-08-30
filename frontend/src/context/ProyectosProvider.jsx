import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from 'react-router-dom'

const ProyectosContext = createContext()

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [proyecto, setProyecto] = useState({})
    const [cargado, setCargado] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [tarea, setTarea] = useState({});
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false);

    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)

    const navigate = useNavigate()

    //====================================================================
    useEffect(() => {

        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) { return }

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/proyectos', config)
                setProyectos(data)

            } catch (error) {
                console.log(error);
            }
        }

        obtenerProyectos()

    }, [])

    //====================================================================

    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000)
    }

    const submitProyecto = async (proyecto) => {

        if (proyecto.id) {
            editarProyecto(proyecto)
        } else {
            nuevoProyecto(proyecto)
        }

    }

    const editarProyecto = async (proyecto) => {

        try {
            const token = localStorage.getItem("token")
            if (!token) { return }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
            //SINCRONIZAR EL STATE
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)

            mostrarAlerta({
                msg: 'Proyecto actualizado correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 1000)

        } catch (error) {
            console.log(error);
        }

    }

    const nuevoProyecto = async (proyecto) => {

        try {

            const token = localStorage.getItem("token")
            if (!token) { return }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos', proyecto, config)
            setProyectos([...proyectos, data])

            mostrarAlerta({
                msg: 'Proyecto creado correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000)

        } catch (error) {
            console.log(error);
        }

    }

    const obtenerProyecto = async (id) => {

        setCargado(true)

        try {
            const token = localStorage.getItem("token")
            if (!token) { return }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)

        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setCargado(false)
            }, 500);
        }
    }

    const eliminarProyecto = async (id) => {
        try {
            const token = localStorage.getItem("token")
            if (!token) { return }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)

            //SINCRONIZAR EL STATE
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)

            mostrarAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 1000)

        } catch (error) {
            console.log(error);
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const submitTarea = async (tarea) => {
        if (tarea?.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }
    }

    const crearTarea = async (tarea) => {
        const token = localStorage.getItem("token")
        if (!token) { return }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }

        const { data } = await clienteAxios.post('/tareas', tarea, config)

        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = [...proyecto.tareas, data]
        setProyecto(proyectoActualizado)

        setAlerta({})
        handleModalTarea()
    }

    const editarTarea = async (tarea) => {

        const token = localStorage.getItem("token")
        if (!token) { return }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }

        const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)
        setProyecto(proyectoActualizado)

        setAlerta({})
        handleModalTarea()
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async () => {

        const token = localStorage.getItem("token")
        if (!token) { return }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }

        const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)

        setAlerta({
            msg: data.msg,
            error: false
        })

        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id)

        setProyecto(proyectoActualizado)
        setModalEliminarTarea(false)
        setTarea({})

        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const submitColaborador = async (email) => {
        console.log(email);

        setAlerta({})
    }
    //====================================================================

    return (
        <ProyectosContext.Provider
            value={{
                tarea,
                alerta,
                cargado,
                proyecto,
                proyectos,
                modalEliminarTarea,
                modalFormularioTarea,
                submitTarea,
                setProyectos,
                mostrarAlerta,
                eliminarTarea,
                submitProyecto,
                obtenerProyecto,
                eliminarProyecto,
                handleModalTarea,
                submitColaborador,
                handleModalEditarTarea,
                handleModalEliminarTarea,
            }}
        >{children}
        </ProyectosContext.Provider>
    )

}

export {
    ProyectosProvider
}

export default ProyectosContext