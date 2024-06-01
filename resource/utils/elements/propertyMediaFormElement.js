function propertyMediaFormElement() {
    const uploadSitePlanXpath = `//*[@id="fileInputMedia"]`;
    const uploadSitePlanButtonXpath = `//*[@id="store-property-photos"]`;
    const sitePlanImageContainerXpath = `//*[@id="nav-item3"]/div[1]/div[1]/div/div[1]/div`;
    const videoLinkXpath = `//*[@id="video_link"]`;
    const virtualTourNameXpath = `//*[@id="virtual_tour_name"]`;
    const virtualTourLinkXpath = `//*[@id="virtual_tour_link"]`;
    const mediaSubmitButtonXpath = `//*[@id="store-others-media"]`;

    return {
        uploadSitePlanXpath,
        uploadSitePlanButtonXpath,
        sitePlanImageContainerXpath,
        videoLinkXpath,
        virtualTourNameXpath,
        virtualTourLinkXpath,
        mediaSubmitButtonXpath
    };
}

module.exports = propertyMediaFormElement;