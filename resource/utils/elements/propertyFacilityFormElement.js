function propertyFacilityFormElement() {
    const checkMarkXpath = `//label[normalize-space()='AC']//span[@class='checkmark']`;
    const checkMarkXpath2 = `//label[normalize-space()='Solar Panel']//span[@class='checkmark']`;
    const facilitySubmitButtonXpath = `//*[@id="store-facility-btn"]`;

    return {
        checkMarkXpath,
        checkMarkXpath2,
        facilitySubmitButtonXpath
    };
}

module.exports = propertyFacilityFormElement;