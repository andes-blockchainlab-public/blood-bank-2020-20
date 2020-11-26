const path = "http://localhost:4000/api/servicio-transfusion/upload"
const axios = require('axios');

export const upload = async (data, token) => {
    debugger
    let formData = new FormData();
    formData.append("file", data.file);
    let config = {
        method: 'post',
        url: `${path}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        data : formData
    };
    try {
        let res = await axios(config)
        return res.data
    } catch (e) {
        console.log(e)
        return e.response
    }
}