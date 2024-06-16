const { Builder, By, Key, until } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const { delay, scrollDown, assertTitle, assertVisibleText, assertUrl, clickElement, waitForElementVisible, assertText, enterText, verifyElementExists, clearInput} = require('../../resource/utils/helper/helper');
const globalVariable = require('../../resource/utils/helper/globalVariable');
const tipeFasilitasForm = require('../../resource/utils/elements/tipeFasilitasForm');
const tipeFasilitasFormError = require('../../resource/utils/elements/tipeFasilitasFormError');
const tipeFasilitasMenuElement = require('../../resource/utils/elements/tipeFasilitasMenuElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver; 

//define the element
const getLoginElement = loginElement();
const getMenuElement = menuElement();
const getTipeFasilitasFormElement = tipeFasilitasForm();
const getTipeFasilitasFormError = tipeFasilitasFormError();
const getPopUpElement = popUpElement();
const getTipeFasilitasMenuElement = tipeFasilitasMenuElement();
const getGlobalVariable = globalVariable();

const newFasilitas = getGlobalVariable.newFasilitas;
const newEditFasilitas = getGlobalVariable.newEditFasilitas


describe('Admin edit tipe fasilitas', function() {
    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });

    after (async function() {
        await driver.quit();
    });
    
    it ('Developer should can login', async function() {

        await assertTitle(driver, "Propertio - Home");

        await clickElement(driver, getLoginElement.loginRegisterButtonXpath);
        await assertTitle(driver, "Propertio - Login");
        await assertUrl(driver, "http://127.0.0.1:8000/login");

        await enterText(driver, getLoginElement.emailFieldXpath, "admin@mail.com");
        await enterText(driver, getLoginElement.passwordFieldXpath, "11111111");
        await clickElement(driver, getLoginElement.loginButtonXpath);

        await waitForElementVisible(driver, getLoginElement.loginModalXpath);
        await assertVisibleText(driver, getLoginElement.loginModalXpath, "Login ke Akun Anda berhasil!");

        await delay(3000);
        await assertUrl(driver, "http://127.0.0.1:8000/dashboard");

        await assertVisibleText(driver, getMenuElement.adminUserProfileDropdownXpath, "Minpro Utama");

        await delay(3000);
    });

    it ('Admin should can see created list fasilitas', async function() {
        await clickElement(driver, getMenuElement.tipeFasilitasMenuXpath);
        await assertTitle(driver, "Propertio - List Tipe Fasilitas");

        await delay(3000);

        await verifyElementExists(driver, getTipeFasilitasMenuElement.listWrapper);

    });


    it ('Admin should can edit fasilitas', async function() {
        try {
            await enterText(driver, getTipeFasilitasMenuElement.searchInputXpath, 'Testing');
    
            await delay(3000);
    
            await verifyElementExists(driver, `//td[normalize-space()= '${newFasilitas}']`);
    
            await clickElement(driver, getTipeFasilitasMenuElement.editFasilitasXpath)
    
            await delay(3000);
            await scrollDown(driver, 200);
    
            await waitForElementVisible(driver, getTipeFasilitasFormElement.tipeFasilitasXpath);
            await clearInput(driver, getTipeFasilitasFormElement.tipeFasilitasXpath);
            await enterText(driver, getTipeFasilitasFormElement.tipeFasilitasXpath, newEditFasilitas);
    
            await clickElement(driver, getTipeFasilitasFormElement.updateTipeFasilitasSubmitButtonXpath);
    
            await assertText(driver, getPopUpElement.tipeFasilitasPopUpTextXpath, "Tipe Fasilitas berhasil diubah!");
            await clickElement(driver, getPopUpElement.tipeFasilitasPopUpConfirmButtonXpath); 
    
            await delay(3000);
    
        } catch (error) {
            throw new Error(`Edit fasilitas test failed: ${error.message}`); 
        }
    });

    it ('Admin should cant edit fasilitas with existed name', async function() {
        try {
            await enterText(driver, getTipeFasilitasMenuElement.searchInputXpath, 'Testing');
    
            await delay(3000);
    
            await verifyElementExists(driver, `//td[normalize-space()= '${newFasilitas}']`);
    
            await clickElement(driver, getTipeFasilitasMenuElement.editFasilitasXpath);
    
            await delay(3000);
            await scrollDown(driver, 200);
    
            await waitForElementVisible(driver, getTipeFasilitasFormElement.tipeFasilitasXpath);
            await clearInput(driver, getTipeFasilitasFormElement.tipeFasilitasXpath);
            await enterText(driver, getTipeFasilitasFormElement.tipeFasilitasXpath, "AC");
    
            await clickElement(driver, getTipeFasilitasFormElement.updateTipeFasilitasSubmitButtonXpath);
    
            await verifyElementExists(driver, getTipeFasilitasFormError.tipeFasilitasErrorXpath);
            await assertText(driver, getTipeFasilitasFormError.tipeFasilitasErrorXpath, "Nama sudah ada sebelumnya.");
    
        } catch (error) {
            throw new Error(`Edit fasilitas with existed name test failed: ${error.message}`); 
        }
    });

    it ('Validate if the new fasilitas is updated', async function() {
        try {
            await assertUrl(driver, "http://127.0.0.1:8000/facility-type");
            await enterText(driver, getTipeFasilitasMenuElement.searchInputXpath, newEditFasilitas);
    
            await delay(3000);
    
            await verifyElementExists(driver, `//td[normalize-space()= '${newEditFasilitas}']`);
    
        } catch (error) {
            throw new Error(`Validation of updated fasilitas test failed: ${error.message}`); 
        }
    });

});