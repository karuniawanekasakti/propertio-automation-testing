function loginElement() {
    const loginRegisterButtonXpath = `//*[@id="mm-4"]/div[1]/header/nav/div/div/div[2]/div/a[1]`;
    const emailFieldXpath = `//*[@id="email"]`;
    const passwordFieldXpath = `//*[@id="password"]`;
    const loginButtonXpath = `//*[@id="login-form"]/div[3]/button`;
    const loginModalXpath = `//div[@id='swal2-html-container']`;
    const loginModalTextXpath = '//*[@id="swal2-html-container"]';

    return {
        loginRegisterButtonXpath,
        emailFieldXpath,
        passwordFieldXpath,
        loginButtonXpath,
        loginModalXpath,
        loginModalTextXpath
    };
}

module.exports = loginElement;