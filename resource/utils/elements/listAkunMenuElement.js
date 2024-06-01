function listAkunMenuElement() {
    const listWrapper = `//div[@id='account-table_wrapper']`;
    const addAkunButtonXpath = `//a[contains(text(), "Tambah Akun")]`;
    const searchInputXpath = `//input[@type='search']`
    const editAkunBtn = `//tbody/tr[1]/td[7]/a[1]`
    

    return {
        listWrapper,
        addAkunButtonXpath,
        searchInputXpath,
        editAkunBtn
    };
}

module.exports = listAkunMenuElement;