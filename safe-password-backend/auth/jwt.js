import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (userValidated) => {
	return jwt.sign(
		JSON.stringify(userValidated['_id']), 
		process.env.SECRET_KEY 
	)
}

export const validateToken = (req, res, next) => {
	const { authorization } = req.headers

    if (authorization !== 'undefined') {
	
        const bearer = authorization.split(' ')
        const bearerToken = bearer[1]
		
		try {

			const tokenVerified = jwt.verify(bearerToken, process.env.SECRET_KEY)
			req.token = tokenVerified

			next()
			
		} catch (error) {
			
			res.status(403).json({message: 'unauthoized user'})

		}
        
    } else {
 
        res.status(403).json({message: 'unauthoized user'})
    }
}