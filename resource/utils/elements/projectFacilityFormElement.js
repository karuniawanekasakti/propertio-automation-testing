function projectFacilityFormElement() {
    const checkMarkXpath = `//*[@id="facility-checkboxes"]/div[1]/label[1]/span`;
    const facilitySubmitButtonXpath = `//*[@id="store-facility-btn"]`;

    return {
        checkMarkXpath,
        facilitySubmitButtonXpath
    };
}

module.exports = projectFacilityFormElement;