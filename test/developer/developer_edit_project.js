const { Builder, By, Key, until } = require('selenium-webdriver');
const loginElement = require('../../resource/utils/elements/loginElement');
const menuElement = require('../../resource/utils/elements/menuElement');
const popUpElement = require('../../resource/utils/elements/popUpElement');
const projectLocationFormElement = require('../../resource/utils/elements/ProjectLocationFormElement');
const projectMediaFormElement = require('../../resource/utils/elements/projectMediaFormElement');
const projectFacilityFormElement = require('../../resource/utils/elements/projectFacilityFormElement');
const projectInfrastrukturFormElement = require('../../resource/utils/elements/projectInfrastrukturFormElement');
const { scrollDown, delay, generateUniqueName, scrollIntoView } = require('../../resource/utils/helper/helper');

var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

const getLoginElement = loginElement();
const getMenuElement = menuElement();
const getPopUpElement = popUpElement();
const getProjectLocationFormElement = projectLocationFormElement();

const uniqueName = generateUniqueName(5);

const newProjectTitle = `Project ${uniqueName}`;


describe ('Developer Edit Project', function() {
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

    it ('Developer should can edit project title', async function () {
        await scrollDown(driver, 500);

        await driver.findElement(By.xpath(getMenuElement.draftProjectTabXpath)).click();

        const editProject = await driver.findElement(By.xpath(getMenuElement.editProjectButtonXpath));
        await driver.wait(until.elementIsVisible(editProject), 5000);
        await editProject.click();

        
        const title = await driver.findElement(By.xpath(getProjectLocationFormElement.title));
        await driver.wait(until.elementIsVisible(title), 5000);
    
        await delay(3000);

        await title.sendKeys(Key.chord(Key.CONTROL, "a"), Key.DELETE);
        await title.sendKeys(newProjectTitle);

        const submitButton = await driver.findElement(By.xpath(getProjectLocationFormElement.submitButton));
        await scrollIntoView(driver, submitButton);
        await driver.findElement(By.xpath(getProjectLocationFormElement.submitButton)).click();

        await delay(3000);

        const popUpText = await driver.findElement(By.xpath(getPopUpElement.projectLocatonFormTextPopUp)).getText();
        popUpText.should.equal("Data Berhasil Disimpan!");

        await driver.findElement(By.xpath(getPopUpElement.projectLocationFormSubmitPopUp)).click();

        await delay(3000);

    });

    it ('Developer should can search updated project', async function () {
        await driver.get('http://127.0.0.1:8000/project')

        await scrollDown(driver, 500);

        await driver.findElement(By.xpath(getMenuElement.draftProjectTabXpath)).click();

        await driver.findElement(By.xpath(getMenuElement.projectSearchXpath)).sendKeys(newProjectTitle, Key.RETURN);

        await delay(3000);

        const projectTitle = await driver.findElement(By.xpath(getMenuElement.propertyTitleXpath)).getText();
        projectTitle.should.equal(newProjectTitle);
    });
});