import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";

const NuevoColaborador = () => {

    const params = useParams()
    const { obtenerProyecto, proyecto, cargando } = useProyectos()

    //===============================================================================================

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    //===============================================================================================

    if (cargando) {
        return <h1>Cargando...</h1>
    }

    return (
        <>
            <h1 className="text-4xl font-black">Añadir Colaborador al proyecto {proyecto.nombre}</h1>

            <div className="mt-10 flex justify-center">
                <FormularioColaborador />

            </div>
        </>
    );
}

export default NuevoColaborador;