import { backURL, clearStorage, getUser } from "../config.js";
import { navbarRender } from "../navbar.js";
import { btnRender, getAndShowAllCamers } from "../cameraAPI/camers.js";

export const userLogout = async() => {
    return fetch(`${backURL}/user/logout`, {
        method: 'GET',
        mode: 'cors', 
        credentials: 'include'                
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            clearStorage();
            navbarRender(getUser());
            btnRender();
            getAndShowAllCamers();
            })
        .catch(err => console.error(err));
}