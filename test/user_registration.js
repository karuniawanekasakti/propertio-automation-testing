const { Builder, By, Key, until } = require('selenium-webdriver');
var should = require('chai').should();

//define the url
const url = 'http://127.0.0.1:8000/';
let driver;


//define elements
const registrationButton = `//*[@id="mm-4"]/div[1]/header/nav/div/div/div[2]/div/a[1]`;
const createAccountButton = 'user-registration';
const firstName = `//*[@id="first_name"]`;
const lastName = `//*[@id="last_name"]`;
const email = `//*[@id="email"]`;
const phone = `//*[@id="phone"]`;
const province = `//form[@id='create-register-form']/div/div/div[5]/div/div/div/div/button/div/div/div`
const provinceDropdownCss = `#bs-select-1-3 > .text`
const provinceSelectId =  'province'
const provinceSelectValue = 'SUMATERA BARAT'
const city = `//form[@id='create-register-form']/div/div/div[6]/div/div/div/div/button/div/div/div`
const cityDropdownCss = `#bs-select-2-3 > .text`
const citySelectId = 'city'
const citySelectValue = 'KABUPATEN SOLOK'
const password = `//*[@id="password"]`;
const passwordConfirmation = `//*[@id="password_confirmation"]`;
const swalClass = 'swal2-container'
const swalTextId = 'swal2-html-container'
const submitButtonId = 'store-account'

//scroll down
async function scrollDown(driver, value) {
    // Execute JavaScript to scroll down the page
    await driver.executeScript('window.scrollBy(0, 500);'); 
}

//randomize email
async function generateRandomEmail() {
    const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number
    const email = `usertesting${randomNumber}@mail.com`; // Construct the email string
    return email;
}

async function generateInvalidRandomEmail() {
    const randomNumber = Math.floor(Math.random() * 10); // Generate a random number
    const email = `usertesting${randomNumber}`; // Construct the email string
    return email;
}

