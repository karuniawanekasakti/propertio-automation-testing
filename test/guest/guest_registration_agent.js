const { Builder, By, Key, until } = require('selenium-webdriver');
const { delay,scrollDown, generateRandomEmail, generateInvalidRandomEmail, scrollIntoView } = require('../../resource/utils/helper/helper');
const registrationFormElement = require('../../resource/utils/elements/registrationFormElement');
const registrationFormElementError = require('../../resource/utils/elements/registrationFormElementError');

var should = require('chai').should();
const { expect } = require('chai');


//define the url
const url = 'http://127.0.0.1:8000/';
let driver;

const getRegistrationElement = registrationFormElement();
const getRegistrationElementError = registrationFormElementError();

//define elements
const registrationButton = `//*[@id="mm-4"]/div[1]/header/nav/div/div/div[2]/div/a[1]`;
const createAccountButton = 'user-registration';
const firstName = `//*[@id="first_name"]`;
const lastName = `//*[@name="last_name"]`;
const email = `//*[@id="email"]`;
const phone = `//*[@id="phone"]`;
const address = `//*[@id="address"]`;
const emailErrorXpath = `//*[@id="email-error"]`;
const firstNameErrorXpath = `//*[@id="first_name-error"]`;
const phoneErrorXpath = `//*[@id="phone-error"]`;
const provinceErrorXpath = `//*[@id="province-error"]`;
const cityErrorXpath = `//*[@id="city-error"]`;
const addressErrorXpath = `//*[@id="address-error"]`;
const passwordErrorXpath = `//*[@id="password-error"]`;
const passwordConfirmationErrorXpath = `//*[@id="password_confirmation-error"]`;
const uploadFileErrorXpath = `//*[@id="picture_profile_file-error"]`;
const uploadButtonXpath = `//*[@id="profile-picture"]`
const province = `//*[@id="create-registeragen-form"]/div/div/div[5]/div/div/div/div/button`
const provinceDropdownCss = `#bs-select-1-3 > .text`
const provinceSelectId =  'province'
const provinceSelectValue = 'SUMATERA BARAT'
const city = `//*[@id="create-registeragen-form"]/div/div/div[6]/div/div/div/div/button`
const cityDropdownCss = `#bs-select-2-3 > .text`
const citySelectId = 'city'
const citySelectValue = 'KABUPATEN SOLOK'
const password = `//*[@id="password"]`;
const passwordConfirmation = `//*[@id="password_confirmation"]`;
const swalClass = 'swal2-container'
const swalTextId = 'swal2-html-container'
const submitButtonId = 'store-account'
const agentDeveloperRegisterButtonXpath = `/html/body/div[1]/div[2]/section/div/div/div/div/div[3]/button`
const agentDeveloperRegisterModalXpath = `//*[@id="exampleModalToggle"]`
const agentRegisterButtonXpath = `//*[@id="exampleModalToggle"]/div/div/div[2]/div/div[1]/a`


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
        await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterButtonXpath)).click();
        const registerModal = await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterModalXpath));
        await driver.wait(until.elementIsVisible(registerModal), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.agentRegisterButtonXpath)).click();

        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register/agen");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('agent');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('08123456789');

        //fill province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        const provinceDropdown = await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown));
        await driver.wait(until.elementIsVisible(provinceDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        const cityDropdown = await driver.findElement(By.xpath(getRegistrationElement.cityDropdown));
        await driver.wait(until.elementIsVisible(cityDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill address
        await driver.findElement(By.xpath(getRegistrationElement.address)).sendKeys('Jl. Testing No. 1, Jakarta');

        //fill password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('12345678');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('12345678')

        //upload profile picture
        await driver.findElement(By.xpath(getRegistrationElement.uploadButtonXpath)).sendKeys('E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\user_profile.jpg');
        

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        //pop up
        await driver.wait(until.elementLocated(By.className(getRegistrationElement.swalClass)), 10000);
        let swalText = await driver.findElement(By.id(getRegistrationElement.swalTextId)).getText();

        swalText.should.equal("Akun Agen Anda berhasil dibuat!");
        
    });

    it ('Guest should not register with invalid email format', async function () {

        let homeTitle = await driver.getTitle();
        homeTitle.should.equal("Propertio - Home");   

        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterButtonXpath)).click();
        const registerModal = await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterModalXpath));
        await driver.wait(until.elementIsVisible(registerModal), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.agentRegisterButtonXpath)).click();

        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register/agen");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('agent');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill email
        const randomEmail = await generateInvalidRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('08123456789');

        //fill province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        const provinceDropdown = await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown));
        await driver.wait(until.elementIsVisible(provinceDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        const cityDropdown = await driver.findElement(By.xpath(getRegistrationElement.cityDropdown));
        await driver.wait(until.elementIsVisible(cityDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill address
        await driver.findElement(By.xpath(getRegistrationElement.address)).sendKeys('Jl. Testing No. 1, Jakarta');

        //fill password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('12345678');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('12345678')

        //upload profile picture
        await driver.findElement(By.xpath(getRegistrationElement.uploadButtonXpath)).sendKeys('E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\user_profile.jpg');
        

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        currentUrl = await driver.getCurrentUrl();
        currentUrl.should.equal("http://127.0.0.1:8000/register/agen");

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
        await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterButtonXpath)).click();
        const registerModal = await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterModalXpath));
        await driver.wait(until.elementIsVisible(registerModal), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.agentRegisterButtonXpath)).click();

        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register/agen");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('agent');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill email
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys("agent@mail.com");

        //fill phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('08123456789');

        //fill province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        const provinceDropdown = await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown));
        await driver.wait(until.elementIsVisible(provinceDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        const cityDropdown = await driver.findElement(By.xpath(getRegistrationElement.cityDropdown));
        await driver.wait(until.elementIsVisible(cityDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill address
        await driver.findElement(By.xpath(getRegistrationElement.address)).sendKeys('Jl. Testing No. 1, Jakarta');

        //fill password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('12345678');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('12345678')

        //upload profile picture
        await driver.findElement(By.xpath(getRegistrationElement.uploadButtonXpath)).sendKeys('E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\user_profile.jpg');
        

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();


        const emailError = await driver.findElement(By.xpath(getRegistrationElementError.emailError));
        await scrollIntoView(driver, emailError)
        const emailErrorText = await driver.findElement(By.xpath(getRegistrationElementError.emailError)).getText();

        await driver.wait(until.elementIsVisible(emailError), 5000);
        emailErrorText.should.equal("Email sudah ada sebelumnya.");

        currentUrl = await driver.getCurrentUrl();
        currentUrl.should.equal("http://127.0.0.1:8000/register/agen");

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
        await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterButtonXpath)).click();
        const registerModal = await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterModalXpath));
        await driver.wait(until.elementIsVisible(registerModal), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.agentRegisterButtonXpath)).click();

        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register/agen");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('agent');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('08123456789');

        //fill province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        const provinceDropdown = await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown));
        await driver.wait(until.elementIsVisible(provinceDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        const cityDropdown = await driver.findElement(By.xpath(getRegistrationElement.cityDropdown));
        await driver.wait(until.elementIsVisible(cityDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill address
        await driver.findElement(By.xpath(getRegistrationElement.address)).sendKeys('Jl. Testing No. 1, Jakarta');

        //fill password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('1234');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('1234')

        //upload profile picture
        await driver.findElement(By.xpath(getRegistrationElement.uploadButtonXpath)).sendKeys('E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\user_profile.jpg');
        

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        const passwordError = await driver.findElement(By.xpath(getRegistrationElementError.passwordError));
        await scrollIntoView(driver, passwordError)
        const passwordErrorText = await driver.findElement(By.xpath(getRegistrationElementError.passwordError)).getText();

        await driver.wait(until.elementIsVisible(passwordError), 5000);
        passwordErrorText.should.equal("Kata sandi minimal berisi 5 karakter.");

        

        currentUrl = await driver.getCurrentUrl();
        currentUrl.should.equal("http://127.0.0.1:8000/register/agen");
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
        await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterButtonXpath)).click();
        const registerModal = await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterModalXpath));
        await driver.wait(until.elementIsVisible(registerModal), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.agentRegisterButtonXpath)).click();

        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register/agen");

        await delay(3000);
        await scrollDown(driver, 900);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        //nama depan
        const namaDepanError = await driver.findElement(By.xpath(getRegistrationElementError.namaDepanError));
        await scrollIntoView(driver, namaDepanError)
        const namaDepanErrorText = await driver.findElement(By.xpath(getRegistrationElementError.namaDepanError)).getText();

        await driver.wait(until.elementIsVisible(namaDepanError), 5000);
        namaDepanErrorText.should.equal("Nama depan wajib diisi.");

        //email
        const emailError = await driver.findElement(By.xpath(getRegistrationElementError.emailError));
        await scrollIntoView(driver, emailError)
        const emailErrorText = await driver.findElement(By.xpath(getRegistrationElementError.emailError)).getText();

        await driver.wait(until.elementIsVisible(emailError), 5000);
        emailErrorText.should.equal("Email wajib diisi.");

        //phone
        const phoneError = await driver.findElement(By.xpath(getRegistrationElementError.phoneError));
        await scrollIntoView(driver, phoneError)
        const phoneErrorText = await driver.findElement(By.xpath(getRegistrationElementError.phoneError)).getText();

        await driver.wait(until.elementIsVisible(phoneError), 5000);
        phoneErrorText.should.equal("Nomor telepon wajib diisi.");

        //provinsi
        const provinceError = await driver.findElement(By.xpath(getRegistrationElementError.provinceError));
        await scrollIntoView(driver, provinceError)
        const provinceErrorText = await driver.findElement(By.xpath(getRegistrationElementError.provinceError)).getText();

        await driver.wait(until.elementIsVisible(provinceError), 5000);
        provinceErrorText.should.equal("Provinsi wajib diisi.");

        //kota
        const cityError = await driver.findElement(By.xpath(getRegistrationElementError.cityError));
        await scrollIntoView(driver, cityError)
        const cityErrorText = await driver.findElement(By.xpath(getRegistrationElementError.cityError)).getText();

        await driver.wait(until.elementIsVisible(cityError), 5000);
        cityErrorText.should.equal("Kota wajib diisi.");

        //address
        const addressError = await driver.findElement(By.xpath(getRegistrationElementError.addressErrorXpath));
        await scrollIntoView(driver, addressError)
        const addressErrorText = await driver.findElement(By.xpath(getRegistrationElementError.addressErrorXpath)).getText();

        await driver.wait(until.elementIsVisible(addressError), 5000);
        addressErrorText.should.equal("Alamat waajib diisi.");

        //password
        const passwordError = await driver.findElement(By.xpath(getRegistrationElementError.passwordError));
        await scrollIntoView(driver, passwordError)
        const passwordErrorText = await driver.findElement(By.xpath(getRegistrationElementError.passwordError)).getText();

        await driver.wait(until.elementIsVisible(passwordError), 5000);
        passwordErrorText.should.equal("Kata sandi wajib diisi.");

        //confirmation password
        const confirmationPasswordError = await driver.findElement(By.xpath(getRegistrationElementError.passwordConfirmationError));
        await scrollIntoView(driver, confirmationPasswordError)
        const confirmationPasswordErrorText = await driver.findElement(By.xpath(getRegistrationElementError.passwordConfirmationError)).getText();

        await driver.wait(until.elementIsVisible(confirmationPasswordError), 5000);
        confirmationPasswordErrorText.should.equal("Konfirmasi kata sandi wajib diisi.");


        currentUrl = await driver.getCurrentUrl();
        currentUrl.should.equal("http://127.0.0.1:8000/register/agen");

    });

    it ('Guest should not registered with phone number more than 14 character', async function () {

        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterButtonXpath)).click();
        const registerModal = await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterModalXpath));
        await driver.wait(until.elementIsVisible(registerModal), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.agentRegisterButtonXpath)).click();

        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register/agen");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('agent');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('628907876382714');

        //fill province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        const provinceDropdown = await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown));
        await driver.wait(until.elementIsVisible(provinceDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        const cityDropdown = await driver.findElement(By.xpath(getRegistrationElement.cityDropdown));
        await driver.wait(until.elementIsVisible(cityDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill address
        await driver.findElement(By.xpath(getRegistrationElement.address)).sendKeys('Jl. Testing No. 1, Jakarta');

        //fill password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('1234');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('1234')

        //upload profile picture
        await driver.findElement(By.xpath(getRegistrationElement.uploadButtonXpath)).sendKeys('E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\user_profile.jpg');
        

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        try {
            const phoneError = await driver.findElement(By.xpath(getRegistrationElementError.phoneError));
            await scrollIntoView(driver, phoneError)
            const phoneErrorText = await driver.findElement(By.xpath(getRegistrationElementError.phoneError)).getText();
    
            await driver.wait(until.elementIsVisible(phoneError), 5000);
            phoneErrorText.should.equal("Formar nomor telepon tidak valid");
        }catch (error) {
            throw new Error("Phone number error is not displayed");
        }

        currentUrl = await driver.getCurrentUrl();
        currentUrl.should.equal("http://127.0.0.1:8000/register/agen");
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
        await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterButtonXpath)).click();
        const registerModal = await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterModalXpath));
        await driver.wait(until.elementIsVisible(registerModal), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.agentRegisterButtonXpath)).click();

        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register/agen");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('agent');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('usertesting');

        //fill province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        const provinceDropdown = await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown));
        await driver.wait(until.elementIsVisible(provinceDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        const cityDropdown = await driver.findElement(By.xpath(getRegistrationElement.cityDropdown));
        await driver.wait(until.elementIsVisible(cityDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill address
        await driver.findElement(By.xpath(getRegistrationElement.address)).sendKeys('Jl. Testing No. 1, Jakarta');

        //fill password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('11111111');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('11111111')

        //upload profile picture
        await driver.findElement(By.xpath(getRegistrationElement.uploadButtonXpath)).sendKeys('E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\user_profile.jpg');
        

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        const phoneError = await driver.findElement(By.xpath(getRegistrationElementError.phoneError));
        await scrollIntoView(driver, phoneError)
        const phoneErrorText = await driver.findElement(By.xpath(getRegistrationElementError.phoneError)).getText();

        await driver.wait(until.elementIsVisible(phoneError), 5000);
        phoneErrorText.should.equal("Format nomor telepon tidak valid.");

        currentUrl = await driver.getCurrentUrl();
        currentUrl.should.equal("http://127.0.0.1:8000/register/agen");
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
        await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterButtonXpath)).click();
        const registerModal = await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterModalXpath));
        await driver.wait(until.elementIsVisible(registerModal), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.agentRegisterButtonXpath)).click();

        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register/agen");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('agent');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('6289687716472');

        //fill province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        const provinceDropdown = await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown));
        await driver.wait(until.elementIsVisible(provinceDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        const cityDropdown = await driver.findElement(By.xpath(getRegistrationElement.cityDropdown));
        await driver.wait(until.elementIsVisible(cityDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill address
        await driver.findElement(By.xpath(getRegistrationElement.address)).sendKeys('Jl. Testing No. 1, Jakarta');

        //fill password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('1234');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('1234')

        //upload profile picture
        await driver.findElement(By.xpath(getRegistrationElement.uploadButtonXpath)).sendKeys('E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\user_profile.jpg');
        

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        const passwordError = await driver.findElement(By.xpath(getRegistrationElementError.passwordError));
        await scrollIntoView(driver, passwordError)
        const passwordErrorText = await driver.findElement(By.xpath(getRegistrationElementError.passwordError)).getText();

        await driver.wait(until.elementIsVisible(passwordError), 5000);
        passwordErrorText.should.equal("Kata sandi minimal berisi 5 karakter.");

        currentUrl = await driver.getCurrentUrl();
        currentUrl.should.equal("http://127.0.0.1:8000/register/agen");
    });

    it ('Guest should not registered with password confirmation not match', async function () {

        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterButtonXpath)).click();
        const registerModal = await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterModalXpath));
        await driver.wait(until.elementIsVisible(registerModal), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.agentRegisterButtonXpath)).click();

        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register/agen");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('agent');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('6289687716472');

        //fill province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        const provinceDropdown = await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown));
        await driver.wait(until.elementIsVisible(provinceDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        const cityDropdown = await driver.findElement(By.xpath(getRegistrationElement.cityDropdown));
        await driver.wait(until.elementIsVisible(cityDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill address
        await driver.findElement(By.xpath(getRegistrationElement.address)).sendKeys('Jl. Testing No. 1, Jakarta');

        //fill password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('12345678');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('11111111')

        //upload profile picture
        await driver.findElement(By.xpath(getRegistrationElement.uploadButtonXpath)).sendKeys('E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\user_profile.jpg');
        

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
        await driver.wait(until.elementIsVisible(errorPopUp), 5000);

        await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

        const confirmationPasswordError = await driver.findElement(By.xpath(getRegistrationElementError.passwordConfirmationError));
        await scrollIntoView(driver, confirmationPasswordError)
        const confirmationPasswordErrorText = await driver.findElement(By.xpath(getRegistrationElementError.passwordConfirmationError)).getText();

        await driver.wait(until.elementIsVisible(confirmationPasswordError), 5000);
        confirmationPasswordErrorText.should.equal("Konfirmasi kata sandi dan kata sandi harus sama.");

        currentUrl = await driver.getCurrentUrl();
        currentUrl.should.equal("http://127.0.0.1:8000/register/agen");
    });

    it ('Guest should not registered with profile picture file size more than 2MB', async function () {
        //click on the registration/login button
        await driver.findElement(By.xpath(getRegistrationElement.registrationButton)).click();
        let loginTitle = await driver.getTitle();
        loginTitle.should.equal("Propertio - Login");

        let loginUrl = await driver.getCurrentUrl();
        loginUrl.should.equal("http://127.0.0.1:8000/login");

        //click on registration button
        await scrollDown(driver, 500);
        await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterButtonXpath)).click();
        const registerModal = await driver.findElement(By.xpath(getRegistrationElement.agentDeveloperRegisterModalXpath));
        await driver.wait(until.elementIsVisible(registerModal), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.agentRegisterButtonXpath)).click();

        let registrationUrl = await driver.getCurrentUrl();
        registrationUrl.should.equal("http://127.0.0.1:8000/register/agen");

        //fill the registration form
        //fill first name
        await driver.findElement(By.xpath(getRegistrationElement.firstName)).sendKeys('agent');

        //fill last name
        await driver.findElement(By.xpath(getRegistrationElement.lastName)).sendKeys('testing');

        //fill email
        const randomEmail = await generateRandomEmail();
        await driver.findElement(By.xpath(getRegistrationElement.email)).sendKeys(randomEmail);

        //fill phone
        await driver.findElement(By.xpath(getRegistrationElement.phone)).sendKeys('6289687716472');

        //fill province 
        await driver.findElement(By.xpath(getRegistrationElement.province)).click();
        const provinceDropdown = await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown));
        await driver.wait(until.elementIsVisible(provinceDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.provinceDropdown)).click();

        //fill city
        await driver.findElement(By.xpath(getRegistrationElement.city)).click();
        const cityDropdown = await driver.findElement(By.xpath(getRegistrationElement.cityDropdown));
        await driver.wait(until.elementIsVisible(cityDropdown), 5000);
        await driver.findElement(By.xpath(getRegistrationElement.cityDropdown)).click();

        //fill address
        await driver.findElement(By.xpath(getRegistrationElement.address)).sendKeys('Jl. Testing No. 1, Jakarta');

        //fill password
        await driver.findElement(By.xpath(getRegistrationElement.password)).sendKeys('1234');
        await driver.findElement(By.xpath(getRegistrationElement.passwordConfirmation)).sendKeys('1234')

        //upload profile picture
        await driver.findElement(By.xpath(getRegistrationElement.uploadButtonXpath)).sendKeys('E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\png-5mb-1 (1).png');
        

        await scrollDown(driver, 500);

        //submit the form
        await driver.findElement(By.id(getRegistrationElement.submitButtonId)).click();

        try {

            // Wait for error pop-up and verify upload file error text
            const errorPopUp = await driver.findElement(By.xpath(getRegistrationElement.errorPopUpXpath));
            await driver.wait(until.elementIsVisible(errorPopUp), 20000);

            await driver.findElement(By.xpath(getRegistrationElement.popUpButtonOkXpath)).click();

            const uploadFileErrorElement = await driver.findElement(By.xpath(getRegistrationElementError.uploadFileErrorXpath));
            await driver.wait(until.elementIsVisible(uploadFileErrorElement), 10000);
            const uploadFileError = await uploadFileErrorElement.getText();
            expect(uploadFileError).to.equal("Fotos profil maksimal berukuran 2048 Kb.");
        }catch (error) {
            throw new Error("Maximum wait time exceed");
        }



        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal("http://127.0.0.1:8000/register/agen");
    });
        
});
