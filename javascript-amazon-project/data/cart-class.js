class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();   
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
      
        if (!this.cartItems) {
            this.cartItems = [{
              productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              quantity: 2,
              deliveryOptionId: '1'
            }, {
              productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity: 1,
              deliveryOptionId: '2'
          }];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    }

    addToCart(productId) {
        //to add product in cart with its quantity.
        let matchingItem;
      
        this.cartItems.forEach(cartItem => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        //convert selectelement into quantity.
        const selectedQuantity = Number(document.querySelector(`.js-select-${productId}`).value);
      
        if (matchingItem) {
          matchingItem.quantity +=  selectedQuantity;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: selectedQuantity,
                deliveryOptionId: '1'
            });
        }
      
        this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];
      
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        })
        this.cartItems = newCart;
      
        this.saveToStorage();
    }

    updateCartQuantity() {
        let cartQuantity = 0;
    
        this.cartItems.forEach(cartItem => {
            cartQuantity += cartItem.quantity;
        })
        // display quantity in element.
        return cartQuantity;
    }

    updateCartItem (quantity, productId) {
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.quantity = Number(quantity);
            }
        })
        this.saveToStorage();
    }

        
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
      
        this.cartItems.forEach(cartItem => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        matchingItem.deliveryOptionId = deliveryOptionId;
      
        this.saveToStorage();
    }

}


export const cart = new Cart('cart-oop');
export const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);