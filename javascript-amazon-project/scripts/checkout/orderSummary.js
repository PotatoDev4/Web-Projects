import {cart, removeFromCart, updateCartQuantity, updateCartItem, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


//function that generates html for checkout
export function renderCheckout() {
    let cartSummaryHtml = '';
    
    if (cart.length > 0) {
        cart.forEach((cartItem) => {
        
            const productId = cartItem.productId;

            const matchingProduct = getProduct(productId);
        

            const deliveryOptionId = cartItem.deliveryOptionId;
            const deliveryOption = getDeliveryOption(deliveryOptionId);

            //using day js external library
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
            const dateString = deliveryDate.format('dddd, MMMM D');
        
            cartSummaryHtml += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id} ">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>
        
                <div class="cart-item-details-grid">
                        <img class="product-image" src="${matchingProduct.image}">
        
                        <div class="cart-item-details">
                            <div class="product-name">
                                ${matchingProduct.name}
                            </div>
                            <div class="product-price">
                                ${matchingProduct.getPrice()}
                            </div>
                            <div class="product-quantity">
                                <span>
                                    Quantity: <span class="quantity-label select-${matchingProduct.id} display-element">${cartItem.quantity}</span>
                                </span>
                            <span class="update-quantity-link link-primary js-update-product select-${matchingProduct.id} display-element" data-product-id="${matchingProduct.id}">
                                Update
                            </span>
                            <div class="update-quantity-container-${productId} hidden-element">
                                <input class="quantity-input quantity-input${matchingProduct.id}" type="number" min="1" max="10" value="1">
                                <span class="link-primary js-save-quantity-${matchingProduct.id}">save</span>
                            </div>
                            <span class="delete-quantity-link link-primary js-delete-link select-${matchingProduct.id} display-element" data-product-id="${matchingProduct.id}">
                                Delete
                            </span>
                        </div>
                    </div>
        
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHtml(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
            `;
        })
    } else {
        cartSummaryHtml = `<div class="js-cart-summary cart-summary">
            <h2>Your Cart is empty.</h2>
            <a href="amazon.html" class="view-products-btn button-primary"> View products </a>
        </div>`
    }
    function deliveryOptionsHtml (matchingProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
            const dateString = deliveryDate.format('dddd, MMMM D');
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            const priceString = deliveryOption.priceCents == 0
            ? 'FREE' 
            : `$${formatCurrency(deliveryOption.priceCents)} -`;
            html += `
            <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
            `
        })
        return html;
    }
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;
    document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();


//delete product
    document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            const productId = deleteLink.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            renderCheckout();
            document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();
        })
    })

//for delivery options
    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderCheckout();
        })
    })

//update quantity
    document.querySelectorAll(`.js-update-product`).forEach((updateLink) => {
        updateLink.addEventListener('click', () => {
            const productId = updateLink.dataset.productId;

            document.body.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    updateCartItem(document.querySelector(`.quantity-input${productId}`).value, productId);
                    renderCheckout();
                }
            });
            
            document.querySelectorAll(`.select-${productId}`).forEach((displayElem) => {displayElem.classList.replace('display-element','hidden-element')});
            document.querySelector(`.update-quantity-container-${productId}`).classList.replace('hidden-element','display-element');
            document.querySelectorAll(`.js-save-quantity-${productId}`).forEach((saveLink) => {
                saveLink.addEventListener('click', () => {
                    let inputElem = document.querySelector(`.quantity-input${productId}`);
                    updateCartItem(inputElem.value, productId);
                    
                    document.querySelector(`.update-quantity-container-${productId}`).classList.remove('display-element');
                    document.querySelectorAll('.display-element').forEach((displayElem) => {displayElem.classList.remove('hidden-element')});
                    renderCheckout();
                })
            })
        })
    }) 
    renderPaymentSummary();
}

