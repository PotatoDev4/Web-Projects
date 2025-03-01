import { cart, updateCartQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
    let totalPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const matchingProduct = getProduct(cartItem.productId);
        totalPriceCents += (matchingProduct.priceCents * cartItem.quantity);

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;    
    })

    const totalBeforeTax = totalPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;

    //generating html for payment summary
    let paymentSummaryHTML = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${updateCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
        Place your order
        </button>
    `
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order').addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            });
            const order = await response.json();
            addOrder(order);
        } catch (error) {
            console.log('unexpected error, try again later');
        }
        location.href = 'orders.html';
        localStorage.removeItem('cart');
    });
}