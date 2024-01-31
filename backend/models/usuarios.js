import mongoose from "../db/Mongodb.js"

const usuariosSchema = new mongoose.Schema({
    usuario: { type: String , required: true , unique: true,},
    password: { type: String, required: true }
});

const usuariosModel = mongoose.model("usuarios", usuariosSchema);

export default usuariosModel
export { usuariosSchema }