import { React, useState } from "react";
import Context from "./Context";

function GlobalStatete({ children }) {
    const [usuarioLogin, setUsuarioLogin] = useState(localStorage.getItem('usuario'));
    return (
        <Context.Provider
            value={{
                setUsuarioLogin,
                usuarioLogin
            }}
        >
            {children}
        </Context.Provider>
    )
} 

export default GlobalStatete;