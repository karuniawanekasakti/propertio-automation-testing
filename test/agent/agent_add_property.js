const { Builder, By, Key, until } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const propertyLocationFormElement = require('../../resource/utils/elements/propertyLocationFormElement');
const propertyDetailFormElement = require('../../resource/utils/elements/propertyDetailFormElement');
const propertyMediaFormElement = require('../../resource/utils/elements/propertyMediaFormElement');
const propertyFacilityFormElement = require('../../resource/utils/elements/propertyFacilityFormElement');
const propertyRingkasanFormElement = require('../../resource/utils/elements/propertyRingkasanFormElement');
const propertyFormErrorElement = require('../../resource/utils/elements/propertyFormErrorElement');
const globalVariable = require('../../resource/utils/helper/globalVariable');

const { delay, scrollDown, assertTitle, uploadFile, assertUrl, clickElement, waitForElementVisible, assertText, enterText, scrollToElement, clearInput, verifyElementExists} = require('../../resource/utils/helper/helper');

var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver; 

//define elements
const getLoginElement = loginElement();
const getMenuElement = menuElement();
const getPopUpElement = popUpElement();
const getPropertyLocationElement = propertyLocationFormElement();
const getPropertyDetailElement = propertyDetailFormElement();
const getPropertyMediaElement = propertyMediaFormElement();
const getPropertyFacilityElement = propertyFacilityFormElement();
const getPropertyRingkasanElement = propertyRingkasanFormElement();
const getPropertyFormErrorElement = propertyFormErrorElement();
const getGlobalVariable = globalVariable();

const newPropertyTitle = getGlobalVariable.propertyTitle;

