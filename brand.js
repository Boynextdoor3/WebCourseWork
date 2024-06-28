import { attachEventHandler, backURL, getBrands, setBrands } from "../config.js";
import { createBrandModal, editBrandModal } from "../modals/brandModal.js";
import { confirmModal, waitForRemoveButtonPress } from "../modals/confirmationModal.js";
import { dropDownClose } from "../modals/main.js";
import { hidePagination } from "../pagination.js";
import {brandCardRender } from "./brandCard.js";


export const brandRender = async () => {
    dropDownClose();
    hidePagination();
    const btnContainer = document.querySelector(".btn-container");

    btnContainer.innerHTML = ``;
    btnContainer.innerHTML = `<button type="button" class="btn btn-secondary" id="createBraBtn" >Create New Brand of Camera</button>`;
    attachEventHandler('createBraBtn', 'click', () => { createBrandModal.open()} );

    const dataContainer = document.querySelector(".data-container");
    dataContainer.innerHTML = "";        

    const brandContainer = document.createElement("div");
    brandContainer.classList.add("brand-container");
    dataContainer.appendChild(brandContainer);

    const braArr = getBrands();

    if (braArr.length) {
        braArr.forEach(brand => {
            dropDownClose();
            brandCardRender(brand);
        });
    }
    else {
        const brandContainer = document.querySelector(".brand-container");
        const brandCard = document.createElement("div");
        brandCard.classList.add("empy-errors");
        brandCard.innerHTML = `<div class="empy-errors-item">No brands found yet. </div>
                                  <div class="empy-errors-item">Create some brand,</div>
                                  <div class="empy-errors-item">then create camers.</div>`;
        brandContainer.appendChild(brandCard); 
    }
}


const validateBrandName = async (valuePath, errMsgPath) => {
    const brand = document.getElementById(valuePath).value.trim();
    const regExp = /^\p{L}+$/u;
    const isValid = regExp.test(brand);
    return new Promise ((res, rej) => {
        if (!isValid) {
            document.getElementById(errMsgPath).innerText = 'Use only one word with no numbers';
        } else {
            res();
        }
    })
}

const sendBrandData = async (route, form, valuePath, errMsgPath, id) => {
    return new Promise ((resolve, reject) => {
        const brandName = document.getElementById(valuePath).value.trim().toUpperCase();
        const reqBody = {
            brandName: brandName,
            brandId: id
        }
     
        fetch (`${backURL}/brand/${route}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',   
            },
            body: JSON.stringify(reqBody),
        })
        .then(response => response.json())
        .then(data => {
            if (data.msg) {
                document.getElementById(`${errMsgPath}`).innerText =`${data.msg}`
            }
            else {
                document.forms[form].reset();
                createBrandModal.close();
                editBrandModal.close();
              
            }
            resolve();
        })
        .catch(err => {
            console.error(err);
            reject(err)
        });  
    })
    
}

export const getAllBrandsFromDB = async () => {
    return new Promise ( (resolve, reject) => {
        fetch (`${backURL}/brand`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'       
        })
        .then(response => response.json())
        .then(data => {
            if (data.msg) {
                console.log(data.msg);
            } else {
                setBrands(data);
                resolve(data);
            }
        })
        .catch(err => {
            console.error(err);
            reject(err);
        });  
    })
    
}

export const removeBrand = async (brand) => {
    const msg = document.getElementsByClassName('confirmation-message')[0];
    msg.innerHTML = `Are you sure you want to remove brand <b>${brand.name}</b>? </br>
    <b>ALL CAMERS</b> of this brand will also be <b>REMOVED</b>.</br>
    You can change the brand in the camera before removing the brand..`
    
    return new Promise ( async (resolve, reject) => {
        try {
            confirmModal.open();
            await waitForRemoveButtonPress();    
            await fetch(`${backURL}/brand/${brand._id}`, {
                method: "DELETE",
                mode: 'cors',
                credentials: 'include',          
                })
                .then( async () => {
                    confirmModal.close();
                    await getAllBrandsFromDB();
                    brabdRender(); 
                })
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

export const editBrand = async (brand) => {
    document.getElementById('editBrandId').setAttribute("value", brand._id);
    document.getElementById('editBrandName').value = brand.name;
    editBrandModal.open();
}

document.forms["createBrandForm"].addEventListener ('submit', async (e) => {
    e.preventDefault();
    await validateBrandName('createBrandName' ,'createBrandNameError');
    await sendBrandData('create','createBrandForm','createBrandName', 'createBrandNameError' );
    await getAllBrandsFromDB();
    brandRender(); 
})

document.forms["editBrandForm"].addEventListener ('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editBrandId').value;
    await validateBrandName('editBrandName' ,'editBrandNameError');
    await sendBrandData('edit','editBrandForm','editBrandName', 'editBrandNameError', id );
    await getAllBrandsFromDB();
    BrandRender();
})

const createBrandName = document.getElementById('createBrandName');
createBrandName.addEventListener('focus', () => {
    document.getElementById('createBrandNameError').innerText = '';
});
const editBrandName = document.getElementById('editBrandName');
editBrandName.addEventListener('focus', () => {
    document.getElementById('editBrandNameError').innerText = '';
});


