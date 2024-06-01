function tipeInfrastrukturFormElement() {
    const tipeInfrastrukturXpath = '//*[@id="name"]';
    const iconTipeInfrastrukturXpath = '//*[@id="icon"]';
    const tipeInfrastrukturSubmitButtonXpath = '//*[@id="store-infrastructure-type"]';

    return {
        tipeInfrastrukturXpath,
        iconTipeInfrastrukturXpath,
        tipeInfrastrukturSubmitButtonXpath
    };
}

module.exports = tipeInfrastrukturFormElement;