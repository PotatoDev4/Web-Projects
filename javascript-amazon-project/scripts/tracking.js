import { orders } from "../data/orders.js";
import { getProduct, loadProduct, products } from "../data/products.js";
import { updateCartQuantity } from "../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
let trackingOrder;
let orderProduct;

orders.forEach(order => {
    if (order.id === orderId) {
        trackingOrder = order
    }
});

trackingOrder.products.forEach(product => {
    if (product.productId === productId) {
        orderProduct = product;
    }
});

loadProduct(() => {
    const matchingProduct = getProduct(productId);
    renderTrackingOrder(matchingProduct);
});

function renderTrackingOrder(product) {
    let orderTrackingHtml = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
            Arriving on ${dayjs(orderProduct.estimatedDeliveryTime).format('dddd, MMMM D')}
            </div>

            <div class="product-info">
            ${product.name}
            </div>

            <div class="product-info">
            Quantity: ${orderProduct.quantity}
            </div>

            <img class="product-image" src="${product.image}">

            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
            <div class="progress-bar"></div>
            </div>
        </div>
    `;
    document.querySelector('.js-order-tracking').innerHTML = orderTrackingHtml;
    
    function trackingProgress() {
        const dayscount = dayjs().format('D');
        const totaldays = dayjs(orderProduct.estimatedDeliveryTime).format('D');
        let progressCount = (dayscount / totaldays) * 100;
        console.log((dayscount / totaldays) * 100);
        return progressCount;
    }

    document.querySelector('.progress-bar').style.width = trackingProgress() + '%';
}
document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();