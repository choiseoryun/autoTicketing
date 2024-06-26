const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const path = require('path');
const request = require('request');
const timerModule = require('../service/timer')
const sleep = require('../service/sleep')
const ocr = require('../service/ocr');
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});
router.post('/add', async (req, res) => {
    const { username, pwd, concert, date, time } = req.body;
    const userId = username;
    const userPwd = pwd;
    const concertId = concert;
    const startTime = time;
    console.log(startTime);
    const indexToSelect = date - 1;
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-web-security', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials', '--window-size=1400,1080']
    });
    let page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1080 });

    await page.goto('https://accounts.interpark.com/login/form');
    await page.type('#userId', userId);
    await page.type('#userPwd', userPwd);

    await page.waitForSelector('#btn_login');
    await page.click('#btn_login');
    await page.goto('https://tickets.interpark.com/goods/' + concertId);
    // 대기 시간 추가
    sleep(startTime);


    await page.waitForSelector('ul[data-view="days"]');
    await page.evaluate((indexToSelect) => {
        const ulElement = document.querySelector('ul[data-view="days"]');
        const liElements = ulElement.querySelectorAll('li');
        liElements.forEach(li => {
            li.classList.remove('picked');
        });
        const classlessElements = Array.from(liElements).filter(li => !li.classList.length);
        if (classlessElements[indexToSelect]) {
            classlessElements[indexToSelect].classList.add('picked');
        }
    }, indexToSelect);

    await page.evaluate(() => {
        const button = document.querySelector('a.sideBtn.is-primary');
        if (button) {
            button.click();
        } else {
            console.error('예매하기 버튼을 찾을 수 없음');
        }
    });

    const newPagePromise = new Promise(x => page.once('popup', x));
    page = await newPagePromise;

    await page.waitForSelector('#divBookSeat');

    let iframeWindow = await page.$(
        'iframe[id="ifrmSeat"]'
    );


    frame = await iframeWindow.contentFrame();

    await frame.waitForSelector('.validationTxt')
    await frame.waitForSelector('#imgCaptcha')
    const imageData = await frame.evaluate(() => {
        const imgElement = document.getElementById('imgCaptcha');
        const base64Data = imgElement.src.split(',')[1];
        return base64Data
    });

    const ocrData = await ocr(imageData);
    await frame.evaluate((ocrData) => {
        const txtCaptcha = document.getElementById('txtCaptcha');
        txtCaptcha.style.display = 'block';
        txtCaptcha.value = ocrData;
        const button = document.querySelector('a.sideBtn.is-primary')
    }, ocrData);

    await frame.waitForSelector('.capchaBtns > a');
    const buttons = await frame.$$('.capchaBtns > a');
    await buttons[1].click();


    await frame.waitForSelector('#ifrmSeatDetail');
    iframeWindow = await frame.$(
        'iframe[id="ifrmSeatDetail"]'
    );
    console.log(iframeWindow)

    detailFrame = await iframeWindow.contentFrame();

    await detailFrame.waitForSelector('#divSeatBox');
    const seatArr = await detailFrame.$$('span[class="SeatN"]');
    if (seatArr.length >= 1) {
        await seatArr[0].click()
        await frame.click('body > form:nth-child(2) > div > div.contWrap > div.seatR > div > div.btnWrap > a');
    }
});

module.exports = router;
