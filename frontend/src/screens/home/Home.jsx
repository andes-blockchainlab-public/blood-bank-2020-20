import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import Footer from "../general/footer/Footer";
import Header from "../general/header/Header";
import Options from "./components/Options";
import Hemocomponents from "./components/Hemocomponents";
import Patients from "./components/Patients";
import Transfusion from "./components/Transfusion";
import AdverseEffects from "./components/AdverseEffects";
import PreTransfusion from "./components/PreTransfusion";

const Home = () => {
    const [actual, setActual] = useState('options')
    const [name, setName] = useState('Sebastián')
    const [header, setHeader] = useState('home')
    let history = useHistory()
    let cerrarSesion = () => {
        history.push('/')
    }
    let cambiarEstadoNombre = (screen, name) => {
        setActual(screen)
        setName(name)
        setHeader('detail')
    }
    return (
        <div className="home-screen">
            <Header click={cerrarSesion} type={header} name={name}/>
            <div className="contenedor">
                {actual === 'hemocomponents' ? <Hemocomponents/> :
                    actual === 'patients' ? <Patients/> :
                        actual === 'transfusion' ? <Transfusion/> :
                            actual === 'adverse' ? <AdverseEffects/> :
                                actual === 'tests' ? <PreTransfusion/> :
                                    <Options seleccionar={cambiarEstadoNombre}/>}
            </div>
            <Footer/>
        </div>
    );
}

export default Home;