function unitMediaFormElement() {
    const foto = `//*[@id="fileInputMedia"]`
    const fotoSubmitButton = `//*[@id="store-property-photos"]`
    const linkVideo = `//*[@id="video_link"]`
    const virtualTour = `//*[@id="virtual_tour_name"]`
    const linkVirtualTour = `//*[@id="virtual_tour_link"]`
    const dokumen = `//*[@id="documentInput"]`
    const rilisUnit = `//*[@id="store-others-media"]`

    return {
        foto,
        fotoSubmitButton,
        linkVideo,
        virtualTour,
        linkVirtualTour,
        dokumen,
        rilisUnit
    };
}

module.exports = unitMediaFormElement;