import React, {useContext, useState} from 'react';
import {create} from "../../../../actions/TransfusionActions"
import CargandoContext from "../../../general/CargandoContext";
import PropTypes from "prop-types";
import back from "../../../../assets/ic_back.png";

const Transfusion = ({volver}) => {
    let {correrIndicadorCarga, quitarIndicadorCarga} = useContext(CargandoContext)
    const [form, setForm] = useState({
        hemocomponentId: '',
        patientId: '',
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        let session = sessionStorage.getItem('token')
        if (!session)
            return alert("Necesitas autenticarte para realizar la transacción")
        correrIndicadorCarga()
        let res = await create(form, session)
        quitarIndicadorCarga()
        setForm({...form, respuesta: JSON.stringify(res, undefined, 4)})
    }
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    return (
        <div className="transfusion-detail">
            <div className="fila-inicio">
                <img className="volver" onClick={volver} src={back} alt={"Volver"}/>
                <h2 className="titulo">Selecciona la tarea que quieres hacer</h2>
            </div>
            <div className="opciones">
                <button
                        className="btn-acciones btn-header">Crear
                    transfusión
                </button>
            </div>
            <div className="informacion-enviar">
                <h3 className="titulo-seccion">Datos de la transfusión</h3>
                <form className="form-envio" onSubmit={handleSubmit}>
                    <div className="grilla-campos">
                        <div className="columna-campo">
                            <label className="campo-texto" htmlFor="hemocomponentId">Id del hemocomponente</label>
                            <input required className="input-iniciar" name="hemocomponentId" type="text"
                                   value={form.hemocomponentId}
                                   maxLength={150}
                                   onChange={handleChange}/>
                        </div>
                        <div className="columna-campo">
                            <label className="campo-texto" htmlFor="patientId">Id del paciente</label>
                            <input required className="input-iniciar" name="patientId" type="text"
                                   value={form.patientId}
                                   maxLength={150}
                                   onChange={handleChange}/>
                        </div>
                    </div>
                    <button type="submit"
                            className="btn-redondo boton-enviar">Crear</button>
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

Transfusion.propTypes = {
    volver: PropTypes.func.isRequired,
};

export default Transfusion;