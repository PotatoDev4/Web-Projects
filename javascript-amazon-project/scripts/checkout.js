import { renderCheckout } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProduct, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/backend-practice.js";
// import '../data/cart-class.js';

async function loadPage() {
    // throw 'error1'

    try {
            await loadProductsFetch();
        
            const value = await new Promise((resolve, reject) => {
                //throw 'error2'
                loadCart(() => {
                    // reject('error3');
                    resolve();
                });
            });
    } catch (error) {
        console.log('Not responding try again!');
    }

    renderCheckout();
    renderPaymentSummary();
}
loadPage()
/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then((values) => {
    console.log(values)
    renderCheckout();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProduct(() => {
        resolve('loadproduct finished');
    });
}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderCheckout();
    renderPaymentSummary();
})
*/

/*
loadProduct(() => {
    loadCart(() => {
        renderCheckout();
        renderPaymentSummary();
    })
})
*/