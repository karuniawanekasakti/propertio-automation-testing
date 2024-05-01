const { Builder, By, Key, until } = require('selenium-webdriver');
var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

describe('User Interest', function() {

    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);
    });
    
    after (async function () {
        await driver.quit();
    });

    afterEach(async function () {
        await driver.get(url); 
        console.log("Test '" + this.currentTest.title + "' done ✅");
    });

    it('user should can search for property', async function() {

    });

    it ('user should can send search project', async function() {
        
    });
});