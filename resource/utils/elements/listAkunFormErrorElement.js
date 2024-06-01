function listAkunMenuElement() {
    const firstNameError = `//span[@id='first_name-error']`;
    const roleError = `//span[@id='role-error']`;
    const emailError = `//span[@id='email-error']`
    const phoneError = `//span[@id='phone-error']`
    const statusError = `//span[@id='status-error']`
    const provinceError = `//span[@id='province-error']`
    const cityError = `//span[@id='city-error']`
    const addressError = `//span[@id='address-error']`
    const passwordError = `//span[@id='password-error']`
    const confirmationPasswordError = `//span[@id='password_confirmation-error']`
    

    return {
        firstNameError,
        roleError,
        emailError,
        phoneError,
        statusError,
        provinceError,
        cityError,
        addressError,
        passwordError,
        confirmationPasswordError
    };
}

module.exports = listAkunMenuElement;