function unitInformasiErrorElement() {
    const titleError = `//span[@id='title-error']`
    const hargaError = `//span[@id='price-error']`
    const photoError = `//span[@id='photo_file-error']`
    const videoError = `//span[@id='video_link-error']`
    const virtualTourError = `//span[@id='virtual_tour_name-error']`

    return {
        titleError,
        hargaError,
        photoError,
        videoError,
        virtualTourError
    };
}

module.exports = unitInformasiErrorElement;