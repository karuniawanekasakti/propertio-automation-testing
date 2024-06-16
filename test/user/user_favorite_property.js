const { Builder, By, Key, until, error } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const { delay, scrollDown, assertTitle, assertVisibleText, assertUrl, clickElement, waitForElementVisible, assertText, enterText, verifyElementExists, clearInput} = require('../../resource/utils/helper/helper');
const globalVariable = require('../../resource/utils/helper/globalVariable');


var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

//define the element
const getLoginElement = loginElement();
const getMenuElement = menuElement();
const getPopUpElement = popUpElement();
const getGlobalVariable = globalVariable();



describe ('User favorite property', function() {

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
        await driver.get(url); 
    });

    it ('User should can login', async function() {
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

    it ('user should can favorite property', async function() {
        try {
            await delay(3000);
            await assertUrl(driver, "http://127.0.0.1:8000/");

            const propertyButtonXpath = getMenuElement.propertyButtonXpath;
            await waitForElementVisible(driver, propertyButtonXpath);
            await clickElement(driver, propertyButtonXpath);

            await assertUrl(driver, "http://127.0.0.1:8000/home/property/index?type=sell");

            await delay(3000);
            await scrollDown(driver, 2000);

            const favoritePropertyButtonXpath = getMenuElement.favoritePropertyButtonXpath;
            await waitForElementVisible(driver, favoritePropertyButtonXpath);
            await clickElement(driver, favoritePropertyButtonXpath);

            const favoriteModalXpath = getPopUpElement.favoriteModalXpath;
            await waitForElementVisible(driver, favoriteModalXpath);

            await assertText(driver, getPopUpElement.favoriteModalTextXpath, "Tersimpan di Favorit!");

            await clickElement(driver, getPopUpElement.favoriteModalConfirmXpath);
        } catch (error) {
            throw new Error(`Test to add with existing tipe fasilitas failed: ${error.message}`); 
        }
    });

    it ('user should can unfavorite property', async function() {
        try {
            await waitForElementVisible(driver, getMenuElement.userProfileDropdownXpath);
            await clickElement(driver, getMenuElement.userProfileDropdownXpath);
        
            await waitForElementVisible(driver, getMenuElement.userFavoriteButtonXpath);
            await clickElement(driver, getMenuElement.userFavoriteButtonXpath);
        
            await assertUrl(driver, "http://127.0.0.1:8000/favorite");
        
            await delay(3000);
        
            await waitForElementVisible(driver, getMenuElement.favoriteTabXpath);
            await clickElement(driver, getMenuElement.favoriteTabXpath);
        
            await scrollDown(driver, 600);
        
            await waitForElementVisible(driver, getMenuElement.propertyContainerXpath);
        
            await clickElement(driver, getMenuElement.unfavoritePropertyButtonXpath);
        
            await waitForElementVisible(driver, getPopUpElement.favoriteModalXpath);
            await clickElement(driver, getPopUpElement.favoriteModalConfirmXpath);
        
            await delay(2000);
        
            await waitForElementVisible(driver, getPopUpElement.favoriteModalXpath);
        
            await assertText(driver, getPopUpElement.favoriteModalTextXpath, "Berhasil menghapus Properti Favorit!");
            await clickElement(driver, getPopUpElement.favoriteModalConfirmXpath);
        } catch (error) {
            throw new Error(`Test to add with existing tipe fasilitas failed: ${error.message}`); 
        }
    });

    it('Validate if there is an empty favorite list', async function() {
        await driver.get("http://127.0.0.1:8000/favorite");
    
        await waitForElementVisible(driver, getMenuElement.favoriteTabXpath);
        await clickElement(driver, getMenuElement.favoriteTabXpath);
    
        const emptyTextXpath = getMenuElement.emptyFavoritTextXpath;
    
        try {
            await waitForElementVisible(driver, emptyTextXpath);
            await verifyElementExists(driver, emptyTextXpath);
            const actualText = await driver.findElement(By.xpath(emptyTextXpath)).getText();
            const expectedText = "Tidak ada properti yang tersedia";
    
            if (actualText !== expectedText) {
                throw new Error(`Text mismatch: expected "${expectedText}", but found "${actualText}"`);
            }
        } catch (error) {
            if (error.message.includes('Text mismatch')) {
                throw error;
            } else {
                throw new Error("List is not empty");
            }
        }
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

    it ('user should can not favorite property if not logged in', async function() {
        try {
            await waitForElementVisible(driver, getMenuElement.propertyButtonXpath);
            await clickElement(driver, getMenuElement.propertyButtonXpath);

            await assertUrl(driver, "http://127.0.0.1:8000/home/property/index?type=sell");

            await delay(3000);
            await scrollDown(driver, 2000);

            await waitForElementVisible(driver, getMenuElement.unloginFavoriteButtonXpath);
            await clickElement(driver, getMenuElement.unloginFavoriteButtonXpath);

            await assertUrl(driver, "http://127.0.0.1:8000/login");
            
        } catch (error) {
            throw new Error(`Test to add with existing tipe fasilitas failed: ${error.message}`); 
        }
    });


});