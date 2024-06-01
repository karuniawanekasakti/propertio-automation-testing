const { Builder, By, Key, until } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const { delay, scrollDown, assertTitle, assertVisibleText, assertUrl, clickElement, waitForElementVisible, assertText, enterText, verifyElementExists, scrollToElement} = require('../../resource/utils/helper/helper');
const globalVariable = require('../../resource/utils/helper/globalVariable');
const tipeFasilitasForm = require('../../resource/utils/elements/tipeFasilitasForm');
const tipeFasilitasFormError = require('../../resource/utils/elements/tipeFasilitasFormError');
const tipeFasilitasMenuElement = require('../../resource/utils/elements/tipeFasilitasMenuElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
var should = require('chai').should();

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

describe('Admin add tipe fasilitas', function() {
    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });

    after (async function() {
        await driver.quit();
    });
    
    it ('Admin should can login', async function() {

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

    it ('Admin should can search fasilitas', async function() {

        await enterText(driver, getTipeFasilitasMenuElement.searchInputXpath, 'Pemanas Air');

        await delay(3000);

        await verifyElementExists(driver, `//td[normalize-space()='Pemanas Air']`);
    });


    it ('Admin should can add tipe fasilitas', async function() {

        await clickElement(driver, getMenuElement.addTipeFasilitasButtonXpath);
        await assertTitle(driver, "Propertio - Tambah Tipe Fasilitas");

        await delay(3000);
        await scrollDown(driver, 200);

        await waitForElementVisible(driver, getTipeFasilitasFormElement.tipeFasilitasXpath);
        await enterText(driver, getTipeFasilitasFormElement.tipeFasilitasXpath, newFasilitas);

        await clickElement(driver, getTipeFasilitasFormElement.kategoriDropDownXpath);
        await clickElement(driver, getTipeFasilitasFormElement.kategoriDropDownItemXpath);

        const iconFasilitasInput = await waitForElementVisible(driver, getTipeFasilitasFormElement.iconTipeFasilitasXpath);
        await iconFasilitasInput.sendKeys(getGlobalVariable.fasilitasIconImage);

        await clickElement(driver, getTipeFasilitasFormElement.tipeFasilitasSubmitButtonXpath);

        await assertText(driver, getPopUpElement.popUpText, "Tipe Fasilitas berhasil ditambah!");
        await clickElement(driver, getPopUpElement.popUpConfirm);

        await delay(3000);

        await assertUrl(driver, "http://127.0.0.1:8000/facility-type");

    });

    it ('Admin should cant add with exist tipe property', async function() {
        await driver.get('http://127.0.0.1:8000/facility-type/create');

        await scrollDown(driver, 200);
    
        await waitForElementVisible(driver, getTipeFasilitasFormElement.tipeFasilitasXpath);
        await enterText(driver, getTipeFasilitasFormElement.tipeFasilitasXpath, newFasilitas);

        await clickElement(driver, getTipeFasilitasFormElement.kategoriDropDownXpath);
        await clickElement(driver, getTipeFasilitasFormElement.kategoriDropDownItemXpath);
    
        const iconFasilitasInput = await waitForElementVisible(driver, getTipeFasilitasFormElement.iconTipeFasilitasXpath);
        await iconFasilitasInput.sendKeys(getGlobalVariable.fasilitasIconImage);
    
        await clickElement(driver, getTipeFasilitasFormElement.tipeFasilitasSubmitButtonXpath);
    
        await assertText(driver, getTipeFasilitasFormError.tipeFasilitasErrorXpath, "Nama sudah ada sebelumnya.");

    });

    it ('Admin should can edit fasilitas with empty field', async function() {
        await driver.get('http://127.0.0.1:8000/facility-type/create');

        await scrollDown(driver, 200);

        await clickElement(driver, getTipeFasilitasFormElement.tipeFasilitasSubmitButtonXpath);
    
        await verifyElementExists(driver, getTipeFasilitasFormError.tipeFasilitasErrorXpath);
        await verifyElementExists(driver, getTipeFasilitasFormError.kategoriErrorXpath);
        await verifyElementExists(driver, getTipeFasilitasFormError.iconErrorXpath);

        await assertText(driver, getTipeFasilitasFormError.tipeFasilitasErrorXpath, "Nama wajib diisi.");
        await assertText(driver, getTipeFasilitasFormError.kategoriErrorXpath, "Kategori wajib diisi.");
        await assertText(driver, getTipeFasilitasFormError.iconErrorXpath, "Icon wajib diisi.");

        await assertUrl(driver, "http://127.0.0.1:8000/facility-type/create");
    });

    it ('Validate if the new fasilitas is added', async function() {
        await driver.get('http://127.0.0.1:8000/facility-type');
        await enterText(driver, getTipeFasilitasMenuElement.searchInputXpath, newFasilitas);

        await delay(3000);

        await verifyElementExists(driver, `//td[normalize-space()= '${newFasilitas}']`);

    });


});