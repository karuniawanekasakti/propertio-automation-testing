function listAkunFormElement() {
    const profilePicture = `//input[@id='profile-picture']`;
    const firstName = `//input[@id='first_name']`;
    const lastName = `//input[@id='last_name']`;
    const roleDropDownButton = `//button[@title='-- Select Role --']`
    const roleDropDownAgent = `//a[@id='bs-select-1-1']`
    const roleDropDownDeveloper = `//a[@id='bs-select-1-2']`
    const email = `//input[@id='email']`
    const phone = `//input[@id='phone']`
    const statusDropDownButton = `//button[@title='-- select Status --']`
    const statusActive = `//a[@id='bs-select-2-1']`
    const statusInactive = `//a[@id='bs-select-2-2']`
    const provinceDropDownButton = `//button[@title='-- Pilih Provinsi --']`
    const provinceDropDownItem = `//a[@id='bs-select-3-14']`
    const cityDropDownButton = `//button[@title='-- Pilih Kota --']`
    const cityDropDownItem = `//a[@id='bs-select-4-4']`
    const address = `//textarea[@id='address']`
    const password = `//input[@id='password']`
    const confirmationPassword = `//input[@id='password_confirmation']`
    const kembali = `//a[normalize-space()='Kembali']`
    const addAkunButton = `//button[@id='store-account']`
    const updateAkunButton = `//button[@id='update-account']`
    const activeStatusDropDown = `//button[@title='Aktif']`

    return {
        profilePicture,
        firstName,
        lastName,
        roleDropDownButton,
        roleDropDownAgent,
        roleDropDownDeveloper,
        email,
        phone,
        statusDropDownButton,
        statusActive,
        statusInactive,
        provinceDropDownButton,
        provinceDropDownItem,
        cityDropDownButton,
        cityDropDownItem,
        address,
        password,
        confirmationPassword,
        kembali,
        addAkunButton,
        updateAkunButton,
        activeStatusDropDown
    };
}

module.exports = listAkunFormElement;