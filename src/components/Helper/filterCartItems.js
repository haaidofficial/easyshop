import { useSelector, useDispatch } from 'react-redux';
import { handleEcomStoreData } from '../../redux-store/actions/index';
import { getCart, removeItem, emptyAllCartItems } from './AddToCart';


export function useFilterCartItems() {

    let cartItems = useSelector(state => state.userCart.cartItems);
    let products = useSelector(state => state.ecommerceState.productsList);
    let catArr = [];
    if (products) catArr = Object.keys(products);


    let dispatch = useDispatch();


    function filterItemsExistOnCart() {

        if (products === null) return [];
        let cartItemsList = [];
        let temp = [];

        //
        let catArrItemTypes = Object.keys(products[catArr[0]]);

        //
        for (let i = 0; i < cartItems.length; i++) {
            temp.push(cartItems[i].pid);
        }


        //
        for (let i = 0; i < catArr.length; i++) {
            for (let j = 0; j < catArrItemTypes.length; j++) {
                products[catArr[i]][catArrItemTypes[j]].forEach(element => {
                    if (temp.includes(element.Product_ID)) {
                        cartItemsList.push(element);
                    }
                });
            }
        }


        //
        let tempArr = cartItems.map((element, i) => {
            let tempElement = {};
            cartItemsList.forEach((elementX, index) => {
                if (element.pid === elementX.Product_ID) {
                    tempElement = { ...cartItemsList[index], qty: element.qty, totalPrice: element.price };
                    return false;
                }
            });
            return tempElement;
        });



        tempArr = tempArr.sort((a, b) => {
            if (a.Description < b.Description) return -1;
            else if (a.Description > b.Description) return 1;
            else return 0
        });

        return tempArr;

    }


    function removeItemFromCart(pid) {
        removeItem(pid);
        let cart = getCart();
        dispatch(handleEcomStoreData('cartItemRemove', { pid }));
        dispatch(handleEcomStoreData('cartCount', cart.length));
    }


    function emptyCartStore() {
        emptyAllCartItems();
        let cart = getCart();
        dispatch(handleEcomStoreData('emptyAllItemsOnCart', []));
        dispatch(handleEcomStoreData('cartCount', cart.length));
    }


    return { filterItemsExistOnCart, removeItemFromCart, emptyCartStore };
}