import { attachEventHandler } from "../config.js";
import { editBrand, removeBrand } from "./brand.js";

export const brandCardRender = (brand) => {
    const brandContainer = document.querySelector(".brand-container");
        
    const brandCard = document.createElement("div");
    brandCard.classList.add("brand-card");
    brandCard.innerHTML =   `<div class="brand-name">${brand.name}</div>                                    
                                <div class="brande-manage-btns">
                                        <div class="fas fa-edit brand-btn" id="editBrand${brand._id}" > </div>
                                        <div class="fa-solid fa-trash-can brand-btn" id="removeBrand${brand._id}" ></div>
                                </div>`;
    
    brandContainer.appendChild(brandCard);
    attachEventHandler(`editBrand${brand._id}`, 'click', () => { editBrand(brand) })
    attachEventHandler(`removeBrand${brand._id}`, 'click', () => { removeBrand(brand) })
}