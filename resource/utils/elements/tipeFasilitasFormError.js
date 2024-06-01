function tipeFasilitasFormErrorElement() {
    const tipeFasilitasErrorXpath = '//*[@id="name-error"]';
    const kategoriErrorXpath = `//span[@id='category-error']`;
    const iconErrorXpath = `//span[@id='icon-error']`;

    return {
        tipeFasilitasErrorXpath,
        kategoriErrorXpath,
        iconErrorXpath
    };
}

module.exports = tipeFasilitasFormErrorElement;