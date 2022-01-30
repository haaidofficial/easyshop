import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useWishListContext } from '../../contexts/WishListProvider';
import emptyBoxIcon from '../../assets/icons/empty-box.png';
import trashIcon from '../../assets/icons/trash.png';
//------------
import { getUsersWishList, removeUserWishlistItem } from '../../api/Firebase/index';
import { useAddToCart } from '../Helper/Hooks/useAddToCart';
//------------

function WishList() {
    let { mappedWishList, deleteWishListHandler } = useWishListContext();
    let { _addProductToCart } = useAddToCart();

    useEffect(() => {

        //setList(getUsersWishList(userEmail, getCount = false));

    }, []);



    function moveToCart(product, id) {
        if (_addProductToCart(product) === 'product-already-exist') return;
        removeUserWishlistItem(id);
        deleteWishListHandler(id);

    }

    return (
        <>
            <div className='wishList-preview-container' >
                <div className='wishList'>
                    <div className='list-item-table'>
                        <table>
                            {
                                mappedWishList.length !== 0 && <thead>
                                    <tr>
                                        <th>Products</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Add to Cart</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                            }


                            <tbody>
                                {
                                    mappedWishList.map((element, index) => {

                                        console.log(element);
                                        return (
                                            <>
                                                <tr>
                                                    <td className='table-image'>
                                                        <Link to='/product' state={{ productDetail: element }} >
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
                                                    <td className='table-item-add-to-cart'>
                                                        <div className='tbl-btn-wrapper'>
                                                            <button onClick={() => moveToCart(element, element.id)}>Move to Cart</button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className='table-item-remove'>
                                                            <img src={trashIcon} width='25' height='25' alt='trash-icon' onClick={() => {
                                                                removeUserWishlistItem(element.id);
                                                                deleteWishListHandler(element.id);
                                                            }} />
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
                            !mappedWishList.length && <div className='cart-empty-image'>
                                <img src={emptyBoxIcon} alt='empty-box-icon' />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}


export default WishList;