const { Builder, By, Key, until } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const unitInformasiFormElement = require('../../resource/utils/elements/unitInformasiFormElement');
const unitMediaFormElement = require('../../resource/utils/elements/unitMediaFormElement');
const projectMediaFormElement = require('../../resource/utils/elements/projectMediaFormElement');
const unitInformasiErrorElement = require('../../resource/utils/elements/unitInformasiErrorElement');
const globalVariable = require('../../resource/utils/helper/globalVariable');

const { delay, scrollDown, assertTitle, uploadFile, assertUrl, clickElement, waitForElementVisible, assertText, enterText, scrollToElement, clearInput, verifyElementExists} = require('../../resource/utils/helper/helper');

var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

const getLoginElement = loginElement();
const getMenuElement = menuElement();
const getPopUpElement = popUpElement();
const getUnitInformasiFormElement = unitInformasiFormElement();
const getProjectMediaFormElement = projectMediaFormElement();
const getGlobalVariable = globalVariable();
const getUnitMediaFormElement = unitMediaFormElement();
const getUnitInformasiErrorElement = unitInformasiErrorElement();


describe ('Developer Add Unit', function() {

    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });
    
    after (async function () {
        await driver.quit();
    });



    it('developer should be able to login', async function() {
        await assertTitle(driver, "Propertio - Home");

        await clickElement(driver, getLoginElement.loginRegisterButtonXpath);
        await assertTitle(driver, "Propertio - Login");

        await assertUrl(driver, "http://127.0.0.1:8000/login");
    
        await enterText(driver, getLoginElement.emailFieldXpath, "developer@mail.com");
        await enterText(driver, getLoginElement.passwordFieldXpath, "11111111");
        await clickElement(driver, getLoginElement.loginButtonXpath);

        await delay(2000);
        await waitForElementVisible(driver, getPopUpElement.popUpText);

        await assertText(driver, getPopUpElement.popUpText, "Login ke Akun Anda berhasil!");

        await delay(3000);
    });

    it('developer should be able to access property menu', async function() {
        await assertUrl(driver, "http://127.0.0.1:8000/dashboard");

        await clickElement(driver, getMenuElement.listingButtonXpath);
        await assertTitle(driver, "Propertio - List Proyek Properti");

        await delay(3000);
    });


    it('Developer should be able to view details of an active project', async function () {

        await scrollToElement(driver, getMenuElement.propertySearchXpath);
        await enterText(driver, getMenuElement.propertySearchXpath, "testing");
    
        await enterText(driver, getMenuElement.propertySearchXpath, Key.ENTER);

        try {
            await delay(2000);
            await clickElement(driver, getMenuElement.activeProjectDetailXpath);
            await delay(3000);
        } catch (error) {
            if (error.name === "NoSuchElementError") {
                await clickElement(driver, getMenuElement.notActiveProjectTab);
                await delay(3000);
            }
        }

        await scrollToElement(driver, getMenuElement.projectDetailXpath);
        await clickElement(driver, getMenuElement.projectDetailXpath);
    });

    it ('Validate unit informasi empty form', async function () {
        const errors = [];
        async function checkError(element, expectedText) {
            try {
                await scrollToElement(driver, element);
                await assertText(driver, element, expectedText);
            } catch (e) {
                errors.push(e.message);
            }
        }
        await scrollToElement(driver, getUnitInformasiFormElement.submitUnitButton);
        await clickElement(driver, getUnitInformasiFormElement.submitUnitButton);

        await delay(3000);

        await checkError(getUnitInformasiErrorElement.titleError, "Judul wajib diisi.");
        await checkError(getUnitInformasiErrorElement.hargaError, "Harga wajib diisi.");
    });

    it ('Developer should can fill informasi unit', async function () {
        try {
            await delay(3000);

        await scrollToElement(driver, getMenuElement.addUnitProjectXpath);
        await clickElement(driver, getMenuElement.addUnitProjectXpath);

        await enterText(driver, getUnitInformasiFormElement.name, getGlobalVariable.newUnitTitle);

        await enterText(driver, getUnitInformasiFormElement.deskripsi, "Unit 1 adalah unit yang paling dekat dengan fasilitas umum");

        await enterText(driver, getUnitInformasiFormElement.harga, "200000000");

        await enterText(driver, getUnitInformasiFormElement.stokUnit, "10");

        await enterText(driver, getUnitInformasiFormElement.luasTanah, "100");

        await enterText(driver, getUnitInformasiFormElement.luasBangunan, "80");

        await enterText(driver, getUnitInformasiFormElement.floor, "2");

        await enterText(driver, getUnitInformasiFormElement.kamar, "2")

        await enterText(driver, getUnitInformasiFormElement.kamarMandi, "1");

        await clickElement(driver, getUnitInformasiFormElement.tempatParkirDropDown)
        await waitForElementVisible(driver, getUnitInformasiFormElement.tempatParkirDropDownItem)
        await clickElement(driver, getUnitInformasiFormElement.tempatParkirDropDownItem)

        await clickElement(driver, getUnitInformasiFormElement.dayaListrikDropDown)
        await waitForElementVisible(driver, getUnitInformasiFormElement.dayaListrikDropDownItem)
        await clickElement(driver, getUnitInformasiFormElement.dayaListrikDropDownItem)

        await clickElement(driver, getUnitInformasiFormElement.jenisAirDropDown)
        await waitForElementVisible(driver, getUnitInformasiFormElement.jenisAirDropDownItem)
        await clickElement(driver, getUnitInformasiFormElement.jenisAirDropDownItem)

        await clickElement(driver, getUnitInformasiFormElement.interiorDropDown)
        await waitForElementVisible(driver, getUnitInformasiFormElement.interiorDropDownItem)
        await clickElement(driver, getUnitInformasiFormElement.interiorDropDownItem)


        await clickElement(driver, getUnitInformasiFormElement.aksesJalanDropDown)
        await waitForElementVisible(driver, getUnitInformasiFormElement.aksesJalanDropDownItem)
        await clickElement(driver, getUnitInformasiFormElement.aksesJalanDropDownItem)

        await scrollToElement(driver, getUnitInformasiFormElement.submitUnitButton);
        await clickElement(driver, getUnitInformasiFormElement.submitUnitButton);

        await delay(3000);

        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Data Berhasil Disimpan!");
        await clickElement(driver, getPopUpElement.popUpConfirm);

        await delay(3000);
        } catch (error) {
            throw new Error(`Error: Fill informasi form failed, ${error.message}`); 
        }

    });

    it ('Developer cant submit empty property image', async function() {
        await scrollToElement(driver, getProjectMediaFormElement.gambarPropertiSubmit);
        await clickElement(driver, getProjectMediaFormElement.gambarPropertiSubmit);

        try {
            await waitForElementVisible(driver, getUnitInformasiErrorElement.photoError);
            await scrollToElement(driver, getUnitInformasiErrorElement.photoError);
            await assertText(driver, getUnitInformasiErrorElement.photoError, "Foto wajib diisi.");
        }catch (error) {
            throw new Error('Error Text not found');
        }

        await delay(3000);
        await driver.navigate().refresh();
    })

    it ('Valiate Video and Virtual tour field', async function() {
        try {
            await scrollToElement(driver, getProjectMediaFormElement.linkVideo);
            await enterText(driver, getProjectMediaFormElement.linkVideo, "qwertyuiop");

            await scrollToElement(driver, getProjectMediaFormElement.virtualTourName);
            await enterText(driver, getProjectMediaFormElement.virtualTourName, "Virtual Tour Rumah Mewah");

            await scrollToElement(driver, getProjectMediaFormElement.mediaFormSubmit);

            await delay(2000);

            await scrollToElement(driver, getProjectMediaFormElement.linkVideo);
            await verifyElementExists(driver, getUnitInformasiErrorElement.videoError);

            await scrollToElement(driver, getProjectMediaFormElement.virtualTourName);
            await verifyElementExists(driver, getUnitInformasiErrorElement.virtualTourError);

            await assertText(driver, getUnitInformasiErrorElement.videoError, "Format link video tidak valid.");
            await assertText(driver, getUnitInformasiErrorElement.virtualTourError, "There is empty input. Please fill the empty input.");

            await driver.navigate().refresh();
        } catch (error) {
            throw new Error(`Error: Tidak ada keterangan error , ${error.message}`); 
        }
        
    })

    it ('Developer should can fill media unit', async function () {
        try {
            const fileInputXpath = getProjectMediaFormElement.gambarPropertiUpload;
            await scrollToElement(driver, fileInputXpath);
            await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.propertyImage);

            await scrollToElement(driver, getUnitMediaFormElement.fotoSubmitButton);
            await clickElement(driver, getUnitMediaFormElement.fotoSubmitButton);

            await delay(3000);
        
            const sitePlanUploadPopUpXpath = getPopUpElement.popUpText;
            await waitForElementVisible(driver, sitePlanUploadPopUpXpath);
            await assertText(driver, getPopUpElement.popUpText, "Foto unit berhasil ditambahkan!");
            await clickElement(driver, getPopUpElement.popUpConfirm);
        
            await delay(3000);

            await enterText(driver, getProjectMediaFormElement.linkVideo, "https://www.youtube.com/watch?v=9bZkp7q19f0");
        
            await enterText(driver, getProjectMediaFormElement.virtualTourName, "Virtual Tour Rumah Mewah");
        
            await enterText(driver, getProjectMediaFormElement.virtualTourLink, "https://www.google.com/maps");
        
            await scrollToElement(driver, getProjectMediaFormElement.documentButton);
            await driver.findElement(By.xpath(getProjectMediaFormElement.documentUpload)).sendKeys(getGlobalVariable.proyekDocument);
            
            await delay(3000);

            await scrollToElement(driver, getUnitMediaFormElement.rilisUnit);
            await clickElement(driver, getUnitMediaFormElement.rilisUnit);

            const mediaPopUpXpath = getPopUpElement.popUpText;
            await waitForElementVisible(driver, mediaPopUpXpath);
            await assertText(driver, getPopUpElement.mediaPopUpTextXpath, "Seluruh data media berhasil disimpan!");
            await clickElement(driver, getPopUpElement.popUpConfirm);

            await delay(3000);
        } catch (error) {
            throw new Error(`Error: Fill media form failed , ${error.message}`); 
        }
        
    });
});