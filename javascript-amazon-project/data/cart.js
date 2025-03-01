export let cart;

loadFromStorage();

function loadFromStorage () {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [];
  }
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}


export function addToCart(productId, selectedQuantity) {
  //to add product in cart with its quantity.
  let matchingItem;

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

//convert selectelement into quantity.

  if (matchingItem) {
    matchingItem.quantity +=  selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}


export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  cart = newCart;

  saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach(product => {
    cartQuantity += product.quantity;
  })

// display quantity countin element.
  return cartQuantity;
}

export function updateCartItem (quantity, productId) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = Number(quantity);
    }
  })
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}


export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();

}