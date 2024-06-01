function popUpElement() {
    const locationPopUpXpath = `//*[@class="swal2-popup swal2-modal swal2-icon-success swal2-show"]`;
    const locationPopUpTextXpath = `//*[@id="swal2-html-container"]`;
    const locationPopUpConfirmButtonXpath = `//*[@class="swal2-confirm swal2-styled swal2-default-outline"]`;

    const detailPopUpXpath = `//*[@class="swal2-popup swal2-modal swal2-icon-success swal2-show"]`;
    const detailPopUpTextXpath = `//*[@id="swal2-html-container"]`;
    const detailPopUpConfirmButtonXpath = `//*[@class="swal2-confirm swal2-styled swal2-default-outline"]`;

    const mediaPopUpXpath = `//*[@class="swal2-popup swal2-modal swal2-icon-success swal2-show"]`;
    const mediaPopUpTextXpath = `//*[@id="swal2-html-container"]`;
    const mediaPopUpConfirmButtonXpath = `//*[@class="swal2-confirm swal2-styled swal2-default-outline"]`;


    const sitePlanUploadPopUpXpath = `//*[@class="swal2-popup swal2-modal swal2-icon-success swal2-show"]`;
    const sitePlanUploadPopUpTextXpath = `//*[@id="swal2-html-container"]`;
    const sitePlanUploadPopUpConfirmButtonXpath = `//*[@class="swal2-confirm swal2-styled swal2-default-outline"]`;

    const publishPopUpXpath = `//*[@class="swal2-popup swal2-modal swal2-icon-success swal2-show"]`;
    const publishPopUpTextXpath = `//*[@id="swal2-html-container"]`;
    const publishPopUpConfirmButtonXpath = `//*[@class="swal2-confirm swal2-styled swal2-default-outline"]`;

    const deletePropertyPopUpXpath = `//*[@class="swal2-popup swal2-modal swal2-icon-warning swal2-show"]`;
    const deletePropertyPopUpTextXpath = `//*[@id="swal2-html-container"]`;
    const deletePropertyPopUpConfirmButtonXpath = `//*[@class="swal2-confirm swal2-styled swal2-default-outline"]`;

    const statusPropertyPopUpXpath = `//*[@class="swal2-popup swal2-modal swal2-icon-success swal2-show"]`;
    const statusPropertyPopUpTextXpath = `//*[@id="swal2-html-container"]`;
    const statusPropertyPopUpConfirmButtonXpath = `//*[@class="swal2-confirm swal2-styled swal2-default-outline"]`;

    const tipePropertyPopUpXpath = `/html/body/div[2]/div`;
    const tipePropertyPopUpTextXpath = `//*[@id="swal2-html-container"]`;
    const tipePropertyPopUpConfirmButtonXpath = `//*[@class="swal2-confirm swal2-styled swal2-default-outline"]`;

    const tipeFasilitasPopUpXpath = `/html/body/div[2]/div`;
    const tipeFasilitasPopUpTextXpath = `//*[@id="swal2-html-container"]`;
    const tipeFasilitasPopUpConfirmButtonXpath = `//*[@class="swal2-confirm swal2-styled swal2-default-outline"]`;

    const tipeInfrastrukturPopUpXpath = `/html/body/div[2]/div`;
    const tipeInfrastrukturPopUpTextXpath = `//*[@id="swal2-html-container"]`;
    const tipeInfrastrukturPopUpConfirmButtonXpath = `//*[@class="swal2-confirm swal2-styled swal2-default-outline"]`;

    const projectLocationFormPopUp = `/html/body/div[3]/div`
    const projectLocatonFormTextPopUp = `//*[@id="swal2-html-container"]`;
    const projectLocationFormSubmitPopUp = `//*[@class="swal2-confirm swal2-styled swal2-default-outline"]`;

    const deleteUnitConfirmationPopUpXpath = `//body/div[2]/div[1]`;
    const deleteUnitPopUpConfirmXpath = `//button[contains(text(),'OK')]`;
    const deleteUnitCancelXpath = `//button[contains(text(),'Batal')]`;
    const deleteUnitPopUpConfirmTextXpath = `//body[1]/div[2]/div[1]/div[2]`;

    const deletUnitPopUpXpath = `//body[1]/div[2]/div[1]`
    const deleteUnitPopUpTextXpath = `//body[1]/div[2]/div[1]/div[2]`
    const deleteUnitPopUpOkButtonXpath = `//button[contains(text(),'OK')]`

    const unitMediaFormOkButtonXpath = `/html/body/div[2]/div/div[6]/button[1]`;

    const favoriteModalXpath = `/html/body/div[2]/div`;
    const favoriteModalTextXpath = `//*[@id="swal2-html-container"]`;
    const favoriteModalConfirmXpath = `/html/body/div[2]/div/div[6]/button[1]`;

    const popUp = `//div[@role='dialog']`
    const popUpConfirm = `//button[normalize-space()='OK']`
    const popUpText = `//div[@id='swal2-html-container']`


    return {
        locationPopUpXpath,
        locationPopUpTextXpath,
        locationPopUpConfirmButtonXpath,
        detailPopUpXpath,
        detailPopUpTextXpath,
        detailPopUpConfirmButtonXpath,
        mediaPopUpXpath,
        mediaPopUpTextXpath,
        mediaPopUpConfirmButtonXpath,
        sitePlanUploadPopUpXpath,
        sitePlanUploadPopUpTextXpath,
        sitePlanUploadPopUpConfirmButtonXpath,
        publishPopUpXpath,
        publishPopUpTextXpath,
        publishPopUpConfirmButtonXpath,
        deletePropertyPopUpXpath,
        deletePropertyPopUpTextXpath,
        deletePropertyPopUpConfirmButtonXpath,
        statusPropertyPopUpXpath,
        statusPropertyPopUpTextXpath,
        statusPropertyPopUpConfirmButtonXpath,
        tipePropertyPopUpXpath,
        tipePropertyPopUpTextXpath,
        tipePropertyPopUpConfirmButtonXpath,
        tipeFasilitasPopUpXpath,
        tipeFasilitasPopUpTextXpath,
        tipeFasilitasPopUpConfirmButtonXpath,
        tipeInfrastrukturPopUpXpath,
        tipeInfrastrukturPopUpTextXpath,
        tipeInfrastrukturPopUpConfirmButtonXpath,
        projectLocationFormPopUp,
        projectLocatonFormTextPopUp,
        projectLocationFormSubmitPopUp,
        deleteUnitConfirmationPopUpXpath,
        deleteUnitPopUpConfirmXpath,
        deleteUnitCancelXpath,
        deleteUnitPopUpConfirmTextXpath,
        deletUnitPopUpXpath,
        deleteUnitPopUpTextXpath,
        deleteUnitPopUpOkButtonXpath,
        unitMediaFormOkButtonXpath,
        favoriteModalXpath,
        favoriteModalTextXpath,
        favoriteModalConfirmXpath,
        popUpConfirm,
        popUpText,
        popUp
    };
}

module.exports = popUpElement;