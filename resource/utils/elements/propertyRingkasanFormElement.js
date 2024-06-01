function propertyRingkasanFormElement() {
    const publishPropertyButtonXpath = `//*[@id="publish-property-btn"]`;
    const propertyTitleXpath = `//*[@id="title_summary"]`;
    const propertyAddress = `//*[@id="address_summary"]`
    const propertyDistrict = `//*[@id="district_summary"]`
    const propertyCity = `//*[@id="city_summary"]`
    const propertyProvince = `//*[@id="province_summary"]`  
    const propertyType = `//*[@id="propertype_summary"]`
    const propertyBedroom = `//*[@id="bedroom_summary_card"]`
    const propertyBathroom = `//*[@id="bathroom_summary_card"]`

    return {
        publishPropertyButtonXpath,
        propertyTitleXpath,
        propertyAddress,
        propertyDistrict,
        propertyCity,
        propertyProvince,
        propertyType,
        propertyBedroom,
        propertyBathroom
        
    };
}

module.exports = propertyRingkasanFormElement;