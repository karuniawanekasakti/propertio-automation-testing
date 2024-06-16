const { Builder, By, Key, until } = require('selenium-webdriver');
const { del, get } = require('selenium-webdriver/http');
const { delay, scrollDown, assertTitle, uploadFile, assertUrl, clickElement, waitForElementVisible, assertText, enterText, scrollToElement, clearInput, verifyElementExists} = require('../../resource/utils/helper/helper');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const detailPropertyElement = require('../../resource/utils/elements/detailPropertyElement');
const interestPropertyErrorElement = require('../../resource/utils/elements/interestPropertyErrorElement');
var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

const getDetailPropertyElement = detailPropertyElement();
const getInterestPropertyErrorElement = interestPropertyErrorElement();
const getPopUpElement = popUpElement();

describe('User Interest', function() {

    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });
    
    after (async function () {
        await driver.quit();
    });


    it ('User can access detail property page', async function() {
         // Klik tombol property sell
        await clickElement(driver, getDetailPropertyElement.propertySellButton);
        await assertTitle(driver, "Propertio - Iklan Properti");

        await delay(3000);
        await scrollDown(driver, 3200);

        await scrollToElement(driver, getDetailPropertyElement.propertyXpath);
        await clickElement(driver, getDetailPropertyElement.propertyXpath);

        await assertTitle(driver, "Propertio - Detail Property");

        await delay(3000);
        await scrollToElement(driver, getDetailPropertyElement.propertyInterestContainer);
    })

    it('user should can send interest message to agent', async function() {
        try {
            await enterText(driver, getDetailPropertyElement.nameXpath, "User Testing");
            await enterText(driver, getDetailPropertyElement.phoneXpath, "62865362816");
            await enterText(driver, getDetailPropertyElement.emailXpath, await generateRandomEmail());
            
            await clickElement(driver, getDetailPropertyElement.submitInformation);
    
            await waitForElementVisible(driver, getPopUpElement.popUp);
            await assertText(driver, getPopUpElement.popUpText, "Pesan berhasil dikirim");
        } catch (error) {
            throw new Error(`Faied: send interest message failed , ${error.message}`); 
        }
    });

    it ('user should not send interest message with phone number less than 9 digits', async function() {

        try {
            await enterText(driver, getDetailPropertyElement.nameXpath, "User Testing");
            await enterText(driver, getDetailPropertyElement.phoneXpath, "624362");
            await enterText(driver, getDetailPropertyElement.emailXpath, await generateRandomEmail());


            await clickElement(driver, getDetailPropertyElement.submitInformation);

            await waitForElementVisible(driver, getPopUpElement.popUp);
            await clickElement(driver, getPopUpElement.popUpConfirm);

            await assertText(driver, getPopUpElement.popUpText, "Pesan gagal disimpan : Tolong isi Nama, Nomer Telepon, dan Email dengan benar!");

            await scrollToElement(driver, getInterestPropertyErrorElement.phoneError);
            await assertText(driver, getInterestPropertyErrorElement.phoneError, "Nomor telepon harus terdiri dari 10 sampai 14 angka.");
        }catch (error) {
            throw new Error("Defect : User can send interest message with less number format");
        }
        
    });

    it ('user should not send interest message with phone number more than 14 digits', async function() {

        try {
            await enterText(driver, getDetailPropertyElement.nameXpath, "User Testing");
            await enterText(driver, getDetailPropertyElement.phoneXpath, "624362343234434");
            await enterText(driver, getDetailPropertyElement.emailXpath, await generateRandomEmail());


            await clickElement(driver, getDetailPropertyElement.submitInformation);

            await waitForElementVisible(driver, getPopUpElement.popUp);
            await clickElement(driver, getPopUpElement.popUpConfirm);

            await assertText(driver, getPopUpElement.popUpText, "Pesan gagal disimpan : Tolong isi Nama, Nomer Telepon, dan Email dengan benar!");

            await scrollToElement(driver, getInterestPropertyErrorElement.phoneError);
            await assertText(driver, getInterestPropertyErrorElement.phoneError, "Nomor telepon harus terdiri dari 10 sampai 14 angka.");
        }catch (error) {
            throw new Error("Defect : User can send interest message with more than number format");
        }
    });

    it ('user should not send interest message with invalid phone number', async function() {

        try {
            await enterText(driver, getDetailPropertyElement.nameXpath, "User Testing");
            await enterText(driver, getDetailPropertyElement.phoneXpath, "3234362343234434");
            await enterText(driver, getDetailPropertyElement.emailXpath, await generateRandomEmail());


            await clickElement(driver, getDetailPropertyElement.submitInformation);

            await waitForElementVisible(driver, getPopUpElement.popUp);
            await clickElement(driver, getPopUpElement.popUpConfirm);

            await assertText(driver, getPopUpElement.popUpText, "Pesan gagal disimpan : Tolong isi Nama, Nomer Telepon, dan Email dengan benar!");

            await scrollToElement(driver, getInterestPropertyErrorElement.phoneError);
            await assertText(driver, getInterestPropertyErrorElement.phoneError, "Nomor telepon invalid.");
        }catch (error) {
            throw new Error("Defect : User can send interest message with invalid phone number");
        }

    });

    it ('user should not send interest message with wrong email format', async function() {

        try {
            await enterText(driver, getDetailPropertyElement.nameXpath, "User Testing");
            await enterText(driver, getDetailPropertyElement.phoneXpath, "624362343234434");
            await enterText(driver, getDetailPropertyElement.emailXpath, "usertestingmail.com");


            await clickElement(driver, getDetailPropertyElement.submitInformation);

            await waitForElementVisible(driver, getPopUpElement.popUp);
            await clickElement(driver, getPopUpElement.popUpConfirm);

            await assertText(driver, getPopUpElement.popUpText, "Pesan gagal disimpan : Tolong isi Nama, Nomer Telepon, dan Email dengan benar!");

            await scrollToElement(driver, getInterestPropertyErrorElement.phoneError);
            await assertText(driver, getInterestPropertyErrorElement.emailError, "Email harus berupa alamat email yang valid.");
        }catch (error) {
            throw new Error("Defect : User can send interest message with invalid email");
        }
    });

    it('user should not send interest message with empty field form', async function() {        
        await clickElement(driver, getDetailPropertyElement.submitInformation);
        await waitForElementVisible(driver, getPopUpElement.popUp);
        await clickElement(driver, getPopUpElement.popUpConfirm);

        await assertText(driver, getPopUpElement.popUpText, "Pesan gagal disimpan : Tolong isi Nama, Nomer Telepon, dan Email dengan benar!");

        const errors = [];
    
        async function checkError(element, expectedText) {
            try {
                await scrollToElement(driver, element);
                await assertText(driver, element, expectedText);
            } catch (e) {
                errors.push(e.message);
            }
        }

        await checkError(getInterestPropertyErrorElement.firstNameError, "Nama wajib diisi.");
        await checkError(getInterestPropertyErrorElement.phoneError, "Nomor telepon wajib diisi.");
        await checkError(getInterestPropertyErrorElement.emailError, "Email wajib diisi.");

    });
});