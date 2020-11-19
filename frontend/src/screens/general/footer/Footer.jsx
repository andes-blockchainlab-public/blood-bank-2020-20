import React from 'react';
import onda from '../../../assets/onda_footer.png'

const Footer = () => {
    return (
        <div className="footer">
            <img className="onda" src={onda} alt="Onda Footer"/>
            <div className="autores">
            <p className="autor">Juan Sebastián Millán Lejarde</p>
            <p className="autor">Carlos Mario Sarmiento</p>
            </div>
        </div>
    );
}

export default Footer;