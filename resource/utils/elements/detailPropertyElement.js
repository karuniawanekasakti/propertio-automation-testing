function detailPropertyElement() {
    const propertySellButton = `//ul[@id='respMenu']/li/a/span`;
    const propertyXpath = `//*[@id="property"]/div[3]/div/div/h6/a[2]`;
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
        errorOkButton
    };
}

module.exports = detailPropertyElement;