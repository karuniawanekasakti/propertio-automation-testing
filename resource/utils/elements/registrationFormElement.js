function registrationElement() {
    const registrationButton = `//*[@id="mm-4"]/div[1]/header/nav/div/div/div[2]/div/a[1]`;
    const createAccountButton = 'user-registration';
    const firstName = `//*[@id="first_name"]`;
    const lastName = `//*[@name="last_name"]`;
    const email = `//*[@id="email"]`;
    const phone = `//*[@id="phone"]`;
    const province = `(//button[@type='button'])[2]`
    const provinceDropdown = `//a[@id='bs-select-1-14']`
    const city = `(//button[@type='button'])[3]`
    const cityDropdown = `//a[@id='bs-select-2-4']`
    const password = `//*[@id="password"]`;
    const passwordConfirmation = `//*[@id="password_confirmation"]`;
    const swalClass = 'swal2-container'
    const swalTextId = 'swal2-html-container'
    const submitButtonId = 'store-account'
    const errorPopUpXpath = `//div[@aria-describedby = 'swal2-html-container']`
    const popUpButtonOkXpath = `(//button[@type='button'])[15]`
    const agentDeveloperRegisterButtonXpath = `/html/body/div[1]/div[2]/section/div/div/div/div/div[3]/button`
    const agentDeveloperRegisterModalXpath = `//*[@id="exampleModalToggle"]`
    const developerRegisterButtonXpath = `//*[@id="exampleModalToggle"]/div/div/div[2]/div/div[2]/a`
    const uploadButtonXpath = `//*[@id="profile-picture"]`
    const address = `//*[@id="address"]`;
    const agentRegisterButtonXpath = `//*[@id="exampleModalToggle"]/div/div/div[2]/div/div[1]/a`

    return {
        registrationButton,
        createAccountButton,
        firstName,
        lastName,
        email,
        phone,
        province,
        provinceDropdown,
        city,
        cityDropdown,
        password,
        passwordConfirmation,
        swalClass,
        swalTextId,
        submitButtonId,
        errorPopUpXpath,
        popUpButtonOkXpath,
        agentDeveloperRegisterButtonXpath,
        agentDeveloperRegisterModalXpath,
        developerRegisterButtonXpath,
        uploadButtonXpath,
        address,
        agentRegisterButtonXpath
    };
}

module.exports = registrationElement;