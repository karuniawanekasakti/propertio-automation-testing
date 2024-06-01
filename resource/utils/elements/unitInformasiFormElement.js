function unitInformasiFormElement() {
    const name = '//*[@id="title"]';
    const deskripsi = `//*[@id="deskripsi"]/div/div/div/div/div[3]/div[2]`
    const harga = `//*[@id="price"]`
    const stokUnit = `//*[@id="stock"]`
    const luasTanah = `//*[@id="surface_area"]`
    const luasBangunan = `//*[@id="surface_area"]`
    const floor = `//*[@id="floor"]`
    const kamar = `//*[@id="bedroom"]`
    const kamarMandi = `//*[@id="bathroom"]`
    const tempatParkirDropDown = `//*[@id="tempat-parkir"]/div/div/div/div/button`
    const tempatParkirDropDownItem = `//*[@id="bs-select-1-2"]`
    const dayaListrikDropDown = `//*[@id="daya-listrik"]/div/div/div/div/button`
    const dayaListrikDropDownItem = `//*[@id="bs-select-2-4"]`
    const jenisAirDropDown = `//*[@id="jenis-air"]/div/div/div/div/button`
    const jenisAirDropDownItem = `//*[@id="bs-select-3-3"]`
    const interiorDropDown = `//*[@id="interior-unit"]/div/div/div/div/button`
    const interiorDropDownItem = `//*[@id="bs-select-4-3"]`
    const aksesJalanDropDown = `//*[@id="akses-jalan"]/div/div/div/div/button`
    const aksesJalanDropDownItem = `//*[@id="bs-select-5-3"]`
    const submitUnitButton = `//*[@id="submit-unit"]`

    return {
        name,
        deskripsi,
        harga,
        stokUnit,
        luasTanah,
        luasBangunan,
        floor,
        kamar,
        kamarMandi,
        tempatParkirDropDown,
        tempatParkirDropDownItem,
        dayaListrikDropDown,
        dayaListrikDropDownItem,
        jenisAirDropDown,
        jenisAirDropDownItem,
        interiorDropDown,
        interiorDropDownItem,
        aksesJalanDropDown,
        aksesJalanDropDownItem,
        submitUnitButton
    };
}

module.exports = unitInformasiFormElement;