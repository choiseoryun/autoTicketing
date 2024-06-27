// 특정 시간 기다리기
async function sleep(startTimeDto) {
    const [datePart, timePart] = startTimeDto.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);
    const startTime = new Date(year, month - 1, day, hour, minute);
    let nowTime = new Date();
    let waitTime = startTime - nowTime;
    console.log(waitTime);
    return new Promise(resolve => setTimeout(resolve, waitTime));
}

module.exports = sleep;