let ecommerceInitialState = {
    categoriesList: null,
    productsList: null,
}

export function ecommerceState(state = ecommerceInitialState, action) {
    switch (action.type) {
        case 'categoriesList':
            return {
                ...state,
                categoriesList: action.payload
            };

        case 'productsList':
            return {
                ...state,
                productsList: action.payload
            };
        default:
            return state;
    }

}



/*
 * END------------------------------------------------------------*/



let userCartIS = {
    cartCount: 0,
    cartItems: []
}


export function userCart(state = userCartIS, action) {
    switch (action.type) {
        case 'cartItems':
            let temp = [];
            let tempData = [];


            [...state.cartItems, ...action.payload].forEach(element => {
                if (!temp.includes(element.pid)) {
                    temp.push(element.pid);
                    tempData.push(element);
                }
            });


            return { ...state, cartItems: tempData };
        case 'cartItemsUpdate':

            let tempArr = state.cartItems.filter(cartItem => {
                return cartItem.pid !== action.payload.pid;
            });


            tempArr.push(action.payload);

            return { ...state, cartItems: tempArr };

        case 'cartCount':
            return { ...state, cartCount: action.payload };

        case 'cartItemRemove':
            let arr = state.cartItems.filter(cartItem => {
                return cartItem.pid !== action.payload.pid;
            });


            return { ...state, cartItems: arr };
        case 'emptyAllItemsOnCart':
            return {
                cartCount: 0,
                cartItems: action.payload
            };

        default:

            return { ...state, cartItems: state.cartItems };
    }
}



let userWishLists = {
    count: 0
};

export function userWishListsState(state = userWishLists, action) {

    switch (action.type) {
        case 'userWishListsCount':
            return {
                ...state,
                count: action.payload
            };

        default:
            return state;
    }

}