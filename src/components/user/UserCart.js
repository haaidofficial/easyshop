import { Link } from 'react-router-dom';
import { useFilterCartItems } from '../Helper/filterCartItems';
import ProductQtyPrice from '../Product/ProductQtyPrice';
import closeIcon from '../../assets/icons/close2.png';
import trashIcon from '../../assets/icons/trash.png';
import emptyBoxIcon from '../../assets/icons/empty-box.png';
import CheckoutButton from './CheckoutButton';


function UserCart({ setShowCartListPreview, products, catArr }) {

    let { filterItemsExistOnCart, removeItemFromCart } = useFilterCartItems();

    return (
        <>
            <div className='cartlist-preview-container' >
                <div className='cartlist-preview'>
                    <span className="clpr-close" onClick={() => setShowCartListPreview(false)}>
                        <img src={closeIcon} alt='close-icon' />
                    </span>
                    <div className='cartlist'>
                        <CheckoutButton>
                            {setShowCartListPreview}
                        </CheckoutButton>
                        <div className='list-item-table'>
                            <table>

                                <thead>
                                    <tr>
                                        <th>Products</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        filterItemsExistOnCart().map((element, index) => {
                                            return (
                                                <>
                                                    <tr key={index}>
                                                        <td className='table-image'>
                                                            <Link to='/product' state={{ productDetail: element }} onClick={() => setShowCartListPreview(false)}>
                                                                <img src={element.Images[0]} width='100' height='100' alt='product-item-image' />
                                                            </Link>

                                                        </td>
                                                        <td className='table-item-desc'>
                                                            <div>
                                                                <span>{element.Brand}</span>
                                                                <span>{element.Description}</span>
                                                                <span>{element.Search_Keywords}</span>
                                                            </div>
                                                        </td>
                                                        <td className='table-item-price'>
                                                            <span>Rs. {element.Price.trim()}</span>
                                                        </td>
                                                        <td className='table-item-dynamic-qty'>
                                                            <ProductQtyPrice pid={element.Product_ID} actualPrice={element.Price.trim()} isCartListOn={true} />
                                                        </td>
                                                        <td className='table-item-price'>
                                                            <span>Rs. {element.totalPrice}</span>
                                                        </td>
                                                        <td>
                                                            <span className='table-item-remove'>
                                                                <img src={trashIcon} width='25' height='25' alt='trash-icon' onClick={() => removeItemFromCart(element.Product_ID)} />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>

                            {
                                !filterItemsExistOnCart().length && <div className='cart-empty-image'>
                                    <img src={emptyBoxIcon} alt='empty-box-icon' />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default UserCart;