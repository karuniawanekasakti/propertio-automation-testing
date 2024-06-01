function projectLocationFormElement() {
    const headline = '//*[@id="headline"]';
    const tahunProject = '//*[@id="completed_at"]';
    const title = '//*[@id="title"]';
    const tipePropertiDropDown = `//*[@id="create-project-location-form"]/div/div[4]/div/div/div/div/button`;
    const tipePropertiDropDownItem = `//*[@id="bs-select-1-1"]`;
    const sertifikatDropDown = `//*[@id="create-project-location-form"]/div/div[5]/div/div/div/div/button`;
    const sertifikatDropDownItem = `//*[@id="bs-select-2-2"]`;
    const deskripsi= `//*[@id="create-project-location-form"]/div/div[6]/div/div/div/div[3]/div[2]`
    const alamat = `//*[@id="address"]`
    const provinceDropDown = `//*[@id="create-project-location-form"]/div/div[10]/div/div/div/div/button`
    const provinceDropDownItem = `//*[@id="bs-select-3-3"]`
    const kotaDropDown = `//*[@id="create-project-location-form"]/div/div[11]/div/div/div/div/button`
    const kotaDropDownItem = `//*[@id="bs-select-4-3"]`
    const kecamatanDropDown = `//*[@id="create-project-location-form"]/div/div[12]/div/div/div/div/button`
    const kecamatanDropDownItem = `//*[@id="bs-select-5-2"]`
    const kodePos = `//*[@id="postal_code"]`
    const mapXpath = `//*[@id="address-input"]`;
    const sitePlanUpload = `//*[@id="fileInput"]`
    const submitButton = `//*[@id="submit-location"]`

    return {
        headline,
        tahunProject,
        title,
        tipePropertiDropDown,
        tipePropertiDropDownItem,
        sertifikatDropDown,
        sertifikatDropDownItem,
        deskripsi,
        alamat,
        provinceDropDown,
        provinceDropDownItem,
        kotaDropDown,
        kotaDropDownItem,
        kecamatanDropDown,
        kecamatanDropDownItem,
        kodePos,
        mapXpath,
        sitePlanUpload,
        submitButton
    };
}

module.exports = projectLocationFormElement;