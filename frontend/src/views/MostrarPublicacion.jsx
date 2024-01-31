import { React, useState, useEffect, useContext } from "react";
import { getByidPublicacion } from "../components/apiMethod";
import { useParams } from "react-router-dom";
import Comentario from "../components/Comentarios";
import AgregarComentario from "../components/AgregarComentario";
import Context from "../context/Context";

const MostrarPublicacion = (props) => {
    
    const { id } = useParams();/* id del route */
    const [publicacion, setPublicacion] = useState([]);
    const [comentarios, setComentarios] = useState([false]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dato = await getByidPublicacion(id);
                setPublicacion(dato);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [comentarios]);


    const handleNuevoComentario = () => {
        setComentarios([...comentarios, true])
    }

    const context = useContext(Context);

    return (

        <>
            <div clasName="container">
                {publicacion && (
                    <div className="card mb-3">
                        <img src={publicacion.imagen} className="card-img-top" alt={publicacion.titulo}></img>
                        <div className="card-body">
                            <h5 className="card-title fw-bold fs-4 text-primary"><font color="#DC143C" face="Comic Sans MS">{publicacion.titulo}</font></h5>
                            <p className="card-text"><font color="#00008B" face="Comic Sans MS">{publicacion.descripcion}</font></p>
                            <i className="card-text"><font color="#00008B" face="Comic Sans MS"> Comentarios</font> {publicacion.comentarios?.length || 0}
                            </i>

                        </div>
                        {publicacion.comentarios &&
                            publicacion.comentarios.map((comentario, index) => (
                                <Comentario key={index} contenido={comentario.contenido} usuario={comentario.usuario} />
                            ))}
                        {context.usuarioLogin && (
                         <AgregarComentario id={id} nuevoComentario={handleNuevoComentario} />
                         )}
                    </div>
                )}
            </div>
        </>

    )

}

export default MostrarPublicacion;