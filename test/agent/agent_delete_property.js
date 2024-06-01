const { Builder, By, Key, until } = require('selenium-webdriver');
const menuElement = require('../../resource/utils/elements/menuElement');
const loginElement = require('../../resource/utils/elements/loginElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const { scrollDown, delay } = require('../../resource/utils/helper/helper');
var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver; 

//define the element\
const getMenuElement = menuElement();
const getLoginElement = loginElement();
const getPopUpElement = popUpElement();


describe('Agent delete property', function() {
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
        console.log("Test '" + this.currentTest.title + "' done ✅");
    });

    it ('agent should can login', async function() {

        //login as agent
        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");

        await driver.findElement(By.xpath(getLoginElement.loginRegisterButtonXpath)).click();
        let loginPageTitle = await driver.getTitle();
        loginPageTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //fill login form
        await driver.findElement(By.xpath(getLoginElement.emailFieldXpath)).sendKeys("agent@mail.com");
        await driver.findElement(By.xpath(getLoginElement.passwordFieldXpath)).sendKeys("11111111");
        await driver.findElement(By.xpath(getLoginElement.loginButtonXpath)).click();

        await delay(2000);

        const loginModal = await driver.findElement(By.xpath(getLoginElement.loginModalXpath));
        await driver.wait(until.elementIsVisible(loginModal), 5000);

        const loginModalText = await driver.findElement(By.xpath(getLoginElement.loginModalTextXpath)).getText();
        loginModalText.should.equal("Login ke Akun Anda berhasil!");

        await delay(3000);
    });

    it ('agent should can access property menu and add property', async function() {
        const dashboardUrl = await driver.getCurrentUrl();
        dashboardUrl.should.equal("http://127.0.0.1:8000/dashboard");

        await driver.findElement(By.xpath(getMenuElement.listingButtonXpath)).click();
        let listPropertyPageTitle = await driver.getTitle();
        listPropertyPageTitle.should.equal("Propertio - List Properti");

        await delay(3000);

    });

    it ('agent should can search for property', async function() {

        await scrollDown(driver, 500);

        await driver.findElement(By.xpath(getMenuElement.propertySearchXpath)).sendKeys("Kalibiru");

        await delay(2000);

        await driver.findElement(By.xpath(getMenuElement.propertySearchXpath)).sendKeys(Key.ENTER);

        await delay(2000);

        const propertyElement = await driver.findElement(By.xpath(getMenuElement.propertyElementXpath));
        driver.wait(until.elementIsVisible(propertyElement), 5000);

        should.exist(propertyElement);
    });

    it ('Agent should can delete property', async function() {

        await driver.findElement(By.xpath(getMenuElement.deletePropertyButtonXpath)).click();

        await delay(2000);

        const deleteModal = await driver.findElement(By.xpath(getPopUpElement.deletePropertyPopUpXpath));
        await driver.wait(until.elementIsVisible(deleteModal), 5000);

        const deleteModalText = await driver.findElement(By.xpath(getPopUpElement.deletePropertyPopUpTextXpath)).getText();
        deleteModalText.should.equal("Berhasil menghapus properti anda!");

        await driver.findElement(By.xpath(getPopUpElement.deletePropertyPopUpConfirmButtonXpath)).click();
    });
});