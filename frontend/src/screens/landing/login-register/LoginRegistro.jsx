import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import icCerrar from '../../../assets/cerrar.png'
import CargandoContext from '../../general/CargandoContext';

const LoginRegistro = ({cerrar}) => {

    let history = useHistory()
    let { correrIndicadorCarga, quitarIndicadorCarga } = useContext(CargandoContext)
    const [form, setForm] = useState({
        correo: '',
        contrasenia: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // correrIndicadorCarga()
        history.push('/home')
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <div className="fondo-dialogo-login">
            <div className="fondo-dialogo-rc" onClick={cerrar}/>
            <div className="dialogo">
                <img onClick={cerrar} className="cerrar" src={icCerrar} alt="Cerrar"/>
                <h1 className="titulo">Iniciar Sesión</h1>
                <form className="form-iniciar" onSubmit={handleSubmit}>
                    <div className="columna-campo">
                        <label className="campo-texto" htmlFor="correo">Correo electrónico</label>
                        <input required className="input-iniciar" name="correo" type="email"
                               value={form.correo}
                               maxLength={100}
                               onChange={handleChange}/>
                    </div>
                    <div className="columna-campo">
                        <label className="campo-texto" htmlFor="contrasenia">Contraseña</label>
                        <input required className="input-iniciar" name="contrasenia" type='password'
                               value={form.contrasenia}
                               maxLength={20}
                               onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn-redondo boton-enviar">Ingresar</button>
                </form>
            </div>
        </div>
    );
}

LoginRegistro.propTypes = {
    cerrar: PropTypes.func.isRequired,
};

export default LoginRegistro;