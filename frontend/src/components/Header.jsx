import { Link } from "react-router-dom";



const Header = () => {
    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="mf: flex md:justify-between">
                <h2 className='text-4xl text-sky-600 font-black text-center'>Uptask</h2>

                <input
                    className="rounded-lg lg:w-96 block p-2 border"
                    placeholder="Buscar..."
                    type='search' />

                <div className="flex items-center gap-4">
                    <Link
                        className="font-bold uppercase"
                        to='/proyectos'>Proyectos</Link>

                    <button
                        className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                        type='button'
                    >Cerrar sesión</button>
                </div>

            </div>

        </header>
    );
}

export default Header;