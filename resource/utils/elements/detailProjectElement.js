function detailProjectElement() {
    const projectSellButtonId = 'project-sell';
    const projectXpath = `//div[@id='projectLatestContainer']/div/div/div[2]/h6/a`;
    const informationButtonXpath = `//*[@id="mm-4"]/div[1]/div[6]/section[2]/div/div[2]/div[2]/div/div[1]/button[3]`;
    const projectDetailTitleElement = `//*[@id="mm-4"]/div[1]/div[6]/section[2]/div/div[1]/div[1]/div/h3`;
    const informationModalId = 'information-modal';
    const nameXpath = `//*[@name="name"]`;
    const phoneXpath = `//*[@name="phone"]`;
    const emailXpath = `//*[@name="email"]`;
    const submitInformation = `//*[@id="message-developer-form"]/button`;
    const swalClass = 'swal2-container'
    const swalTextId = 'swal2-html-container'
    const nameErrorId = 'name-error'
    const phoneErrorId = 'phone-error'
    const emailErrorId = 'email-error'

    return {
        projectSellButtonId,
        projectXpath,
        informationButtonXpath,
        projectDetailTitleElement,
        informationModalId,
        nameXpath,
        phoneXpath,
        emailXpath,
        submitInformation,
        swalClass,
        swalTextId,
        nameErrorId,
        phoneErrorId,
        emailErrorId
    };
}

module.exports = detailProjectElement;