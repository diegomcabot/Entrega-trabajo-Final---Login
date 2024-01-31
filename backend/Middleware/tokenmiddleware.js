import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

 const TokenMiddleware = (req,res,next) => {
     const token = req.headers.authorization;
     
    if(!token) {
    return res.status(401).json({message: "No posee token"});    
    }
     
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.status(401).json({message: "No autorizado"});
        req.user = user;
        next();
    })
    
 }

export default TokenMiddleware