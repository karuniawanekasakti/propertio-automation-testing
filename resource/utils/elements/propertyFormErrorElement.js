function propertyFormErrorElement() {
    const headlineErrorXpath = `//*[@id="headline-error"]`;
    const listingTypeErrorXpath = `//*[@id="listing_type-error"]`;
    const titleErrorXpath = `//*[@id="title-error"]`;
    const propertyTypeErrorXpath = `//*[@id="property_type_id-error"]`;
    const cerrificateErrorXpath = `//*[@id="certificate-error"]`;
    const addressErrorXpath = `//*[@id="address-error"]`;
    const provinceErrorXpath = `//*[@id="province-error"]`;
    const cityErrorXpath = `//*[@id="city-error"]`;
    const districtErrorXpath = `//*[@id="district-error"]`;
    const langitudeErrorXpath = `//*[@id="longitude-error"]`;
    const latitudeErrorXpath = `//*[@id="latitude-error"]`;
    const priceErrorXpath = `//*[@id="price-error"]`;
    const priceTypeErrorXpath = `//*[@id="price_type-error"]`;
    const virtualTourError = `//*[@id='virtual_tour_name-error']`;
    const videoMediaError = `//*[@id='video_link-error']`;

    return {
        headlineErrorXpath,
        listingTypeErrorXpath,
        titleErrorXpath,
        propertyTypeErrorXpath,
        cerrificateErrorXpath,
        addressErrorXpath,
        provinceErrorXpath,
        cityErrorXpath,
        districtErrorXpath,
        langitudeErrorXpath,
        latitudeErrorXpath,
        priceErrorXpath,
        priceTypeErrorXpath,
        virtualTourError,
        videoMediaError
    };
}

module.exports = propertyFormErrorElement;