function projectDetailElement() {
    const infoContainer = `//div[@class='ps-widget bgc-white bdrs12 bdr1 p30 mb30 overflow-hidden position-relative']`
    const headline = `//h3[@id='headline_detail']`
    const title = `//h5[@id='title_detail']`
    const fullAddress = `//div[@id='address_detail']`
    const proyekType = `//p[@id='property_type_detail']`

    return {
        infoContainer,
        headline,
        title,
        fullAddress,
        proyekType
    };
}

module.exports = projectDetailElement;