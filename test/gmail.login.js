/*global describe, it, beforeEach, afterEach */

"use strict";

let SERVER_URL = 'https://accounts.google.com/';
let WEB_DRIVER_SERVER_URL = 'http://localhost:4444/wd/hub';

describe('Tests', function () {

    // each test should be less than 5s
    this.timeout(500e3);

    let browser;
    let webdriver = require('selenium-webdriver');
    let until = webdriver.until;
    let byCss = webdriver.By.css;

    beforeEach(() => browser = new webdriver
        .Builder()
        .usingServer(WEB_DRIVER_SERVER_URL)
        .withCapabilities(webdriver.Capabilities.chrome())
        .build()
    );

    afterEach(() => browser.quit());

    describe('Gmail login', () => {

        /* example BEGIN */
        let runs = [
            {it: 'options 1', options: {}},
            {it: 'options 2', options: {}},
        ];

        runs.forEach(function (run) {
            it('does sth with ' + run.it, done => {
                console.log('nice!!!');
                setTimeout(done, 5e3);
            });
        });
        /* example END */

        it('Gmail login', done => {

            browser.manage().deleteAllCookies();

            browser.get(SERVER_URL);

            browser.findElement(byCss('#Email')).sendKeys('ivan.lunin86@gmail.com');
            browser.findElement(byCss('#next')).click();

            let passwordLocator = byCss('#Passwd');

            // check element is localed (exist on page)
            browser.wait(until.elementLocated(passwordLocator), 1e3, 'Could not locate the child element within the time specified');

            // check element is displayed on page
            browser.wait(browser.findElement(passwordLocator).isDisplayed(), 1000);

            browser.findElement(passwordLocator).sendKeys('qwertyivan');
            browser.findElement(byCss('#signIn')).click();
            browser.get('https://mail.google.com/');

            browser.takeScreenshot().then(
                function(image, err) {
                    require('fs').writeFile('out.png', image, 'base64', function(err) {
                        console.log(err);
                    });
                }
            );

        });

    });

});




