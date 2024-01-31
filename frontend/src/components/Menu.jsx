import React, { useState, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import Context from "../context/Context";
const Menu = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const context = useContext(Context);

  /*const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("usuario")); */// Cambia este estado según tu lógica de autenticación
 
 

 const navigate = useNavigate();
 const usuario = localStorage.getItem("usuario");
  /*console.log(usuario);*/
 
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleLogout = () => {
    // Agrega lógica para realizar el logout, por ejemplo, eliminando tokens, etc.
    /*setIsLoggedIn(false);*/
    context.setUsuarioLogin(false);

    localStorage.removeItem("usuario");
		localStorage.removeItem("token");

		// Redirige al login
		navigate("/login");

  };



  return (
    <Context.Consumer>
      {context =>
    <>
      <header className="text-center" name="home">
        {/* ... (código anterior) ... */}
      </header>
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <font color="#DC143C" face="Comic Sans MS">Inicio</font>
            </Link>
            {context.usuarioLogin ? (
              // Si está logueado, muestra el botón de logout
              <>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <button className="nav-button" onClick={handleLogout}>
                      <font color="#00078B" face="Comic Sans MS">
                        Logout
                      </font>
                    </button>
                  </li>
                </ul>
                {/* Muestra "Publicar Pescas" solo si está logueado */}
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll navmenu">
                  <li className="nav-item">
                    <Link className="nav-button" to="/Publicar">
                      <font color="#00008B" face="Comic Sans MS">
                        Publicar Pesca
                      </font>
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              // Si no está logueado, muestra el botón de login
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link className="nav-button" to="/login"> 
                    <font color="#00078B" face="Comic Sans MS">
                      -Login-  
                    </font>
                  </Link>
                </li>

                <li className="nav-item">
                <Link className="nav-button" to="/CrearUsuario"> 
                    <font color="#00078B" face="Comic Sans MS">
                       -Crear Usuario-
                    </font>
                  </Link>
                </li>

              </ul>

              
            )}
            {/* Botón de hamburguesa y resto del navbar */}
            {/* ... (código anterior) ... */}
          </div>
        </nav>
      </div>
    </>}
    </Context.Consumer>
  );
};

export default Menu;
