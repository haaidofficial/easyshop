import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../Helper/AddToCart';
import { handleEcomStoreData } from '../../redux-store/actions/index';


let Cart = () => {

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleEcomStoreData('cartItems', getCart()));
        dispatch(handleEcomStoreData('cartCount', getCart().length));
    }, []);

    let cartCount = useSelector(state => state.userCart.cartCount);


    return <span className='cart-count'>{cartCount}</span>;
}

export default Cart;