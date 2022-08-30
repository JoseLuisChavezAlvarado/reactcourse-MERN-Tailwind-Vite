import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {

    const [email, setEmail] = useState('')

    const { mostrarAlerta, alerta, submitColaborador } = useProyectos()

    const handleSubmit = e => {
        e.preventDefault()

        if (email === '') {
            mostrarAlerta({
                msg: 'El campo es obligatorio',
                error: true
            })
            return
        }

        submitColaborador(email)
    }

    return (
        <form
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}     >

            {
                alerta?.msg &&
                <Alerta alerta={alerta} />
            }

            <div className='mb-5'>

                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor='email'>Email Colaborador</label>

                <input
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Email del Usuario'
                    type="email"
                    value={email}
                    id='email' />

            </div>

            <input
                className='text-sm bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded'
                value='Buscar colaborador'
                type='submit' />

        </form>
    );
}

export default FormularioColaborador;