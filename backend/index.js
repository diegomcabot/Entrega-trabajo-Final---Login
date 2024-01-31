import express, { json } from 'express';
import publicacionesRoutes from './routes/publicaciones.js';
import comentariosRoutes from './routes/comentarios.js'
import usuariosRoutes from './routes/usuarios.js'
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import path from "path";
import cors from 'cors';
/*import {port} from "../config/config.js"*/
/*import TokenMiddleware from "./middleware/tokenmiddleware.js"*/

import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 8080
export const secretkey = process.env.SECRET_KEY



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node Swagger API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

const app = express();
const PORT = 5000;


app.use(express.json());
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions));
app.use('/publicaciones', publicacionesRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





