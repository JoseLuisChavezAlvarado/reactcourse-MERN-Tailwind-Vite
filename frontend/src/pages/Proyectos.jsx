import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos";

const Proyectos = () => {

    const { proyectos } = useProyectos()

    return (
        <>
            <h1 className="text-4xl font-black">Proyectos</h1>

            <div className="bg-white shadow mt-10 rounded-lg">
                {proyectos.length
                    ? proyectos.map(proyecto => (
                        <PreviewProyecto
                            proyecto={proyecto}
                            key={proyecto._id} />
                    ))
                    : <p className="text-center text-gray-600 uppercase p-5">No hayproyecto aún</p>
                }
            </div>

        </>
    );
}

export default Proyectos;