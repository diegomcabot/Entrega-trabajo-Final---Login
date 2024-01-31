import usuariosModel from '../models/usuarios.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
/*import {secretkey} from "../config/config.js";*/

dotenv.config();
 
// Create a new user
const createUsuario = async (req, res) => {
   /*console.log (req.body.usuario + req.body.password)*/
    try {
        /* const hashedPassword = await bcrypt.hash(req.body.password, 10);*/
        const usuario= new usuariosModel({
            usuario: req.body.usuario,
            password: await bcrypt.hash(req.body.password, 10)
        })
     
       const existingUser = await usuariosModel.findOne({usuario: req.body.usuario});
         /*console.log (existingUser)*/
        if (existingUser) {
            return res.status(400).send("El nombre de usuario ya está en uso.");
          }

        const documento = await usuario.save()
        /*res.json(documento)*/
        return res.status(200).json({ message: 'Usuario Registrado' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating usuario' });

    }
};



const getusuario = async (req, res) => {
   /* const {usuario, password } = req.body;*/
    const usuario = req.params.usuario;
    const password = req.params.password;
   /* const secret = process.env.JWT_SECRET;*/

    console.log (usuario + password);
    console.log(process.env.secretkey);

    const user = await usuariosModel.findOne({ usuario });
    if (!user) {
      return res.status(401).send("El usuario no existe");
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send("La contraseña es incorrecta");
    }
  
   const token = jwt.sign({ usuario: user.usuario }, process.env.SECRET, { expiresIn: "1h" });

   /* const token = jwt.sign(
			{
				usuario: user.usuario,
				password: user.password,
			},
			secret,
			{
				expiresIn: process.env.JWT_SECRET,
			});
  */
   /* res.status(200).send({usuario, token });*/

    res.status(200).json({
			usuario: usuario,
			token: token
		});
 
  }
/*export const secretkey = process.env.SECRET_KEY*/
export { createUsuario, getusuario}
