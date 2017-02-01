/*global describe, it, beforeEach, afterEach */

"use strict";

let webdriver = require('selenium-webdriver');
let until = webdriver.until;
let byCss = webdriver.By.css;

const mailList = require('./../data/mails.json');
const util = require('./../data/util');

const CONSTANT = require('./../data/constant');
let G_MAIL_LOGIN = CONSTANT.G_MAIL_LOGIN;

let SERVER_URL = G_MAIL_LOGIN.URL_LOGIN;

let WEB_DRIVER_SERVER_URL;
let CAPABILITIES;

const isMobile = false;

if (isMobile) {
    WEB_DRIVER_SERVER_URL = 'http://localhost:8080/wd/hub';
    CAPABILITIES = {browserName: ''};
} else {
    WEB_DRIVER_SERVER_URL = 'http://localhost:4444/wd/hub';
    CAPABILITIES = webdriver.Capabilities.chrome();

    // for example
    /*
     CAPABILITIES.set('chromeOptions', {
         mobileEmulation: {
             deviceName: 'Apple iPhone 6'
         }
     });
     */

}

// return;

describe('Tests', function () {

    // each test should be less than 5s
    this.timeout(250e3);

    let browser;

    beforeEach(done => {
            browser = new webdriver
                .Builder()
                .usingServer(WEB_DRIVER_SERVER_URL)
                .withCapabilities(CAPABILITIES)
                .build();

            browser.manage().window().setSize(1024, 768);

            browser.manage().deleteAllCookies()
                .then(done);

        }
    );

    afterEach(done => {
        browser.manage().deleteAllCookies();
        browser.quit()
            .then(done);
    });

    describe('Gmail logins', () => {

        mailList
         .filter((mailData, i) => {
            return i >=  mailList.length - 2;
            // let mailList = ['mikka.salonen88@gmail.com', 'mila.yovo1989@gmail.com'];
            //  return mailList.indexOf(mailData.mail) !== -1;
         })
            .forEach(mailData => {

                it('Gmail login for ' + mailData.mail, done => {

                    browser.manage().deleteAllCookies();

                    browser.get(SERVER_URL);

                    browser.findElement(byCss(G_MAIL_LOGIN.INPUT_E_MAIL)).sendKeys(mailData.mail);
                    browser.findElement(byCss(G_MAIL_LOGIN.BTN_NEXT)).click();

                    let passwordLocator = byCss(G_MAIL_LOGIN.INPUT_PASSWORD);

                    // check element is localed (exist on page)
                    browser.wait(until.elementLocated(passwordLocator), 1e3, 'Could not locate the child element within the time specified');

                    // check element is displayed on page
                    browser.wait(browser.findElement(passwordLocator).isDisplayed(), 1000);

                    browser.findElement(passwordLocator).sendKeys(mailData.password);
                    browser.findElement(byCss(G_MAIL_LOGIN.BTN_SING_IN)).click();
                    browser.get(G_MAIL_LOGIN.URL_G_MAIL);

                    browser.takeScreenshot()
                        .then(image => util.writeScreenshot(mailData.mail, image))
                        .then(done);

                });

            })

    });

});




