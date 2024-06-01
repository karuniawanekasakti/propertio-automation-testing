function tipePropertyFormElement() {
    const tipePropertyXpath = '//*[@id="name"]';
    const iconTipePropertyXpath = '//*[@id="icon"]';
    const tipePropertySubmitButtonXpath = '//*[@id="store-property-type"]';

    return {
        tipePropertyXpath,
        iconTipePropertyXpath,
        tipePropertySubmitButtonXpath
    };
}

module.exports = tipePropertyFormElement;