import { renderCalcCount, updateCartInDB } from "../cartAPI/cart.js";
import { attachEventHandler, backURL, getUser, setUser } from "../config.js";
import { dropDownClose } from "../modals/main.js";
import { orderModal } from "../modals/orderModal.js";
import { hidePagination } from "../pagination.js";
import { popUp } from "../popup.js";
import { getAndShowAllCamers } from "../cameraAPI/camers.js";
import { orderCardRender } from "./orderCard.js";


export const createOrder = async () => {
    try {
        const recipientName = document.forms['orderForm'].elements.recipientName.value;
        const deliveryAddress = document.forms['orderForm'].elements.deliveryAddress.value; 
        const user = getUser();
        const requestPayload = {
            userId: user._id,
            cart: user.cart,
            name: recipientName,
            address: deliveryAddress
        }
        await fetch(`${backURL}/order/create`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',   
            },
            body: JSON.stringify(requestPayload)
        })
        .then( response => response.json())
        .then( data => {
                orderModal.close();
                document.forms['orderForm'].reset();
                const user = getUser();
                user.cart = [];
                setUser(user);
                renderCalcCount();
                updateCartInDB(user);
                console.log(data.msg);
                popUp(data.msg, 'success')})
        .then ( renderOrders() )
        .catch( err => {
            console.error('Order createin error: ', err);
        });

    } catch (error) {
        console.error(error);
    }
}

export const renderOrders = async () => {
    dropDownClose();
    hidePagination();

    const btnContainer = document.querySelector(".btn-container");
    btnContainer.innerHTML = ``;
    
    try {
    const user = getUser();
    
        await fetch(`${backURL}/order/${user._id}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        .then( response => response.json())
        .then( orders => {
            const dataContainer = document.querySelector(".data-container");
            dataContainer.innerHTML = "";                  
            const orderContainer = document.createElement('div');
            orderContainer.classList.add(`order-container`);
            dataContainer.appendChild(orderContainer);

            if (orders.length) {
                orders.forEach(order => {
                    orderCardRender(order);
                });
            }
            else {
                dataContainer.innerHTML = `<div class="empy-errors">
                    <div class="empy-errors-item">No orders found yet. </div>
                    <div class="empy-errors-item">Visit the store and buy some camers.</div>
                    <button class="btn btn-secondary" id="emptyOrderBtn" >Go shopping ...</button>
                </div>`;
                attachEventHandler('emptyOrderBtn', 'click', () => { getAndShowAllCamers() })
            }
        })
        .catch( err => {
            console.error('Order render error: ', err);
        });
    } catch (error) {
        console.error(error);
    }
}