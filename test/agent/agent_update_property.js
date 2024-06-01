const { Builder, By, Key, until } = require('selenium-webdriver');
const menuElement = require('../../resource/utils/elements/menuElement');
const propertyLocationFormElement = require('../../resource/utils/elements/propertyLocationFormElement');
const propertyDetailFormElement = require('../../resource/utils/elements/propertyDetailFormElement');
const propertyMediaFormElement = require('../../resource/utils/elements/propertyMediaFormElement');
const propertyFacilityFormElement = require('../../resource/utils/elements/propertyFacilityFormElement');
const propertyRingkasanFormElement = require('../../resource/utils/elements/propertyRingkasanFormElement');
const propertyFormErrorElement = require('../../resource/utils/elements/propertyFormErrorElement');
const popUpElement = require('../../resource/utils/elements/popUpElement'); 
const loginElement = require('../../resource/utils/elements/loginElement');
const globalVariable = require('../../resource/utils/helper/globalVariable');

const { delay, scrollDown, assertTitle, uploadFile, assertUrl, clickElement, waitForElementVisible, assertText, enterText, scrollToElement, clearInput, verifyElementExists} = require('../../resource/utils/helper/helper');
var should = require('chai').should();


//define the url
const url = 'http://127.0.0.1:8000/';
let driver; 

//define the element
const getLoginElement = loginElement();
const getMenuElement = menuElement();
const getPropertyLocationElement = propertyLocationFormElement();
const getPropertyDetailElement = propertyDetailFormElement();
const getPropertyMediaElement = propertyMediaFormElement();
const getPropertyFacilityElement = propertyFacilityFormElement();
const getPropertyRingkasanElement = propertyRingkasanFormElement();
const getPopUpElement = popUpElement();
const getPropertyFormErrorElement = propertyFormErrorElement();
const getGlobalVariable = globalVariable();

const newUpdatePropertyTitle = getGlobalVariable.newPropertyTitle;

