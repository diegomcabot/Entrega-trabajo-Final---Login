import React, { useState, useEffect, useContext} from "react";
import { getusuario } from "../components/apiMethod";
import { useParams, useNavigate} from "react-router-dom";
import MensajeAlerta from "../components/MensajeAlerta";
import Context from "../context/Context";

const Login = () => {

    const [getState, setGetState] = useState({ usuario: "", password: "" })
    const [datosGuardados, setDatosGuardados] = useState(false);
    const [datosError, setDatosError] = useState(false);
    const { id } = useParams();
    const navegar = useNavigate();/*regresar al home*/
    const context = useContext(Context);

    const handleLogin = async (event) => {
        try {
            event.preventDefault();
            const datos = { usuario: getState.usuario, password: getState.password }
            const retornoLogin = await getusuario(datos);
            localStorage.setItem("token", retornoLogin.token);
            localStorage.setItem("usuario", retornoLogin.usuario);
           /* setDatosGuardados(true);*/
            context.setUsuarioLogin(retornoLogin.usuario);
            console.log ( "retornoLogin.usuario: " + retornoLogin.usuario)
            navegar("/"); 
     
            /*props.setIsLoggedIn (true);*/
        } catch (error) {
           localStorage.removeItem("usuario");
		       localStorage.removeItem("token");
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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const dato = await getusuario(id);
                setGetState(dato);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    return(
      <>
        <div className="container">
          <form onSubmit={handleLogin} >
            <div className="row mb-5">
            <font color="#00008B" face="Comic Sans MS"> 
              <h2>Login</h2>
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
              {datosError && <MensajeAlerta tipoMensaje="alert alert-danger" mensaje="Usuario o Password incorrectos" setAlertState={setDatosError} />}
              <button type="submit" className="btn btn-primary mb-3" >Login</button>
            </div>
          </form>
          
        </div>
      </>
  
    )

}

export default Login;