function tipeFasilitasFormElement() {
    const tipeFasilitasXpath = '//*[@id="name"]';
    const iconTipeFasilitasXpath = '//*[@id="icon"]';
    const kategoriDropDownXpath = `//div[@class='filter-option-inner-inner']`
    const kategoriDropDownItemXpath = '//*[@id="bs-select-1-1"]/span'
    const tipeFasilitasSubmitButtonXpath = '//*[@id="store-facility"]';
    const updateTipeFasilitasSubmitButtonXpath = `//button[@id='update-facility-type']`;

    return {
        tipeFasilitasXpath,
        iconTipeFasilitasXpath,
        kategoriDropDownItemXpath,
        kategoriDropDownXpath,
        tipeFasilitasSubmitButtonXpath,
        updateTipeFasilitasSubmitButtonXpath
    };
}

module.exports = tipeFasilitasFormElement;