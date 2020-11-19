import React from 'react';
import bloques from '../../../assets/bloques_inicio.png'
import ondas from '../../../assets/onda_header.png'

function Header(props) {
    return (
        <div className="header-home">
            <img className="ondas" src={ondas} alt="Ondas"/>
            <div className="fila-logo">
                <h3 className="logo-eps"><span className="bold">EPS</span> Sanitas</h3>
                <button className="btn-header btn-ingresar">Ingresar</button>
            </div>
            <h1 className={"titulo-inicio"}>Blood Block</h1>
            <img className="img-bloques" src={bloques} alt="Bloques"/>
        </div>
    );
}

export default Header;