import {ERROR} from "./Utils";
const path = "localhost:4000/api/servicio-transfusion/transfusions"
const axios = require('axios');

export const create = async (data) => {
    let body = JSON.stringify(
        {
            hemocomponentId: data.hemocomponentId,
            patientId: data.patientId,
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

export const createAdverseEvent = async (data) => {
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