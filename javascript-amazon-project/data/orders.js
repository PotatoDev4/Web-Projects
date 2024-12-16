import { addToCart } from "./cart.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveTOStorage();
}

function saveTOStorage() {
    localStorage.setItem('orders', JSON.stringify(orders))
}

export function buyAgain(productId) {
    addToCart(productId, 1);
}