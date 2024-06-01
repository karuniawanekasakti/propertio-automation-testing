const { Builder, By, Key, until } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const projectLocationFormElement = require('../../resource/utils/elements/ProjectLocationFormElement');
const projectMediaFormElement = require('../../resource/utils/elements/projectMediaFormElement');
const projectFacilityFormElement = require('../../resource/utils/elements/projectFacilityFormElement');
const projectInfrastrukturFormElement = require('../../resource/utils/elements/projectInfrastrukturFormElement');
const projectFormErrorElement = require('../../resource/utils/elements/projectFormError');
const projectDetailElement = require('../../resource/utils/elements/projectDetailElement');
const globalVariable = require('../../resource/utils/helper/globalVariable');

const { delay, scrollDown, assertTitle, uploadFile, assertUrl, clickElement, waitForElementVisible, assertText, enterText, scrollToElement, clearInput, verifyElementExists} = require('../../resource/utils/helper/helper');

var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

const getLoginElement = loginElement();
const getMenuElement = menuElement();
const getPopUpElement = popUpElement();
const getProjectLocationFormElement = projectLocationFormElement();
const getProjectMediaFormElement = projectMediaFormElement();
const getProjectFacilityFormElement = projectFacilityFormElement();
const getProjectInfrastrukturFormElement = projectInfrastrukturFormElement();
const getProjectFormErrorElement = projectFormErrorElement();
const getProjectDetailElement = projectDetailElement();
const getGlobalVariable = globalVariable();

const newProjectTitle = getGlobalVariable.proyekTitle
const newProjectHeadline = getGlobalVariable.proyekHeadline


