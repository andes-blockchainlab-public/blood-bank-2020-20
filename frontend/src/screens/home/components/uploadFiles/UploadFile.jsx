import React, {useContext, useState} from 'react';
import {upload} from "../../../../actions/UploadActions"
import CargandoContext from "../../../general/CargandoContext";
import PropTypes from "prop-types";
import back from "../../../../assets/ic_back.png";

const UploadFile = ({volver}) => {
    let {correrIndicadorCarga, quitarIndicadorCarga} = useContext(CargandoContext)
    const [form, setForm] = useState({
        file: null
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        let session = sessionStorage.getItem('token')
        if (!session)
            return alert("Necesitas autenticarte para realizar la transacción")
        correrIndicadorCarga()
        let res = await upload(form, session)
        quitarIndicadorCarga()
        setForm({...form, respuesta: JSON.stringify(res, undefined, 4)})
    }
    const selectFile = (event) => {
        setForm({...form, file: event.target.files[0]});
    };
    return (
        <div className="upload-detail">
            <div className="fila-inicio">
                <img className="volver" onClick={volver} src={back} alt={"Volver"}/>
                <h2 className="titulo">Selecciona la tarea que quieres hacer</h2>
            </div>
            <div className="opciones">
                <button
                        className="btn-acciones btn-header">Cargar
                    archivos
                </button>
            </div>
            <div className="informacion-enviar">
                <h3 className="titulo-seccion">Carga de archvios</h3>
                <form className="form-envio" onSubmit={handleSubmit}>
                    <div className="grilla-campos">
                        <div className="columna-campo">
                            <label className="campo-texto" htmlFor="hemocomponentId">Selecciona el archivo que quieres cargar</label>
                            <input required className="input-iniciar" name="file" type="file"
                                   accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                   onChange={selectFile}/>
                        </div>
                    </div>
                    <button type="submit"
                            className="btn-redondo boton-enviar">Agregar</button>
                </form>
            </div>
            <div className="resultado-informacion">
                <h3 className="titulo-seccion">Resultado del API</h3>
                <div className="columna-campo">
                    <label className="campo-texto" htmlFor="nombre">Respuesta</label>
                    <textarea disabled className="text-area" name="bloodtype" rows={14}
                              value={form.respuesta}/>
                </div>
            </div>
        </div>
    );
}

UploadFile.propTypes = {
    volver: PropTypes.func.isRequired,
};

export default UploadFile;