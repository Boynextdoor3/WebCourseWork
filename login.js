import { getAllBrandsFromDB } from "../brandAPI/brand.js";
import { backURL, getUser, setUser } from "../config.js";
import { loginModal } from "../modals/loginModal.js";
import { navbarRender } from "../navbar.js";
import { getAndShowAllCamers } from "../cameraAPI/camers.js";

export const userLogin = async () => {
    const reqBody = {
        userLoginEmail: document.getElementById('userLoginEmail').value,
        userLoginPassword: document.getElementById('userLoginPassword').value
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

      fetch(`${backURL}/user/login`, requestOptions)
        .then(response => response.json())
        .then(async data => {
            if (data.emailMsg) {
                document.getElementById('loginEmailError').innerText =`${data.emailMsg}`;
            } else
            if (data.pwdMsg) {
                document.getElementById('loginPasswordError').innerText =`${data.pwdMsg}`
            }
            else {
                document.forms["loginForm"].reset();
                loginModal.close();
                setUser(data);
                navbarRender(getUser());
                await getAndShowAllCamers();
                if (data.isAdmin) { 
                    await getAllBrandsFromDB();                    
                 };
            }
        })
        .catch(err => {
            console.error(err);
        });
}
