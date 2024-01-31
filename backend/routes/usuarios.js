import express from 'express';
const router = express.Router();
import { createUsuario, getusuario } from '../controllers/usuarios_controller.js';


router.get('/:usuario/:password', getusuario);
router.post('/', createUsuario );

export default router;