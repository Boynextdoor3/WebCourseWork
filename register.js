import { backURL, getUser, setUser } from "../config.js";
import { registrationModal } from "../modals/registrationModal.js";
import { navbarRender } from "../navbar.js";
import { getAndShowAllCamers } from "../cameraAPI/camers.js";


export const userRegistetion = async () => {
   
    const reqBody = {
        userRegName: document.getElementById('userRegName').value,
        userRegEmail: document.getElementById('userRegEmail').value,
        userRegPassword: document.getElementById('userRegPassword').value
    }
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',   
        },
        mode: 'cors', 
        credentials: 'include',                
        body: JSON.stringify(reqBody),          
      };
      
      fetch(`${backURL}/user/register`, requestOptions)
        .then(response => response.json())
        .then(data => {

            if (data.msg) {
                document.getElementById('registerEmailError').innerText =`${data.msg}`
            }
            else {
                document.forms["registerForm"].reset();
                registrationModal.close();
                setUser(data);
                navbarRender(getUser());
                getAndShowAllCamers();
            }
        })
        .catch(err => {
            console.error(err);
        });
}

