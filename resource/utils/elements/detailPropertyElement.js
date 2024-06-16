function detailPropertyElement() {
    const propertySellButton = `//span[@class='title'][normalize-space()='Beli']`;
    const propertyXpath = `(//a[contains(text(),'Perumahan Citra Kalibiru Cibit...')])[2]`;
    const informationButtonXpath = `//*[@id="mm-4"]/div[1]/div[6]/section[2]/div/div[2]/div[2]/div/div[1]/button[3]`;
    const propertyTitleElement = 'headline-property';
    const informationModalId = 'information-modal';
    const nameXpath = `//*[@id="name"]`;
    const phoneXpath = `//*[@id="phone"]`;
    const emailXpath = `//*[@id="email"]`;
    const submitInformation = `//button[@type='submit']`;
    const swalClass = 'swal2-container'
    const swalTextId = 'swal2-html-container'
    const nameErrorId = 'name-error'
    const phoneErrorId = 'phone-error'
    const emailErrorId = 'email-error'
    const errorOkButton = `(//button[@type='button'])[21]`
    const propertyInterestContainer = `//form[@id='message-agent-form']`

    return {
        propertySellButton,
        propertyXpath,
        informationButtonXpath,
        propertyTitleElement,
        informationModalId,
        nameXpath,
        phoneXpath,
        emailXpath,
        submitInformation,
        swalClass,
        swalTextId,
        nameErrorId,
        phoneErrorId,
        emailErrorId,
        errorOkButton,
        propertyInterestContainer
    };
}

module.exports = detailPropertyElement;