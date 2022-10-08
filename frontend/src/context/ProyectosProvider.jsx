import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import clienteAxios from "../config/clienteAxios";

const ProyectosContext = createContext()

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [proyecto, setProyecto] = useState({})
    const [cargado, setCargado] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [tarea, setTarea] = useState({});
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);
    const [colaborador, setColaborador] = useState({});

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


        const token = localStorage.getItem("token")
        if (!token) { return }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }

        setCargado(true)

        try {
            const { data } = await clienteAxios.post('/proyectos/colaboradores', { email }, config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setColaborador({})
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargado(false)
        }

    }


    const agregarColaborador = async (email) => {

        const token = localStorage.getItem("token")
        if (!token) { return }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }

        try {
            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, { email }, config)

            setColaborador({})
            setAlerta({
                msg: data.msg,
                error: false
            })

        } catch (error) {
            console.log(error.response);
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const handleModalEliminarColaborador = colaborador => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador);
    }

    const eliminarColaborador = async () => {

        const token = localStorage.getItem("token")
        if (!token) { return }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }

        try {
            const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config)

            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
            setProyecto(proyectoActualizado)

            handleModalEliminarColaborador()
            setColaborador({})
            setAlerta({
                msg: data.msg,
                error: false
            })

        } catch (error) {
            console.log(error.response);
            setAlerta({
                msg: error.response.msg,
                error: true
            })
        } finally {
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }

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
                colaborador,
                modalEliminarTarea,
                modalFormularioTarea,
                modalEliminarColaborador,
                submitTarea,
                setProyectos,
                mostrarAlerta,
                eliminarTarea,
                submitProyecto,
                obtenerProyecto,
                eliminarProyecto,
                handleModalTarea,
                submitColaborador,
                agregarColaborador,
                eliminarColaborador,
                handleModalEditarTarea,
                handleModalEliminarTarea,
                handleModalEliminarColaborador,
            }}
        >{children}
        </ProyectosContext.Provider>
    )

}

export {
    ProyectosProvider
};

export default ProyectosContext