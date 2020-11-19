import React from 'react';
import Header from "./header/Header";
import pc from '../../assets/pc_inicio.png'
import adversos from '../../assets/eve_adversos.png'
import inventario from '../../assets/inventario.png'
import transfusion from '../../assets/res_transfusiones.png'
import Footer from "../general/footer/Footer";

const Home = () => {
    return (
        <div className="home-screen">
            <Header/>
            <div className="contenido">
                <div className="fila-inicio">
                    <img className="img-pc" src={pc} alt=""/>
                    <div className="columna-texto">
                        <div className="info">
                            <h2 className="blockchain">Blockchain</h2>
                            <p className="txt-blockchain">Cuida toda tu información desde un mismo lugar y evita que sea
                                modificada en el tiempo gracias las herramientas innovadoras tecnológicas
                                disponibles</p>
                            <button className="btn-header btn">Accede</button>
                        </div>
                    </div>
                </div>
                <div className="grilla-beneficios">
                    <h4 className="titulos">Resultados<br/>Transfusiones</h4>
                    <h4 className="titulos">Manejo<br/>Inventario</h4>
                    <h4 className="titulos">Eventos<br/>Adversos</h4>
                    <img src={transfusion} alt="Resultados Transfusiones"/>
                    <img src={inventario} alt="Manejo Inventario"/>
                    <img src={adversos} alt="Eventos Adversos"/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;