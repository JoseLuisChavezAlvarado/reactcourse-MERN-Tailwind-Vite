
const NuevoPassword = () => {
    return (
        <>
            <h1 className='text-sky-600 font-black text-5xl capitalize'>
                Restablece tu password y no pierdas acceso a tus {''}
                <span className="text-slate-700">proyectos</span>
            </h1>

            <form className="my-10 bg-white shadow rounded-md p-10 px-10">

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password">Nuevo Password</label>
                    <input
                        className="w-full mt-2 p-3 border rounded-md bg-gray-50"
                        placeholder='Escribe tu nuevo password'
                        type='password'
                        id="password" />
                </div>

                <input
                    className="bg-sky-700 mb-5 w-full py-3 uppercase font-bold rounded text-white hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    value='Guardar nuevo password'
                    type='submit' />
            </form>
        </>
    );
}

export default NuevoPassword;