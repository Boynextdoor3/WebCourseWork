import { cartRender, renderCalcCount } from "./cartAPI/cart.js";
import { brandRender } from "./brandAPI/brand.js";
import { attachEventHandler } from "./config.js";
import { loginModal } from "./modals/loginModal.js";
import { registrationModal } from "./modals/registrationModal.js";
import { renderOrders } from "./orderAPI/order.js";
import { getAndShowAllCamers } from "./cameraAPI/camers.js";
import { userLogout } from "./userAPI/logout.js";

export const navbarRender = (user) => {

    const navbarContainer = document.querySelector('.navbar-container');
    navbarContainer.innerHTML = `
        <div class="site-name" id="navbarSiteName">
            <div class="shop-name site-name-item">Camera Hub</div>
            <div class="fa fa-mug-hot site-name-item"></div>
        </div>
        <div class="navbar-menu-container">
        </div>`;
    const navbarMenu = document.querySelector('.navbar-menu-container');

    navbarMenu.innerHTML = '';
    switch (true) {

        case user === null:

            navbarMenu.innerHTML = `<nav class="navbar navbar-light navbar-expand-md navbar-bg-body">
                                <div class="container">
                                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#n_bar" aria-controls="n_bar" aria-expanded="true" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="n_bar">
                                        <ul class="navbar-nav">
                                            <li class="nav-item"><a class="nav-link" href="#" id="navbarCamers">CAMERS</a></li>
                                            <li class="nav-item dropdown">
                                                <div class="nav-link dropdown-toggle fa-solid fa-user" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"></div>
                                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li><a class="dropdown-item" href="#" id="navbarUserLogin">LogIn</a></li>
                                                    <li><a class="dropdown-item" href="#" id="navbarUserRegister">SignUp</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>`;
            break;
        
        case user && !user.isAdmin :
          
            navbarMenu.innerHTML =`<nav class="navbar navbar-light navbar-expand-md navbar-bg-body">
                                    <div class="container">
                                        <div class="fa fa-shopping-cart navbar-cart-icon" id="cart">
                                            <div class="navbar-cart-icon-count" id="cartIconCount"></div>
                                        </div>
                                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#n_bar" aria-controls="n_bar" aria-expanded="true" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse" id="n_bar">
                                            <ul class="navbar-nav">
                                                <li class="nav-item"><a class="nav-link" href="#" id="navbarCamers">CAMERS</a></li>
                                                <li class="nav-item"><a class="nav-link" href="#" id="navbarOrders">ORDERS</a></li>
                                                <li class="nav-item dropdown">
                                                    <div class="nav-link dropdown-toggle fa-solid fa-user" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <div class="user-name">${user.name}</div>
                                                    </div>
                                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <li><a class="dropdown-item" href="#" id="navbarUserLogout">LogOut</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>`;
            break;
     
        case  user.isAdmin:
            
            navbarMenu.innerHTML = `<nav class="navbar navbar-light navbar-expand-md navbar-bg-body">
                                    <div class="container">
                                        <button id="burgerBtn" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#n_bar" aria-controls="n_bar" aria-expanded="true" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse" id="n_bar">
                                            <ul class="navbar-nav">
                                                <li class="nav-item"><a class="nav-link" href="#" id="navbarBrands">BRANDS</a></li>     
                                                <li class="nav-item"><a class="nav-link" href="#" id="navbarCamers">CAMERS</a></li>
                                                <li class="nav-item"><a class="nav-link" href="#" id="navbarOrders">ORDERS</a></li>
                                                <li class="nav-item dropdown">
                                                    <div class="nav-link dropdown-toggle fa-solid fa-user" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <div class="user-name">${user.name}</div>
                                                    </div>
                                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <li><a class="dropdown-item" href="#" id="navbarUserLogout">LogOut</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>`;
            break;   
    }

    attachEventHandler('cart', 'click', cartRender);
    attachEventHandler('navbarUserRegister', 'click', () => { registrationModal.open() });
    attachEventHandler('navbarOrders', 'click', renderOrders);
    attachEventHandler('navbarUserLogin', 'click', () => { loginModal.open() });
    attachEventHandler('navbarUserLogout', 'click', userLogout);
    attachEventHandler('navbarBrands', 'click', brandRender);
    attachEventHandler('navbarSiteName', 'click', getAndShowAllCamers);
    attachEventHandler('navbarCamers', 'click', getAndShowAllCamers);
    renderCalcCount();
}
