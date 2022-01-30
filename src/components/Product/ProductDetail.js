import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, forwardRef } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import { addProductToCart } from '../Helper/AddToCart';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { handleEcomStoreData } from '../../redux-store/actions';
import { getCart } from '../Helper/AddToCart';
import { useAddToCart } from '../Helper/Hooks/useAddToCart';
import ProductQtyPrice from './ProductQtyPrice';
import UserWishlist from '../user/UserWishlist';




let ProductDetail = forwardRef((props, lensRef) => {
    let { state } = useLocation();
    let [mainPhotoIndex, setMainPhotoIndex] = useState(0);
    let { _addProductToCart } = useAddToCart();
    let actualImage = useRef();
    let zoomPreview = useRef();
    let cartItems = useSelector(state => state.userCart.cartItems);

    let dispatch = useDispatch();


    let productDetail = state ? state.productDetail : null;

    // let sortedItem = cartItems.filter(element => {
    //     if (productDetail) {
    //         return element.pid === productDetail.Product_ID;
    //     }
    // });


    // let _addProductToCart = (productDetail) => {
    //     // console.log(sortedItem);
    //     let pid = productDetail.Product_ID;
    //     let price = parseInt(productDetail.Price.trim());
    //     let qty = 1;

    //     // if (sortedItem.length) {
    //     //     price = sortedItem[0].price;
    //     //     qty = sortedItem[0].qty;
    //     // }

    //     let value = addProductToCart(pid, price, qty);
    //     if (value !== false) {
    //         dispatch(handleEcomStoreData('cartItems', [{ pid, qty, price }]));
    //         dispatch(handleEcomStoreData('cartCount', getCart().length));
    //         return;
    //     }

    //     alert('Product already exist');
    // }

    return productDetail && (
        <>
            <div className='product-container' >
                <div className='product-wrapper'>
                    <div className='p-detail-photo'>
                        <div className='p-detail-photo-left'>
                            {
                                productDetail.Images.map((element, index) => {
                                    return <div className={index == mainPhotoIndex ? 'p-photo-tab p-active' : 'p-photo-tab'} key={index} onMouseOver={() => setMainPhotoIndex(index)}>
                                        <img src={element} />
                                    </div>
                                })
                            }

                        </div>
                        <div className='p-detail-photo-right'>
                            <div className='product-photo-zoom'>
                                <InnerImageZoom src={productDetail.Images[mainPhotoIndex]} zoomSrc={productDetail.Images[mainPhotoIndex]} />

                            </div>

                        </div>
                    </div>
                    <div className='p-detail-desc'>
                        <div className='wishlist-element'>
                            <UserWishlist element={productDetail} />
                        </div>
                        <div className='pro-desc-top'>
                            <h5 className='brand-name-text'>{productDetail.Brand}</h5>
                            <h4 className='pro-desc-text'>{productDetail.Description}</h4>
                            <small>{productDetail.Search_Keywords}</small>
                        </div>
                        <div className='pro-desc-bottom'>
                            <h3 className='pro-price-text'>₹{productDetail.Price.trim()}</h3>
                            <ProductQtyPrice pid={productDetail.Product_ID} actualPrice={productDetail.Price.trim()} isCartListOn={false} />

                            <div className="pro-btn-section">
                                <div className='btn-wrapper btn-crt'>
                                    <button onClick={() => _addProductToCart(productDetail)}>Add to cart</button>
                                </div>
                                {/* <div className='btn-wrapper buy-now'>
                                    <button>Buy now</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
});

export default ProductDetail;