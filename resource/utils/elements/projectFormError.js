function projectFormErrorElement() {
    const headlineErrorXpath = `//span[@id='headline-error']`;
    const titleErrorXpath = `//span[@id='title-error']`;
    const provinceErrorXpath = `//span[@id='province-error']`;
    const cityErrorXpath = `//span[@id='city-error']`;
    const districtErrorXpath = `//span[@id='district-error']`;
    const langitudeErrorXpath = `//*[@id="longitude-error"]`;
    const latitudeErrorXpath = `//*[@id="latitude-error"]`;
    const priceErrorXpath = `//*[@id="price-error"]`;
    const priceTypeErrorXpath = `//*[@id="price_type-error"]`;
    const photoError = `//span[@id='photo_file-error']`
    const virtualTourError = `//span[@id='virtual_tour_name-error']`;
    const videoError = `//span[@id='video_link-error']`
    const namaInfrastrukturError = `//span[@id='name-error']`
    const infrastrukturIdError = `//span[@id='infrastructure_type_id-error']`

    return {
        headlineErrorXpath,
        titleErrorXpath,
        provinceErrorXpath,
        cityErrorXpath,
        districtErrorXpath,
        langitudeErrorXpath,
        latitudeErrorXpath,
        priceErrorXpath,
        priceTypeErrorXpath,
        virtualTourError,
        photoError,
        videoError,
        namaInfrastrukturError,
        infrastrukturIdError
    };
}

module.exports = projectFormErrorElement;