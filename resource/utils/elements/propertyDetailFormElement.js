function propertyDetailFormElement() {
    const surfaceAreaXpath = `//*[@id="surface_area"]`;
    const buildingAreaXpath = `//*[@id="building_area"]`;
    const floorXpath = `//*[@id="floor"]`;
    const descriptionXpath = `//*[@id="deskripsi-detail"]/div/div/div[3]/div[2]`;
    const bedroomXpath = `//*[@id="bedroom"]`;
    const bathroomXpath = `//*[@id="bathroom"]`;
    const garageDropdownXpath = `//*[@id="tempat-parkir-detail"]/div/div/div/div/button`;
    const garageItemXpath = `//*[@id="bs-select-8-3"]`;
    const priceXpath = `//*[@id="price"]`;
    const priceTypeXpath = `//*[@id="tipe-harga-detail"]/div/div/div/div/button`
    const priceTypeItemXpath = `//*[@id="bs-select-9-2"]`
    const powerSupplyDropdownXpath = `//*[@id="daya-listrik-detail"]/div/div/div/div/button`
    const powerSupplyItemXpath = `//*[@id="bs-select-10-4"]`
    const waterTypeDropdownXpath = `//*[@id="jenis-air-detail"]/div/div/div/div/button`
    const waterTypeItemXpath = `//*[@id="bs-select-11-3"]`
    const interiorDropdownXpath = `//*[@id="interior-detail"]/div/div/div/div/button`
    const interiorItemXpath = `//*[@id="bs-select-12-3"]`
    const conditionDropdownXpath = `//*[@id="kondisi-detail"]/div/div/div/div/button`
    const conditionItemXpath = `//*[@id="bs-select-13-1"]`
    const facingDropdownXpath = `//*[@id="menghadap-detail"]/div/div/div/div/button`
    const facingItemXpath = `//*[@id="bs-select-14-1"]`
    const roadAccessXpath = `//*[@id="akses-jalan-detail"]/div/div/div/div/button`
    const roadAccessItemXpath = `//*[@id="bs-select-15-3"]`
    const yearBuiltXpath = `//*[@id="year_built"]`;
    const detailSubmitButtonXpath = `//*[@id="store-property-detail"]`;

    return {
        surfaceAreaXpath,
        buildingAreaXpath,
        floorXpath,
        descriptionXpath,
        bedroomXpath,
        bathroomXpath,
        garageDropdownXpath,
        garageItemXpath,
        priceXpath,
        priceTypeXpath,
        priceTypeItemXpath,
        powerSupplyDropdownXpath,
        powerSupplyItemXpath,
        waterTypeDropdownXpath,
        waterTypeItemXpath,
        interiorDropdownXpath,
        interiorItemXpath,
        conditionDropdownXpath,
        conditionItemXpath,
        facingDropdownXpath,
        facingItemXpath,
        roadAccessXpath,
        roadAccessItemXpath,
        yearBuiltXpath,
        detailSubmitButtonXpath
    };
}

module.exports = propertyDetailFormElement;