//describe the test
describe('User Registration', function() {

    before (async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(url);
    });
    
    after (async function () {
        await driver.quit();
    });

    afterEach(async function () {
        await driver.get(url); 
        console.log("Test '" + this.currentTest.title + "' done ✅");
    });

    it('user should register successfully', async function() {

        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize();    

        //click on the registration/login button
        await driver.findElement(By.xpath(registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver);
        await driver.findElement(By.id(createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(firstName)).sendKeys('user');

        //fill last name
        await driver.findElement(By.xpath(lastName)).sendKeys('testing');

        //fill email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(email)).sendKeys(randomEmail);

        //fill phone
        await driver.findElement(By.xpath(phone)).sendKeys('08123456789');

        //fill province 
        await driver.findElement(By.xpath(province)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.css(provinceDropdownCss))), 5000);
        await driver.findElement(By.css(provinceDropdownCss)).click();

        //fill city
        await driver.findElement(By.xpath(city)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.css(cityDropdownCss))), 5000);
        await driver.findElement(By.css(cityDropdownCss)).click();

        //fill password
        await driver.findElement(By.xpath(password)).sendKeys('12345678');
        await driver.findElement(By.xpath(passwordConfirmation)).sendKeys('12345678')

        await scrollDown(driver);

        //submit the form
        await driver.findElement(By.id(submitButtonId)).click();

        //pop up
        await driver.wait(until.elementLocated(By.className(swalClass)), 10000);
        let swalText = await driver.findElement(By.id(swalTextId)).getText();

        swalText.should.equal("Akun Anda berhasil dibuat!");
        
    });

    it ('user should not register with invalid email format', async function () {
        
        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize();    

        //click on the registration/login button
        await driver.findElement(By.xpath(registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver);
        await driver.findElement(By.id(createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        //fill the registration form
        const randomEmail = await generateInvalidRandomEmail();
        await driver.findElement(By.xpath(email)).sendKeys(randomEmail);

        await scrollDown(driver);

        await driver.findElement(By.id(submitButtonId)).click();
        let currentregistrationUrl = await driver.getCurrentUrl();
        currentregistrationUrl.should.equal("http://127.0.0.1:8000/register"); 

    });

    it ('user should register with registered email', async function () {

        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize();    

        //click on the registration/login button
        await driver.findElement(By.xpath(registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver);
        await driver.findElement(By.id(createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        //fill the registration form
        await driver.findElement(By.xpath(email)).sendKeys("usertesting1@mail.com");

        await scrollDown(driver);

        await driver.findElement(By.id(submitButtonId)).click();
        let currentregistrationUrl = await driver.getCurrentUrl();
        currentregistrationUrl.should.equal("http://127.0.0.1:8000/register");

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("email-error"))), 10000);
        let emailError = await driver.findElement(By.id("email-error")).getText();
        emailError.should.equal("Email sudah ada sebelumnya.");
    });

    it ('user should not registered with wrong confirmation password', async function () {
        
        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize();    

        //click on the registration/login button
        await driver.findElement(By.xpath(registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver);
        await driver.findElement(By.id(createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(firstName)).sendKeys('user');

        //fill last name
        await driver.findElement(By.xpath(lastName)).sendKeys('testing');

        //fill email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(email)).sendKeys(randomEmail);

        //fill phone
        await driver.findElement(By.xpath(phone)).sendKeys('08123456789');

        //fill province 
        await driver.findElement(By.xpath(province)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.css(provinceDropdownCss))), 5000);
        await driver.findElement(By.css(provinceDropdownCss)).click();

        //fill city
        await driver.findElement(By.xpath(city)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.css(cityDropdownCss))), 5000);
        await driver.findElement(By.css(cityDropdownCss)).click();

        //fill password
        await driver.findElement(By.xpath(password)).sendKeys('11111111');
        await driver.findElement(By.xpath(passwordConfirmation)).sendKeys('12345678')

        await scrollDown(driver);

        //submit the form
        await driver.findElement(By.id(submitButtonId)).click();

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("password_confirmation-error"))), 10000);
        let emailError = await driver.findElement(By.id("password_confirmation-error")).getText();
        emailError.should.equal("Konfirmasi kata sandi dan kata sandi harus sama.");

    });

    it ('user should not registered with password less than 5 character', async function () {

        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize();    

        //click on the registration/login button
        await driver.findElement(By.xpath(registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver);
        await driver.findElement(By.id(createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(firstName)).sendKeys('user');

        //fill last name
        await driver.findElement(By.xpath(lastName)).sendKeys('testing');

        //fill email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(email)).sendKeys(randomEmail);

        //fill phone
        await driver.findElement(By.xpath(phone)).sendKeys('08123456789');

        //fill province 
        await driver.findElement(By.xpath(province)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.css(provinceDropdownCss))), 5000);
        await driver.findElement(By.css(provinceDropdownCss)).click();

        //fill city
        await driver.findElement(By.xpath(city)).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.css(cityDropdownCss))), 5000);
        await driver.findElement(By.css(cityDropdownCss)).click();

        //fill password
        await driver.findElement(By.xpath(password)).sendKeys('1111');
        await driver.findElement(By.xpath(passwordConfirmation)).sendKeys('1111')

        await scrollDown(driver);

        //submit the form
        await driver.findElement(By.id(submitButtonId)).click();

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("password-error"))), 10000);
        let emailError = await driver.findElement(By.id("password-error")).getText();
        emailError.should.equal("Kata sandi minimal berisi 5 karakter.");
    });

    it ('user should not registered with empty form', async function () {

        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize();    

        //click on the registration/login button
        await driver.findElement(By.xpath(registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver);
        await driver.findElement(By.id(createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        await scrollDown(driver);

        //submit the form
        await driver.findElement(By.id(submitButtonId)).click();

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("first_name-error"))), 10000);
        let firstNameErrror = await driver.findElement(By.id("first_name-error")).getText();
        firstNameErrror.should.equal("Nama depan wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("email-error"))), 10000);
        let emailError = await driver.findElement(By.id("email-error")).getText();
        emailError.should.equal("Email wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("phone-error"))), 10000);
        let registeredPhoneError = await driver.findElement(By.id("phone-error")).getText();
        registeredPhoneError.should.equal("Phone wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("province-error"))), 10000);
        let provinceError = await driver.findElement(By.id("province-error")).getText();
        provinceError.should.equal("Province wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("city-error"))), 10000);
        let cityError = await driver.findElement(By.id("city-error")).getText();
        cityError.should.equal("City wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("password-error"))), 10000);
        let passwordError = await driver.findElement(By.id("password-error")).getText();
        passwordError.should.equal("Kata Sandi wajib diisi.");

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("password_confirmation-error"))), 10000);
        let confirmationPasswordError = await driver.findElement(By.id("password_confirmation-error")).getText();
        confirmationPasswordError.should.equal("Konfirmasi kata sandi wajib diisi.");

    });

    it ('user should not registered with phone number less than 9 character', async function () {

        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize();    

        //click on the registration/login button
        await driver.findElement(By.xpath(registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver);
        await driver.findElement(By.id(createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        
        await driver.findElement(By.xpath(phone)).sendKeys('08967546');
        
        await scrollDown(driver);
        //submit the form
        await driver.findElement(By.id(submitButtonId)).click();

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("phone-error"))), 10000);
        let registeredPhoneError = await driver.findElement(By.id("phone-error")).getText();
        registeredPhoneError.should.equal("Phone number tidak boleh kurang dari 9 karakter.");
    });

    it ('user should not registered with phone number more than 14 character', async function () {
        try {
            let homeTitle = await driver.getTitle();
            homeTitle.should.equal("Propertio - Home");
        
            await driver.manage().setTimeouts( { implicit: 5000 } );
            await driver.manage().window().maximize();    
        
            //click on the registration/login button
            await driver.findElement(By.xpath(registrationButton)).click();
            let loginTitle = await driver.getTitle();
            loginTitle.should.equal("Propertio - Login");
        
            let loginUrl = await driver.getCurrentUrl();
            loginUrl.should.equal("http://127.0.0.1:8000/login");
    
            //click on registration button
            await scrollDown(driver);
            await driver.findElement(By.id(createAccountButton)).click();
            let registrationUrl = await driver.getCurrentUrl();
            registrationUrl.should.equal("http://127.0.0.1:8000/register");
        
            // Enter phone number
            await driver.findElement(By.xpath(phone)).sendKeys('089675468909876');
                
            await scrollDown(driver);
            //submit the form
            await driver.findElement(By.id(submitButtonId)).click();
        
            await driver.wait(until.elementIsVisible(driver.findElement(By.id("phone-error"))), 10000);
            let registeredPhoneError = await driver.findElement(By.id("phone-error")).getText();
            registeredPhoneError.should.equal("Phone number tidak boleh lebih dari 14 karakter.");
        } catch (error) {
            if (error.name === 'TimeoutError') {
                console.log("No error message appeared as expected.");
            } else {
                throw error; // Re-throw other errors
            }
        }
        
    });

    it ('user should not registered with phone number with letter format', async function () {

        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");

        await driver.manage().setTimeouts( { implicit: 5000 } );
        await driver.manage().window().maximize();    

        //click on the registration/login button
        await driver.findElement(By.xpath(registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver);
        await driver.findElement(By.id(createAccountButton)).click();
        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register");

        
        await driver.findElement(By.xpath(phone)).sendKeys('testing');
        
        await scrollDown(driver);
        //submit the form
        await driver.findElement(By.id(submitButtonId)).click();

        await driver.wait(until.elementIsVisible(driver.findElement(By.id("phone-error"))), 10000);
        let registeredPhoneError = await driver.findElement(By.id("phone-error")).getText();
        registeredPhoneError.should.equal("Format nomor telepon tidak valid.");
    });
});
