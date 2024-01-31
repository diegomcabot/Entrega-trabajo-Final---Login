import React, { useEffect, useState , useContext } from "react"
import { Link } from "react-router-dom";
import Context from "../context/Context";

const Card = (props) => {

    const handleEliminar = () => {
       props.referencia.current.scrollIntoView({ inline: "center" , behavior: "smooth", scrollMode: "always" })
        props.stateHomeEliminar({
            estado: true,
            id: props.id
        })

    }
    const context = useContext(Context);
    return (
        <>
            <div className="col-md-4 mb-4">
                <div className="card" style={{ width: '18rem' }}>
                    <img src={props.imagen} className="card-img-top" alt={props.titulo}></img>
                    <div className="card-body">
                        <h5 className="card-title fw-bold fs-4 text-primary"><font color="#DC143C" face="Comic Sans MS">{props.titulo}</font></h5>
                        <p className="card-text"><font color="#00008B" face="Comic Sans MS">{props.descripcion}</font></p>
                        {context.usuarioLogin && (
                        <Link to={"/EditarPublicacion/" + props.id}><i className="fas fa-edit"></i></Link>
                        )}
                        {context.usuarioLogin && (
                        <button onClick={handleEliminar}><i className="fas fa-trash"></i> </button>
                         )}
                        <Link to={"/mostrarPublicacion/" + props.id} className="btn btn-primary"><font color="#7FFF00" face="Comic Sans MS">Info + Comentarios</font></Link>
                    </div>
                </div>
            </div >
        </>
    )

}

export default Card;