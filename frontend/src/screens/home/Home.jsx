import React from 'react';
import { useHistory } from "react-router-dom";
import Footer from "../general/footer/Footer";
import Header from "../general/header/Header";
import pacientes from "../../assets/sec_pacientes.png";
import hemocomp from "../../assets/sec_hemocomponentes.png";
import pruebas from "../../assets/sec_pruebas.png";
import transfusion from "../../assets/sec_transfusiones.png"
import adversos from "../../assets/sec_evento_adverso.png";

const Home = () => {

    let history = useHistory()
    let cerrarSesion = () => {
        history.push('/')
    }

    return (
        <div className="home-screen">
            <Header click={cerrarSesion} type='home' name='Sebastián'/>
            <div className="contenido">
                <h2 className="titulo">¿Que deseas hacer hoy?</h2>
                <div className="grilla-servicios">
                    <img className="img-seccion" src={pacientes} alt="Gestión de pacientes"/>
                    <img className="img-seccion" src={hemocomp} alt="Manejo de hemocomponentes"/>
                    <img className="img-seccion" src={pruebas} alt="Registro de pruebas pre transfusionales"/>
                    <img className="img-seccion img-final-1" src={transfusion} alt="Agregar Transfusión"/>
                    <img className="img-seccion img-final-2" src={adversos} alt="Reportar Evento Adverso"/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;