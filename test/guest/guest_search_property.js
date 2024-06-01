const { Builder, By, Key, until } = require('selenium-webdriver');
const menuElement = require('../../resource/utils/elements/menuElement');
const { delay,scrollDown, generateRandomEmail, generateInvalidRandomEmail } = require('../../resource/utils/helper/helper');


var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

const getMenuElement = menuElement();


describe('User search property', function() {

    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });
    
    after (async function () {
        await driver.quit();
    });

    afterEach(async function () {
        await driver.get(url); 

        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");
    });

    it('user should can search for property', async function() {

        await driver.findElement(By.xpath(getMenuElement.searchBarXpath)).sendKeys("cijera");
        await driver.findElement(By.xpath(getMenuElement.searchButtonXpath)).click();

        await delay(3000);
        await scrollDown(driver, 2000);

        const propertyTitleElement = await driver.findElement(By.xpath(getMenuElement.propertyTitleXpath));
        await driver.wait(until.elementIsVisible(propertyTitleElement), 5000);
        let propertyTitleText = await driver.findElement(By.xpath(getMenuElement.propertyTitleXpath)).getText();
        propertyTitleText.should.equal("Rumah di Cijera Gempol Sari Ba...");

    });

    it ('user should can not search not exist property', async function() {
        

        await driver.findElement(By.xpath(getMenuElement.searchBarXpath)).sendKeys("sleman");
        await driver.findElement(By.xpath(getMenuElement.searchButtonXpath)).click();

        await delay(3000);
        await scrollDown(driver, 2000);

        const notFoundElement = await driver.findElement(By.xpath(getMenuElement.notFoundXpath));
        await driver.wait(until.elementIsVisible(notFoundElement), 5000);
        let notFoundText = await driver.findElement(By.xpath(getMenuElement.notFoundXpath)).getText();
        notFoundText.should.equal("Tidak ada properti yang ditemukan.");
    });

    it('user should can search by city', async function() {


        await driver.findElement(By.xpath(getMenuElement.searchBarXpath)).sendKeys("KRATON");
        await driver.findElement(By.xpath(getMenuElement.searchButtonXpath)).click();

        await delay(3000);
        await scrollDown(driver, 2000);

        const propertyCityElement = await driver.findElement(By.xpath(getMenuElement.propertyCityXpath));
        await driver.wait(until.elementIsVisible(propertyCityElement), 5000);
        let propertyCityText = await driver.findElement(By.xpath(getMenuElement.propertyCityXpath)).getText();
        propertyCityText.should.equal("KRATON,KOTA YOGYAKARTA,DI YOGYAKARTA");

    });

});