const { Builder, By, Key, until } = require('selenium-webdriver');
const menuElement = require('../../resource/utils/elements/menuElement');
const globalVariable = require('../../resource/utils/helper/globalVariable');

const { delay, scrollDown, assertTitle, uploadFile, assertUrl, clickElement, waitForElementVisible, assertText, enterText, scrollToElement, clearInput, verifyElementExists, verifyTextContains} = require('../../resource/utils/helper/helper');


var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

const getMenuElement = menuElement();
const getGlobalVariable = globalVariable();


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
    });

    it('user should can search for property by city', async function() {
        const addressSearch = `YOGYAKARTA`
        await scrollToElement(driver, getMenuElement.searchBarXpath);
        await enterText(driver, getMenuElement.searchBarXpath, addressSearch);
    
        await clickElement(driver, getMenuElement.searchButtonXpath);
    
        await delay(3000);

        try {
            const propertyCityElement = await driver.findElement(By.xpath(`//div[@id='property']/div/div/div/p`));
            await scrollToElement(driver, propertyCityElement);
            await assertText(driver, propertyCityElement, "KRATON,KOTA YOGYAKARTA,DI YOGYAKARTA");

        } catch (error) {
            throw new Error(`Property with address ${addressSearch} not found`);
        }     
    });

    it('user should can search by title', async function() {

        const titleSearch = `Rumah di Cijera Gempol Sari Ba`
        await scrollToElement(driver, getMenuElement.searchBarXpath);
        await enterText(driver, getMenuElement.searchBarXpath, titleSearch);
    
        await clickElement(driver, getMenuElement.searchButtonXpath);
    
        await delay(3000);

        try {
            const propertyTitleElement = await driver.findElement(By.xpath(`//h6[@class='list-title']/a[contains(text(), 'Rumah di Cijera Gempol Sari Ba')]`));
            await scrollToElement(driver, propertyTitleElement);
            await assertText(driver, propertyTitleElement, titleSearch);

        } catch (error) {
            throw new Error(`Property with address ${titleSearch} not found`);
        }     
        await driver.navigate().refresh();

    });

    it ('user should can not search not exist property', async function() {
        try {
            const titleSearch = `ABCDE`
            await scrollToElement(driver, getMenuElement.searchBarXpath);
            await enterText(driver, getMenuElement.searchBarXpath, titleSearch);
        
            await clickElement(driver, getMenuElement.searchButtonXpath);
        
            await delay(3000);

            await scrollToElement(driver, getMenuElement.notFoundXpath);
            await assertText(driver, getMenuElement.notFoundXpath, `Tidak ada properti yang ditemukan.`);
        } catch (error) {
            throw new Error(`Error: Keterangan not found tidak ada, ${error.message}`); 
        }
    });
});