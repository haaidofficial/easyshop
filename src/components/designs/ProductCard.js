import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAddToCart } from '../Helper/Hooks/useAddToCart';
import cartIcon1 from '../../assets/icons/bag.png';
import cartIcon2 from '../../assets/icons/bag(2).png';
import UserWishlist from '../user/UserWishlist';



function ProductCard({ productDetail }) {

    let [activeCart, setActiveCart] = useState(false);
    let { _addProductToCart, cartItems } = useAddToCart();

    useEffect(() => {
        let temp = cartItems.filter(element => element.pid === productDetail.Product_ID);
        if (temp.length) setActiveCart(true);
        else setActiveCart(false);

    }, [cartItems]);


    return (
        <>
            <Link to='/product' state={{ productDetail: productDetail }}>
                <div className="product-card">
                    <div className="product-image">
                        <img src={productDetail.Images[0]} />
                        {/* <div className="cart-placeholder" onClick={e => e.preventDefault()}>
                            <img src={cartIcon1} alt='like-icon' onClick={() => _addProductToCart(productDetail)} />
                        </div> */}
                        <div className="wishlist-placeholder" onClick={e => e.preventDefault()}>
                            <div className="cart">
                                <img src={activeCart ? cartIcon2 : cartIcon1} alt='like-icon' onClick={() => _addProductToCart(productDetail)} />
                            </div>
                            <UserWishlist element={productDetail} />
                        </div>
                    </div>
                    <div className="product-detail">
                        <div className="pd-body">
                            <div className="pd-text">
                                <h4>{productDetail.Brand}</h4>
                            </div>
                            <div className="pd-text">
                                <p>{productDetail.Description}</p>
                            </div>
                        </div>
                        <div className="pd-footer">
                            <div className="pd-text">
                                <p>Rs. {parseInt(productDetail.Price)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}


export default ProductCard;