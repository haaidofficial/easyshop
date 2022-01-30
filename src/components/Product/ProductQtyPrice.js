import { useSelector, useDispatch } from 'react-redux';
import { handleEcomStoreData } from '../../redux-store/actions/index';
import { updateProductToLS, checkProductExist } from '../Helper/AddToCart';


function ProductQtyPrice({ pid, actualPrice, isCartListOn }) {
    let cartItems = useSelector(state => state.userCart.cartItems);
    let dispatch = useDispatch();

    let proDeatils = { price: actualPrice, qty: 1 };

    cartItems.forEach(element => {
        if (element.pid === pid) {
            proDeatils.price = element.price;
            proDeatils.qty = element.qty;
        }
    });



    function handleClick(n) {
        let cal = 1;
        if (proDeatils.qty + n > 0) {
            cal = proDeatils.qty + n;
            proDeatils.price = parseInt(actualPrice) * cal;
        }

        dispatch(handleEcomStoreData('cartItemsUpdate', { pid, qty: cal, price: proDeatils.price }));
        updateProductToLS(pid, cal, proDeatils.price);

    }

    return (
        <>
            {
                isCartListOn ? (
                    <>
                        <div className='pro-qty'>
                            <div className='pro-qty-inner'>
                                <button onClick={() => handleClick(-1)}>-</button>
                                <div className='qty-value'>{proDeatils.qty}</div>
                                <button onClick={() => handleClick(1)}>+</button>
                            </div>
                        </div>
                    </>
                )

                    : (
                        <>
                            <div className='pro-qty'>
                                <label >Quantity</label>
                                <div className='pro-qty-inner'>
                                    <button onClick={() => handleClick(-1)}>-</button>
                                    <div className='qty-value'>{proDeatils.qty}</div>
                                    <button onClick={() => handleClick(1)}>+</button>
                                </div>
                            </div>
                            <div className='total-price'>
                                <label>Total</label>
                                <div className='total-price-inner'>Rs. {proDeatils.price}</div>
                            </div>
                        </>
                    )
            }



        </>
    );
}

export default ProductQtyPrice;