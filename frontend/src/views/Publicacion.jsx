import React from "react";
import { useState, useEffect } from "react";
import { createPublicacion } from "../components/apiMethod"
import MensajeAlerta from "../components/MensajeAlerta";


const Publicacion = () => {

  const [publicarForm, setPublicarForm] = useState({ titulo: '', imagen: '', descripcion: '' });
  const [datosGuardados, setDatosGuardados] = useState(false);
  const [datosError, setDatosError] = useState(false);
  const mensaje = validarDatos(publicarForm);


  const handleOnchange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setPublicarForm({ ...publicarForm, [name]: value })

  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const result = await createPublicacion(publicarForm);
      if (result) {
        setPublicarForm({ titulo: '', imagen: '', descripcion: '' });
        setDatosGuardados(true);
        setDatosError(false);
      } else {
        setDatosError(true);
        setDatosGuardados(false);
      }

    } catch (error) {
      setDatosError(true);
      setDatosGuardados(false);

    }
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} >
          <div className="row mb-5">
          <font color="#00008B" face="Comic Sans MS"> 
            <h2>Nueva Pesca</h2>
            </font>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label col-form-label-lg">  <font color="#00008B" face="Comic Sans MS">  Especie: </font></label>
            <div className="col-sm-10">
              <input type="text" className="form-control form-control-lg" id="titulo" name="titulo" placeholder="Especie" onChange={handleOnchange}></input>
              <p className="text-sm-start" style={{ color: "red" }}>{mensaje.tituloMsg}</p>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-2 col-form-label col-form-label-lg"> <font color="#00008B" face="Comic Sans MS"> Imagen: </font></label>
            <div className="col-sm-10">
              <input type="text" className="form-control form-control-lg" id="imagen" name="imagen" placeholder="URL Imagen" onChange={handleOnchange}></input>
              <p className="text-sm-start" style={{ color: "red" }}>{mensaje.imagenMsg}</p>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-2 col-form-label col-form-label-lg"> <font color="#00008B" face="Comic Sans MS"> Descripción: </font></label>
            <div className="col-sm-10">
              <textarea type="text" className="form-control form-control-lg" id="descripcion" name="descripcion" placeholder="Ej: Lugar/Fecha/Clima" onChange={handleOnchange}></textarea>
              <p className="text-sm-start" style={{ color: "red" }}>{mensaje.descripcionMsg}</p>
            </div>
          </div>

          <div className="mb-3">
            {datosGuardados && <MensajeAlerta tipoMensaje="alert alert-success" mensaje="Los datos se han guardado correctamente." setAlertState={setDatosGuardados} />}
            {datosError && <MensajeAlerta tipoMensaje="alert alert-danger" mensaje="Error: los datos no han sido guardados." setAlertState={setDatosError} />}
            <button type="submit" className="btn btn-primary mb-3" >Publicar</button>
          </div>

        </form>
      </div>
    </>

  )

}

const validarDatos = (datos) => {

  const mensajeObj = {
    tituloMsg: '',
    imagenMsg: '',
    descripcionMsg: ''
  };

  if (datos.titulo.length === 0) {
    const mensajeObj = {
      tituloMsg: 'Obligatorio',
      imagenMsg: '',
      descripcionMsg: ''
    };
    return mensajeObj;
  } else {
    if (datos.imagen.length === 0) {
      const mensajeObj = {
        tituloMsg: '',
        imagenMsg: 'Obligatorio',
        descripcionMsg: ''
      };
      return mensajeObj;
    } else {
      if (datos.descripcion.length === 0) {
        const mensajeObj = {
          tituloMsg: '',
          imagenMsg: '',
          descripcionMsg: 'Obligatorio'
        };
        return mensajeObj;
      }
    }
  }
  return mensajeObj;
}

export default Publicacion