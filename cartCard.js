import { attachEventHandler, getUser, setUser } from "../config.js";
import { confirmModal, waitForRemoveButtonPress } from "../modals/confirmationModal.js";
import { navbarRender } from "../navbar.js";
import { cartRender, updateCartInDB } from "./cart.js";

export const cartCardRender = (item, index) => {
    const cartContainer = document.querySelector('.cart-container');
    const cartCard = document.createElement('div');
    cartCard.classList.add('cart-card');
    cartCard.innerHTML = `  <div class="cart-remove-btn" id="removeCartItem${item.camera._id}">&times</div>
                            
                            <div class="cart-img-container">
                                <div class="cart-camera-brand">
                                    <div class="cart-camera-brand-text">${item.camera.brand.name}</div>
                                </div>
                                <div> <img src='${item.camera.image}' class="cart-camera-img"> </div>
                            </div>

                            <div class="cart-camera-info">
                                <div class="cart-camera-name">${item.camera.name}</div>
                                <div class="cart-camera-type">${item.camera.type}</div>
                                <div class="cart-camera-display">${item.camera.display} ml</div>
                                <div class="cart-camera-video">${item.camera.video} ml</div>
                                <div class="cart-camera-weight">${item.camera.weight} ml</div>
                                <div class="cart-camera-price">${item.camera.price} &#x20b4 / pc</div>
                            </div>
                            <div class="cart-manage-btns">
                                <button class="cart-manage-button" id="decreaseCartItemCount${item.camera._id}">-</button>
                                <div class="cart-current-item-count">${item.count}</div>
                                <button class="cart-manage-button" id="increaseCartItemCount${item.camera._id}">+</button>
                            </div>
                            <div class="cart-item-price">${item.count*item.camera.price} &#x20b4
                            </div>`;
    cartContainer.appendChild(cartCard);

    attachEventHandler(`removeCartItem${item.camera._id}`, 'click', () => { removeCartItem(item, index) });
    attachEventHandler(`decreaseCartItemCount${item.camera._id}`, 'click', () => { decreaseCartItemCount(item, index) });
    attachEventHandler(`increaseCartItemCount${item.camera._id}`, 'click', () => { increaseCartItemCount( index) });
}

const removeCartItem = async (item, index) =>  {
    return new Promise(async (resolve, reject) => {
        try {
            const msg = document.getElementsByClassName('confirmation-message')[0];
            msg.innerHTML = `Are you sure you want to remove camera <b>${item.camera.name}</b> from the cart? </br>`
            confirmModal.open();
            await waitForRemoveButtonPress();
            confirmModal.close();
            const user = getUser();
            user.cart.splice(index, 1);
            setUser(user);
            await refreshCart();
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

const increaseCartItemCount = async (index) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = getUser();
            user.cart[index].count += 1;
            setUser(user);
            await refreshCart();
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

const decreaseCartItemCount = async (item, index) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = getUser();
            let count = user.cart[index].count;
            count -= 1;
            if (count === 0) {
                removeCartItem(item, index)
            } else {
                user.cart[index].count -= 1;
                setUser(user);
                await refreshCart();
            }
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

export const refreshCart = async () => {
    navbarRender(getUser());
    cartRender();
    await updateCartInDB(getUser());
}