import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import Tarea from "../components/Tarea";
import useProyectos from "../hooks/useProyectos";

const Proyecto = () => {

    const params = useParams()
    const { obtenerProyecto, proyecto, cargado, handleModalTarea, alerta } = useProyectos()

    const { nombre } = proyecto

    //=========================================================================================

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    //=========================================================================================

    if (cargado) {
        return <h2>Cargando...</h2>
    }

    return (
        <>
            <div className='flex justify-between'>
                <h1 className="font-black text-4xl">{nombre}</h1>

                <div className="flex gap-2 items-center text-gray-400 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>

                    <Link
                        to={`/proyectos/editar/${params.id}`}
                        className="uppercase font-bold">Editar</Link>
                </div>


            </div>

            <button
                className="flex gap-2 justify-center items-center text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center"
                onClick={handleModalTarea}
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nueva Tarea
            </button>

            <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>

            <div className='flex justify-center'>
                <div className='md:w-1/3 lg:w-1/4'>
                    {
                        alerta?.msg &&
                        <Alerta alerta={alerta} />
                    }
                </div>
            </div>

            <div className="bg-white shadow mt-10 rounded-lg">
                {
                    proyecto.tareas?.length
                        ? proyecto.tareas?.map(tarea => <Tarea key={tarea._id} tarea={tarea} />)
                        : <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>
                }
            </div>

            <div className="flex items-center justify-between mt-10">
                <p className="font-bold text-xl">Colaboradores</p>

                <Link className="text-gray-400 uppercase font-bold hover:text-black"
                    to={`/proyectos/nuevo-colaborador/${proyecto._id}`}>
                    Añadir</Link>
            </div>

            <div className="bg-white shadow mt-10 rounded-lg">
                {
                    proyecto.colaboradores?.length
                        ? proyecto.colaboradores?.map(colaborador => <Colaborador key={colaborador._id} colaborador={colaborador} />)
                        : <p className="text-center my-5 p-10">No hay colaboradores en este proyecto</p>
                }
            </div>

            <ModalFormularioTarea />
            <ModalEliminarTarea />
            <ModalEliminarColaborador />
        </>

    );
}

export default Proyecto;