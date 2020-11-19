import React, {useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import CargandoContext from './screens/general/CargandoContext';
import './screens/general/main.sass';
import Loading from "./screens/general/Loading";
import Landing from "./screens/landing/Landing";
import Home from "./screens/home/Home";

const App = () => {

    const [cargando, setCargando] = useState(false)

    return (
        <CargandoContext.Provider value={{
            correrIndicadorCarga: () => setCargando(true),
            quitarIndicadorCarga: () => setCargando(false)
        }}>
            <BrowserRouter>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/home" component={Home}/>
            </BrowserRouter>
            {
                cargando &&
                <Loading/>
            }
        </CargandoContext.Provider>
    );
}

export default App;
