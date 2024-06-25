// 서버 시간을 가져오는 클래스
const axios = require('axios')

async function getServerTime(urlData) {
    try {
        const response = await axios.get(urlData, {
            validateStatus: function (status) {
                return true;
            }
        });
        const currentTime = response.headers.date;
        console.log('서버의 현재 시간:', currentTime);
        return new Date(currentTime);
    } catch (error) {
        console.error('서버 시간을 가져오는 중 오류 발생:', error.message);
    }
}

module.exports = getServerTime