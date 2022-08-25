import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {

    const [alerta, setAlerta] = useState({})
    const [email, setEmail] = useState('')
    const [nombre, setNombre] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const hanldeSubmit = async e => {
        e.preventDefault()

        //VALIDAR CAMPOS VACÍOS 
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: 'Las contraseñas no coinciden',
                error: true
            })
            return
        }

        if (password.length < 6) {
            setAlerta({
                msg: 'La contraseña debe ser de más de 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        //CREAR EL USUARIO POR API
        try {
            const respuesta = await clienteAxios.post('/usuarios', { email, nombre, password })
            setAlerta({ msg: respuesta.data.msg, error: false })

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')

        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true })
        }
    }

    return (
        <>
            <h1 className='text-sky-600 font-black text-5xl capitalize'>
                Inicia sesión y administra tus {''}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {
                alerta.msg &&
                <Alerta alerta={alerta} />
            }

            <form
                className="my-10 bg-white shadow rounded-md p-10 px-10"
                onSubmit={hanldeSubmit}>

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="nombre">Nombre</label>
                    <input
                        className="w-full mt-2 p-3 border rounded-md bg-gray-50"
                        onChange={e => setNombre(e.target.value)}
                        placeholder='Tu nombre'
                        value={nombre}
                        type='name'
                        id="nombre" />
                </div>

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email">Email</label>
                    <input
                        className="w-full mt-2 p-3 border rounded-md bg-gray-50"
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Email de registro'
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

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="repetir-password">Repetir Password</label>
                    <input
                        className="w-full mt-2 p-3 border rounded-md bg-gray-50"
                        onChange={e => setRepetirPassword(e.target.value)}
                        placeholder='Repite tu password'
                        value={repetirPassword}
                        type='password'
                        id="repetir-password" />
                </div>


                <input
                    className="bg-sky-700 mb-5 w-full py-3 uppercase font-bold rounded text-white hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    value='Crear cuenta'
                    type='submit' />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to='/'
                >¿Ya tienes una cuenta? Inicia Sesión</Link>

                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to='/olvide-password'
                >Olvidé mi password</Link>
            </nav>
        </>
    );
}

export default Registrar;