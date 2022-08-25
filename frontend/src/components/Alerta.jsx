const Alerta = ({ alerta }) => {
    return (
        <h1 className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} text-center bg-gradient-to-br p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}>
            {alerta.msg}
        </h1>
    );
}

export default Alerta;