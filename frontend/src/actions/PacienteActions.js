import {ERROR} from "./Utils";
const path = "localhost:4000/api/servicio-transfusion/patients"
const axios = require('axios');

export const create = async (data) => {
    let body = JSON.stringify(
        {
            id: data.id,
            name: data.name,
            bloodtype: data.bloodtype
        });
    let config = {
        method: 'post',
        url: `${path}`,
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

export const actualizar = async (data) => {
    let body = JSON.stringify(
        {
            id: data.id,
            name: data.name,
            bloodtype: data.bloodtype
        });
    let config = {
        method: 'put',
        url: `${path}`,
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

export const consultar = async () => {
    let config = {
        method: 'get',
        url: `${path}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        let res = await axios(config)
        return res.data
    } catch (e) {
        console.log(e)
        return ERROR
    }
}

export const consultarPorId = async (data) => {
    let config = {
        method: 'get',
        url: `${path}/${data.id}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        let res = await axios(config)
        return res.data
    } catch (e) {
        console.log(e)
        return ERROR
    }
}