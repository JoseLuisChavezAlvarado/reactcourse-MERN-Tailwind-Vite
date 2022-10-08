import useProyectos from "../hooks/useProyectos";

const Colaborador = ({ colaborador }) => {

    const { nombre, email } = colaborador

    const { handleModalEliminarColaborador } = useProyectos()

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p>{nombre}</p>
                <p className="text-sm text-gray-700">{email}</p>
            </div>
            <div>
                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => handleModalEliminarColaborador(colaborador)}
                    type="button"
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Colaborador;