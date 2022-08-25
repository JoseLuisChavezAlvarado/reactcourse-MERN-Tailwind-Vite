import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState('')

    const { setAuth } = useAuth()

    const handleSubmit = async e => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            localStorage.setItem('token', data.token)
            setAlerta({})
            setAuth(data)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta

    return (
        <>
            <h1 className='text-sky-600 font-black text-5xl capitalize'>
                Inicia sesión y administra tus {''}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            <form
                className="my-10 bg-white shadow rounded-md p-10 px-10"
                onSubmit={handleSubmit}>

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email">Email</label>
                    <input
                        className="w-full mt-2 p-3 border rounded-md bg-gray-50"
                        placeholder='Email de registro'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type='email'
                        id="email" />
                </div>

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password">Password</label>
                    <input
                        className="w-full mt-2 p-3 border rounded-md bg-gray-50"
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password de registro'
                        value={password}
                        type='password'

                        id="password" />
                </div>

                <input
                    className="bg-sky-700 mb-5 w-full py-3 uppercase font-bold rounded text-white hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    value='Iniciar Sesion'
                    type='submit' />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to='/registrar'
                >¿No tienes cuenta? Regístrate</Link>

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to='/olvide-password'
                >Olvidé mi password</Link>
            </nav>
        </>
    );
}

export default Login;