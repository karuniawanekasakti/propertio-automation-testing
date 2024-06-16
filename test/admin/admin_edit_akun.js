const { Builder, By, Key, until } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const { delay, scrollDown, assertTitle, assertVisibleText, assertUrl, clickElement, waitForElementVisible, generateRandomEmail, enterText, verifyElementExists, assertText, scrollToElement, clearInput} = require('../../resource/utils/helper/helper');
const globalVariable = require('../../resource/utils/helper/globalVariable');
const listAkunMenuElement = require('../../resource/utils/elements/listAkunMenuElement');
const listAkunFormElement = require('../../resource/utils/elements/listAkunFormElement');
const listAkunFormErrorElement = require('../../resource/utils/elements/listAkunFormErrorElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver; 

//define the element
const getLoginElement = loginElement();
const getMenuElement = menuElement();
const getPopUpElement = popUpElement();
const getTipeFasilitasMenuElement = listAkunMenuElement();
const getListAkunMenuElement = listAkunMenuElement();
const getListAkunFormElement = listAkunFormElement();
const getListAkunFormErrorElement = listAkunFormErrorElement();
const getGlobalVariable = globalVariable();


describe('Admin edit akun', function() {
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

        await enterText(driver, getLoginElement.emailFieldXpath, getGlobalVariable.validAdminEmail);
        await enterText(driver, getLoginElement.passwordFieldXpath, getGlobalVariable.validAdminPassword);
        await clickElement(driver, getLoginElement.loginButtonXpath);

        await waitForElementVisible(driver, getLoginElement.loginModalXpath);
        await assertVisibleText(driver, getLoginElement.loginModalXpath, "Login ke Akun Anda berhasil!");

        await delay(3000);
        await assertUrl(driver, "http://127.0.0.1:8000/dashboard");

        await assertVisibleText(driver, getMenuElement.adminUserProfileDropdownXpath, "Minpro Utama");

        await delay(3000);
    });

    it ('Admin should can see created account', async function() {
        await clickElement(driver, getMenuElement.listAkunMenuXpath);
        await assertTitle(driver, "Propertio - List Akun");

        await delay(3000);

        await verifyElementExists(driver, getTipeFasilitasMenuElement.listWrapper);

    });


    it ('Admin can search account', async function() {
        await assertUrl(driver, "http://127.0.0.1:8000/account")

        await enterText(driver, getListAkunMenuElement.searchInputXpath, "test");   
        await delay(3000);

        await verifyElementExists(driver, `//td[normalize-space()='Test Agen']`);

    });

    it ('Admin should can edit password akun', async function() {
        try {
            await clickElement(driver, getListAkunMenuElement.editAkunBtn)
            await delay(3000);
            await scrollDown(driver, 200);

            await scrollToElement(driver, getListAkunFormElement.password, getListAkunFormElement.password);
            await enterText(driver, getListAkunFormElement.password, getGlobalVariable.newPassword);

            await scrollToElement(driver, getListAkunFormElement.confirmationPassword, getListAkunFormElement.confirmationPassword);
            await enterText(driver, getListAkunFormElement.confirmationPassword, getGlobalVariable.newPassword)

            await clickElement(driver, getListAkunFormElement.updateAkunButton);

            await assertText(driver, getPopUpElement.popUpText, "Password berhasil di reset!");
            await clickElement(driver, getPopUpElement.popUpConfirm);

            await delay(3000);
        } catch (error) {
            throw new Error(`Test to add with existing tipe fasilitas failed: ${error.message}`); 
        }
    });

    it ('Admin should can change status akun', async function() {
        try {
            await driver.get('http://127.0.0.1:8000/account')

            await enterText(driver, getListAkunMenuElement.searchInputXpath, "test");   
            await delay(3000);

            await clickElement(driver, getListAkunMenuElement.editAkunBtn)
            await scrollDown(driver, 200);

            await scrollToElement(driver, getListAkunFormElement.activeStatusDropDown);
            await clickElement(driver, getListAkunFormElement.activeStatusDropDown);
            await clickElement(driver, getListAkunFormElement.statusInactive);

            await scrollToElement(driver, getListAkunFormElement.updateAkunButton);
            await clickElement(driver, getListAkunFormElement.updateAkunButton);

            await assertText(driver, getPopUpElement.popUpText, "Status berhasil diubah!");
            await clickElement(driver, getPopUpElement.popUpConfirm);

            await delay(3000);
        } catch (error) {
            throw new Error(`Test to add with existing tipe fasilitas failed: ${error.message}`); 
        }
    });

    it ('Admin cant store account with password less than 4 character', async function() {
        try {
            await driver.get('http://127.0.0.1:8000/account')

            await enterText(driver, getListAkunMenuElement.searchInputXpath, "test");   
            await delay(3000);

            await clickElement(driver, getListAkunMenuElement.editAkunBtn)
            await scrollDown(driver, 200);

            await scrollToElement(driver, getListAkunFormElement.password);
            await clearInput(driver, getListAkunFormElement.password);

            await enterText(driver, getListAkunFormElement.password, "123");

            await scrollToElement(driver, getListAkunFormElement.updateAkunButton);
            await clickElement(driver, getListAkunFormElement.updateAkunButton);

            await scrollToElement(driver, getListAkunFormErrorElement.passwordError);
            await assertText(driver, getListAkunFormErrorElement.passwordError, "Kata sandi minimal berisi 5 karakter.");

            await delay(2000);
        } catch (error) {
            throw new Error(`Test input password with 4 character less failed: ${error.message}`); 
        }
    });

    it ('Admin cant store account with password confirmation not match', async function() {
        try {
            await scrollToElement(driver, getListAkunFormElement.password);
            await clearInput(driver, getListAkunFormElement.password);

            await enterText(driver, getListAkunFormElement.password, "111111111");
            await enterText(driver, getListAkunFormElement.confirmationPassword, "12345678");

            await scrollToElement(driver, getListAkunFormElement.updateAkunButton);
            await clickElement(driver, getListAkunFormElement.updateAkunButton);

            await scrollToElement(driver, getListAkunFormErrorElement.confirmationPasswordError);
            await assertText(driver, getListAkunFormErrorElement.confirmationPasswordError, "Konfirmasi kata sandi dan kata sandi harus sama.");

            await delay(2000);
        } catch (error) {
            throw new Error(`Test to add with existing tipe fasilitas failed: ${error.message}`); 
        }
    });

});