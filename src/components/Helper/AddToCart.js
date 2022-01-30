// Add item to cart
export let addProductToCart = (pid, price, qty) => {
    let cart = [];

    if (localStorage.getItem('easyshop_cart')) cart = JSON.parse(localStorage.getItem('easyshop_cart'));

    if (checkProductExist(pid, cart)) {
        return false;
    }

    cart.push({ pid, price, qty, });
    localStorage.setItem('easyshop_cart', JSON.stringify(cart));

    return cart.length;
}


// Check if a particular cart already exists inside the cart
export function checkProductExist(pid, cart) {

    let tempArr = [];
    for (let i = 0; i < cart.length; i++) {
        tempArr.push(cart[i].pid);
    }
    return tempArr.includes(pid);

}


// To get all cart items if exists
export let getCart = () => {
    if (localStorage.getItem('easyshop_cart')) return JSON.parse(localStorage.getItem('easyshop_cart'));
    else return [];
}



// To update cart
export function updateProductToLS(pid, qty = null, price = null,) {  // LS means localStorage
    let cart = getCart();

    if (checkProductExist(pid, cart)) {
        let tempArr = cart.filter(element => {
            return element.pid !== pid;
        });

        if (qty !== null && price !== null) tempArr.push({ pid, qty, price });


        // tempArr = tempArr.sort((a, b) => {
        //     if (a.pid < b.pid) return -1;
        //     else if (a.pid > b.pid) return 1;
        //     else return 0
        // });
        // console.log(tempArr);


        localStorage.setItem('easyshop_cart', JSON.stringify(tempArr));
    }
}



// To remove a particular item from the cart

export function removeItem(pid) {
    if (checkProductExist(pid, getCart())) {
        updateProductToLS(pid);
    }
}


export function emptyAllCartItems() {
    if (localStorage.getItem('easyshop_cart')) {
        localStorage.setItem('easyshop_cart', JSON.stringify([]));
    }
}