import { renderFilterBrandsOptions } from "./filter.js";
import { renderCameraBrandsOptions } from "./modals/cameraModal.js";

export const backURL = `http://localhost:4000`;


export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getBrands = () => {
    return JSON.parse(localStorage.getItem('brands'));
};

export const setBrands =  (brands) => {
    localStorage.setItem('brands', JSON.stringify(brands));
    renderCameraBrandsOptions();
    renderFilterBrandsOptions(brands);
}

export const getPage = () => {
    return JSON.parse(localStorage.getItem('page'));
}


export const setPage = (page) => {
    localStorage.setItem('page', JSON.stringify(page));
}

export const getPageCount = () => {
    return JSON.parse(localStorage.getItem('pageCount'));
}


export const setPageCount = (pageCount) => {
    localStorage.setItem('pageCount', JSON.stringify(pageCount));
}

export const clearStorage = async () => {
    localStorage.clear();
};


export function attachEventHandler (elementId, eventType, method) {
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener(eventType, () => method());
    }
}





