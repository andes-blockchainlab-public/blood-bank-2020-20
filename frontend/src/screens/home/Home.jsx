import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import Footer from "../general/footer/Footer";
import Header from "../general/header/Header";
import Options from "./components/Options";
import Hemocomponents from "./components/hemocomponents/Hemocomponents";
import Patients from "./components/patients/Patients";
import Transfusion from "./components/transfusion/Transfusion";
import AdverseEffects from "./components/adverseEffects/AdverseEffects";
import PreTransfusion from "./components/testsPre/PreTransfusion";

const Home = () => {
    let history = useHistory()
    useEffect(() => {
        if (!sessionStorage.getItem('token'))
            history.push("/")
    })
    const [actual, setActual] = useState('options')
    const [name, setName] = useState('Sebastián')
    const [header, setHeader] = useState('home')
    let cerrarSesion = () => {
        sessionStorage.clear()
        history.push('/')
    }
    let cambiarEstadoNombre = (screen, name) => {
        setActual(screen)
        setName(name)
        setHeader('detail')
    }
    let volver = () => {
        setActual('options')
        setName('Sebastián')
        setHeader('home')
    }
    return (
        <div className="home-screen">
            <Header click={cerrarSesion} type={header} name={name}/>
            <div className="contenedor">
                {actual === 'hemocomponents' ? <Hemocomponents volver={volver}/> :
                    actual === 'patients' ? <Patients volver={volver}/> :
                        actual === 'transfusion' ? <Transfusion volver={volver}/> :
                            actual === 'adverse' ? <AdverseEffects volver={volver}/> :
                                actual === 'tests' ? <PreTransfusion volver={volver}/> :
                                    <Options seleccionar={cambiarEstadoNombre}/>}
            </div>
            <Footer/>
        </div>
    );
}

export default Home;