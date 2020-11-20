import {ERROR} from "./Utils";
const path = "localhost:4000/api/servicio-transfusion/hemocomponents"
const axios = require('axios');

export const login = async (data) => {
    let body = JSON.stringify(
        {
            email:data.correo,
            password:data.contrasenia
        });
    let config = {
        method: 'post',
        url: `${path}/create`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : body
    };
    try {
        let res = await axios(config)
        return res.data
    } catch (e) {
        console.log(e)
        return ERROR
    }
}

export const registro = async (data) => {
    let body = JSON.stringify(
        {
            email:data.correo,
            name:data.nombre,
            role: "coordinador",
            password:data.contrasenia
        });
    let config = {
        method: 'post',
        url: `${path}/create`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : body
    };
    try {
        let res = await axios(config)
        return res.data
    } catch (e) {
        console.log(e)
        return ERROR
    }
}