describe('Agent update property', function() {

    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });
    
    after (async function () {
        // await driver.quit();
    });


    it('agent should be able to login', async function() {
        await assertTitle(driver, "Propertio - Home");

        await clickElement(driver, getLoginElement.loginRegisterButtonXpath);
        await assertTitle(driver, "Propertio - Login");

        await assertUrl(driver, "http://127.0.0.1:8000/login");
    
        await enterText(driver, getLoginElement.emailFieldXpath, "agent@mail.com");
        await enterText(driver, getLoginElement.passwordFieldXpath, "11111111");
        await clickElement(driver, getLoginElement.loginButtonXpath);

        await delay(2000);
        await waitForElementVisible(driver, getPopUpElement.popUpText);

        await assertText(driver, getPopUpElement.popUpText, "Login ke Akun Anda berhasil!");

        await delay(3000);
    });

    it('agent should be able to access property menu', async function() {
        await assertUrl(driver, "http://127.0.0.1:8000/dashboard");

        await clickElement(driver, getMenuElement.listingButtonXpath);
        await assertTitle(driver, "Propertio - List Properti");

        await delay(3000);
    });

    it('agent should can search for property', async function() {
        await scrollToElement(driver, getMenuElement.propertySearchXpath);
        await enterText(driver, getMenuElement.propertySearchXpath, "testing");
    
        await delay(2000);
    
        await enterText(driver, getMenuElement.propertySearchXpath, Key.ENTER);
    
        await delay(2000);
    
        const propertyElement = await waitForElementVisible(driver, getMenuElement.propertyElementXpath);
    
        should.exist(propertyElement);
    });

    it('agent should can change title property', async function() {
        await scrollToElement(driver, getMenuElement.editPropertyButtonXpath);
        await clickElement(driver, getMenuElement.editPropertyButtonXpath);
    
        await delay(2000);

        await clearInput(driver, getPropertyLocationElement.headlineXpath);
        await enterText(driver, getPropertyLocationElement.headlineXpath, "Rumah di Jakarta Barat");
    
        await clearInput(driver, getPropertyLocationElement.titleProperty);
        await enterText(driver, getPropertyLocationElement.titleProperty, newUpdatePropertyTitle);
        
        try {
            await scrollToElement(driver, getPropertyLocationElement.locationSubmitButtonXpath);
    
            await clickElement(driver, getPropertyLocationElement.locationSubmitButtonXpath);
        
            await delay(3000);
        
            await waitForElementVisible(driver, getPopUpElement.popUpText);
            await assertText(driver, getPopUpElement.popUpText, "Data Berhasil Disimpan!");
        
            await clickElement(driver, getPopUpElement.popUpConfirm);

        }catch (error) {
            if (error.name === 'NoSuchElementError') {
                await scrollToElement(driver, getPropertyLocationElement.provinceDropdownXpath);
                await clickElement(driver, getPropertyLocationElement.provinceDropdownXpath);
                await waitForElementVisible(driver, getPropertyLocationElement.provinceItemXpath);
                await clickElement(driver, getPropertyLocationElement.provinceItemXpath);
                
                await scrollToElement(driver, getPropertyLocationElement.cityDropdownXpath);
                await clickElement(driver, getPropertyLocationElement.cityDropdownXpath);
                await waitForElementVisible(driver, getPropertyLocationElement.cityItemXpath);
                await clickElement(driver, getPropertyLocationElement.cityItemXpath);
                
                await scrollToElement(driver, getPropertyLocationElement.districtDropdownXpath);
                await clickElement(driver, getPropertyLocationElement.districtDropdownXpath);
                await waitForElementVisible(driver, getPropertyLocationElement.districtItemXpath);
                await clickElement(driver, getPropertyLocationElement.districtItemXpath);

                await scrollToElement(driver, getPropertyLocationElement.locationSubmitButtonXpath);
    
                await clickElement(driver, getPropertyLocationElement.locationSubmitButtonXpath);
            
                await delay(3000);
            
                await waitForElementVisible(driver, getPopUpElement.popUpText);
                await assertText(driver, getPopUpElement.popUpText, "Data Berhasil Disimpan!");
            
                await clickElement(driver, getPopUpElement.popUpConfirm);

                throw new Error('Defect : Show error on address field, but the address field is filled correctly');
            }
        }

        await delay(3000);
    });

    it('agent should can change detail property', async function() {
        await clearInput(driver, getPropertyDetailElement.surfaceAreaXpath);
        await clearInput(driver, getPropertyDetailElement.buildingAreaXpath);
        await clearInput(driver, getPropertyDetailElement.floorXpath);
        
        await enterText(driver, getPropertyDetailElement.surfaceAreaXpath, "500");
        await enterText(driver, getPropertyDetailElement.buildingAreaXpath, "500");
        await enterText(driver, getPropertyDetailElement.floorXpath, "5");
    
        await scrollDown(driver, 1200);
    
        await clickElement(driver, getPropertyDetailElement.detailSubmitButtonXpath);
    
        await delay(3000);

        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Detail Properti berhasil ditambahkan!");
    
        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);
    });

    it ('Validate Virtual tour field', async function() {
        await scrollToElement(driver, getPropertyMediaElement.virtualTourNameXpath);
        await enterText(driver, getPropertyMediaElement.virtualTourNameXpath, "Virtual Tour Rumah");

        await scrollToElement(driver, getPropertyMediaElement.virtualTourLinkXpath);
        await clearInput(driver, getPropertyMediaElement.virtualTourLinkXpath);

        await scrollToElement(driver, getPropertyMediaElement.mediaSubmitButtonXpath);
        await clickElement(driver, getPropertyMediaElement.mediaSubmitButtonXpath);

        await delay(2000);

        await scrollToElement(driver, getPropertyMediaElement.virtualTourNameXpath);
        await verifyElementExists(driver, getPropertyFormErrorElement.virtualTourError);

        await assertText(driver, getPropertyFormErrorElement.virtualTourError, "There is empty input. Please fill the empty input.");
        
        await delay(3000);

        await driver.navigate().refresh();
    })

    it ('Valiate Video Link field', async function() {
        await scrollToElement(driver, getPropertyMediaElement.videoLinkXpath);
        await enterText(driver, getPropertyMediaElement.videoLinkXpath, "qwertyuiop");

        await scrollToElement(driver, getPropertyMediaElement.mediaSubmitButtonXpath);

        await delay(2000);

        await scrollToElement(driver, getPropertyMediaElement.videoLinkXpath);
        await verifyElementExists(driver, getPropertyFormErrorElement.videoMediaError);

        await assertText(driver, getPropertyFormErrorElement.videoMediaError, "Format link video tidak valid.");

        await driver.navigate().refresh();

    })

    it ('agent should can add multiple image media property', async function() {

        for (let i = 0; i < 2; i++) {
            const fileInputXpath = getPropertyMediaElement.uploadSitePlanXpath;
            await scrollToElement(driver, fileInputXpath);
            await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.propertyImage);
        
            const uploadButtonXpath = getPropertyMediaElement.uploadSitePlanButtonXpath;
            await scrollToElement(driver, uploadButtonXpath);
            await clickElement(driver, uploadButtonXpath);
        
            await delay(3000);
        
            const sitePlanUploadPopUpXpath = getPopUpElement.sitePlanUploadPopUpXpath;
            await waitForElementVisible(driver, sitePlanUploadPopUpXpath);
            await assertText(driver, getPopUpElement.popUpText, "Foto properti berhasil ditambahkan!");
            await clickElement(driver, getPopUpElement.popUpConfirm);
        }

        await delay(2000);

        await scrollToElement(driver, getPropertyMediaElement.mediaSubmitButtonXpath)
        await clickElement(driver, getPropertyMediaElement.mediaSubmitButtonXpath);
    
        await delay(3000);
    
        const mediaPopUpXpath = getPopUpElement.mediaPopUpXpath;
        await waitForElementVisible(driver, mediaPopUpXpath);
        await assertText(driver, getPopUpElement.mediaPopUpTextXpath, "Seluruh data media berhasil ditambahkan!");
        await clickElement(driver, getPopUpElement.mediaPopUpConfirmButtonXpath);

        await delay(3000);
    })

    it ('Add facility to property', async function() {

        await scrollToElement(driver, getPropertyFacilityElement.checkMarkXpath2);
        await clickElement(driver, getPropertyFacilityElement.checkMarkXpath2);
    
        await scrollToElement(driver, getPropertyFacilityElement.facilitySubmitButtonXpath);

        await clickElement(driver, getPropertyFacilityElement.facilitySubmitButtonXpath);

        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Fasilitas proyek berhasil ditambahkan!");

        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);
    })

    it ('Validated updated property', async function() {
        
        await scrollToElement(driver, getPropertyRingkasanElement.propertyTitleXpath);

        async function checkError(element, expectedText) {
            try {
                await scrollToElement(driver, element);
                await assertText(driver, element, expectedText);
            } catch (e) {
                errors.push(e.message);
            }
        }

        await checkError(getPropertyRingkasanElement.propertyTitleXpath, newUpdatePropertyTitle);

        await delay(3000);
    })

    it ('agent should can publish property', async function() {

        await scrollToElement(driver, getPropertyRingkasanElement.publishPropertyButtonXpath);
        await clickElement(driver, getPropertyRingkasanElement.publishPropertyButtonXpath);
    
        await delay(3000);

        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Property berhasil di publish!");
    
        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);

        await assertUrl(driver, "http://127.0.0.1:8000/property");
    })

    it ('agent should can see updated property', async function() {
        await scrollToElement(driver, getMenuElement.propertySearch);

        await enterText(driver, getMenuElement.propertySearch, newUpdatePropertyTitle);
        await driver.findElement(By.xpath(getMenuElement.propertySearch)).sendKeys(Key.ENTER);

        await delay(3000);

        await scrollToElement(driver, getMenuElement.activePropertyContainer);

        await assertText(driver, getMenuElement.propertyTitleXpath, newUpdatePropertyTitle);

    });

});