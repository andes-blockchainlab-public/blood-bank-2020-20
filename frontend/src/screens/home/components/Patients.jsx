import React, {useState} from 'react';

function Patients(props) {

    const [selected, setSelected] = useState('crear')

    return (
        <div className="patients-detail">
            <div className="opciones">
                <button onClick={()=>setSelected('crear')} className={"btn-acciones " + (selected === 'crear'?"btn-header":"btn-opcion")}>Crear paciente</button>
                <button onClick={()=>setSelected('actualizar')} className={"btn-acciones " + (selected === 'actualizar'?"btn-header":"btn-opcion")}>Actualizar paciente</button>
                <button onClick={()=>setSelected('consultar')} className={"btn-acciones " + (selected === 'consultar'?"btn-header":"btn-opcion")}>Consultar pacientes</button>
                <button onClick={()=>setSelected('consultarId')} className={"btn-acciones " + (selected === 'consultarId'?"btn-header":"btn-opcion")}>Consultar paciente por identificador</button>
            </div>
            <div className="informacion-enviar">

            </div>
            <div className="resultado-informacion">

            </div>
        </div>
    );
}

export default Patients;