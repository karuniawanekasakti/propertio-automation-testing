const { Builder, By, Key, until } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const unitInformasiFormElement = require('../../resource/utils/elements/unitInformasiFormElement');
const unitMediaFormElement = require('../../resource/utils/elements/unitMediaFormElement');
const { scrollDown, delay, generateUniqueName, scrollIntoView } = require('../../resource/utils/helper/helper');
const chai = require('chai');

var should = chai.should();

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

describe ('Developer Edit Unit', function() {

    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize(); 
    });
    
    after (async function () {
        // await driver.quit();
    });

    afterEach(async function () {
        console.log("Test '" + this.currentTest.title + "' done ✅");
    });

    it ('Developer should can login', async function () {
        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");

        await driver.findElement(By.xpath(getLoginElement.loginRegisterButtonXpath)).click();
        let loginPageTitle = await driver.getTitle();
        loginPageTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //fill form
        await driver.findElement(By.xpath(getLoginElement.emailFieldXpath)).sendKeys("developer@mail.com");
        await driver.findElement(By.xpath(getLoginElement.passwordFieldXpath)).sendKeys("11111111");
        await driver.findElement(By.xpath(getLoginElement.loginButtonXpath)).click();

        const loginModal = await driver.findElement(By.xpath(getLoginElement.loginModalXpath));
        await driver.wait(until.elementIsVisible(loginModal), 5000);

        const loginModalText = await driver.findElement(By.xpath(getLoginElement.loginModalTextXpath)).getText();
        loginModalText.should.equal("Login ke Akun Anda berhasil!");

        await delay(3000);

        const dashboardUrl = await driver.getCurrentUrl();
        dashboardUrl.should.equal("http://127.0.0.1:8000/dashboard");

        //check profile photo
        const userProfileName = await driver.findElement(By.xpath(getMenuElement.userProfileNameXpath));
        await driver.wait(until.elementIsVisible(userProfileName), 5000);
        const userProfileText = await driver.findElement(By.xpath(getMenuElement.userProfileNameXpath)).getText();
        userProfileText.should.equal("Danish Widodo");
    });

    it ('Developer should can access list project', async function () {
        const dashboardUrl = await driver.getCurrentUrl();
        dashboardUrl.should.equal("http://127.0.0.1:8000/dashboard");

        await driver.findElement(By.xpath(getMenuElement.listingButtonXpath)).click();
        let listProjectPageTitle = await driver.getTitle();
        listProjectPageTitle.should.equal("Propertio - List Proyek Properti");

        await delay(3000);
    });

    it ('Developer should can see active project detail', async function () {

        await scrollDown(driver, 500);

        await driver.findElement(By.xpath(getMenuElement.projectSearchXpath)).sendKeys("Perumahan", Key.ENTER);

        await delay(2000);

        const projectContainer = await driver.findElement(By.xpath(getMenuElement.activeProjectContainerXpath));
        should.exist(projectContainer);

        await driver.findElement(By.xpath(getMenuElement.activeProjectDetailXpath)).click();

        await delay(3000);

        const unitContainer = await driver.findElement(By.xpath(getMenuElement.unitContainerXpath));
        await scrollIntoView(driver, unitContainer);
        should.exist(unitContainer);

    });

    it ('Developer should can edit unit', async function () {

        await driver.findElement(By.xpath(getMenuElement.unitEditButtonXpath)).click();

        const name = await driver.findElement(By.xpath(getUnitInformasiFormElement.name));
        await delay(3000);
        await name.clear();
        await name.sendKeys(newUnitTitle);

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

        await driver.findElement(By.xpath(getPopUpElement.projectLocationFormSubmitPopUp)).click();

        const rilisUnit = await driver.findElement(By.xpath(getUnitMediaFormElement.rilisUnit));
        await scrollDown(driver, 1500);
        await rilisUnit.click();

        await delay(3000);

        const popUpText2 = await driver.findElement(By.xpath(getPopUpElement.projectLocatonFormTextPopUp)).getText();
        popUpText2.should.equal("Seluruh data media berhasil disimpan!");

        await driver.findElement(By.xpath(getPopUpElement.projectLocationFormSubmitPopUp)).click();

        await delay(3000);


    });

    it ('Developer should can see updated unit', async function () {
        const unitContainer = await driver.findElement(By.xpath(getMenuElement.unitContainerXpath));
        await scrollIntoView(driver, unitContainer);
        should.exist(unitContainer);

        const unitTitle = await driver.findElement(By.xpath(getMenuElement.unitTitleXpath)).getText();
        unitTitle.should.equal(newUnitTitle);
    });
});