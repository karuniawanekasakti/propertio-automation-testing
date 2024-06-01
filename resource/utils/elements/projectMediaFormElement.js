function projectMediaFormLocation() {
    const gambarPropertiUpload = `//*[@id="fileInputMedia"]`
    const gambarPropertiSubmit = `//*[@id="create-project-photos-form"]/div[2]/div/button`
    const linkVideo = `//*[@id="video_link"]`
    const virtualTourName = `//*[@id="virtual_tour_name"]`
    const virtualTourLink = `//*[@id="virtual_tour_link"]`
    const documentUpload = `//input[@id='documentInput']`
    const documentButton = `//label[@for='documentInput']`
    const mediaFormSubmit = `//*[@id="store-facility"]`
    const gambarContainer = `//*[@id="nav-media"]/div[1]/div[1]/div`

    return {
        gambarPropertiUpload,
        gambarPropertiSubmit,
        linkVideo,
        virtualTourName,
        virtualTourLink,
        documentUpload,
        mediaFormSubmit,
        gambarContainer,
        documentButton
    };
}

module.exports = projectMediaFormLocation;