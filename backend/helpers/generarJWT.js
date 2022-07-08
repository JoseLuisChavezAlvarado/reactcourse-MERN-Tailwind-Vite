import jwt from 'jsonwebtoken'

const generarJWT = (id) => {
    console.log(id);
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )
}

export default generarJWT