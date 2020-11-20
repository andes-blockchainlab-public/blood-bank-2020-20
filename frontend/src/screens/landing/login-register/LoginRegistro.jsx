import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import PropTypes from 'prop-types';
import icCerrar from '../../../assets/cerrar.png'
import CargandoContext from '../../general/CargandoContext';
import {registro, login} from "../../../actions/AuthActions"

const LoginRegistro = ({cerrar}) => {

    let history = useHistory()
    let {correrIndicadorCarga, quitarIndicadorCarga} = useContext(CargandoContext)
    const [form, setForm] = useState({
        nombre: '',
        correo: '',
        contrasenia: ''
    })

    const [loginSelected, setLoginSelected] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()
        correrIndicadorCarga()
        if (loginSelected) {
            let res = await login(form)
            quitarIndicadorCarga()
            if (res.error)
                alert(res.message)
            else {
                sessionStorage.setItem('token', res.token)
                history.push('/home')
            }
        } else {
            let res = await registro(form)
            quitarIndicadorCarga()
            if (res.error)
                alert(res.message)
            else {
                sessionStorage.setItem('token', res.token)
                history.push('/home')
            }
        }
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <div className="fondo-dialogo-login">
            <div className="fondo-dialogo-rc" onClick={cerrar}/>
            <div className="dialogo">
                <img onClick={cerrar} className="cerrar" src={icCerrar} alt="Cerrar"/>
                <h1 className="titulo">{loginSelected ? "Iniciar Sesión" : "Regístrate"}</h1>
                <form className="form-iniciar" onSubmit={handleSubmit}>
                    {!loginSelected && <div className="columna-campo">
                        <label className="campo-texto" htmlFor="nombre">Nombre</label>
                        <input required className="input-iniciar" name="nombre" type="text"
                               value={form.nombre}
                               maxLength={150}
                               onChange={handleChange}/>
                    </div>}
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
                    <p onClick={() => setLoginSelected(!loginSelected)}
                       className="btn-registro">{loginSelected ? "No tienes una cuenta, regístrate acá" : "Ya tienes una cuenta, accede acá"}</p>
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