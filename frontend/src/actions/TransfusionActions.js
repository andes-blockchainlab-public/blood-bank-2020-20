import {ERROR} from "./Utils";
const path = "http://localhost:4000/api/servicio-transfusion/transfusions"
const axios = require('axios');

export const create = async (data, token) => {
    let body = JSON.stringify(
        {
            hemocomponentId: data.hemocomponentId,
            patientId: data.patientId,
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

export const createAdverseEvent = async (data, token) => {
    let body = JSON.stringify(
        {
            hemocomponentId: data.hemocomponentId,
            patientId: data.patientId,
            symptom: data.symptom
        });
    let config = {
        method: 'post',
        url: `${path}/adverse`,
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