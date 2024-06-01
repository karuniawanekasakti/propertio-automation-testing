function propertyLocationFormElement() {
    const headlineXpath = `//*[@id="headline"]`;
    const listingTypeDropdownXpath = `//*[@id="create-property-location-form"]/div/div[2]/div/div/div/div/button`;
    const listingTypeItemXpath = `//*[@id="bs-select-1-1"]`;
    const titleProperty = `//*[@id="title"]`;
    const propertyTypeDropdownXpath = `//*[@id="create-property-location-form"]/div/div[4]/div/div/div/div/button`;
    const propertyTypeItemXpath = `//*[@id="bs-select-2-1"]`;
    const certificateDropdownXpath = `//*[@id="create-property-location-form"]/div/div[5]/div/div/div/div/button`;
    const certificateItemXpath = `//*[@id="bs-select-3-2"]`;
    const addressXpath = `//*[@id="address"]`;
    const provinceDropdownXpath = `//*[@id="create-property-location-form"]/div/div[9]/div/div/div/div/button`;
    const provinceItemXpath = `//*[@id='bs-select-4-11']`;
    const cityDropdownXpath = `//*[@id="create-property-location-form"]/div/div[10]/div/div/div/div/button`;
    const cityItemXpath = `//*[@id='bs-select-5-5']`;
    const districtDropdownXpath = `//*[@id="create-property-location-form"]/div/div[11]/div/div/div/div/button`;
    const districtItemXpath = `//*[@id='bs-select-6-3']`;
    const postalCoceXpath = `//*[@id="postal_code"]`;
    const mapXpath = `//*[@id="address-input"]`;
    const locationSubmitButtonXpath = `//*[@id="submit-location"]`;
    const markerXpath = `//*[@id="address-map"]`;

    return {
        headlineXpath,
        listingTypeDropdownXpath,
        listingTypeItemXpath,
        titleProperty,
        propertyTypeDropdownXpath,
        propertyTypeItemXpath,
        certificateDropdownXpath,
        certificateItemXpath,
        addressXpath,
        provinceDropdownXpath,
        provinceItemXpath,
        cityDropdownXpath,
        cityItemXpath,
        districtDropdownXpath,
        districtItemXpath,
        postalCoceXpath,
        mapXpath,
        locationSubmitButtonXpath,
        markerXpath
    };
}

module.exports = propertyLocationFormElement;