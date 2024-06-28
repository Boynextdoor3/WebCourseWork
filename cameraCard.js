import { addToCart } from "../cartAPI/cart.js";
import { attachEventHandler, getUser } from "../config.js";
import { popUp } from "../popup.js";
import { editCamera, removeCamera } from "./camers.js";

export const cameraCardRender = (camera) => {

    const { brand } = camera;

    const camStr = JSON.stringify(camera);
    const camId = JSON.stringify(camera._id).trim();

    const cameraCard = document.createElement("div");
    cameraCard.classList.add("camera");

    const commonCameraCardPart = `<div class="camera-data">
                                        <div><img src="${camera.image}" class="camera-img"></div>
                                        <div class="camera-brand"><div class="camera-brand-text">${brand.name}</div></div>
                                        <div class="camera-name">${camera.name}</div>
                                        <div class="camera-text">Type: <span class="camera-type">${camera.type}</span> ml</div> 
                                        <div class="camera-text">Display: <span class="camera-display">${camera.display}</span></div>
                                        <div class="camera-text">Video: <span class="camera-video">${camera.video}</span> ml</div> 
                                        <div class="camera-text">Weight: <span class="camera-weight">${camera.weight}</span></div>
                                            
                                    </div>`;
    const adminCameraCardFooter = `  <div class="camera-footer">
                                        <div> <span class="camera-price">${camera.price} &#x20b4 </span> </div>                                    
                                        <div class="camera-manage-btns">
                                            <div class="fas fa-edit camera-btn" id='editCamera${camera._id}'> </div>
                                            <div class="fa-solid fa-trash-can camera-btn" id="removeCamera${camera._id}"></div>
                                        </div> 
                                    </div>`;
    const userCameraCardFooter = `
                                    <div class="camera-footer">
                                        <div> <span class="camera-price">${camera.price} &#x20b4 </span> </div>                                    
                                        <div class="camera-manage-btns">
                                            <div class="fa fa-shopping-cart camera-cart-btn" id="addToCart${camera._id}"> </div>
                                        </div> 
                                    </div>`;
    const unAuthCameraCardFooter = `
                                    <div class="camera-footer">
                                        <div> <span class="camera-price">${camera.price} &#x20b4 </span> </div>                                    
                                        <div class="camera-manage-btns">
                                            <div class="fa fa-shopping-cart camera-cart-btn" id='popUp${camera._id}' > </div>
                                        </div> 
                                    </div>`;

    const user = getUser();
    
    switch (true) {
        case user === null:
            cameraCard.innerHTML = `${commonCameraCardPart} ${unAuthCameraCardFooter}`;
            break; 
        case user && !user.isAdmin :
            cameraCard.innerHTML = `${commonCameraCardPart} ${userCameraCardFooter}`;
            break;
        case  user.isAdmin:
            cameraCard.innerHTML = `${commonCameraCardPart} ${adminCameraCardFooter}`;
            break;   
    }

    const dataContainer = document.querySelector(".data-container");
    dataContainer.appendChild(cameraCard);

    attachEventHandler(`popUp${camera._id}`, 'click', () => { popUp('Please log in', 'danger') });
    attachEventHandler(`addToCart${camera._id}`, 'click', () => { addToCart(camera) });
    attachEventHandler(`editCamera${camera._id}`, 'click', () => { editCamera(camera) });
    attachEventHandler(`removeCamera${camera._id}`, 'click', () => { removeCamera(camera) });
}