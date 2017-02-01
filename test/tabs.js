/*global describe, it, beforeEach, afterEach */

"use strict";

let webdriver = require('selenium-webdriver');
let until = webdriver.until;
let byCss = webdriver.By.css;

const Key = webdriver.Key;

let WEB_DRIVER_SERVER_URL;
let CAPABILITIES;

WEB_DRIVER_SERVER_URL = 'http://localhost:4444/wd/hub';
CAPABILITIES = webdriver.Capabilities.chrome();


let browser = new webdriver
    .Builder()
    .usingServer(WEB_DRIVER_SERVER_URL)
    .withCapabilities(CAPABILITIES)
    .build();

browser.manage().window().setSize(1024, 768);

let browser2 = new webdriver
    .Builder()
    .usingServer(WEB_DRIVER_SERVER_URL)
    .withCapabilities(CAPABILITIES)
    .build();



browser.get('https://google.by/');
browser2.get('https://google.by/');

// browser.executeScript('alert(1)');
browser.executeScript('window.open("https://statlex.github.io/", "_blank");');

browser.sleep(2e3);


