import { Link } from "react-router-dom";

const OlvidePassword = () => {
    return (
        <>
            <h1 className='text-sky-600 font-black text-5xl capitalize'>
                Recupera tu acceso y no pierdas tus {''}
                <span className="text-slate-700">proyectos</span>
            </h1>

            <form className="my-10 bg-white shadow rounded-md p-10 px-10">

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email">Email</label>
                    <input
                        className="w-full mt-2 p-3 border rounded-md bg-gray-50"
                        placeholder='Email de registro'
                        type='email'
                        id="email" />
                </div>

                <input
                    className="bg-sky-700 mb-5 w-full py-3 uppercase font-bold rounded text-white hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    value='Enviar Instrucciones'
                    type='submit' />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to='/'
                >¿Ya tienes una cuenta? Inicia Sesión</Link>

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to='/registrar'
                >¿No tienes cuenta? Regístrate</Link>
            </nav>
        </>
    );
}

export default OlvidePassword;