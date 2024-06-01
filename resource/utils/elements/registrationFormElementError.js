function registrationElementError() {
    const emailError = `//span[@id='email-error']`
    const passwordError = `//span[@id='password-error']`
    const passwordConfirmationError = `//span[@id='password_confirmation-error']`
    const phoneError = `//span[@id='phone-error']`
    const provinceError = `//span[@id='province-error']`
    const cityError = `//span[@id='city-error']`
    const namaDepanError = `//span[@id='first_name-error']`
    const addressErrorXpath = `//*[@id="address-error"]`;
    const uploadFileErrorXpath = `//*[@id="picture_profile_file-error"]`;

    return {
        emailError,
        passwordError,
        passwordConfirmationError,
        phoneError,
        provinceError,
        cityError,
        namaDepanError,
        addressErrorXpath,
        uploadFileErrorXpath
    };
}

module.exports = registrationElementError;