function menuElement() {
    const listingButtonXpath = `//*[@id="mm-8"]/div[1]/div[2]/div/div[1]/div/div[4]/a`;
    const addPropertyButtonXpath = `//a[@id='addPropertyLink']`;
    const propertyElementXpath = `//*[@id="active-card"]/div[1]/div/div`;
    const logoutButtonXpath = `//*[@id="logout-button"]`;
    const userProfileNameXpath = `//*[@id="mm-5"]/div[1]/header/nav/div/div/div[2]/div/div/div/ul/li/div/a/p`;
    const userUserProfileNameXpath = `//p[contains(text(),'userProperti')]`
    const propertySearchXpath = `//*[@id="search-input"]`;
    const propertyTitleXpath = `//*[@id="title"]`;
    const editPropertyButtonXpath = `//*[@id="edit-property-agent"]`;
    const deletePropertyButtonXpath = `//*[@id="active-card"]/div[3]/div/div/div[2]/div[3]/div[2]/a[2]`;
    const optionPropertyDropdownXpath = `//*[@id="active-card"]/div[1]/div/div/div[2]/div[3]/div[2]/div`;
    const draftOptionItemXpath = `//*[@id="btn-done"]`;
    const lakuOptionItemXpath = `//*[@id="btn-status"]`;
    const iklanDraftTabXpath = `//*[@id="pills-not_active-tab"]`;
    const agentUserProfileDropdownXpath = `//*[@id="mm-8"]/div[1]/header/nav/div/div/div[3]/div/ul/li[3]/div/a/p`;
    const userProfileDropdownXpath = `//*[@id="mm-5"]/div[1]/header/nav/div/div/div[2]/div/div/div/ul/li/div/a`;
    const developerUserProfileDropdownXpath = `//*[@id="mm-8"]/div[1]/header/nav/div/div/div[3]/div/ul/li[3]/div/a/p`;
    const adminUserProfileDropdownXpath = `//*[@id="mm-10"]/div[1]/header/nav/div/div/div[3]/div/ul/li[3]/div/a/p`;
    const tipePropertyMenuXpath = `//*[@id="mm-10"]/div[1]/div[2]/div/div[1]/div/div[2]/a`;
    const addTipePropertyButtonXpath = `//*[@id="mm-10"]/div[1]/div[2]/div/div[2]/div/div[1]/div[2]/div/a`;
    const tipeFasilitasMenuXpath = `//*[@id="mm-10"]/div[1]/div[2]/div/div[1]/div/div[3]/a`;
    const addTipeFasilitasButtonXpath = `//*[@id="mm-10"]/div[1]/div[2]/div/div[2]/div/div[1]/div[2]/div/a`;
    const tipeInfrastrukturMenuXpath = `//*[@id="mm-10"]/div[1]/div[2]/div/div[1]/div/div[4]/a`;
    const addTipeInfrastrukturButtonXpath = `//*[@id="mm-10"]/div[1]/div[2]/div/div[2]/div/div[1]/div[2]/div/a`;
    const addProjectButtonXpath = `//*[@id="add-project-dev"]`;
    const editProjectButtonXpath = `//*[@id="not_active-card"]/div[1]/div/div/div[2]/div[3]/div[2]/a[2]`;
    const draftProjectTabXpath = `//*[@id="pills-not_active-tab"]`;
    const projectSearchXpath = `//*[@id="search-input"]`;
    const projectContainerXpath = `//*[@id="not_active-card"]/div[1]/div/div`;
    const userProjectContainerXpath = `//body[1]/div[1]/div[1]/div[6]/section[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]`;
    const projectDetailXpath = `//a[i[@class='fa-solid fa-eye me-2']]`;
    const activeProjectDetailXpath = `//*[@id="active-card"]/div[1]/div/div/div[2]/div[3]/div[2]/a[1]`;
    const activeProjectContainerXpath = `//*[@id="active-card"]/div[1]/div/div`;
    const addUnitProjectXpath = `//*[@id="add-unit-btn"]`;
    const unitContainerXpath = `//*[@id="units-1"]`;
    const unitEditButtonXpath = `//*[@id="units-1"]/div[2]/div[2]/div/a[1]`;
    const unitTitleXpath = `//*[@id="units-1"]/div[2]/h6/a`;
    const unitDeleteXpath = `//a[@id='btn-remove-unit']`;
    const totalUnitXpath = `//span[@id='total']`;
    const propertyButtonXpath = `//*[@id="respMenu"]/li[1]/a`;
    const userFavoriteButtonXpath = `//*[@id="mm-5"]/div[1]/header/nav/div/div/div[2]/div/div/div/ul/li/div/div/div/a[1]`;
    const favoritePropertyButtonXpath = `//*[@id="property"]/div[1]/div/div/div[2]/div[2]/button`;
    const unloginFavoriteButtonXpath = `//*[@id="property"]/div[1]/div/div/div[2]/div[2]/a`;
    const unloginFavoriteProjecctButtonXpath = `//*[@id="projectProperty"]/div[1]/div/div[2]/div[4]/div[2]/a`;
    const favoriteModalXpath = `/html/body/div[2]/div`;
    const favoriteModalTextXpath = `//*[@id="swal2-html-container"]`;
    const favoriteModalConfirmXpath = `/html/body/div[2]/div/div[6]/button[1]`;
    const unfavoritePropertyModalXpath = `/html/body/div[2]/div`;
    const unfavoritePropertyConfirmXpath = `/html/body/div[2]/div/div[6]/button[1]`;
    const favoriteTabXpath = `//*[@id="property-tab"]`;
    const propertyContainerXpath = `//*[@id="propertyContainer"]`;
    const unfavoritePropertyButtonXpath = `//*[@id="propertyContainer"]/div/div/div/div[3]/button`;
    const emptyFavoritTextXpath = `//h5[contains(text(),'Tidak ada properti yang tersedia')]`
    const favoriteProjectButtonXpath = `//*[@id="projectProperty"]/div[1]/div/div[2]/div[4]/div[2]/button`;
    const unfavoriteProjectButtonXpath = `//*[@id="projectContainer"]/div/div/div[2]/div[4]/button`;
    const searchBarXpath = `//*[@id="form-search"]/div/div[1]/div/span/div/input`;
    const propertyListTitleXpath = `//*[@id="property"]/div/div/div/h6/a[2]`;
    const propertyCityXpath = `//*[@id="property"]/div/div/div/p`;
    const searchButtonXpath = `//*[@id="form-search"]/div/div[2]/div/button`;
    const notFoundXpath = `//div[@role='alert']`
    const listAkunMenuXpath = `//div[@class='dashboard_sidebar_list']//a[contains(@class,'items-center')][normalize-space()='List Akun']`
    const propertySearch = `//input[@id='search-input']`
    const activePropertyTab = `//button[@id='pills-active-tab']`
    const activePropertyContainer = `//span[@id='active-card']`
    const paginationProperty = `//div[@id='pills-active']//p[@class='mt10 pagination_page_count text-center']`
    const notActiveProjectTab = `//button[@id='pills-not_active-tab']`

    return {
        listingButtonXpath,
        addPropertyButtonXpath,
        propertyElementXpath,
        logoutButtonXpath,
        userProfileNameXpath,
        propertySearchXpath,
        propertyTitleXpath,
        editPropertyButtonXpath,
        deletePropertyButtonXpath,
        optionPropertyDropdownXpath,
        draftOptionItemXpath,
        lakuOptionItemXpath,
        iklanDraftTabXpath,
        agentUserProfileDropdownXpath,
        userProfileDropdownXpath,
        developerUserProfileDropdownXpath,
        adminUserProfileDropdownXpath,
        tipePropertyMenuXpath,
        addTipePropertyButtonXpath,
        tipeFasilitasMenuXpath,
        addTipeFasilitasButtonXpath,
        tipeInfrastrukturMenuXpath,
        addTipeInfrastrukturButtonXpath,
        addProjectButtonXpath,
        editProjectButtonXpath,
        draftProjectTabXpath,
        projectSearchXpath,
        projectContainerXpath,
        projectDetailXpath,
        activeProjectDetailXpath,
        activeProjectContainerXpath,
        addUnitProjectXpath,
        unitContainerXpath,
        unitEditButtonXpath,
        unitTitleXpath,
        unitDeleteXpath,
        totalUnitXpath,
        propertyButtonXpath,
        userFavoriteButtonXpath,
        favoritePropertyButtonXpath,
        unloginFavoriteButtonXpath,
        favoriteModalXpath,
        favoriteModalTextXpath,
        favoriteModalConfirmXpath,
        unfavoritePropertyModalXpath,
        unfavoritePropertyConfirmXpath,
        favoriteTabXpath,
        propertyContainerXpath,
        unfavoritePropertyButtonXpath,
        favoriteProjectButtonXpath,
        unfavoriteProjectButtonXpath,
        userUserProfileNameXpath,
        userProjectContainerXpath,
        unloginFavoriteProjecctButtonXpath,
        searchBarXpath,
        propertyListTitleXpath,
        propertyCityXpath,
        searchButtonXpath,
        notFoundXpath,
        listAkunMenuXpath,
        emptyFavoritTextXpath,
        favoriteProjectButtonXpath,
        unfavoriteProjectButtonXpath,
        propertySearch,
        activePropertyTab,
        activePropertyContainer,
        paginationProperty,
        notActiveProjectTab

        
    };
}

module.exports = menuElement;
