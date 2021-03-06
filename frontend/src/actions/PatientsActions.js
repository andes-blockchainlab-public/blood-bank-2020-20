const path = "http://localhost:4000/api/servicio-transfusion/patients"
const axios = require('axios');

export const create = async (data, token) => {
    let body = JSON.stringify(
        {
            id: data.id,
            name: data.name,
            bloodType: data.bloodType
        });
    let config = {
        method: 'post',
        url: `${path}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data : body
    };
    try {
        let res = await axios(config)
        return res.data
    } catch (e) {
        console.log(e)
        return e.response
    }
}

export const actualizar = async (data, token) => {
    let body = JSON.stringify(
        {
            id: data.id,
            name: data.name,
            bloodType: data.bloodType
        });
    let config = {
        method: 'put',
        url: `${path}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data : body
    };
    try {
        let res = await axios(config)
        return res.data
    } catch (e) {
        console.log(e)
        return e.response
    }
}

export const consultar = async (token) => {
    let config = {
        method: 'get',
        url: `${path}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    try {
        let res = await axios(config)
        return res.data
    } catch (e) {
        console.log(e)
        return e.response
    }
}

export const consultarPorId = async (data, token) => {
    let config = {
        method: 'get',
        url: `${path}/${data.id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    try {
        let res = await axios(config)
        return res.data
    } catch (e) {
        console.log(e)
        return e.response
    }
}