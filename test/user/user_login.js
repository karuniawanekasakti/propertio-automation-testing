const { Builder, By, Key, until } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const { delay, scrollDown, assertTitle, assertVisibleText, assertUrl, clickElement, waitForElementVisible, assertText, enterText, verifyElementExists, clearInput} = require('../../resource/utils/helper/helper');
const globalVariable = require('../../resource/utils/helper/globalVariable');
var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver; 

//define the element
const getLoginElement = loginElement();
const getMenuElement = menuElement();
const getGlobalVariable = globalVariable();

describe('User login', function() {

    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });

    after (async function() {
        await driver.quit();
    });
    

    it ('User should can login with valid information', async function() {
    
        await clickElement(driver, getLoginElement.loginRegisterButtonXpath);
        await assertTitle(driver, "Propertio - Login");
    
        await assertUrl(driver, "http://127.0.0.1:8000/login");
    
        await enterText(driver, getLoginElement.emailFieldXpath, getGlobalVariable.validUserEmail);
        await enterText(driver, getLoginElement.passwordFieldXpath, getGlobalVariable.validUserPassword);
        await clickElement(driver, getLoginElement.loginButtonXpath);
    
        const loginModalXpath = getLoginElement.loginModalXpath;
        await waitForElementVisible(driver, loginModalXpath);
    
        await assertText(driver, getLoginElement.loginModalTextXpath, "Login ke Akun Anda berhasil!");
    
        await delay(3000);
    
        await assertUrl(driver, "http://127.0.0.1:8000/");
    
        const userProfileNameXpath = getMenuElement.userProfileNameXpath;
        await waitForElementVisible(driver, userProfileNameXpath);
        await assertText(driver, userProfileNameXpath, "userProperti");
    });

    it ('User should can logout', async function() {
        const userProfileXpath = getMenuElement.userProfileDropdownXpath;
        await waitForElementVisible(driver, userProfileXpath);
        await clickElement(driver, userProfileXpath);

        await delay(2000);

        const logoutButtonXpath = getMenuElement.logoutButtonXpath;
        await waitForElementVisible(driver, logoutButtonXpath);
        await clickElement(driver, logoutButtonXpath);

        await delay(2000);

        await assertUrl(driver, "http://127.0.0.1:8000/");
    });

    it ('User should cant login with invalid email', async function() {
        await driver.get("http://127.0.0.1:8000/login");

        await enterText(driver, getLoginElement.emailFieldXpath, getGlobalVariable.invalidUserEmail);
        await enterText(driver, getLoginElement.passwordFieldXpath, getGlobalVariable.validUserPassword);
        await clickElement(driver, getLoginElement.loginButtonXpath);

        const loginModalXpath = getLoginElement.loginModalXpath;
        await waitForElementVisible(driver, loginModalXpath);

        await assertText(driver, getLoginElement.loginModalTextXpath, "Invalid email or password.");

        await assertUrl(driver, "http://127.0.0.1:8000/login");
    });

    it ('User should cant login with invalid password', async function() {
        await driver.get("http://127.0.0.1:8000/login");

        await enterText(driver, getLoginElement.emailFieldXpath, getGlobalVariable.validUserEmail);
        await enterText(driver, getLoginElement.passwordFieldXpath, getGlobalVariable.invalidUserPassword);
        await clickElement(driver, getLoginElement.loginButtonXpath);

        const loginModalXpath = getLoginElement.loginModalXpath;
        await waitForElementVisible(driver, loginModalXpath);

        await assertText(driver, getLoginElement.loginModalTextXpath, "Invalid email or password.");

        await assertUrl(driver, "http://127.0.0.1:8000/login");
    });

    it ('User should cant login with empty field', async function() {
        await driver.get("http://127.0.0.1:8000/login");

        await clickElement(driver, getLoginElement.loginButtonXpath);
    
        await assertUrl(driver, "http://127.0.0.1:8000/login");
    });

});