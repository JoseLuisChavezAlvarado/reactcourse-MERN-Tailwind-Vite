import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import clienteAxios from "../config/clienteAxios"
import Alerta from '../components/Alerta'

const NuevoPassword = () => {

    const [passwordModificado, setPasswordModificado] = useState(false)
    const [password, setPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [alerta, setAlerta] = useState({})

    const params = useParams()
    const { token } = params

    useEffect(() => {

        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }

        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        if (password.length < 6) {
            setAlerta({
                msg: 'El password debe ser mínimo de 6 caracteres',
                error: true
            })
            return
        }

        try {
            const url = `/usuarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    return (
        <>
            <h1 className='text-sky-600 font-black text-5xl capitalize'>
                Restablece tu password y no pierdas acceso a tus {''}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {alerta.msg && <Alerta alerta={alerta} />}

            {
                passwordModificado
                    ? <Link
                        className="block text-center my-5 text-slate-500 uppercase text-sm"
                        to='/'
                    >Inicia Sesión</Link>
                    : tokenValido &&
                    <form
                        className="my-10 bg-white shadow rounded-md p-10 px-10"
                        onSubmit={handleSubmit}>

                        <div className="my-5">
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                                htmlFor="password">Nuevo Password</label>
                            <input
                                className="w-full mt-2 p-3 border rounded-md bg-gray-50"
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Escribe tu nuevo password'
                                value={password}
                                type='password'
                                id="password" />
                        </div>

                        <input
                            className="bg-sky-700 mb-5 w-full py-3 uppercase font-bold rounded text-white hover:cursor-pointer hover:bg-sky-800 transition-colors"
                            value='Guardar nuevo password'
                            type='submit' />
                    </form>
            }

        </>
    )
}

export default NuevoPassword