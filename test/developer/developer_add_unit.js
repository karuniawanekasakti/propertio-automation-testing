const { Builder, By, Key, until } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const unitInformasiFormElement = require('../../resource/utils/elements/unitInformasiFormElement');
const unitMediaFormElement = require('../../resource/utils/elements/unitMediaFormElement');
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
const getUnitMediaFormElement = unitMediaFormElement();

const uniqueName = generateUniqueName(5);

const newUnitTitle = `Unit ${uniqueName}`;

describe ('Developer Add Unit', function() {

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

    it('developer should be able to access property menu', async function() {
        await assertUrl(driver, "http://127.0.0.1:8000/dashboard");

        await clickElement(driver, getMenuElement.listingButtonXpath);
        await assertTitle(driver, "Propertio - List Proyek Properti");

        await delay(3000);
    });

    // it ('Developer should can see draft project detail', async function () {

    //     await scrollDown(driver, 500);

    //     await driver.findElement(By.xpath(getMenuElement.draftProjectTabXpath)).click();

    //     await driver.findElement(By.xpath(getMenuElement.projectSearchXpath)).sendKeys("Perumahan");

    //     await delay(2000);

    //     const projectContainer = await driver.findElement(By.xpath(getMenuElement.projectContainerXpath));
    //     should.exist(projectContainer);

    //     await driver.findElement(By.xpath(getMenuElement.projectDetailXpath)).click();

    //     await delay(3000);

    //     const addUnit = await driver.findElement(By.xpath(getMenuElement.addUnitProjectXpath));
    //     await scrollIntoView(driver, addUnit);

    //     await addUnit.click();

    // });

    it ('Developer should can see active project detail', async function () {

        await scrollDown(driver, 500);

        await driver.findElement(By.xpath(getMenuElement.projectSearchXpath)).sendKeys("Perumahan", Key.ENTER);

        await delay(2000);

        const projectContainer = await driver.findElement(By.xpath(getMenuElement.activeProjectContainerXpath));
        should.exist(projectContainer);

        await driver.findElement(By.xpath(getMenuElement.activeProjectDetailXpath)).click();

        await delay(3000);

        // const unitContainer = await driver.findElement(By.xpath(getMenuElement.unitContainerXpath));
        // await scrollIntoView(driver, unitContainer);
        // should.exist(unitContainer);
        await scrollDown(driver, 1400);

        const addUnit = await driver.findElement(By.xpath(getMenuElement.addUnitProjectXpath));
        await addUnit.click();

    });

    it ('Developer should can fill informasi unit', async function () {

        const name = await driver.findElement(By.xpath(getUnitInformasiFormElement.name));
        await driver.wait(until.elementIsVisible(name), 5000);
        await name.sendKeys(newUnitTitle);

        const deskripsi = await driver.findElement(By.xpath(getUnitInformasiFormElement.deskripsi));
        await driver.wait(until.elementIsVisible(deskripsi), 5000);
        await deskripsi.sendKeys("Unit 1 adalah unit yang paling dekat dengan fasilitas umum");

        const harga = await driver.findElement(By.xpath(getUnitInformasiFormElement.harga));
        await driver.wait(until.elementIsVisible(harga), 5000);
        await harga.sendKeys("200000000");

        const stokUnit = await driver.findElement(By.xpath(getUnitInformasiFormElement.stokUnit));
        await driver.wait(until.elementIsVisible(stokUnit), 5000);
        await stokUnit.sendKeys("10");

        const luasTanah = await driver.findElement(By.xpath(getUnitInformasiFormElement.luasTanah));
        await driver.wait(until.elementIsVisible(luasTanah), 5000);
        await luasTanah.sendKeys("100");

        const luasBangunan = await driver.findElement(By.xpath(getUnitInformasiFormElement.luasBangunan));
        await driver.wait(until.elementIsVisible(luasBangunan), 5000);
        await luasBangunan.sendKeys("80");

        const jumlahLantai = await driver.findElement(By.xpath(getUnitInformasiFormElement.floor));
        await driver.wait(until.elementIsVisible(jumlahLantai), 5000);
        await jumlahLantai.sendKeys("2");

        const kamar = await driver.findElement(By.xpath(getUnitInformasiFormElement.kamar));
        await driver.wait(until.elementIsVisible(kamar), 5000);
        await kamar.sendKeys("2");

        const kamarMandi = await driver.findElement(By.xpath(getUnitInformasiFormElement.kamarMandi));
        await driver.wait(until.elementIsVisible(kamarMandi), 5000);
        await kamarMandi.sendKeys("1");

        const tempatParkirDropDown = await driver.findElement(By.xpath(getUnitInformasiFormElement.tempatParkirDropDown))
        await driver.wait(until.elementIsVisible(tempatParkirDropDown), 5000);
        await tempatParkirDropDown.click();

        const tempatParkirDropDownItem = await driver.findElement(By.xpath(getUnitInformasiFormElement.tempatParkirDropDownItem));
        await driver.wait(until.elementIsVisible(tempatParkirDropDownItem), 5000);
        await tempatParkirDropDownItem.click();

        const dayaListrikDropDown = await driver.findElement(By.xpath(getUnitInformasiFormElement.dayaListrikDropDown));
        await driver.wait(until.elementIsVisible(dayaListrikDropDown), 5000);
        await dayaListrikDropDown.click();

        const dayaListrikDropDownItem = await driver.findElement(By.xpath(getUnitInformasiFormElement.dayaListrikDropDownItem));
        await driver.wait(until.elementIsVisible(dayaListrikDropDownItem), 5000);
        await dayaListrikDropDownItem.click();

        const jenisAirDropDown = await driver.findElement(By.xpath(getUnitInformasiFormElement.jenisAirDropDown));
        await driver.wait(until.elementIsVisible(jenisAirDropDown), 5000);
        await jenisAirDropDown.click();

        const jenisAirDropDownItem = await driver.findElement(By.xpath(getUnitInformasiFormElement.jenisAirDropDownItem));
        await driver.wait(until.elementIsVisible(jenisAirDropDownItem), 5000);
        await jenisAirDropDownItem.click();

        const interiorDropDown = await driver.findElement(By.xpath(getUnitInformasiFormElement.interiorDropDown));
        await driver.wait(until.elementIsVisible(interiorDropDown), 5000);
        await interiorDropDown.click();

        const interiorDropDownItem = await driver.findElement(By.xpath(getUnitInformasiFormElement.interiorDropDownItem));
        await driver.wait(until.elementIsVisible(interiorDropDownItem), 5000);
        await interiorDropDownItem.click();

        const aksesJalanDropDown = await driver.findElement(By.xpath(getUnitInformasiFormElement.aksesJalanDropDown));
        await driver.wait(until.elementIsVisible(aksesJalanDropDown), 5000);
        await aksesJalanDropDown.click();

        const aksesJalanDropDownItem = await driver.findElement(By.xpath(getUnitInformasiFormElement.aksesJalanDropDownItem));
        await driver.wait(until.elementIsVisible(aksesJalanDropDownItem), 5000);
        await aksesJalanDropDownItem.click();

        const submitUnitButton = await driver.findElement(By.xpath(getUnitInformasiFormElement.submitUnitButton));
        await scrollIntoView(driver, submitUnitButton);
        await submitUnitButton.click();

        await delay(3000);

        const popUpText = await driver.findElement(By.xpath(getPopUpElement.projectLocatonFormTextPopUp)).getText();
        popUpText.should.equal("Data Berhasil Disimpan!");

        await driver.findElement(By.xpath(getPopUpElement.projectLocationFormSubmitPopUp)).click();

        await delay(3000);

    });

    it ('Developer should can fill media unit', async function () {

        const foto = await driver.findElement(By.xpath(getUnitMediaFormElement.foto));
        await scrollIntoView(driver, foto);
        foto.sendKeys("E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\properti\\properti_1.jpg");

        await scrollDown(driver, 500);
        await driver.findElement(By.xpath(getUnitMediaFormElement.fotoSubmitButton)).click();

        await delay(3000);

        const popUpText = await driver.findElement(By.xpath(getPopUpElement.projectLocatonFormTextPopUp)).getText();
        popUpText.should.equal("Foto unit berhasil ditambahkan!");

        await delay(3000);

        await driver.findElement(By.xpath(getPopUpElement.unitMediaFormOkButtonXpath)).click();    
        
        await delay(3000);

        const linkVideo = await driver.findElement(By.xpath(getUnitMediaFormElement.linkVideo));
        await linkVideo.sendKeys("https://www.youtube.com/watch?v=PKyn_Msy9Bc");

        const virtualTour = await driver.findElement(By.xpath(getUnitMediaFormElement.virtualTour));
        await virtualTour.sendKeys("Virtual Tour Unit 1");

        const linkVirtualTour = await driver.findElement(By.xpath(getUnitMediaFormElement.linkVirtualTour));
        await linkVirtualTour.sendKeys("https://www.google.com");

        const dokumen = await driver.findElement(By.xpath(getUnitMediaFormElement.dokumen));
        dokumen.sendKeys("E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\properti\\Modul Manual Testing (2).pdf");

        const rilisUnit = await driver.findElement(By.xpath(getUnitMediaFormElement.rilisUnit));
        await scrollIntoView(driver, rilisUnit);
        await driver.findElement(By.xpath(getUnitMediaFormElement.rilisUnit)).click();

        await delay(3000);

        const popUpText2 = await driver.findElement(By.xpath(getPopUpElement.projectLocatonFormTextPopUp)).getText();
        popUpText2.should.equal("Seluruh data media berhasil disimpan!");

        await driver.findElement(By.xpath(getPopUpElement.projectLocationFormSubmitPopUp)).click();

        await delay(3000);

        const unitContainer = await driver.findElement(By.xpath(getMenuElement.unitContainerXpath));
        await scrollIntoView(driver, unitContainer);
        should.exist(unitContainer);

    });
});