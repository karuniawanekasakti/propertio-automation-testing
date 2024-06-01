const { Builder, By, Key, until } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const { delay, assertTitle, assertVisibleText, clickElement, enterText, assertUrl, waitForElementVisible } = require('../../resource/utils/helper/helper');
var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver; 

//define the element
const getLoginElement = loginElement();
const getMenuElement = menuElement();

describe('Admin login', function() {

    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });

    after (async function() {
        await driver.quit();
    });
    
    afterEach (async function() {

        if (this.currentTest.title === 'Admin should be able to logout') {
            console.log("Admin should be able to logout");
            if (this.currentTest.state === 'passed') {
                await driver.get('http://127.0.0.1:8000/login');
            }
        }
    });

    it ('Admin should can login with valid information', async function() {
        await assertTitle(driver, "Propertio - Home");

        await clickElement(driver, getLoginElement.loginRegisterButtonXpath);
        await assertTitle(driver, "Propertio - Login");
        await assertUrl(driver, "http://127.0.0.1:8000/login");

        await enterText(driver, getLoginElement.emailFieldXpath, "admin@mail.com");
        await enterText(driver, getLoginElement.passwordFieldXpath, "11111111");
        await clickElement(driver, getLoginElement.loginButtonXpath);

        await assertVisibleText(driver, getLoginElement.loginModalXpath, "Login ke Akun Anda berhasil!");

        await delay(3000);
        await assertUrl(driver, "http://127.0.0.1:8000/dashboard");

        await assertVisibleText(driver, getMenuElement.adminUserProfileDropdownXpath, "Minpro Utama");
    });

    it('Admin should be able to logout', async function() {
        await assertTitle(driver, "Propertio - Dashboard");
    
        const userProfile = await waitForElementVisible(driver, getMenuElement.adminUserProfileDropdownXpath);
        await userProfile.click();
    
        await delay(2000);
    
        const logoutButton = await waitForElementVisible(driver, getMenuElement.logoutButtonXpath);
        await logoutButton.click();
    
        await delay(2000);
    
        await assertUrl(driver, "http://127.0.0.1:8000/");
    });

    it('Admin should not be able to login with an invalid email', async function() {
        await driver.navigate().refresh();
    
        await enterText(driver, getLoginElement.emailFieldXpath, "adminn@mail.com");
        await enterText(driver, getLoginElement.passwordFieldXpath, "11111111");
        await clickElement(driver, getLoginElement.loginButtonXpath);
    
        await assertVisibleText(driver, getLoginElement.loginModalXpath, "Invalid email or password.");
        await assertUrl(driver, "http://127.0.0.1:8000/login");
    });

    it('Admin should not be able to login with an invalid password', async function() {
        await driver.navigate().refresh();
    
        await enterText(driver, getLoginElement.emailFieldXpath, "admin@mail.com");
        await enterText(driver, getLoginElement.passwordFieldXpath, "12345678");
        await clickElement(driver, getLoginElement.loginButtonXpath);
    
        await assertVisibleText(driver, getLoginElement.loginModalXpath, "Invalid email or password.");
        await assertUrl(driver, "http://127.0.0.1:8000/login");
    });

    it('Admin should not be able to login with empty fields', async function() {
        driver.navigate().refresh();
    
        await clickElement(driver, getLoginElement.loginButtonXpath);
    
        await assertUrl(driver, "http://127.0.0.1:8000/login");
    });

});