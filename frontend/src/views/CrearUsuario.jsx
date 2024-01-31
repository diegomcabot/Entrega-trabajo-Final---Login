import React, { useState, useEffect, useContext} from "react";
import { useParams, useNavigate} from "react-router-dom";
import MensajeAlerta from "../components/MensajeAlerta";
import Context from "../context/Context";
import { createUsuario } from "../components/apiMethod";

const CrearUsuario = () => {

    const [getState, setGetState] = useState({ usuario: "", password: "" })
    const [datosGuardados, setDatosGuardados] = useState(false);
    const [datosError, setDatosError] = useState(false);
    const navegar = useNavigate();/*regresar al home*/
   

    const handleCreate = async (event) => {
        try {
            event.preventDefault();
            const datos = { usuario: getState.usuario, password: getState.password }
            const retornoCreate = await createUsuario(datos);
            setDatosGuardados (true); 
            alert("Usuario Creado Correctamente, Ingrese por Login");
            navegar("/");
     
            /*props.setIsLoggedIn (true);*/
        } catch (error) {
            setDatosError(true);
        }
    }

    const handleOnchange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setGetState({ ...getState, [name]: value })

    }

    const handleCancelar = () => {
        navegar("/");
    }


    return(
      <>
        <div className="container">
          <form onSubmit={handleCreate} >
            <div className="row mb-5">
            <font color="#00008B" face="Comic Sans MS"> 
              <h2>Crear Uruario</h2>
              </font>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg">  <font color="#00008B" face="Comic Sans MS">  Usuario: </font></label>
              <div className="col-sm-10">
                <input type="text" className="form-control form-control-lg" id="usuario" name="usuario" placeholder="usuario" onChange={handleOnchange}></input>
                <p className="text-sm-start" style={{ color: "red" }}></p>
              </div>
            </div>
  
           <div className="row mb-3">
              <label className="col-sm-2 col-form-label col-form-label-lg"> <font color="#00008B" face="Comic Sans MS"> Password: </font></label>
              <div className="col-sm-10">
                <input type="password" className="form-control form-control-lg" id="password" name="password" placeholder="password"  onChange={handleOnchange} ></input>
                <p className="text-sm-start" style={{ color: "red" }}></p>
              </div>
            </div>
 
            <div className="mb-3">
              {datosGuardados && <MensajeAlerta tipoMensaje="alert alert-success" mensaje="Los datos se han guardado correctamente." setAlertState={setDatosGuardados} />}
              {datosError && <MensajeAlerta tipoMensaje="alert alert-danger" mensaje="No se creo el Usuario." setAlertState={setDatosError} />}
              <button type="submit" className="btn btn-primary mb-3" >Crear Usuario</button>
            </div>
          </form>
          
        </div>
      </>
  
    )

}

export default CrearUsuario;