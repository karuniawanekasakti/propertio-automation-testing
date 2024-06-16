const { Builder, By, Key, until } = require('selenium-webdriver');
const { delay,scrollDown, generateRandomEmail, generateInvalidRandomEmail, scrollIntoView } = require('../../resource/utils/helper/helper');
const registrationFormElement = require('../../resource/utils/elements/registrationFormElement');
const registrationFormElementError = require('../../resource/utils/elements/registrationFormElementError');
const globalVariable = require('../../resource/utils/helper/globalVariable');
const popUpElement = require('../../resource/utils/elements/popUpElement');

const { delay, scrollDown, assertTitle, uploadFile, assertUrl, clickElement, waitForElementVisible, assertText, enterText, scrollToElement, clearInput, verifyElementExists} = require('../../resource/utils/helper/helper');


var should = require('chai').should();
const { expect } = require('chai');


//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

const getRegistrationElement = registrationFormElement();
const getRegistrationElementError = registrationFormElementError();
const getGlobalVariable = globalVariable();
const getPopUpElement = popUpElement();

//describe the test
describe('Guest Registration', function() {

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
    });

    it ('Guest can access registration page', async function () {
        await clickElement(driver, getRegistrationElement.registrationButton);
        await assertTitle(driver, "Propertio - Login");
        await assertUrl(driver, "http://127.0.0.1:8000/login");
    
        await scrollToElement(driver, getRegistrationElement.agentDeveloperRegisterButtonXpath);
        await clickElement(driver, getRegistrationElement.agentDeveloperRegisterButtonXpath);
        
        await waitForElementVisible(driver, getRegistrationElement.agentDeveloperRegisterModalXpath);
        await clickElement(driver, getRegistrationElement.agentRegisterButtonXpath);
        await assertUrl(driver, "http://127.0.0.1:8000/register/agen");
    })

    it('Guest should not register with invalid email format', async function() {    
        try {
            await enterText(driver, getRegistrationElement.firstName, 'agent');
            await enterText(driver, getRegistrationElement.lastName, 'testing');
        
            const randomEmail = await generateInvalidRandomEmail();
            await enterText(driver, getRegistrationElement.email, randomEmail);
        
            await enterText(driver, getRegistrationElement.phone, '08123456789');
        
            await clickElement(driver, getRegistrationElement.province);
            await waitForElementVisible(driver, getRegistrationElement.provinceDropdown);
            await clickElement(driver, getRegistrationElement.provinceDropdown);
        
            await clickElement(driver, getRegistrationElement.city);
            await waitForElementVisible(driver, getRegistrationElement.cityDropdown);
            await clickElement(driver, getRegistrationElement.cityDropdown);
        
            await enterText(driver, getRegistrationElement.address, 'Jl. Testing No. 1, Jakarta');
            await enterText(driver, getRegistrationElement.password, '12345678');
            await enterText(driver, getRegistrationElement.passwordConfirmation, '12345678');
        
            const fileInputXpath = getRegistrationElement.uploadButtonXpath;
            await scrollToElement(driver, fileInputXpath);
            await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.profilePhoto);
        
            await scrollToElement(driver, getRegistrationElement.submitButtonId);
            await clickElement(driver, getRegistrationElement.submitButtonId);
        
            const currentUrl = await driver.getCurrentUrl();
            currentUrl.should.equal("http://127.0.0.1:8000/register/agen");

            await driver.navigate().refresh();
        } catch (error) {
            throw new Error(`Error: Keterangan error tidak muncul , ${error.message}`); 
        }
        
    });

    it('Guest should not register with registered email', async function() {    
        try {
            await enterText(driver, getRegistrationElement.firstName, 'agent');
            await enterText(driver, getRegistrationElement.lastName, 'testing');
            await enterText(driver, getRegistrationElement.email, "agent@mail.com");
            await enterText(driver, getRegistrationElement.phone, '08123456789');
        
            await clickElement(driver, getRegistrationElement.province);
            await waitForElementVisible(driver, getRegistrationElement.provinceDropdown);
            await clickElement(driver, getRegistrationElement.provinceDropdown);
        
            await clickElement(driver, getRegistrationElement.city);
            await waitForElementVisible(driver, getRegistrationElement.cityDropdown);
            await clickElement(driver, getRegistrationElement.cityDropdown);
        
            await enterText(driver, getRegistrationElement.address, 'Jl. Testing No. 1, Jakarta');
            await enterText(driver, getRegistrationElement.password, '12345678');
            await enterText(driver, getRegistrationElement.passwordConfirmation, '12345678');
        
            const fileInputXpath = getRegistrationElement.uploadButtonXpath;
            await scrollToElement(driver, fileInputXpath);
            await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.profilePhoto);
        
            await scrollToElement(driver, getRegistrationElement.submitButtonId);
            await clickElement(driver, getRegistrationElement.submitButtonId);
        
            await waitForElementVisible(driver, getPopUpElement.popUp);
            await delay(2000);
        
            const emailError = await waitForElementVisible(driver, getRegistrationElementError.emailError);
            await scrollIntoView(driver, emailError);
            await assertText(driver, emailError, "Email sudah ada sebelumnya.");
    
        } catch (error) {
            throw new Error(`Error: , ${error.message}`); 
        }
        await driver.navigate().refresh();
        
    });

    it('Guest should not registered with password less than 5 character', async function() {  
        try {
            await enterText(driver, getRegistrationElement.firstName, 'agent');
            await enterText(driver, getRegistrationElement.lastName, 'testing');
        
            const randomEmail = await generateRandomEmail();
            await enterText(driver, getRegistrationElement.email, randomEmail);
        
            await enterText(driver, getRegistrationElement.phone, '08123456789');
        
            await clickElement(driver, getRegistrationElement.province);
            await waitForElementVisible(driver, getRegistrationElement.provinceDropdown);
            await clickElement(driver, getRegistrationElement.provinceDropdown);
        
            await clickElement(driver, getRegistrationElement.city);
            await waitForElementVisible(driver, getRegistrationElement.cityDropdown);
            await clickElement(driver, getRegistrationElement.cityDropdown);
        
            await enterText(driver, getRegistrationElement.address, 'Jl. Testing No. 1, Jakarta');
            await enterText(driver, getRegistrationElement.password, '1234');
            await enterText(driver, getRegistrationElement.passwordConfirmation, '1234');
        
            const fileInputXpath = getRegistrationElement.uploadButtonXpath;
            await scrollToElement(driver, fileInputXpath);
            await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.profilePhoto);
            
            await scrollToElement(driver, getRegistrationElement.submitButtonId);
            await clickElement(driver, getRegistrationElement.submitButtonId);
        
            await waitForElementVisible(driver, getPopUpElement.popUp);
            await delay(2000);
        
            await scrollIntoView(driver, getRegistrationElementError.passwordError);
            await assertText(driver, getRegistrationElementError.passwordError, "Kata sandi minimal berisi 5 karakter.");
    
        } catch (error) {
            throw new Error(`Error: Keterangan error tidak muncul, ${error.message}`); 
        }
        await driver.navigate().refresh();
    });

    it ('Guest should not registered with password confirmation not match', async function () {
        try {
            await enterText(driver, getRegistrationElement.firstName, 'agent');
            await enterText(driver, getRegistrationElement.lastName, 'testing');
        
            const randomEmail = await generateRandomEmail();
            await enterText(driver, getRegistrationElement.email, randomEmail);
        
            await enterText(driver, getRegistrationElement.phone, '08123456789');
        
            await clickElement(driver, getRegistrationElement.province);
            await waitForElementVisible(driver, getRegistrationElement.provinceDropdown);
            await clickElement(driver, getRegistrationElement.provinceDropdown);
        
            await clickElement(driver, getRegistrationElement.city);
            await waitForElementVisible(driver, getRegistrationElement.cityDropdown);
            await clickElement(driver, getRegistrationElement.cityDropdown);
        
            await enterText(driver, getRegistrationElement.address, 'Jl. Testing No. 1, Jakarta');
            await enterText(driver, getRegistrationElement.password, '11111111');
            await enterText(driver, getRegistrationElement.passwordConfirmation, '12345678');
        
            const fileInputXpath = getRegistrationElement.uploadButtonXpath;
            await scrollToElement(driver, fileInputXpath);
            await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.profilePhoto);
            
            await scrollToElement(driver, getRegistrationElement.submitButtonId);
            await clickElement(driver, getRegistrationElement.submitButtonId);
        
            await waitForElementVisible(driver, getPopUpElement.popUp);
            await delay(2000);
        
            await scrollIntoView(driver, getRegistrationElementError.passwordConfirmationError);
            await assertText(driver, getRegistrationElementError.passwordConfirmationError, "Konfirmasi kata sandi dan kata sandi harus sama.");
        } catch (error) {
            throw new Error(`Error: Keterangan error tidak muncul, ${error.message}`); 
        }
        
    
        await driver.navigate().refresh();
    });


    it ('Validate empty registration form', async function() {
        await scrollToElement(driver, getRegistrationElement.submitButtonId);
        await clickElement(driver, getRegistrationElement.submitButtonId);

        const errors = [];
    
        async function checkError(element, expectedText) {
            try {
                await scrollToElement(driver, element);
                await assertText(driver, element, expectedText);
            } catch (e) {
                errors.push(e.message);
            }
        }

        await checkError(getRegistrationElementError.emailError, "Email wajib diisi.");
        await checkError(getRegistrationElementError.namaDepanError, "Nama depan wajib diisi.");
        await checkError(getRegistrationElementError.phoneError, "Nomor telepon wajib diisi.");
        await checkError(getRegistrationElementError.provinceError, "Provinsi wajib diisi.");
        await checkError(getRegistrationElementError.cityError, "Kota wajib diisi.");
        await checkError(getRegistrationElementError.addressErrorXpath, "Alamat wajib diisi");
        await checkError(getRegistrationElementError.passwordError, "Kata sandi wajib diisi.");
        await checkError(getRegistrationElementError.passwordConfirmationError, "Konfirmasi kata sandi wajib diisi.");


        await delay(3000);
    
        await driver.navigate().refresh();
    })

    it ('Guest should not registered with phone number more than 14 character', async function () {
        await enterText(driver, getRegistrationElement.firstName, 'agent');
        await enterText(driver, getRegistrationElement.lastName, 'testing');
    
        const randomEmail = await generateRandomEmail();
        await enterText(driver, getRegistrationElement.email, randomEmail);
    
        await enterText(driver, getRegistrationElement.phone, '08976352625356253');
    
        await clickElement(driver, getRegistrationElement.province);
        await waitForElementVisible(driver, getRegistrationElement.provinceDropdown);
        await clickElement(driver, getRegistrationElement.provinceDropdown);
    
        await clickElement(driver, getRegistrationElement.city);
        await waitForElementVisible(driver, getRegistrationElement.cityDropdown);
        await clickElement(driver, getRegistrationElement.cityDropdown);
    
        await enterText(driver, getRegistrationElement.address, 'Jl. Testing No. 1, Jakarta');
        await enterText(driver, getRegistrationElement.password, '11111111');
        await enterText(driver, getRegistrationElement.passwordConfirmation, '11111111');
    
        const fileInputXpath = getRegistrationElement.uploadButtonXpath;
        await scrollToElement(driver, fileInputXpath);
        await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.profilePhoto);
        
        await scrollToElement(driver, getRegistrationElement.submitButtonId);
        await clickElement(driver, getRegistrationElement.submitButtonId);
    
        await waitForElementVisible(driver, getPopUpElement.popUp);
        await delay(3000);

        try{
            await scrollIntoView(driver, getRegistrationElementError.phoneError);
            await assertText(driver, getRegistrationElementError.phoneError, "Format nomor maks 14 karakter.");
        }catch(error) {
            throw new Error('Error Text not found');
 
        }

        await driver.navigate().refresh();
    });

    it ('validate phone number with invalid format', async function () {
        try{
            await enterText(driver, getRegistrationElement.firstName, 'agent');
            await enterText(driver, getRegistrationElement.lastName, 'testing');
        
            const randomEmail = await generateRandomEmail();
            await enterText(driver, getRegistrationElement.email, randomEmail);
        
            await enterText(driver, getRegistrationElement.phone, '2348976352625356253');
        
            await clickElement(driver, getRegistrationElement.province);
            await waitForElementVisible(driver, getRegistrationElement.provinceDropdown);
            await clickElement(driver, getRegistrationElement.provinceDropdown);
        
            await clickElement(driver, getRegistrationElement.city);
            await waitForElementVisible(driver, getRegistrationElement.cityDropdown);
            await clickElement(driver, getRegistrationElement.cityDropdown);
        
            await enterText(driver, getRegistrationElement.address, 'Jl. Testing No. 1, Jakarta');
            await enterText(driver, getRegistrationElement.password, '11111111');
            await enterText(driver, getRegistrationElement.passwordConfirmation, '11111111');
        
            const fileInputXpath = getRegistrationElement.uploadButtonXpath;
            await scrollToElement(driver, fileInputXpath);
            await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.profilePhoto);
            
            await scrollToElement(driver, getRegistrationElement.submitButtonId);
            await clickElement(driver, getRegistrationElement.submitButtonId);
        
            await waitForElementVisible(driver, getPopUpElement.popUp);
            await delay(3000);

            await scrollIntoView(driver, getRegistrationElementError.phoneError);
            await assertText(driver, getRegistrationElementError.phoneError, "Format nomor telepon tidak valid.");
        }catch(error) {
            throw new Error('Error Text not found');
        }

        await driver.navigate().refresh();
    });

    // it ('Guest should not registered with profile picture file size more than 2MB', async function () {
    //     //click on the registration/login button
    //     await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
    //     let loginTitle = await driver.getTitle();
    //     loginTitle.should.equal("Propertio - Login");

    //     let loginUrl = await driver.getCurrentUrl();
    //     loginUrl.should.equal("http://127.0.0.1:8000/login");

    //     //click on registration button
    //     await scrollDown(driver, 500);
    //     await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterButtonXpath)).click();
    //     const registerModal = await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterModalXpath));
    //     await driver.wait(until.elementIsVisible(registerModal), 5000);
    //     await driver.findElement(By.xpath(getRegistrationElement.agentRegisterButtonXpath)).click();

    //     let registrationUrl = await driver.getCurrentUrl();
    //     registrationUrl.should.equal("http://127.0.0.1:8000/register/agen");

    //     //fill the registration form
    //     //fill first name
    //     await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('agent');

    //     //fill last name
    //     await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

    //     //fill email
    //     const randomEmail = await generateRandomEmail();
    //     await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

    //     //fill phone
    //     await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('6289687716472');

    //     //fill province 
    //     await driver.findElement(By.xpath(getRegistrationElement.province)).click();
    //     const provinceDropdown = await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown));
    //     await driver.wait(until.elementIsVisible(provinceDropdown), 5000);
    //     await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

    //     //fill city
    //     await driver.findElement(By.xpath(getRegistrationElement.city)).click();
    //     const cityDropdown = await driver.findElement(By.xpath(getRegistrationElement.cityDropdown));
    //     await driver.wait(until.elementIsVisible(cityDropdown), 5000);
    //     await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

    //     //fill address
    //     await driver.findElement(By.xpath(getRegistrationElement.address)).sendKeys('Jl. Testing No. 1, Jakarta');

    //     //fill password
    //     await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('1234');
    //     await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('1234')

    //     //upload profile picture
    //     await driver.findElement(By.xpath(getRegistrationElement.uploadButtonXpath)).sendKeys('E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\png-5mb-1 (1).png');
        

    //     await scrollDown(driver, 500);

    //     //submit the form
    //     await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

    //     try {

    //         // Wait for error pop-up and verify upload file error text
    //         const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
    //         await driver.wait(until.elementIsVisible(errorPopUp), 20000);

    //         await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

    //         const uploadFileErrorElement = await driver.findElement(By.xpath(getRegistrationElementError.uploadFileErrorXpath));
    //         await driver.wait(until.elementIsVisible(uploadFileErrorElement), 10000);
    //         const uploadFileError = await uploadFileErrorElement.getText();
    //         expect(uploadFileError).to.equal("Fotos profil maksimal berukuran 2048 Kb.");
    //     }catch (error) {
    //         throw new Error("Maximum wait time exceed");
    //     }



    //     const currentUrl = await driver.getCurrentUrl();
    //     expect(currentUrl).to.equal("http://127.0.0.1:8000/register/agen");
    // });
        
    it('Guest should register successfully', async function() {    
        try {
            await enterText(driver, getRegistrationElement.firstName, 'agent');
            await enterText(driver, getRegistrationElement.lastName, 'testing');
        
            const randomEmail = await generateRandomEmail('agent');
            await enterText(driver, getRegistrationElement.email, randomEmail);
        
            await enterText(driver, getRegistrationElement.phone, '08123456789');
        
            await clickElement(driver, getRegistrationElement.province);
            await waitForElementVisible(driver, getRegistrationElement.provinceDropdown);
            await clickElement(driver, getRegistrationElement.provinceDropdown);
        
            await clickElement(driver, getRegistrationElement.city);
            await waitForElementVisible(driver, getRegistrationElement.cityDropdown);
            await clickElement(driver, getRegistrationElement.cityDropdown);
        
            await enterText(driver, getRegistrationElement.address, 'Jl. Testing No. 1, Jakarta');
            await enterText(driver, getRegistrationElement.password, '12345678');
            await enterText(driver, getRegistrationElement.passwordConfirmation, '12345678');
        
            const fileInputXpath = getRegistrationElement.uploadButtonXpath;
            await scrollToElement(driver, fileInputXpath);
            await driver.findElement(By.xpath(fileInputXpath)).sendKeys(getGlobalVariable.profilePhoto);
        
            await scrollToElement(driver, getRegistrationElement.submitButtonId);
            await clickElement(driver, getRegistrationElement.submitButtonId);
        
            await waitForElementVisible(driver, getPopUpElement.popUpText);
            await assertVisibleText(driver, getPopUpElement.popUpText, "Akun Agen Anda berhasil dibuat!");
        } catch (error) {
            throw new Error(`Error: Register agen failed , ${error.message}`); 
        }
    
    });
});
