// 특정 시간 기다리기
async function sleep(startTime) {
    startTime = startTime + ':00'
    console.log(startTime)
    nowTime = new Date().toString().split(' ')[4]
    console.log(nowTime)
    let waitTime = startTime - nowTime
    console.log(waitTime);
}

module.exports = sleep;