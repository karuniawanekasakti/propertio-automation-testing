const { Builder, By, Key, until } = require('selenium-webdriver');
const menuElement = require('../../resource/utils/elements/menuElement');
const loginElement = require('../../resource/utils/elements/loginElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const globalVariable = require('../../resource/utils/helper/globalVariable');

const { delay, scrollDown, assertTitle, uploadFile, assertUrl, clickElement, waitForElementVisible, assertText, enterText, scrollToElement, clearInput, verifyElementExists} = require('../../resource/utils/helper/helper');
var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver; 

//define the element\
const getMenuElement = menuElement();
const getLoginElement = loginElement();
const getPopUpElement = popUpElement();
const getGlobalVariable = globalVariable();


describe('Agent change status property', function() {
    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });

    after (async function() {
        await driver.quit();
    });
    

    it('agent should be able to login', async function() {
        await assertTitle(driver, "Propertio - Home");

        await clickElement(driver, getLoginElement.loginRegisterButtonXpath);
        await assertTitle(driver, "Propertio - Login");

        await assertUrl(driver, "http://127.0.0.1:8000/login");
    
        await enterText(driver, getLoginElement.emailFieldXpath, "agent@mail.com");
        await enterText(driver, getLoginElement.passwordFieldXpath, "11111111");
        await clickElement(driver, getLoginElement.loginButtonXpath);

        await delay(2000);
        await waitForElementVisible(driver, getPopUpElement.popUpText);

        await assertText(driver, getPopUpElement.popUpText, "Login ke Akun Anda berhasil!");

        await delay(3000);
    });

    it('agent should be able to access property menu', async function() {
        await assertUrl(driver, "http://127.0.0.1:8000/dashboard");

        await clickElement(driver, getMenuElement.listingButtonXpath);
        await assertTitle(driver, "Propertio - List Properti");

        await delay(3000);
    });

    it('agent should can search for property', async function() {
        await scrollToElement(driver, getMenuElement.propertySearchXpath);
        await enterText(driver, getMenuElement.propertySearchXpath, "testing");
    
        await delay(2000);
    
        await enterText(driver, getMenuElement.propertySearchXpath, Key.ENTER);
    
        await delay(2000);
    
        const propertyElement = await waitForElementVisible(driver, getMenuElement.propertyElementXpath);
    
        should.exist(propertyElement);
    });

    it ('Agent should can change status of property to draft', async function() {
    
        await clickElement(driver, getMenuElement.optionPropertyDropdownXpath);
    
        await clickElement(driver, getMenuElement.draftOptionItemXpath);

        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Status properti anda berhasil diperbarui!");
    
        await clickElement(driver, getPopUpElement.popUpConfirm);
    });

    it ('Agent should can found changed property status in another tab', async function() {
        await scrollToElement(driver, getMenuElement.iklanDraftTabXpath);
    
        await clickElement(driver, getMenuElement.iklanDraftTabXpath);
    
        await enterText(driver, getMenuElement.propertySearchXpath, "Kalibiru");
        await delay(2000);
        await enterText(driver, getMenuElement.propertySearchXpath, Key.ENTER);
    
        await delay(2000);

        await verifyElementExists(driver, getMenuElement.propertyElementXpath);

        await delay(3000);
    });

    it ('Validate property status in another tab', async function() {
        await clickElement(driver, getMenuElement.activePropertyTab);

        await enterText(driver, getMenuElement.propertySearchXpath, "draft");
        await delay(2000);
        await enterText(driver, getMenuElement.propertySearchXpath, Key.ENTER);
    
        await delay(2000);

        await assertText(driver, getMenuElement.paginationProperty, "0 properti tersedia");
    })
});