describe ('Agent add property', function() {

    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });
    
    after (async function () {
        await driver.quit();
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

    it('agent should be able to access property menu and add property', async function() {
        await assertUrl(driver, "http://127.0.0.1:8000/dashboard");

        await clickElement(driver, getMenuElement.listingButtonXpath);
        await assertTitle(driver, "Propertio - List Properti");

        await clickElement(driver, getMenuElement.addPropertyButtonXpath);
        await assertTitle(driver, "Propertio - Tambah Iklan Property");

        await delay(3000);
    });

    it('agent should not be able to fill location form with empty fields', async function() {
        await scrollToElement(driver, getPropertyLocationElement.locationSubmitButtonXpath);
        await clickElement(driver, getPropertyLocationElement.locationSubmitButtonXpath);
    
        const errors = [];
    
        async function checkError(element, expectedText) {
            try {
                await scrollToElement(driver, element);
                await assertText(driver, element, expectedText);
            } catch (e) {
                errors.push(e.message);
            }
        }

        await checkError(getPropertyFormErrorElement.headlineErrorXpath, "Beritaa utama wajib diisi.");
        await checkError(getPropertyFormErrorElement.listingTypeErrorXpath, "Tipe listing wajib diisi.");
        await checkError(getPropertyFormErrorElement.titleErrorXpath, "Judul wajib diisi.");
        await checkError(getPropertyFormErrorElement.propertyTypeErrorXpath, "Property type id wajib diisi.");
        await checkError(getPropertyFormErrorElement.cerrificateErrorXpath, "Sertifikat wajib diisi.");
        await checkError(getPropertyFormErrorElement.addressErrorXpath, "Alamat wajib diisi.");
        await checkError(getPropertyFormErrorElement.provinceErrorXpath, "Provinsi wajib diisi.");
        await checkError(getPropertyFormErrorElement.cityErrorXpath, "Kota wajib diisi.");
        await checkError(getPropertyFormErrorElement.districtErrorXpath, "Kecamatan wajib diisi.");
        await checkError(getPropertyFormErrorElement.langitudeErrorXpath, "Longitude wajib diisi.");
        await checkError(getPropertyFormErrorElement.latitudeErrorXpath, "Latitude wajib diisi.");
    
        await delay(3000);
    
        await driver.navigate().refresh();
    
        await delay(3000);
    });

    it('agent should be able to fill location form', async function() {
        await enterText(driver, getPropertyLocationElement.headlineXpath, "Rumah di Jakarta");
    
        await clickElement(driver, getPropertyLocationElement.listingTypeDropdownXpath);
        await clickElement(driver, getPropertyLocationElement.listingTypeItemXpath);
    
        await enterText(driver, getPropertyLocationElement.titleProperty, newPropertyTitle);
    
        await clickElement(driver, getPropertyLocationElement.propertyTypeDropdownXpath);
        await clickElement(driver, getPropertyLocationElement.propertyTypeItemXpath);
    
        await clickElement(driver, getPropertyLocationElement.certificateDropdownXpath);
        await clickElement(driver, getPropertyLocationElement.certificateItemXpath);
    
        await enterText(driver, getPropertyLocationElement.addressXpath, getGlobalVariable.propertyAddress);
    
        await clickElement(driver, getPropertyLocationElement.provinceDropdownXpath);
        await waitForElementVisible(driver, getPropertyLocationElement.provinceItemXpath);
        await clickElement(driver, getPropertyLocationElement.provinceItemXpath);
    
        await clickElement(driver, getPropertyLocationElement.cityDropdownXpath);
        await waitForElementVisible(driver, getPropertyLocationElement.cityItemXpath);
        await clickElement(driver, getPropertyLocationElement.cityItemXpath);
    
        await clickElement(driver, getPropertyLocationElement.districtDropdownXpath);
        await waitForElementVisible(driver, getPropertyLocationElement.districtItemXpath);
        await clickElement(driver, getPropertyLocationElement.districtItemXpath);
    
        await enterText(driver, getPropertyLocationElement.postalCoceXpath, "12345");
    
        await enterText(driver, getPropertyLocationElement.mapXpath, "Jl. Citra Kalibiru No. 1, Jakarta Pusat");
        await delay(5000);
    
        const mapInput = await driver.findElement(By.xpath(getPropertyLocationElement.mapXpath));
        await mapInput.sendKeys(Key.ARROW_DOWN, Key.ENTER);

        await scrollToElement(driver, getPropertyLocationElement.locationSubmitButtonXpath);
    
        await clickElement(driver, getPropertyLocationElement.locationSubmitButtonXpath);
    
        await delay(3000);
    
        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Data Berhasil Disimpan!");
    
        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);
    });


    it('agent should not be able to fill detail form with empty fields', async function() {
        await scrollDown(driver, 900);
        await clickElement(driver, getPropertyDetailElement.detailSubmitButtonXpath);
    
        await delay(3000);
        
        async function checkError(element, expectedText) {
            try {
                await scrollToElement(driver, element);
                await assertText(driver, element, expectedText);
            } catch (e) {
                errors.push(e.message);
            }
        }

        await checkError(getPropertyFormErrorElement.priceErrorXpath, "Harga wajib diisi.");
        await checkError(getPropertyFormErrorElement.priceTypeErrorXpath, "Tipe harga wajib diisi.");

    
        await delay(3000);
    
        await driver.navigate().refresh();
    
        await delay(3000);
    });

    it('agent should be able to fill detail form', async function() {
        await enterText(driver, getPropertyDetailElement.surfaceAreaXpath, "100");
        await enterText(driver, getPropertyDetailElement.buildingAreaXpath, "500");
        await enterText(driver, getPropertyDetailElement.floorXpath, "2");
        await enterText(driver, getPropertyDetailElement.descriptionXpath, "Rumah di Jakarta Utara");
        await enterText(driver, getPropertyDetailElement.bedroomXpath, "3");
        await enterText(driver, getPropertyDetailElement.bathroomXpath, "2");
    
        await clickElement(driver, getPropertyDetailElement.garageDropdownXpath);
        await clickElement(driver, getPropertyDetailElement.garageItemXpath);
    
        await enterText(driver, getPropertyDetailElement.priceXpath, getGlobalVariable.propertyPrice);
    
        await clickElement(driver, getPropertyDetailElement.priceTypeXpath);
        await clickElement(driver, getPropertyDetailElement.priceTypeItemXpath);
    
        await clickElement(driver, getPropertyDetailElement.powerSupplyDropdownXpath);
        await clickElement(driver, getPropertyDetailElement.powerSupplyItemXpath);
    
        await clickElement(driver, getPropertyDetailElement.waterTypeDropdownXpath);
        await clickElement(driver, getPropertyDetailElement.waterTypeItemXpath);
    
        await clickElement(driver, getPropertyDetailElement.interiorDropdownXpath);
        await clickElement(driver, getPropertyDetailElement.interiorItemXpath);
    
        await clickElement(driver, getPropertyDetailElement.conditionDropdownXpath);
        await clickElement(driver, getPropertyDetailElement.conditionItemXpath);
    
        await clickElement(driver, getPropertyDetailElement.facingDropdownXpath);
        await clickElement(driver, getPropertyDetailElement.facingItemXpath);
    
        await clickElement(driver, getPropertyDetailElement.roadAccessXpath);
        await clickElement(driver, getPropertyDetailElement.roadAccessItemXpath);
    
        await enterText(driver, getPropertyDetailElement.yearBuiltXpath, "2020");
    
        await clickElement(driver, getPropertyDetailElement.detailSubmitButtonXpath);
    
        await delay(3000);
    
        await waitForElementVisible(driver, getPopUpElement.popUpText);
    
        await assertText(driver, getPopUpElement.popUpText, "Detail Properti berhasil ditambahkan!");
    
        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);
    });

    it ('Agent cant submit empty property image', async function() {
        await scrollToElement(driver, getPropertyMediaElement.uploadSitePlanButtonXpath);
        await clickElement(driver, getPropertyMediaElement.uploadSitePlanButtonXpath);

        try {
            await waitForElementVisible(driver, getPopUpElement.popUpText);
            await assertText(driver, getPopUpElement.popUpText, "Foto properti perlu diisi minimal 1 (satu)!");
            await clickElement(driver, getPopUpElement.popUpConfirm);
        }catch (error) {
            throw new Error('Pop up not found');
        }

        await delay(3000);
        await driver.navigate().refresh();
    })

    it ('Validate Virtual tour field', async function() {
        await scrollToElement(driver, getPropertyMediaElement.virtualTourNameXpath);
        await enterText(driver, getPropertyMediaElement.virtualTourNameXpath, "Virtual Tour Rumah");

        await scrollToElement(driver, getPropertyMediaElement.mediaSubmitButtonXpath);
        await clickElement(driver, getPropertyMediaElement.mediaSubmitButtonXpath);

        await delay(2000);

        await scrollToElement(driver, getPropertyMediaElement.virtualTourNameXpath);
        await verifyElementExists(driver, getPropertyFormErrorElement.virtualTourError);

        await assertText(driver, getPropertyFormErrorElement.virtualTourError, "There is empty input. Please fill the empty input.");
        
        await delay(3000);
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

    it('agent should be able to fill media form', async function() {
        const fileInputXpath = getPropertyMediaElement.uploadSitePlanXpath;
        await scrollToElement(driver, fileInputXpath);
        await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.propertyImage);
    
        const uploadButtonXpath = getPropertyMediaElement.uploadSitePlanButtonXpath;
        await scrollToElement(driver, uploadButtonXpath);
        await clickElement(driver, uploadButtonXpath);
    
        await delay(3000);
    
        const sitePlanUploadPopUpXpath = getPopUpElement.popUpText;
        await waitForElementVisible(driver, sitePlanUploadPopUpXpath);
        await assertText(driver, getPopUpElement.popUpText, "Foto properti berhasil ditambahkan!");
        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        const imageContainerXpath = getPropertyMediaElement.sitePlanImageContainerXpath;
        await waitForElementVisible(driver, imageContainerXpath);
    
        await enterText(driver, getPropertyMediaElement.videoLinkXpath, "https://www.youtube.com/watch?v=XN59FvlTyHo");
        await enterText(driver, getPropertyMediaElement.virtualTourNameXpath, "Virtual Tour Rumah");
        await enterText(driver, getPropertyMediaElement.virtualTourLinkXpath, "https://www.youtube.com/watch?v=6qJlw5w4fPc");
    
        await scrollToElement(driver, getPropertyMediaElement.mediaSubmitButtonXpath)
        await clickElement(driver, getPropertyMediaElement.mediaSubmitButtonXpath);
    
        await delay(3000);
    
        const mediaPopUpXpath = getPopUpElement.popUpText;
        await waitForElementVisible(driver, mediaPopUpXpath);
        await assertText(driver, getPopUpElement.mediaPopUpTextXpath, "Seluruh data media berhasil ditambahkan!");
        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);
    });

    it ('Agent should not be able to fill facility form with empty fields', async function() {

        await scrollToElement(driver, getPropertyFacilityElement.facilitySubmitButtonXpath);
        await clickElement(driver, getPropertyFacilityElement.facilitySubmitButtonXpath);

        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Fasilitas properti perlu diisi minimal 1 (satu)!");

        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);

    })
    
    it('agent should be able to fill facility form', async function() {

        await scrollToElement(driver, getPropertyFacilityElement.checkMarkXpath);
        await clickElement(driver, getPropertyFacilityElement.checkMarkXpath);
    
        await scrollToElement(driver, getPropertyFacilityElement.facilitySubmitButtonXpath);

        await clickElement(driver, getPropertyFacilityElement.facilitySubmitButtonXpath);

        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Fasilitas proyek berhasil ditambahkan!");

        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);
    });

    it ('Validate property information', async function() {

        const address = getGlobalVariable.propertyAddress
        
        await scrollToElement(driver, getPropertyRingkasanElement.propertyTitleXpath);

        async function checkError(element, expectedText) {
            try {
                await scrollToElement(driver, element);
                await assertText(driver, element, expectedText);
            } catch (e) {
                errors.push(e.message);
            }
        }

        await checkError(getPropertyRingkasanElement.propertyTitleXpath, newPropertyTitle);
        await checkError(getPropertyRingkasanElement.propertyAddress, address);
        await checkError(getPropertyRingkasanElement.propertyProvince, "DKI JAKARTA");
        await checkError(getPropertyRingkasanElement.propertyCity, "KOTA JAKARTA BARAT");
        await checkError(getPropertyRingkasanElement.propertyDistrict, "PALMERAH");
        await checkError(getPropertyRingkasanElement.propertyType, "Rumah");
        await checkError(getPropertyRingkasanElement.propertyBedroom, "3");
        await checkError(getPropertyRingkasanElement.propertyBathroom, "2");

        await delay(3000);
    })

    it('agent should be able to publish property', async function() {
        await scrollToElement(driver, getPropertyRingkasanElement.publishPropertyButtonXpath);
        await clickElement(driver, getPropertyRingkasanElement.publishPropertyButtonXpath);
    
        await delay(3000);

        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Property berhasil di publish!");
    
        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);

        await assertUrl(driver, "http://127.0.0.1:8000/property");
    });

    it('agent should be able to see the property in list property in tab tayang', async function() {

        await scrollToElement(driver, getMenuElement.propertySearch);

        await enterText(driver, getMenuElement.propertySearch, newPropertyTitle);
        await driver.findElement(By.xpath(getMenuElement.propertySearch)).sendKeys(Key.ENTER);

        await delay(3000);

        await scrollToElement(driver, getMenuElement.activePropertyContainer);

        await assertText(driver, getMenuElement.propertyTitleXpath, newPropertyTitle);
    });
});