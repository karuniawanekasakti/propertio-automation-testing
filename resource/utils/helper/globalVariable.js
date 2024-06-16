const { generateUniqueName} = require('./helper');
const uniqueName = generateUniqueName(5);

function globalVariable() {
    const newFasilitas = `Testing ${uniqueName}`;
    const newEditFasilitas = `Testing ${uniqueName}`;
    const validUserEmail = `user@mail.com`;
    const validUserPassword = `11111111`;
    const validAdminEmail = `admin@mail.com`
    const validAdminPassword = `11111111`
    const validAgentEmail = `agent@mail.com`
    const validAgentPassword = `11111111`
    const invalidUserEmail = `userr@mail.com`;
    const invalidUserPassword = `12345678`;
    const fasilitasIconImage = `E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\properti\\tipe_fasilitas.svg`;
    const profilePictureImage = `E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\500kb (1).png`;
    const propertyImage = `E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\properti\\properti_1.jpg`
    const profilePhoto = `E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\pp\\user_profile.jpg`
    const agentName = `agent`
    const randomLastname = `testing ${uniqueName}`
    const agentFullName = `${agentName} ${randomLastname}`
    const newPassword = `12345678`
    const propertyTitle = `Testing Perumahan Di Jakarta Barat ${uniqueName}`
    const proyekTitle = `Testing Proyek Di Jakarta Barat ${uniqueName}`
    const proyekHeadline = `Proyek Di Jakarta Barat ${uniqueName}`
    const newPropertyTitle = `Update Perumahan Di Jakarta Barat ${uniqueName}`
    const propertyAddress = `Jl. Citra Kalibiru No. 1`
    const propertyPrice = `1000000000`
    const proyekDocument = `E:\\KULIAH\\TA\\Propertio\\QA\\Automation\\test item\\properti\\Modul Manual Testing (2).pdf`
    const proyekUrl = ``
    const newUnitTitle = `Testing Unit ${uniqueName}`

    return {
        newFasilitas,
        newEditFasilitas,
        validUserEmail,
        validUserPassword,
        validAgentEmail,
        validAgentPassword,
        validAdminEmail,
        validAdminPassword,
        invalidUserEmail,
        invalidUserPassword,
        fasilitasIconImage,
        profilePictureImage,
        propertyImage,
        randomLastname,
        agentName,
        profilePhoto,
        newPassword,
        agentFullName,
        propertyTitle,
        proyekTitle,
        propertyAddress,
        propertyPrice,
        newPropertyTitle,
        proyekDocument,
        proyekUrl,
        proyekHeadline,
        newUnitTitle
    };
}

module.exports = globalVariable;