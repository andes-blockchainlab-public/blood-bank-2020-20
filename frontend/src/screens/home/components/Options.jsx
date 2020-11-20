import React from 'react';
import pacientes from "../../../assets/sec_pacientes.png";
import hemocomp from "../../../assets/sec_hemocomponentes.png";
import pruebas from "../../../assets/sec_pruebas.png";
import transfusion from "../../../assets/sec_transfusiones.png";
import adversos from "../../../assets/sec_evento_adverso.png";
import PropTypes from 'prop-types'

const Options = ({seleccionar}) => {
    return (
        <div className="contenido">
            <h2 className="titulo">¿Que deseas hacer hoy?</h2>
            <div className="grilla-servicios">
                <img onClick={()=>seleccionar('patients', 'Pacientes')} className="img-seccion" src={pacientes} alt="Gestión de pacientes"/>
                <img onClick={()=>seleccionar('hemocomponents', 'Hemocomponentes')} className="img-seccion" src={hemocomp} alt="Manejo de hemocomponentes"/>
                <img onClick={()=>seleccionar('tests', 'Pruebas Pre Transfusionales')} className="img-seccion" src={pruebas} alt="Registro de pruebas pre transfusionales"/>
                <img onClick={()=>seleccionar('transfusion', 'Transfusiones')} className="img-seccion img-final-1" src={transfusion} alt="Agregar Transfusión"/>
                <img onClick={()=>seleccionar('adverse', 'Eventos Adversos')} className="img-seccion img-final-2" src={adversos} alt="Reportar Evento Adverso"/>
            </div>
        </div>
    );
}

export default Options;