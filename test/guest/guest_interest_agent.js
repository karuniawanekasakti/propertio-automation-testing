const { Builder, By, Key, until } = require('selenium-webdriver');
const { del, get } = require('selenium-webdriver/http');
const { delay,scrollDown, generateRandomEmail, clickElementWithJS, scrollIntoView } = require('../../resource/utils/helper/helper');
const detailPropertyElement = require('../../resource/utils/elements/detailPropertyElement');
var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

const getDetailPropertyElement = detailPropertyElement();

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

    afterEach(async function () {
        await driver.get(url); 

        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");
    });

    it ('user should can send interest message to agent', async function() {

        await driver.findElement(By.xpath(getDetailPropertyElement.propertySellButton)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - Iklan Properti");

        await delay(3000);
        await scrollDown(driver, 3200);

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath))), 5000);
        let propertyTitle = await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).getText();
        await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).click();

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Property");
        
        // let propertyDetailTitle = await driver.findElement(By.id(propertyTitleElement)).getText();
        // propertyDetailTitle.should.equal(propertyTitle);

        await delay(3000);
        await scrollDown(driver, 4200);

        await driver.findElement(By.xpath(getDetailPropertyElement.nameXpath)).sendKeys("User Testing");
        await driver.findElement(By.xpath(getDetailPropertyElement.phoneXpath)).sendKeys("62865362816");
        await driver.findElement(By.xpath(getDetailPropertyElement.emailXpath)).sendKeys(await generateRandomEmail());
        await driver.findElement(By.xpath(getDetailPropertyElement.submitInformation)).click();

        await driver.wait(until.elementLocated(By.className(getDetailPropertyElement.swalClass)), 5000);
        let swalText = await driver.findElement(By.id(getDetailPropertyElement.swalTextId)).getText();

        swalText.should.equal("Pesan berhasil dikirim");


    });

    it ('user should not send interest message with letter number format', async function() {
        

        await driver.findElement(By.xpath(getDetailPropertyElement.propertySellButton)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - Iklan Properti");

        await delay(3000);
        await scrollDown(driver, 3200);

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath))), 5000);
        let propertyTitle = await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).getText();
        await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).click();

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Property");
        
        // let propertyDetailTitle = await driver.findElement(By.id(propertyTitleElement)).getText();
        // propertyDetailTitle.should.equal(propertyTitle);

        await delay(3000);
        await scrollDown(driver, 4200);

        await driver.findElement(By.xpath(getDetailPropertyElement.nameXpath)).sendKeys("User Testing");
        await driver.findElement(By.xpath(getDetailPropertyElement.phoneXpath)).sendKeys("testing");
        await driver.findElement(By.xpath(getDetailPropertyElement.emailXpath)).sendKeys(await generateRandomEmail());
        await driver.findElement(By.xpath(getDetailPropertyElement.submitInformation)).click();


        const phoneErrorElement = await driver.findElement(By.id(getDetailPropertyElement.phoneErrorId));
        await driver.wait(until.elementIsVisible(phoneErrorElement), 5000);
        let phoneError = await driver.findElement(By.id(getDetailPropertyElement.phoneErrorId)).getText();

        phoneError.should.equal("Nomor telepon wajib diisi.");
    });

    it ('user should not send interest message with phone number less than 9 digits', async function() {


        await driver.findElement(By.xpath(getDetailPropertyElement.propertySellButton)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - Iklan Properti");

        await delay(3000);
        await scrollDown(driver, 3200);

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath))), 5000);
        let propertyTitle = await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).getText();
        await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).click();

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Property");
        
        // let propertyDetailTitle = await driver.findElement(By.id(propertyTitleElement)).getText();
        // propertyDetailTitle.should.equal(propertyTitle);

        await delay(3000);
        await scrollDown(driver, 4200);

        await driver.findElement(By.xpath(getDetailPropertyElement.nameXpath)).sendKeys("User Testing");
        await driver.findElement(By.xpath(getDetailPropertyElement.phoneXpath)).sendKeys("62898765");
        await driver.findElement(By.xpath(getDetailPropertyElement.emailXpath)).sendKeys(await generateRandomEmail());
        await driver.findElement(By.xpath(getDetailPropertyElement.submitInformation)).click();

        const phoneErrorElement = await driver.findElement(By.id(getDetailPropertyElement.phoneErrorId));
        await driver.wait(until.elementIsVisible(phoneErrorElement), 5000);
        let phoneError = await driver.findElement(By.id(getDetailPropertyElement.phoneErrorId)).getText();

        phoneError.should.equal("Nomor telepon harus terdiri dari 10 sampai 14 angka.");

    });

    it ('user should not send interest message with phone number more than 14 digits', async function() {

        await driver.findElement(By.xpath(getDetailPropertyElement.propertySellButton)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - Iklan Properti");

        await delay(3000);
        await scrollDown(driver, 3200);

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath))), 5000);
        let propertyTitle = await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).getText();
        await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).click();

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Property");
        
        // let propertyDetailTitle = await driver.findElement(By.id(propertyTitleElement)).getText();
        // propertyDetailTitle.should.equal(propertyTitle);

        await delay(3000);
        await scrollDown(driver, 4200);

        await driver.findElement(By.xpath(getDetailPropertyElement.nameXpath)).sendKeys("User Testing");
        await driver.findElement(By.xpath(getDetailPropertyElement.phoneXpath)).sendKeys("6289876578352372");
        await driver.findElement(By.xpath(getDetailPropertyElement.emailXpath)).sendKeys(await generateRandomEmail());
        await driver.findElement(By.xpath(getDetailPropertyElement.submitInformation)).click();

        const phoneErrorElement = await driver.findElement(By.id(getDetailPropertyElement.phoneErrorId));
        await driver.wait(until.elementIsVisible(phoneErrorElement), 5000);
        let phoneError = await driver.findElement(By.id(getDetailPropertyElement.phoneErrorId)).getText();

        phoneError.should.equal("Nomor telepon harus terdiri dari 10 sampai 14 angka."); //keterangan error kurang tepat
    });

    it ('user should not send interest message with invalid phone number', async function() {

        await driver.findElement(By.xpath(getDetailPropertyElement.propertySellButton)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - Iklan Properti");

        await delay(3000);
        await scrollDown(driver, 3200);

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath))), 5000);
        let propertyTitle = await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).getText();
        await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).click();

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Property");
        
        // let propertyDetailTitle = await driver.findElement(By.id(propertyTitleElement)).getText();
        // propertyDetailTitle.should.equal(propertyTitle);

        await delay(3000);
        await scrollDown(driver, 4200);

        await driver.findElement(By.xpath(getDetailPropertyElement.nameXpath)).sendKeys("User Testing");
        await driver.findElement(By.xpath(getDetailPropertyElement.phoneXpath)).sendKeys("123456789075");
        await driver.findElement(By.xpath(getDetailPropertyElement.emailXpath)).sendKeys(await generateRandomEmail());
        await driver.findElement(By.xpath(getDetailPropertyElement.submitInformation)).click();

        await driver.findElement(By.xpath(getDetailPropertyElement.errorOkButton)).click();


        try {
            const phoneErrorElement = await driver.findElement(By.id(getDetailPropertyElement.phoneErrorId));
            await driver.wait(until.elementIsVisible(phoneErrorElement), 5000);
            let phoneError = await driver.findElement(By.id(getDetailPropertyElement.phoneErrorId)).getText();
    
            phoneError.should.equal("Nomor telepon invalid.");
        }catch (error) {
            throw new Error("Defect : User can send interest message with invalid phone number");
        }
    });

    it.only ('user should not send interest message with wrong email format', async function() {

        await driver.findElement(By.xpath(getDetailPropertyElement.propertySellButton)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - Iklan Properti");

        await delay(3000);
        await scrollDown(driver, 3200);

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath))), 5000);
        let propertyTitle = await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).getText();
        await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).click();

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Property");
        
        // let propertyDetailTitle = await driver.findElement(By.id(propertyTitleElement)).getText();
        // propertyDetailTitle.should.equal(propertyTitle);

        await delay(3000);
        await scrollDown(driver, 4200);

        await driver.findElement(By.xpath(getDetailPropertyElement.nameXpath)).sendKeys("User Testing");
        await driver.findElement(By.xpath(getDetailPropertyElement.phoneXpath)).sendKeys("6289876578352372");
        await driver.findElement(By.xpath(getDetailPropertyElement.emailXpath)).sendKeys("usertestingmail.com");
        await driver.findElement(By.xpath(getDetailPropertyElement.submitInformation)).click();

        try {
            const emailErrorElement = await driver.findElement(By.id(getDetailPropertyElement.emailErrorId));
            await driver.wait(until.elementIsVisible(emailErrorElement), 5000);
            let emailError = await driver.findElement(By.id(getDetailPropertyElement.emailErrorId)).getText();
            emailError.should.equal("Email harus berupa alamat email yang valid.")
        }catch (error) {
            throw new Error("Defect : Tidak ada keterangan error email yang valid");
        }
        
    });

    it.only ('user should not send interest message with empty field form', async function() {

        await driver.findElement(By.xpath(getDetailPropertyElement.propertySellButton)).click();
        let propertyUrl = await driver.getTitle();
        propertyUrl.should.equal("Propertio - Iklan Properti");

        await delay(3000);
        await scrollDown(driver, 3200);

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath))), 5000);
        let propertyTitle = await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).getText();
        await driver.findElement(By.xpath(getDetailPropertyElement.propertyXpath)).click();

        let propertyDetailUrl = await driver.getTitle();
        propertyDetailUrl.should.equal("Propertio - Detail Property");
        
        // let propertyDetailTitle = await driver.findElement(By.id(propertyTitleElement)).getText();
        // propertyDetailTitle.should.equal(propertyTitle);

        await delay(3000);
        await scrollDown(driver, 3500);

        await driver.findElement(By.xpath(getDetailPropertyElement.submitInformation)).click();

        try {
            const nameErrorElement = await driver.findElement(By.id(getDetailPropertyElement.nameErrorId));
            const phoneErrorElement = await driver.findElement(By.id(getDetailPropertyElement.phoneErrorId));
            const emailErrorElement = await driver.findElement(By.id(getDetailPropertyElement.emailErrorId));
            await driver.wait(until.elementIsVisible(nameErrorElement), 10000);
            await driver.wait(until.elementIsVisible(phoneErrorElement), 10000);
            await driver.wait(until.elementIsVisible(emailErrorElement), 10000);
    
            // await delay(3000);
    
            let emailError = await driver.findElement(By.id(getDetailPropertyElement.emailErrorId)).getText();
            let phoneError = await driver.findElement(By.id(getDetailPropertyElement.phoneErrorId)).getText();
            let nameError = await driver.findElement(By.id(getDetailPropertyElement.nameErrorId)).getText();
    
            phoneError.should.equal("Nomor telepon wajib diisi.");
            nameError.should.equal("Nama wajib diisi.");
            emailError.should.equal("Email harus berupa alamat email yang valid.");
        }catch (error) {
            throw new Error("Defect : Tidak ada keterangan field kosong yang muncul");
        }
        
    });
});