describe ('Developer add project', function() {

    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });
    
    after (async function () {
        // await driver.quit();
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

    it('developer should be able to access property menu and add project', async function() {
        await assertUrl(driver, "http://127.0.0.1:8000/dashboard");

        await clickElement(driver, getMenuElement.listingButtonXpath);
        await assertTitle(driver, "Propertio - List Proyek Properti");

        await clickElement(driver, getMenuElement.addPropertyButtonXpath);
        await assertTitle(driver, "Propertio - Iklan Proyek Properti");

        await delay(3000);
    });

    it ('Validate empty location form', async function() {
        await scrollToElement(driver, getProjectLocationFormElement.submitButton);
        await clickElement(driver, getProjectLocationFormElement.submitButton);

        const errors = [];
    
        async function checkError(element, expectedText) {
            try {
                await scrollToElement(driver, element);
                await assertText(driver, element, expectedText);
            } catch (e) {
                errors.push(e.message);
            }
        }

        await checkError(getProjectFormErrorElement.headlineErrorXpath, "Berita utama wajib diisi.");
        await checkError(getProjectFormErrorElement.titleErrorXpath, "Nama proyek harus diisi");
        await checkError(getProjectFormErrorElement.provinceErrorXpath, "Provinsi harus diisi");
        await checkError(getProjectFormErrorElement.cityErrorXpath, "Kota harus diisi");
        await checkError(getProjectFormErrorElement.districtErrorXpath, "Kecamatan harus diisi");
        await checkError(getProjectFormErrorElement.latitudeErrorXpath, "Latitude wajib diisi.");
        await checkError(getProjectFormErrorElement.langitudeErrorXpath, "Longitude wajib diisi.");

        await delay(3000);
    
        await driver.navigate().refresh();
    
        await delay(3000);
    })

    

    it('Developer should can fill location form', async function () {
        await enterText(driver, getProjectLocationFormElement.headline, newProjectHeadline);
    
        await enterText(driver, getProjectLocationFormElement.tahunProject, "2012");
    
        await enterText(driver, getProjectLocationFormElement.title, newProjectTitle);
    
        await clickElement(driver, getProjectLocationFormElement.tipePropertiDropDown);
        await clickElement(driver, getProjectLocationFormElement.tipePropertiDropDownItem);
    
        await clickElement(driver, getProjectLocationFormElement.sertifikatDropDown);
        await clickElement(driver, getProjectLocationFormElement.sertifikatDropDownItem);
    
        await enterText(driver, getProjectLocationFormElement.deskripsi, "Rumah mewah di Jakarta Selatan dengan fasilitas lengkap");
    
        await enterText(driver, getProjectLocationFormElement.alamat, getGlobalVariable.propertyAddress);
    
        await clickElement(driver, getProjectLocationFormElement.provinceDropDown);
        await waitForElementVisible(driver, getProjectLocationFormElement.provinceDropDownItem);
        await clickElement(driver, getProjectLocationFormElement.provinceDropDownItem);
    
        await clickElement(driver, getProjectLocationFormElement.kotaDropDown);
        await waitForElementVisible(driver, getProjectLocationFormElement.kotaDropDownItem);
        await clickElement(driver, getProjectLocationFormElement.kotaDropDownItem);
    
        await clickElement(driver, getProjectLocationFormElement.kecamatanDropDown);
        await waitForElementVisible(driver, getProjectLocationFormElement.kecamatanDropDownItem);
        await clickElement(driver, getProjectLocationFormElement.kecamatanDropDownItem);
    
        await enterText(driver, getProjectLocationFormElement.kodePos, "12345");
    
        await enterText(driver, getProjectLocationFormElement.mapXpath, "Jl. Citra Kalibiru No. 1, Jakarta Utara");
        await delay(5000);

        const mapInput = await driver.findElement(By.xpath(getProjectLocationFormElement.mapXpath));
        await mapInput.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    
        await scrollToElement(driver, getProjectLocationFormElement.sitePlanUpload);

        const fileInputXpath = getProjectLocationFormElement.sitePlanUpload;
        await scrollToElement(driver, fileInputXpath);
        await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.propertyImage);
        
        await scrollToElement(driver, getProjectLocationFormElement.submitButton);
        await clickElement(driver, getProjectLocationFormElement.submitButton);
        await delay(3000);
    
        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Data Berhasil Disimpan!");
    
        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);
    });

    it ('Developer cant submit empty property image', async function() {
        await scrollToElement(driver, getProjectMediaFormElement.gambarPropertiSubmit);
        await clickElement(driver, getProjectMediaFormElement.gambarPropertiSubmit);

        try {
            await waitForElementVisible(driver, getProjectFormErrorElement.photoError);
            await scrollToElement(driver, getProjectFormErrorElement.photoError);
            await assertText(driver, getProjectFormErrorElement.photoError, "Foto wajib diisi.");
        }catch (error) {
            throw new Error('Error Text not found');
        }

        await delay(3000);
        await driver.navigate().refresh();
    })

    it ('Validate Virtual tour field', async function() {
        await scrollToElement(driver, getProjectMediaFormElement.virtualTourName);
        await enterText(driver, getProjectMediaFormElement.virtualTourName, "Virtual Tour Rumah");

        await scrollToElement(driver, getProjectMediaFormElement.mediaFormSubmit);
        await clickElement(driver, getProjectMediaFormElement.mediaFormSubmit);

        await delay(2000);

        await scrollToElement(driver, getProjectMediaFormElement.virtualTourName);
        await verifyElementExists(driver, getProjectFormErrorElement.virtualTourError);

        await assertText(driver, getProjectFormErrorElement.virtualTourError, "There is empty input. Please fill the empty input.");
        
        await delay(3000);
    })

    it ('Valiate Video Link field', async function() {
        await scrollToElement(driver, getProjectMediaFormElement.linkVideo);
        await enterText(driver, getProjectMediaFormElement.linkVideo, "qwertyuiop");

        await scrollToElement(driver, getProjectMediaFormElement.mediaFormSubmit);

        await delay(2000);

        await scrollToElement(driver, getProjectMediaFormElement.linkVideo);
        await verifyElementExists(driver, getProjectFormErrorElement.videoError);

        await assertText(driver, getProjectFormErrorElement.videoError, "Format link video tidak valid.");

        await driver.navigate().refresh();

    })

    it('Developer should can fill media form', async function () {
    
        const fileInputXpath = getProjectMediaFormElement.gambarPropertiUpload;
        await scrollToElement(driver, fileInputXpath);
        await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.propertyImage);

        await scrollToElement(driver, getProjectMediaFormElement.gambarPropertiSubmit);
        await clickElement(driver, getProjectMediaFormElement.gambarPropertiSubmit);

        await delay(3000);
    
        const sitePlanUploadPopUpXpath = getPopUpElement.popUpText;
        await waitForElementVisible(driver, sitePlanUploadPopUpXpath);
        await assertText(driver, getPopUpElement.popUpText, "Foto proyek berhasil ditambahkan!");
        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);

        await enterText(driver, getProjectMediaFormElement.linkVideo, "https://www.youtube.com/watch?v=9bZkp7q19f0");
    
        await enterText(driver, getProjectMediaFormElement.virtualTourName, "Virtual Tour Rumah Mewah");
    
        await enterText(driver, getProjectMediaFormElement.virtualTourLink, "https://www.google.com/maps");
    
        await scrollToElement(driver, getProjectMediaFormElement.documentButton);
        await driver.findElement(By.xpath(getProjectMediaFormElement.documentUpload)).sendKeys(getGlobalVariable.proyekDocument);
    
        await scrollToElement(driver, getProjectMediaFormElement.mediaFormSubmit);
        await clickElement(driver, getProjectMediaFormElement.mediaFormSubmit);

        const mediaPopUpXpath = getPopUpElement.popUpText;
        await waitForElementVisible(driver, mediaPopUpXpath);
        await assertText(driver, getPopUpElement.mediaPopUpTextXpath, "Seluruh data media berhasil ditambahkan!");
        await clickElement(driver, getPopUpElement.popUpConfirm);

        await delay(3000);
    });

    it ('Agent should not be able to fill facility form with empty fields', async function() {

        await scrollToElement(driver, getProjectFacilityFormElement.facilitySubmitButtonXpath);
        await clickElement(driver, getProjectFacilityFormElement.facilitySubmitButtonXpath);

        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Fasilitas properti perlu diisi minimal 1 (satu)!");

        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);

    })

    it('agent should be able to fill facility form', async function() {

        await scrollToElement(driver, getProjectFacilityFormElement.checkMarkXpath);
        await clickElement(driver, getProjectFacilityFormElement.checkMarkXpath);
    
        await scrollToElement(driver, getProjectFacilityFormElement.facilitySubmitButtonXpath);

        await clickElement(driver, getProjectFacilityFormElement.facilitySubmitButtonXpath);

        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Fasilitas proyek berhasil ditambahkan!");

        await clickElement(driver, getPopUpElement.popUpConfirm);
    
        await delay(3000);
    });

    it ('Validate infrastuktur empty form', async function() {
        await scrollToElement(driver, getProjectInfrastrukturFormElement.simpanJenisInfrastruktur);
        await clickElement(driver, getProjectInfrastrukturFormElement.simpanJenisInfrastruktur);

        const errors = [];
    
        async function checkError(element, expectedText) {
            try {
                await scrollToElement(driver, element);
                await assertText(driver, element, expectedText);
            } catch (e) {
                errors.push(e.message);
            }
        }

        await checkError(getProjectFormErrorElement.namaInfrastrukturError, "Nama wajib diisi.");
        await checkError(getProjectFormErrorElement.infrastrukturIdError, "Infrastructure type id wajib diisi.");
    })

    it('Developer should can fill infrastruktur form', async function () {
        await enterText(driver, getProjectInfrastrukturFormElement.name, 'Taman');
    
        await clickElement(driver, getProjectInfrastrukturFormElement.jenisInfrastrukturDropDown);
        await clickElement(driver, getProjectInfrastrukturFormElement.jenisInfrastrukturDropDownItem);
    
        await clickElement(driver, getProjectInfrastrukturFormElement.simpanJenisInfrastruktur);
    
        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Infrastrukutur proyek berhasil ditambahkan!");
        await clickElement(driver, getPopUpElement.popUpConfirm);
        await delay(3000);
    
        await verifyElementExists(driver, getProjectInfrastrukturFormElement.jenisInfrastrukturContainer);

    });

    it ('validate published project', async function() {
        await scrollToElement(driver, getProjectInfrastrukturFormElement.publishProject);
        await clickElement(driver, getProjectInfrastrukturFormElement.publishProject);
    
        await waitForElementVisible(driver, getPopUpElement.popUpText);
        await assertText(driver, getPopUpElement.popUpText, "Project berhasil di publish!");
        await clickElement(driver, getPopUpElement.popUpConfirm);
    })

    it ('Validate proyek information', async function() {
        const province = `ACEH`
        const city = ` KABUPATEN SIMEULUE`
        const district = `SIMEULUE TIMUR`
        const fullAddress = `${district}, ${city}, ${province}`

        await scrollToElement(driver, getProjectDetailElement.title);
        await assertText(driver, getProjectDetailElement.title, newProjectTitle);

        await scrollToElement(driver, getProjectDetailElement.headline);
        await assertText(driver, getProjectDetailElement.headline, newProjectHeadline);

        await scrollToElement(driver, getProjectDetailElement.fullAddress);
        await assertText(driver, getProjectDetailElement.fullAddress, fullAddress);
    })
}); 