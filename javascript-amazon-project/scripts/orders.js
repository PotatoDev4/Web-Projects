import { orders, buyAgain } from "../data/orders.js";
import { getProduct, loadProduct, products } from "../data/products.js";
import { updateCartQuantity, loadCart } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


loadProduct(() => {
  renderOrders();
});

function generateProduct(order, orderProducts) {
  let productDetailsHtml = '';
  orderProducts.forEach(product => {
    const matchingProduct = getProduct(product.productId);
    productDetailsHtml += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>

        <div class="product-delivery-date">
          Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
        </div>

        <div class="product-quantity">
          Quantity: ${product.quantity}
        </div>

        <button class="js-buy-again-button js-buy-again-button-${matchingProduct.id} buy-again-button button-primary" data-product-id=${matchingProduct.id}>

          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>

          <span class="buy-again-success">
            ✓ Added
          </span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
          <button class="js-track-package-button track-package-button button-secondary">
            Track package
            </button>
        </a>
      </div>
    `
  });
  return productDetailsHtml;
}


function renderOrders() {
  let ordersHtml = '';

  orders.forEach(order => {
      ordersHtml += `
      <div class="order-container">
        <header class="order-header">
          <section class="left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dayjs(order.orderTime).format('MMMM D')}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </section>

          <section class="right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </section>
        </header>

        <div class="order-details-grid">
          ${generateProduct(order, order.products)}
        </div>
      </div>
      `
  });
  document.querySelector('.js-order-grid').innerHTML = ordersHtml;

  document.querySelectorAll('.js-buy-again-button').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      document.querySelectorAll(`.js-buy-again-button-${productId}`).forEach(button => {
        button.children[0].classList.add('hide-element');
        button.children[1].classList.add('hide-element');
        button.children[2].classList.add('display-element');
      })
      setTimeout(() => {
        document.querySelectorAll(`.js-buy-again-button-${productId}`).forEach(button => {
          button.children[0].classList.remove('hide-element');
          button.children[1].classList.remove('hide-element');
          button.children[2].classList.remove('display-element');
        })
      }, 1.5 * 1000)
    })
  })

  loadCart(() => {
    document.querySelectorAll('.js-buy-again-button').forEach(button => {
      const productId = button.dataset.productId;
      button.addEventListener('click', ()=>{
        buyAgain(productId, 1)
        document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();
      });
    });
    document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();
  })
}