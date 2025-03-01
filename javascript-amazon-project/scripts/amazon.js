//let productList = JSON.parse(localStorage.getItem('productList'));
import {cart, addToCart, updateCartQuantity} from '../data/cart.js';
import {products, loadProduct} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import { searchBar, checkInList } from './utils/search-bar.js';


function getSearchedProducts() {
  const searchUrl = new URL(window.location.href);
  const search = searchUrl.searchParams.get('search');
  const searchValue = String(search).toLowerCase()

  if (search) {
    const searchedProducts = checkInList(products, search)
    return searchedProducts
  } else {
    return false
  }
}

loadProduct(() => {
  renderPage();
  searchBar(products);
});

document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();

function renderPage() {
    const searchedProducts = getSearchedProducts()

    if (searchedProducts.length > 0) {
      renderProducts(searchedProducts)
    } else if (searchedProducts) {
      document.querySelector('.js-product-grid').innerHTML = '<p>No search products found</p>';
    } else {
      renderProducts(products)
    }

    document.querySelectorAll('.js-add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId, Number(document.querySelector(`.js-select-${productId}`).value));
        document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
    
    //added to cart element appears
        const addedToCartElem = document.querySelector(`.js-added-to-cart-${productId}`);
        addedToCartElem.classList.add('opacity1');
    //added to cart element disappears
        const mytimeout = setTimeout(() => {addedToCartElem.classList.remove('opacity1')}, 3000);
      });
    });
}

function renderProducts(products) {
  let productsHTML = '';
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-select-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHtml()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`
  }
  document.querySelector('.js-product-grid').innerHTML = productsHTML;
}