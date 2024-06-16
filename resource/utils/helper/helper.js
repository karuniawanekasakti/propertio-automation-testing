const { By, until } = require('selenium-webdriver');

// Function to scroll down
async function scrollDown(driver, value) {
    await driver.executeScript(`window.scrollBy(0, ${value});`);
}

// Function to create a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateUniqueName(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let uniqueName = '';
    for (let i = 0; i < length; i++) {
        uniqueName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uniqueName;
}

async function scrollIntoView(driver, element) {
    await driver.executeScript("arguments[0].scrollIntoView(true);", element);
    await delay(2000);
}

//randomize email
async function generateRandomEmail(role) {
    const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number
    const email = `${role}testing${randomNumber}@mail.com`; // Construct the email string
    return email;
}

async function generateInvalidRandomEmail() {
    const randomNumber = Math.floor(Math.random() * 10); // Generate a random number
    const email = `usertesting${randomNumber}`; // Construct the email string
    return email;
}

async function clickElementWithJS(driver, element) {
    try {
        await driver.executeScript("arguments[0].click();", element);
    } catch (error) {
        console.error(`Failed to click element: ${error}`);
    }
}

async function assertTitle(driver, expectedTitle) {
    const title = await driver.getTitle();
    title.should.equal(expectedTitle);
}

async function assertUrl(driver, expectedUrl) {
    const url = await driver.getCurrentUrl();
    url.should.equal(expectedUrl);
}

async function clickElement(driver, xpath) {
    await driver.findElement(By.xpath(xpath)).click();
}

async function enterText(driver, xpath, text) {
    await driver.findElement(By.xpath(xpath)).sendKeys(text);
}

async function assertVisibleText(driver, xpath, expectedText) {
    const element = await driver.findElement(By.xpath(xpath));
    await driver.wait(until.elementIsVisible(element), 5000);
    const text = await element.getText();
    text.should.equal(expectedText);
}

async function waitForElementVisible(driver, xpath) {
    const element = await driver.findElement(By.xpath(xpath));
    await driver.wait(until.elementIsVisible(element), 5000);
    return element;
}

async function assertText(driver, xpath, expectedText) {
    const element = await waitForElementVisible(driver, xpath);
    const text = await element.getText();
    text.should.equal(expectedText);
}

async function verifyElementExists(driver, xpath, timeout = 5000) {
    try {
        await driver.findElement(By.xpath(xpath));
        return true;
    } catch (error) {
        if (error.name === 'NoSuchElementError') {
            return false;
        }
        throw error;
    }
}

async function scrollToElement(driver, xpath) { 
    await delay(2000); // Adding a delay to ensure the element is scrolled into view
    const element = await driver.findElement(By.xpath(xpath));
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", element);
    await driver.sleep(1000); // Adding a delay to ensure the element is scrolled into view
}

async function clearInput(driver, xpath) {
    const element = await waitForElementVisible(driver, xpath);
    await element.clear();
}

async function uploadFile(driver, xpath, filePath) {
    const element = await waitForElementVisible(driver, xpath);
    await element.sendKeys(filePath);
}

async function verifyTextContains(driver, elementSelector, expectedText) {
    const element = await driver.findElement(By.xpath(elementSelector));
    await driver.wait(until.elementIsVisible(element), 10000); // 10 seconds timeout
    const elementText = await element.getText();
    return elementText.includes(expectedText);
}

module.exports = { 
    scrollDown, 
    delay, 
    generateUniqueName, 
    scrollIntoView, 
    generateRandomEmail, 
    generateInvalidRandomEmail,
    clickElementWithJS,
    clickElement,
    assertTitle,
    assertUrl,
    enterText,
    assertVisibleText,
    waitForElementVisible,
    assertText,
    verifyElementExists,
    scrollToElement,
    clearInput,
    uploadFile,
    verifyTextContains
};