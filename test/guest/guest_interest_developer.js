const { Builder, By, Key, until } = require('selenium-webdriver');
const { delay,scrollDown, generateRandomEmail, clickElementWithJS, scrollIntoView } = require('../../resource/utils/helper/helper');
const detailProjectElement = require('../../resource/utils/elements/detailProjectElement');
const { del } = require('selenium-webdriver/http');
var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

const getDetailProjectElement = detailProjectElement();

describe('User Interest', function() {

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
        await driver.get(url); 
        
        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");
    });

    it ('user should can send interest message to developer', async function() {

        await delay(3000);
        await scrollDown(driver, 700);

        await driver.findElement(By.id(getDetailProjectElement.projectSellButtonId)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - List Project");

        await delay(3000);

        const projectTitleElement = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath));
        let projectTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath)).getText();
        await clickElementWithJS(driver, projectTitleElement);
        
        const projectDetailTitle = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement));
        await driver.wait(until.elementIsVisible(projectDetailTitle), 5000);
        let projectDetailTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement)).getText();

        projectDetailTitleText.should.equal(projectTitleText);

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Project");
        

        await delay(3000);
        await scrollDown(driver, 5700);

        await driver.findElement(By.xpath(getDetailProjectElement.nameXpath)).sendKeys("User Testing");
        await driver.findElement(By.xpath(getDetailProjectElement.phoneXpath)).sendKeys("62865362816");
        await driver.findElement(By.xpath(getDetailProjectElement.emailXpath)).sendKeys(await generateRandomEmail());
        await driver.findElement(By.xpath(getDetailProjectElement.submitInformation)).click();

        await driver.wait(until.elementLocated(By.className(getDetailProjectElement.swalClass)), 5000);
        let swalText = await driver.findElement(By.id(getDetailProjectElement.swalTextId)).getText();

        swalText.should.equal("Pesan berhasil dikirim");


    });

    it ('user should not send interest message with letter number format', async function() {
        
        await delay(3000);
        await scrollDown(driver, 700);

        await driver.findElement(By.id(getDetailProjectElement.projectSellButtonId)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - List Project");

        await delay(3000);

        const projectTitleElement = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath));
        let projectTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath)).getText();
        await clickElementWithJS(driver, projectTitleElement);
        
        const projectDetailTitle = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement));
        await driver.wait(until.elementIsVisible(projectDetailTitle), 5000);
        let projectDetailTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement)).getText();

        projectDetailTitleText.should.equal(projectTitleText);

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Project");
        

        await delay(3000);
        await scrollDown(driver, 5700);

        await driver.findElement(By.xpath(getDetailProjectElement.nameXpath)).sendKeys("User Testing");
        await driver.findElement(By.xpath(getDetailProjectElement.phoneXpath)).sendKeys("testing");
        await driver.findElement(By.xpath(getDetailProjectElement.emailXpath)).sendKeys(await generateRandomEmail());
        await driver.findElement(By.xpath(getDetailProjectElement.submitInformation)).click();

        await driver.wait(until.elementLocated(By.className(getDetailProjectElement.swalClass)), 5000);
        let swalText = await driver.findElement(By.id(getDetailProjectElement.swalTextId)).getText();

        swalText.should.equal("Pesan gagal disimpan : Tolong isi Nama, Nomer Telepon, dan Email dengan benar!");

        const phoneErrorElement = await driver.findElement(By.id(getDetailProjectElement.phoneErrorId));
        await driver.wait(until.elementIsVisible(phoneErrorElement), 5000);
        let phoneError = await driver.findElement(By.id(getDetailProjectElement.phoneErrorId)).getText();

        phoneError.should.equal("Nomor telepon wajib diisi.");

    });

    it ('user should not send interest message with phone number less than 9 digits', async function() {
        
        await delay(3000);
        await scrollDown(driver, 700);

        await driver.findElement(By.id(getDetailProjectElement.projectSellButtonId)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - List Project");

        await delay(3000);

        const projectTitleElement = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath));
        let projectTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath)).getText();
        await clickElementWithJS(driver, projectTitleElement);
        
        const projectDetailTitle = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement));
        await driver.wait(until.elementIsVisible(projectDetailTitle), 5000);
        let projectDetailTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement)).getText();

        projectDetailTitleText.should.equal(projectTitleText);

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Project");
        

        await delay(3000);
        await scrollDown(driver, 5700);

        await driver.findElement(By.xpath(getDetailProjectElement.nameXpath)).sendKeys("User Testing");
        await driver.findElement(By.xpath(getDetailProjectElement.phoneXpath)).sendKeys("62879437");
        await driver.findElement(By.xpath(getDetailProjectElement.emailXpath)).sendKeys(await generateRandomEmail());
        await driver.findElement(By.xpath(getDetailProjectElement.submitInformation)).click();

        await driver.wait(until.elementLocated(By.className(getDetailProjectElement.swalClass)), 5000);
        let swalText = await driver.findElement(By.id(getDetailProjectElement.swalTextId)).getText();

        swalText.should.equal("Pesan gagal disimpan : Tolong isi Nama, Nomer Telepon, dan Email dengan benar!");

        const phoneErrorElement = await driver.findElement(By.id(getDetailProjectElement.phoneErrorId));
        await driver.wait(until.elementIsVisible(phoneErrorElement), 5000);
        let phoneError = await driver.findElement(By.id(getDetailProjectElement.phoneErrorId)).getText();

        phoneError.should.equal("Nomor telepon harus terdiri dari 10 sampai 14 angka.");

    });

    it ('user should not send interest message with phone number more than 14 digits', async function() {

        
        await delay(3000);
        await scrollDown(driver, 700);

        await driver.findElement(By.id(getDetailProjectElement.projectSellButtonId)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - List Project");

        await delay(3000);

        const projectTitleElement = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath));
        let projectTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath)).getText();
        await clickElementWithJS(driver, projectTitleElement);
        
        const projectDetailTitle = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement));
        await driver.wait(until.elementIsVisible(projectDetailTitle), 5000);
        let projectDetailTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement)).getText();

        projectDetailTitleText.should.equal(projectTitleText);

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Project");
        

        await delay(3000);
        await scrollDown(driver, 5700);

        await driver.findElement(By.xpath(getDetailProjectElement.nameXpath)).sendKeys("User Testing");
        await driver.findElement(By.xpath(getDetailProjectElement.phoneXpath)).sendKeys("628794378987675");
        await driver.findElement(By.xpath(getDetailProjectElement.emailXpath)).sendKeys(await generateRandomEmail());
        await driver.findElement(By.xpath(getDetailProjectElement.submitInformation)).click();

        await driver.wait(until.elementLocated(By.className(getDetailProjectElement.swalClass)), 5000);
        let swalText = await driver.findElement(By.id(getDetailProjectElement.swalTextId)).getText();

        swalText.should.equal("Pesan gagal disimpan : Tolong isi Nama, Nomer Telepon, dan Email dengan benar!");

        const phoneErrorElement = await driver.findElement(By.id(getDetailProjectElement.phoneErrorId));
        await driver.wait(until.elementIsVisible(phoneErrorElement), 5000);
        let phoneError = await driver.findElement(By.id(getDetailProjectElement.phoneErrorId)).getText();

        phoneError.should.equal("Nomor telepon harus terdiri dari 10 sampai 14 angka."); //keterangan error kurang tepat
    });

    it ('user should not send interest message with invalid phone number', async function() {

        await delay(3000);
        await scrollDown(driver, 700);

        await driver.findElement(By.id(getDetailProjectElement.projectSellButtonId)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - List Project");

        await delay(3000);

        const projectTitleElement = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath));
        let projectTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath)).getText();
        await clickElementWithJS(driver, projectTitleElement);
        
        const projectDetailTitle = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement));
        await driver.wait(until.elementIsVisible(projectDetailTitle), 5000);
        let projectDetailTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement)).getText();

        projectDetailTitleText.should.equal(projectTitleText);

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Project");
        

        await delay(3000);
        await scrollDown(driver, 5700);

        await driver.findElement(By.xpath(getDetailProjectElement.nameXpath)).sendKeys("User Testing");
        await driver.findElement(By.xpath(getDetailProjectElement.phoneXpath)).sendKeys("1234567890");
        await driver.findElement(By.xpath(getDetailProjectElement.emailXpath)).sendKeys(await generateRandomEmail());
        await driver.findElement(By.xpath(getDetailProjectElement.submitInformation)).click();

        await driver.wait(until.elementLocated(By.className(getDetailProjectElement.swalClass)), 5000);
        let swalText = await driver.findElement(By.id(getDetailProjectElement.swalTextId)).getText();

        swalText.should.equal("Pesan gagal disimpan : Tolong isi Nama, Nomer Telepon, dan Email dengan benar!");

        const phoneErrorElement = await driver.findElement(By.id(getDetailProjectElement.phoneErrorId));
        await driver.wait(until.elementIsVisible(phoneErrorElement), 5000);
        let phoneError = await driver.findElement(By.id(getDetailProjectElement.phoneErrorId)).getText();

        phoneError.should.equal("Nomor telepon invalid.");
    });

    it ('user should not send interest message with wrong email format', async function() {

        
        await delay(3000);
        await scrollDown(driver, 700);

        await driver.findElement(By.id(getDetailProjectElement.projectSellButtonId)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - List Project");

        await delay(3000);

        const projectTitleElement = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath));
        let projectTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath)).getText();
        await clickElementWithJS(driver, projectTitleElement);
        
        const projectDetailTitle = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement));
        await driver.wait(until.elementIsVisible(projectDetailTitle), 5000);
        let projectDetailTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement)).getText();

        projectDetailTitleText.should.equal(projectTitleText);

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Project");
        

        await delay(3000);
        await scrollDown(driver, 5700);

        try {
            await driver.findElement(By.xpath(getDetailProjectElement.nameXpath)).sendKeys("User Testing");
            await driver.findElement(By.xpath(getDetailProjectElement.phoneXpath)).sendKeys("1234567890");
            await driver.findElement(By.xpath(getDetailProjectElement.emailXpath)).sendKeys("usertestingmail.com");
            await driver.findElement(By.xpath(getDetailProjectElement.submitInformation)).click();
    
            await driver.wait(until.elementLocated(By.className(getDetailProjectElement.swalClass)), 5000);
            let swalText = await driver.findElement(By.id(getDetailProjectElement.swalTextId)).getText();
    
            swalText.should.equal("Pesan gagal disimpan : Tolong isi Nama, Nomer Telepon, dan Email dengan benar!");
        }catch (error) {
            throw new Error(`Failed to send interest message with wrong email format: ${error}`);
        }



    });

    it ('user should not send interest message with empty field form', async function() {
        
        await delay(3000);
        await scrollDown(driver, 700);

        await driver.findElement(By.id(getDetailProjectElement.projectSellButtonId)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - List Project");

        await delay(3000);

        const projectTitleElement = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath));
        let projectTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectXpath)).getText();
        await clickElementWithJS(driver, projectTitleElement);
        
        const projectDetailTitle = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement));
        await driver.wait(until.elementIsVisible(projectDetailTitle), 5000);
        let projectDetailTitleText = await driver.findElement(By.xpath(getDetailProjectElement.projectDetailTitleElement)).getText();

        projectDetailTitleText.should.equal(projectTitleText);

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Project");
        

        await delay(3000);
        await scrollDown(driver, 5700);

        await driver.findElement(By.xpath(getDetailProjectElement.submitInformation)).click();

        await driver.wait(until.elementLocated(By.className(getDetailProjectElement.swalClass)), 5000);
        let swalText = await driver.findElement(By.id(getDetailProjectElement.swalTextId)).getText();

        swalText.should.equal("Pesan gagal disimpan : Tolong isi Nama, Nomer Telepon, dan Email dengan benar!");

        const phoneErrorElement = await driver.findElement(By.id(getDetailProjectElement.phoneErrorId));
        await driver.wait(until.elementIsVisible(phoneErrorElement), 5000);
        let phoneError = await driver.findElement(By.id(getDetailProjectElement.phoneErrorId)).getText();

        const nameErrorElement = await driver.findElement(By.id(getDetailProjectElement.nameErrorId));
        await driver.wait(until.elementIsVisible(nameErrorElement), 5000);
        let nameError = await driver.findElement(By.id(getDetailProjectElement.nameErrorId)).getText();

        phoneError.should.equal("Nomor telepon wajib diisi.");
        nameError.should.equal("Nama wajib diisi.");
        
    });
});