import React, {useContext, useState} from 'react';
import {create, actualizar, consultar, consultarPorId} from "../../../../actions/PatientsActions"
import CargandoContext from "../../../general/CargandoContext";
import PropTypes from "prop-types";
import back from "../../../../assets/ic_back.png";

function Patients({volver}) {
    let {correrIndicadorCarga, quitarIndicadorCarga} = useContext(CargandoContext)
    const [selected, setSelected] = useState('crear')
    const [form, setForm] = useState({
        id: '',
        name: '',
        bloodType: '',
        respuesta: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        let session = sessionStorage.getItem('token')
        if (!session)
            return alert("Necesitas autenticarte para realizar la transacción")
        correrIndicadorCarga()
        let res = ''
        switch (selected) {
            case "crear":
                res = await create(form, session)
                break
            case "actualizar":
                res = await actualizar(form, session)
                break
            case "consultarId":
                res = await consultarPorId(form, session)
                break
            default:
                res = await consultar(form, session)
        }
        quitarIndicadorCarga()
        setForm({...form, respuesta: JSON.stringify(res, undefined, 4)})
    }
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    let cambiar = ['crear', 'actualizar']
    return (
        <div className="patients-detail">
            <div className="fila-inicio">
                <img className="volver" onClick={volver} src={back} alt={"Volver"}/>
                <h2 className="titulo">Selecciona la tarea que quieres hacer</h2>
            </div>
            <div className="opciones">
                <button onClick={() => setSelected('crear')}
                        className={"btn-acciones " + (selected === 'crear' ? "btn-header" : "btn-opcion")}>Crear
                    paciente
                </button>
                <button onClick={() => setSelected('actualizar')}
                        className={"btn-acciones " + (selected === 'actualizar' ? "btn-header" : "btn-opcion")}>Actualizar
                    paciente
                </button>
                <button onClick={() => setSelected('consultarId')}
                        className={"btn-acciones " + (selected === 'consultarId' ? "btn-header" : "btn-opcion")}>Consultar
                    paciente por identificador
                </button>
                <button onClick={() => setSelected('consultar')}
                        className={"btn-acciones " + (selected === 'consultar' ? "btn-header" : "btn-opcion")}>Consultar
                    pacientes
                </button>
            </div>
            <div className="informacion-enviar">
                <h3 className="titulo-seccion">Datos del paciente</h3>
                <form className="form-envio" onSubmit={handleSubmit}>
                    <div className="grilla-campos">
                        {(cambiar.includes(selected) || selected === 'consultarId') && <div className="columna-campo">
                            <label className="campo-texto" htmlFor="id">Id Paciente</label>
                            <input required className="input-iniciar" name="id" type="text"
                                   value={form.id}
                                   maxLength={150}
                                   onChange={handleChange}/>
                        </div>}
                        {cambiar.includes(selected) && <div className="columna-campo">
                            <label className="campo-texto" htmlFor="name">Nombre paciente</label>
                            <input required className="input-iniciar" name="name" type="text"
                                   value={form.name}
                                   maxLength={150}
                                   onChange={handleChange}/>
                        </div>}
                        {cambiar.includes(selected) && <div className="columna-campo">
                            <label className="campo-texto" htmlFor="bloodType">Tipo de sangre</label>
                            <input required className="input-iniciar" name="bloodType" type="text"
                                   value={form.bloodType}
                                   maxLength={150}
                                   onChange={handleChange}/>
                        </div>}
                    </div>
                    <button type="submit"
                            className="btn-redondo boton-enviar">{selected === "crear" ? "Crear" :
                        selected === "actualizar" ? "Actualizar" : "Consultar"}</button>
                </form>
            </div>
            <div className="resultado-informacion">
                <h3 className="titulo-seccion">Resultado del API</h3>
                <div className="columna-campo">
                    <label className="campo-texto" htmlFor="nombre">Respuesta</label>
                    <textarea disabled className="text-area" name="bloodType" rows={14}
                              value={form.respuesta}/>
                </div>
            </div>
        </div>
    );
}

Patients.propTypes = {
    volver: PropTypes.func.isRequired,
};

export default Patients;