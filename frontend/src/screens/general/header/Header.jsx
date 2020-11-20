import React from 'react';
import bloques from '../../../assets/bloques_inicio.png'
import ondas from '../../../assets/onda_header.png'
import PropTypes from "prop-types";

const Header = ({click, type, name}) => {
    return (
        <div className="header-home">
            <img className="ondas" src={ondas} alt="Ondas"/>
            <div className="fila-logo">
                <h3 className="logo-eps"><span className="bold">Keralty - U. Andes</span></h3>
                <button onClick={click}
                        className="btn-header btn-ingresar">{type === 'home' || type === 'detail' ? 'Cerrar Sesión' : 'Ingresar'}</button>
            </div>
            <h1 className={"titulo-inicio"}>{type === 'home' ? "¡Bienvenido " + name + "!" :
                type === 'detail' ? name : 'Blood Block'}</h1>
            {type === 'home' || type === 'detail' ? '' : <img className="img-bloques" src={bloques} alt="Bloques"/>}
        </div>
    );
}

Header.propTypes = {
    click: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string
};

export default Header;