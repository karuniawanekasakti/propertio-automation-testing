function projectInfrastrukturFormElement() {
    const name = `//*[@id="infrastructure_name"]`;
    const jenisInfrastrukturDropDown = `//*[@id="create-project-infrastructure-form"]/div[1]/div[2]/div/div/div/div/button`;
    const jenisInfrastrukturDropDownItem = `//*[@id="bs-select-6-2"]`;
    const simpanJenisInfrastruktur = `//*[@id="create-project-infrastructure-form"]/div[2]/div/button`;
    const publishProject = `//*[@id="publish-project-btn"]`;
    const jenisInfrastrukturContainer = `//*[@id="nav-infrastructure"]/div/div[2]/div/div`

    return {
        name,
        jenisInfrastrukturDropDown,
        jenisInfrastrukturDropDownItem,
        simpanJenisInfrastruktur,
        publishProject,
        jenisInfrastrukturContainer
    };
}

module.exports = projectInfrastrukturFormElement;