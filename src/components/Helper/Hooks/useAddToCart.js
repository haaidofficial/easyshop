import { useSelector, useDispatch } from 'react-redux';
import { handleEcomStoreData } from '../../../redux-store/actions';
import { addProductToCart, getCart } from '../AddToCart';


export function useAddToCart(productDetail) {
    let cartItems = useSelector(state => state.userCart.cartItems);
    let dispatch = useDispatch();

    let _addProductToCart = (productDetail) => {
        let pid = productDetail.Product_ID;
        let price = parseInt(productDetail.Price.trim());
        let qty = 1;

        let value = addProductToCart(pid, price, qty);
        if (value !== false) {
            dispatch(handleEcomStoreData('cartItems', [{ pid, qty, price }]));
            dispatch(handleEcomStoreData('cartCount', getCart().length));
            return;
        }

        alert('Product already exist');
        return 'product-already-exist';
    }


    return { _addProductToCart, cartItems };

}