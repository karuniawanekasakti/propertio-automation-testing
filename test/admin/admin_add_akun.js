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

const randomEmail = generateRandomEmail("agent");
const firstName = getGlobalVariable.agentName;
const lastName = getGlobalVariable.randomLastname;
const fullName = `${firstName} ${lastName}`;

describe('Admin list akun', function() {
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

    it ('Admin should can see list account', async function() {
        try {
            await clickElement(driver, getMenuElement.listAkunMenuXpath);
            await assertTitle(driver, "Propertio - List Akun");
    
            await delay(3000);
    
            await verifyElementExists(driver, getTipeFasilitasMenuElement.listWrapper);
    
        } catch (error) {
            throw new Error(`Test to see list account failed: ${error.message}`); 
        }
    });


    it ('Admin should can add active akun agent', async function() {
        try {
            await clickElement(driver, getTipeFasilitasMenuElement.addAkunButtonXpath);
            await assertTitle(driver, "Propertio - Create Akun");
    
            await delay(3000);
    
            const profilePicture = await driver.findElement(By.xpath(getListAkunFormElement.profilePicture));
            await profilePicture.sendKeys(getGlobalVariable.profilePictureImage);
            await enterText(driver, getListAkunFormElement.firstName, getGlobalVariable.agentName);
            await enterText(driver, getListAkunFormElement.lastName, getGlobalVariable.randomLastname);
            await clickElement(driver, getListAkunFormElement.roleDropDownButton);
            await clickElement(driver, getListAkunFormElement.roleDropDownAgent);
            await enterText(driver, getListAkunFormElement.email, randomEmail);
            await enterText(driver, getListAkunFormElement.phone, "628123456789");
            await clickElement(driver, getListAkunFormElement.statusDropDownButton);
            await clickElement(driver, getListAkunFormElement.statusActive);
            await clickElement(driver, getListAkunFormElement.provinceDropDownButton);
            await waitForElementVisible(driver, getListAkunFormElement.provinceDropDownItem);
            await clickElement(driver, getListAkunFormElement.provinceDropDownItem);
            await clickElement(driver, getListAkunFormElement.cityDropDownButton);
            await waitForElementVisible(driver, getListAkunFormElement.cityDropDownItem);
            await clickElement(driver, getListAkunFormElement.cityDropDownItem);
            await enterText(driver, getListAkunFormElement.address, "Jalan Test");
            await enterText(driver, getListAkunFormElement.password, "11111111");
            await enterText(driver, getListAkunFormElement.confirmationPassword, "11111111");
    
            await delay(3000);
    
            await clickElement(driver, getListAkunFormElement.addAkunButton);
            await waitForElementVisible(driver, getPopUpElement.popUp);
            await assertVisibleText(driver, getPopUpElement.popUpText, "Akun berhasil dibuat!");
            await clickElement(driver, getPopUpElement.popUpConfirm);
    
            await delay(3000);
    
        } catch (error) {
            throw new Error(`Test to add active akun agent failed: ${error.message}`); 
        }
    });

    it ('Verified account created', async function() {
        try {
            await assertUrl(driver, "http://127.0.0.1:8000/account");
    
            await enterText(driver, getListAkunMenuElement.searchInputXpath, getGlobalVariable.agentFullName);   
            await delay(3000);
    
            await verifyElementExists(driver, `//td[normalize-space()= '${getGlobalVariable.agentFullName}']`);
    
        } catch (error) {
            throw new Error(`Test to verify account creation failed: ${error.message}`); 
        }
    });


    it ('Admin input phone number less than 4', async function() {
        try {
            await clickElement(driver, getTipeFasilitasMenuElement.addAkunButtonXpath);
            await assertTitle(driver, "Propertio - Create Akun");

            await delay(3000);

            const profilePicture = await driver.findElement(By.xpath(getListAkunFormElement.profilePicture));
            await profilePicture.sendKeys(getGlobalVariable.profilePictureImage);
            await enterText(driver, getListAkunFormElement.firstName, firstName);
            await enterText(driver, getListAkunFormElement.lastName, lastName);
            await clickElement(driver, getListAkunFormElement.roleDropDownButton);
            await clickElement(driver, getListAkunFormElement.roleDropDownAgent);
            await enterText(driver, getListAkunFormElement.email, randomEmail);
            await enterText(driver, getListAkunFormElement.phone, "6284");
            await clickElement(driver, getListAkunFormElement.statusDropDownButton);
            await clickElement(driver, getListAkunFormElement.statusActive);
            await clickElement(driver, getListAkunFormElement.provinceDropDownButton);
            await clickElement(driver, getListAkunFormElement.provinceDropDownItem);
            await clickElement(driver, getListAkunFormElement.cityDropDownButton);
            await clickElement(driver, getListAkunFormElement.cityDropDownItem);
            await enterText(driver, getListAkunFormElement.address, "Jalan Test");
            await enterText(driver, getListAkunFormElement.password, "11111111");
            await enterText(driver, getListAkunFormElement.confirmationPassword, "11111111");

            await delay(3000);

            await clickElement(driver, getListAkunFormElement.addAkunButton);

            await scrollToElement(driver, getListAkunFormErrorElement.phoneError);
            await assertText(driver, getListAkunFormErrorElement.phoneError, "Format nomor telepon tidak valid.");

            await delay(2000);

        } catch (error) {
            throw new Error(`Test to verify account creation failed: ${error.message}`); 
        }
    }); 

    it('Admin input phone number with invalid format', async function() {
        try {
            await scrollToElement(driver, getListAkunFormElement.phone);
            await clearInput(driver, getListAkunFormElement.phone);
    
            await enterText(driver, getListAkunFormElement.phone, "343242323344");
    
            await scrollToElement(driver, getListAkunFormElement.addAkunButton);
            await clickElement(driver, getListAkunFormElement.addAkunButton);
    
            await scrollToElement(driver, getListAkunFormErrorElement.phoneError);
            await assertText(driver, getListAkunFormErrorElement.phoneError, "Format nomor telepon tidak valid.");
    
            await delay(2000);
    
        } catch (error) {
            throw new Error(`Admin input phone number with invalid format test failed: ${error.message}`);
        }
    });

    it ('Admin input firstname character less than 5', async function() {

        await scrollToElement(driver, getListAkunFormElement.firstName);
        await clearInput(driver, getListAkunFormElement.firstName);

        await enterText(driver, getListAkunFormElement.firstName, "a");

        await scrollToElement(driver, getListAkunFormElement.addAkunButton);
        await clickElement(driver, getListAkunFormElement.addAkunButton);

        try {
            await scrollToElement(driver, getListAkunFormErrorElement.firstNameError);
            await verifyElementExists(driver, getListAkunFormErrorElement.firstNameError);

            await delay(2000);
        }catch (error) {
            if (error.name === 'NoSuchElementError') {
                return false;
            }
            throw error;
        }
        
    });

    
    it('Admin cant store account with existed email', async function() {
        try {
            await scrollToElement(driver, getListAkunFormElement.email);
            await clearInput(driver, getListAkunFormElement.email);
    
            await enterText(driver, getListAkunFormElement.email, getGlobalVariable.validAgentEmail);
    
            await scrollToElement(driver, getListAkunFormElement.addAkunButton);
            await clickElement(driver, getListAkunFormElement.addAkunButton);
    
            await scrollToElement(driver, getListAkunFormErrorElement.emailError);
            await assertText(driver, getListAkunFormErrorElement.emailError, "Email sudah ada sebelumnya.");
    
            await delay(2000);
    
        } catch (error) {
            throw new Error(`Admin cant store account with existed email test failed: ${error.message}`);
        }
    });

    it('Admin cant store account with password less than 4 character', async function() {
        try {
            await scrollToElement(driver, getListAkunFormElement.password);
            await clearInput(driver, getListAkunFormElement.password);
    
            await enterText(driver, getListAkunFormElement.password, "123");
    
            await scrollToElement(driver, getListAkunFormElement.addAkunButton);
            await clickElement(driver, getListAkunFormElement.addAkunButton);
    
            await scrollToElement(driver, getListAkunFormErrorElement.passwordError);
            await assertText(driver, getListAkunFormErrorElement.passwordError, "Kata sandi minimal berisi 5 karakter.");
    
            await delay(2000);
    
        } catch (error) {
            throw new Error(`Admin cant store account with password less than 4 character test failed: ${error.message}`);
        }
    });

    it ('Admin cant store account with password confirmation not match', async function() {
        await scrollToElement(driver, getListAkunFormElement.password);
        await clearInput(driver, getListAkunFormElement.password);
    
        await enterText(driver, getListAkunFormElement.password, "111111111");
        await enterText(driver, getListAkunFormElement.confirmationPassword, "12345678");
    
        await scrollToElement(driver, getListAkunFormElement.addAkunButton);
        await clickElement(driver, getListAkunFormElement.addAkunButton);
    
        await scrollToElement(driver, getListAkunFormErrorElement.confirmationPasswordError);
        await assertText(driver, getListAkunFormErrorElement.confirmationPasswordError, "Konfirmasi kata sandi dan kata sandi harus sama.");

        await delay(2000);
    });

    it('Admin cant store account with empty form', async function() {
        await driver.navigate().refresh();
    
        await scrollToElement(driver, getListAkunFormElement.addAkunButton);
        await clickElement(driver, getListAkunFormElement.addAkunButton);
    
        const errors = [];
    
        async function checkError(element, expectedText) {
            try {
                await scrollToElement(driver, element);
                await assertText(driver, element, expectedText);
            } catch (e) {
                errors.push(e.message);
            }
        }
    
        await checkError(getListAkunFormErrorElement.firstNameError, "Nama depan wajib diisi.");
        await checkError(getListAkunFormErrorElement.roleError, "Peran wajib diisi.");
        await checkError(getListAkunFormErrorElement.emailError, "Email wajib diisi.");
        await checkError(getListAkunFormErrorElement.phoneError, "Nomor telepon wajib diisi.");
        await checkError(getListAkunFormErrorElement.statusError, "Status wajib diisi.");
        await checkError(getListAkunFormErrorElement.provinceError, "Provinsi wajib diisi.");
        await checkError(getListAkunFormErrorElement.cityError, "Kota wajib diisi.");
        await checkError(getListAkunFormErrorElement.addressError, "Alamat wajib diisi.");
        await checkError(getListAkunFormErrorElement.passwordError, "Kata sandi wajib diisi.");
        await checkError(getListAkunFormErrorElement.confirmationPasswordError, "Konfirmasi kata sandi wajib diisi.");
    
        await delay(2000);
    
        if (errors.length > 0) {
            throw new Error('Errors found:\n' + errors.join('\n'));
        }
    });



});