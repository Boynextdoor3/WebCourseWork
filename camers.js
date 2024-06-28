import { attachEventHandler, backURL, getPage, getUser, setPageCount } from "../config.js";
import { confirmModal, waitForRemoveButtonPress } from "../modals/confirmationModal.js";
import { dropDownClose } from "../modals/main.js";
import { convertModalToEdit, openCameraModalWithCreate, cameraModal, renderCameraBrandsOptions } from "../modals/cameraModal.js";
import { renderPagination, showPagination } from "../pagination.js";
import { cameraCardRender } from "./cameraCard.js";


export const  btnRender = () => {
    const btnContainer = document.querySelector(".btn-container");
    btnContainer.innerHTML = ``;
    const user = getUser();
    
    if ( user && user.isAdmin) {
        btnContainer.innerHTML = `<button type="button" class="btn btn-secondary" id="createBtn">Create New Camera</button>`;
    }
    attachEventHandler('createBtn', 'click', openCameraModalWithCreate);
}


export const getAndShowAllCamers = async () => {
    const page = getPage();
    const filterBrand = document.getElementById('filter-brand').value;
    const sort = document.getElementById('filter-sort').value;
    const search = document.getElementById('filter-search').value.trim();
  
    const queryParams = new URLSearchParams({
        page: `${page}`,
        brand: `${filterBrand}`,
        sort: `${sort}`,
        search: `${search}`
      });
    
    await fetch(`${backURL}/camera?${queryParams}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'                
    })
    .then(response => response.json())                     
    .then( data => {                                         
            dropDownClose(); 
            btnRender();           
            
            setPageCount(data.pageCount);
            renderPagination();
            showPagination();
            
            const dataContainer = document.querySelector(".data-container");
            dataContainer.innerHTML = "";                   
            
            if (data.items.length) {
                data.items.forEach(camera => {
                   
                    dropDownClose();
                    
                    cameraCardRender(camera);
                });
            }
            else {
                dataContainer.innerHTML = `<div class="empy-errors">
                    <div class="empy-errors-item">No camers found </div>
                    <!-- <div class="empy-errors-item">First - create some brand,</div>
                    <div class="empy-errors-item">then you'll be able to create camera.</div> -->
                </div>`
            }
           
    })
    .catch( err => console.log(err));
}



export const editCamera = (camera) => {
    convertModalToEdit();
    renderCameraBrandsOptions();
  
    const brandListBox = document.querySelector('#cameraBrand');
    const options = Array.from(brandListBox.options);
    const optionToSelect = options.find(item => item.text === camera.brand.name);
    optionToSelect.selected = true;
    document.getElementById('cameraId').value = camera._id;
    document.getElementById('cameraName').value = camera.name;
    document.getElementById('cameraType').value = camera.type;
    document.getElementById('cameraDisplay').value = camera.display;
    document.getElementById('cameraVideo').value = camera.video;
    document.getElementById('cameraWeight').value = camera.weight;
    document.getElementById('cameraPrice').value = camera.price;
    document.getElementById('formImage').setAttribute("src", camera.image) ;
    document.getElementById('oldCloudinaryPublicId').value = camera.cloud;
    document.getElementById('oldImagePath').value = camera.image;
    cameraModal.open();
}



const clearHiddenCameraFormAttrib = () => {
    document.forms["cameraForm"].reset()
    document.getElementById("cameraId").removeAttribute("value");
    document.getElementById("oldCloudinaryPublicId").removeAttribute("value");
}

const collectCameraFormData = (formName) => {
    const currentForm = document.forms[formName];
    let formData = new FormData(currentForm);
    document.forms[formName].reset();
    clearHiddenCameraFormAttrib();
    return formData;
}

export const sendCameraData = async () => {
    try {
        await fetch (`${backURL}/camera`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: collectCameraFormData('cameraForm'),
        })
        .then(clearHiddenCameraFormAttrib()); 
    } catch (error) {
        console.error(error);
    }
   
}


export const removeCamera = async (camera) => {
    const msg = document.getElementsByClassName('confirmation-message')[0];
    msg.innerHTML = `Are you sure you want to remove <b>${camera.name}</b>`
    confirmModal.open();
    await waitForRemoveButtonPress();    
        let deleteParams = JSON.stringify({_id:camera._id, cloudinaryPublicId: camera.cloudinaryPublicId})
        await fetch(`${backURL}/camera/`, {
            method: "DELETE",
            mode: 'cors',
            credentials: 'include',                 
            headers: {
                'Content-Type': 'application/json'
            },
            body: deleteParams
        })
        .then( () => {
           confirmModal.close();
            getAndShowAllCamers();
        })
}

