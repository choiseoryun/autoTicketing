const axios = require('axios')
require('dotenv').config()

let serverUrl = process.env.SECRET_URL

const options = {
    headers: {
        'Content-Type': 'application/json',
        'X-OCR-SECRET': process.env.SECRET_KEY
    }
};

const ocrModule = (data) => {
    let myData = {
        "version": "v1",
        "requestId": "guide-json-demo",
        "timestamp": 0,
        "images": [{ "format": "jpg", "name": "demo", "data": data }]
    };

    return new Promise((resolve, reject) => {
        axios.post(serverUrl, myData, options)
            .then((res) => {
                const combinedText = res.data.images[0].fields.map(field => field.inferText).join('');
                resolve(combinedText);
                console.log(combinedText);
                console.log(res.data.images[0])
            })
            .catch((error) => {
                console.error('오류 발생:', error);
                reject(error);
            });
    });
}

module.exports = ocrModule