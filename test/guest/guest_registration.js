const { Builder, By, Key, until } = require('selenium-webdriver');
const { delay,scrollDown, generateRandomEmail, generateInvalidRandomEmail } = require('../../resource/utils/helper/helper');
const registrationFormElement = require('../../resource/utils/elements/registrationFormElement');
const registrationFormElementError = require('../../resource/utils/elements/registrationFormElementError');

var should = require('chai').should();
const { expect } = require('chai');

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;


const getRegistrationElement = registrationFormElement();
const getRegistrationElementError = registrationFormElementError();



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

        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");
    });

    it('Guest should register successfully', async function() {

        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.id(getRegistrationElement.createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('user');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill getRegistrationElement.email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill getRegistrationElement.phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('08123456789');

        //fill getRegistrationElement.province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElement.provinceDropdown))), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill getRegistrationElement.city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElement.cityDropdown))), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill getRegistrationElement.password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('12345678');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('12345678')

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        //pop up
        await driver.wait(until.elementLocated(By.className(getRegistrationElement.swalClass)), 10000);
        let swalText = await driver.findElement(By.id(getRegistrationElement.swalTextId)).getText();

        swalText.should.equal("Akun Anda berhasil dibuat!");
        
    });

    it ('Guest should not register with invalid email format', async function () {
        

        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.id(getRegistrationElement.createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        //fill the registration form
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('user');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        const randomEmail = await generateInvalidRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill getRegistrationElement.phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('08123456789');

        //fill getRegistrationElement.province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        const provinceDropdownElement = await driver.findElement(By.css(getRegistrationElement.provinceDropdownCss));
        await driver.wait(until.elementIsVisible(provinceDropdownElement), 5000);
        await provinceDropdownElement.click();

        //fill getRegistrationElement.city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElement.cityDropdown))), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill getRegistrationElement.password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('12345678');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('12345678')

        await scrollDown(driver, 500);

        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();
        let currentregistrationUrl = await driver.getCurrentUrl();
        currentregistrationUrl.should.equal("http://127.0.0.1:8000/register"); 

    });

    it ('Guest should not register with registered email', async function () {

        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.id(getRegistrationElement.createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        //fill the registration form
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('user');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys("usertesting1@mail.com");

        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('08123456789');

         //fill getRegistrationElement.province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElement.provinceDropdown))), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill getRegistrationElement.city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElement.cityDropdown))), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill getRegistrationElement.password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('12345678');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('12345678')


        await scrollDown(driver, 500);

        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        let currentregistrationUrl = await driver.getCurrentUrl();
        currentregistrationUrl.should.equal("http://127.0.0.1:8000/register");

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.emailError))), 10000);
        let emailError = await driver.findElement(By.xpath(getRegistrationElementError.emailError)).getText();
        emailError.should.equal("Email sudah ada sebelumnya.");
    });

    it ('Guest should not registered with wrong confirmation password', async function () {
        

        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.id(getRegistrationElement.createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('user');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill getRegistrationElement.email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill getRegistrationElement.phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('08123456789');

        //fill getRegistrationElement.province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElement.provinceDropdown))), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill getRegistrationElement.city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElement.cityDropdown))), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill getRegistrationElement.password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('11111111');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('12345678')

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        let currentregistrationUrl = await driver.getCurrentUrl();
        currentregistrationUrl.should.equal("http://127.0.0.1:8000/register")

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.passwordConfirmationError))), 10000);
        let emailError = await driver.findElement(By.xpath(getRegistrationElementError.passwordConfirmationError)).getText();
        emailError.should.equal("Konfirmasi kata sandi dan kata sandi harus sama.");

    });

    it ('Guest should not registered with password less than 5 character', async function () {

        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.id(getRegistrationElement.createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('user');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill getRegistrationElement.email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill getRegistrationElement.phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('08123456789');

        //fill getRegistrationElement.province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElement.provinceDropdown))), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill getRegistrationElement.city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElement.cityDropdown))), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill getRegistrationElement.password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('1111');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('1111')

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        let currentregistrationUrl = await driver.getCurrentUrl();
        currentregistrationUrl.should.equal("http://127.0.0.1:8000/register")

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.passwordError))), 10000);
        let emailError = await driver.findElement(By.xpath(getRegistrationElementError.passwordError)).getText();
        emailError.should.equal("Kata sandi minimal berisi 5 karakter.");
    });

    it ('Guest should not registered with empty form', async function () {


        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.id(getRegistrationElement.createAccountButton)).click();

        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        let currentregistrationUrl = await driver.getCurrentUrl();
        currentregistrationUrl.should.equal("http://127.0.0.1:8000/register")

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.namaDepanError))), 10000);
        let firstNameErrror = await driver.findElement(By.xpath(getRegistrationElementError.namaDepanError)).getText();
        firstNameErrror.should.equal("Nama depan wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.emailError))), 10000);
        let emailError = await driver.findElement(By.xpath(getRegistrationElementError.emailError)).getText();
        emailError.should.equal("Email wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.phoneError))), 10000);
        let registeredPhoneError = await driver.findElement(By.xpath(getRegistrationElementError.phoneError)).getText();
        registeredPhoneError.should.equal("Phone wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.provinceError))), 10000);
        let provinceError = await driver.findElement(By.xpath(getRegistrationElementError.provinceError)).getText();
        provinceError.should.equal("Province wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError,cityError))), 10000);
        let cityError = await driver.findElement(By.xpath(getRegistrationElementError.cityError)).getText();
        cityError.should.equal("City wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.passwordError))), 10000);
        let passwordError = await driver.findElement(By.xpath(getRegistrationElementError.passwordError)).getText();
        passwordError.should.equal("Kata Sandi wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.passwordConfirmationError))), 10000);
        let confirmationPasswordError = await driver.findElement(By.xpath(getRegistrationElementError.passwordConfirmationError)).getText();
        confirmationPasswordError.should.equal("Konfirmasi kata sandi wajib diisi.");

    });

    it ('Guest should not registered with phone number less than 9 character', async function () {


        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.id(getRegistrationElement.createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('08967546');
        
        await scrollDown(driver, 500);
        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        let currentregistrationUrl = await driver.getCurrentUrl();
        currentregistrationUrl.should.equal("http://127.0.0.1:8000/register")

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.phoneError))), 10000);
        let registeredPhoneError = await driver.findElement(By.xpath(getRegistrationElementError.phoneError)).getText();
        registeredPhoneError.should.equal("Phone number tidak boleh kurang dari 9 karakter.");
    });

    it ('Guest should not registered with phone number more than 14 character', async function () {
        try { 
        
            //click on the registration/login button
            await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
            let loginTitle = await driver.getTitle();
            loginTitle.should.equal("Propertio - Login");
        
            let loginUrl = await driver.getCurrentUrl();
            loginUrl.should.equal("http://127.0.0.1:8000/login");
    
            //click on registration button
            await scrollDown(driver, 500);
            await driver.findElement(By.id(getRegistrationElement.createAccountButton)).click();
            let registrationUrl = await driver.getCurrentUrl();
            registrationUrl.should.equal("http://127.0.0.1:8000/register");
        
            // Enter getRegistrationElement.phone number
            await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('089675468909876');
                
            await scrollDown(driver, 500);
            //submit the form
            await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

            const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
            await driver.wait(until.elementIsVisible(errorPopUp), 5000);
    
            await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

            let currentregistrationUrl = await driver.getCurrentUrl();
            currentregistrationUrl.should.equal("http://127.0.0.1:8000/register")
        
            await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.phoneError))), 10000);
            let registeredPhoneError = await driver.findElement(By.xpath(getRegistrationElementError.phoneError)).getText();
            registeredPhoneError.should.equal("Phone number tidak boleh lebih dari 14 karakter.");
        } catch (error) {
            if (error.name === 'TimeoutError') {
                expect.fail('Error field not shown');
            } else {
                throw error; // Re-throw other errors
            }
        }
        
    });

    it ('Guest should not registered with phone number with letter format', async function () {


        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.id(getRegistrationElement.createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('testing');
        
        await scrollDown(driver, 500);
        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        let currentregistrationUrl = await driver.getCurrentUrl();
        currentregistrationUrl.should.equal("http://127.0.0.1:8000/register")

        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(getRegistrationElementError.phoneError))), 10000);
        let registeredPhoneError = await driver.findElement(By.xpath(getRegistrationElementError.phoneError)).getText();
        registeredPhoneError.should.equal("Format nomor telepon tidak valid.");
    });
});
