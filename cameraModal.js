import { getBrands } from "../config.js";
import { getAndShowAllCamers, sendCameraData } from "../cameraAPI/camers.js";
import { CustomModal } from "./main.js";

const cameraModalTitle = `Create camera`;
const cameraModalContent = `<form name="cameraForm" enctype="multipart/form-data">
    <input type="hidden" name="cameraId" id="cameraId">
    <input type="hidden" name="oldCloudinaryPublicId" id="oldCloudinaryPublicId">
    <input type="hidden" name="oldImagePath" id="oldImagePath">
    <table class="form-table">
        <tr>
            <td class="form-label"><label for="cameraBrand">Brand:</label> </td>
            <td class="form-input">
                <select name="cameraBrand" id="cameraBrand" class="form-select" required>
                </select>
            </td>
        </tr>
        <tr>
            <td class="form-label"><label for="cameraName">Name:</label> </td>
            <td class="form-input"><input type="text" name="cameraName" id="cameraName" class="form-control" required></td>
        </tr>
        <tr>
            <td class="form-label"><label for="cameraType">Type:</label> </td>
            <td class="form-input">
                <select name="cameraType" id="cameraType" class="form-select" required>
                    <option>Digital compacts</option>
                    <option>Mirrorless camera</option>
                    <option>DSLR camera</option>
                </select>
            </td>
        </tr>
        <tr>
            <td class="form-label"><label for="cameraDisplay">Display:</label> </td>
            <td class="form-input"><input type="text" name="cameraDisplay" id="cameraDisplay" class="form-control" required></td>
        </tr>
        <tr>
            <td class="form-label"><label for="cameraVideo">Video:</label> </td>
            <td class="form-input"><input type="text" name="cameraVideo" id="cameraVideo" class="form-control" required></td>
        </tr>
        <tr>
            <td class="form-label"><label for="cameraWeight">Weight:</label> </td>
            <td class="form-input"><input type="number" name="cameraWeight" id="cameraWeight" class="form-control" min="1000" max="2000" required></td>
        </tr>
        <tr>
            <td></td>
            <td class="form-image-container">
                <img class="form-image" id="formImage" >
            </td>
        </tr>
        <tr>
            <td class="form-label"><label for="cameraImage">Image:</label> </td>
            <td class="form-input"><input type="file" name="cameraImage" id="cameraImage" class="form-control" onchange="document.getElementById('formImage').src = window.URL.createObjectURL(this.files[0])" ></td>
        </tr>
        <tr>
            <td class="form-label"><label for="cameraPrice">Price, &#x20b4:</label> </td>
            <td class="form-input"><input type="number" name="cameraPrice" id="cameraPrice" class="form-control" required></td>
        </tr>
    </table>
    <div class="modal-form-footer">
        <input type="submit" class="btn btn-success" id="submitCameraBtn" value="Create">
        <input type="reset" class="btn btn-danger" id="cancelCameraBtn" data-close="true" value="Cancel">
    </div>
    </form>`;
const cameraModalFooter =``;
export const cameraModal = new CustomModal('cam', cameraModalTitle, cameraModalContent, cameraModalFooter);
cameraModal.create();

export const convertModalToCreate = () => {
    document.getElementById('title-cam').innerText = "Create camera";
    document.getElementById('submitCameraBtn').value = "Create" 
}


export const convertModalToEdit = () => {
    document.getElementById('title-cam').innerText = "Edit camera";
    document.getElementById('submitCameraBtn').value = "Confirm" 
}



export const openCameraModalWithCreate = () => {
    convertModalToCreate();
    renderCameraBrandsOptions();
    cameraModal.open();
}

document.forms["cameraForm"].addEventListener ('submit', (e) => {
    e.preventDefault();
    cameraModal.close();
    convertModalToCreate();
    sendCameraData()
    .then( () => {getAndShowAllCamers()} )
    .catch (err => console.error(err)) ;    
})

export const renderCameraBrandsOptions = () =>  {
    
    const cameraBrand = document.getElementById('cameraBrand');
   cameraBrand.innerHTML = ``;
    const defaultCameraBrandOption = document.createElement('option');
    defaultCameraBrandOption.setAttribute("disabled", "");
    defaultCameraBrandOption.setAttribute("selected", "");
    defaultCameraBrandOption.setAttribute("value", "");
    defaultCameraBrandOption.innerText = ` -- select a brand -- `;
    cameraBrand.appendChild(defaultCameraBrandOption);
    
    const brandArr = getBrands();
    
    brandArr.forEach(brand => {
        const brandOption = document.createElement('option');
        brandOption.value = brand._id;
        brandOption.innerText = `${brand.name}`;
        cameraBrand.appendChild(brandOption);
    });
}