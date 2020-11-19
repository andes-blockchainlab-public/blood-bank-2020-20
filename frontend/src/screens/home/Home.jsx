import React from 'react';
import { useHistory } from "react-router-dom";
import Footer from "../general/footer/Footer";
import Header from "../general/header/Header";

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
                {/*  Colocar acá los servicios  */}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;