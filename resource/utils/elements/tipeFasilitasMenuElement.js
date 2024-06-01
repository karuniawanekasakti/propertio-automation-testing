function tipeFasilitasMenuElement() {
    const listWrapper = `//div[@id='facilitytype-table_wrapper']`;
    const addTipeFasilitasButtonXpath = `//a[contains(text(), "Tambah Tipe Fasilitas")]`;
    const searchInputXpath = `//input[@type='search']`
    const editFasilitasXpath = `//tbody/tr[1]/td[5]/a[1]`

    return {
        listWrapper,
        addTipeFasilitasButtonXpath,
        searchInputXpath,
        editFasilitasXpath
    };
}

module.exports = tipeFasilitasMenuElement;