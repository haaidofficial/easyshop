import { useEffect, useState } from 'react';
import { getUsersOrder } from '../../api/Firebase';
import { useUserAuthContext } from '../../contexts/AuthProvider';
import emptyBoxIcon from '../../assets/icons/empty-box.png';


function UserOrder() {

    let { user } = useUserAuthContext();
    let [list, setList] = useState([]);

    useEffect(() => {
        let { onValue, dbRef } = getUsersOrder();

        onValue(dbRef, (snapshot) => {

            let obj = snapshot.val();

            let temp = [];
            for (let k in obj) {
                obj[k].forEach(element => {
                    if (element.emailId === user.email) {
                        temp.push({ orderId: k, ...element });
                    }
                });
            }

            setList(temp);
        })
    }, []);


    return (
        <>
            <div className='wishList-preview-container order-container'>
                <div className='wishList'>
                    <div className='order-header'>
                        <h5>Order Summary</h5>
                    </div>
                    <div className='list-item-table'>
                        <table>
                            {
                                list.length !== 0 && <thead>
                                    <tr>
                                        <th>Products</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Order ID</th>
                                        <th>Order Date</th>
                                        <th>Order Status</th>
                                        <th>Payment Status</th>
                                    </tr>
                                </thead>
                            }


                            <tbody>
                                {
                                    list.map((element, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td className='table-image'>
                                                        <img src={element.prodcuts.Images} width='100' height='100' alt='product-item-image' />

                                                    </td>
                                                    <td className='table-item-desc'>
                                                        <div>
                                                            <span>{element.prodcuts.Brand}</span>
                                                            <span>{element.prodcuts.Description}</span>
                                                            <span>{element.prodcuts.Search_Keywords}</span>
                                                        </div>
                                                    </td>
                                                    <td className='table-item-dynamic-qty'>
                                                        <span>{element.prodcuts.qty}</span>
                                                    </td>
                                                    <td className='table-item-price'>
                                                        <span>Rs. {element.prodcuts.Price}</span>
                                                    </td>
                                                    <td className='table-item-price order-ID'>
                                                        <span>{element.orderId}</span>
                                                    </td>
                                                    <td className='table-item-price'>
                                                        <span>{element.orderDate}</span>
                                                    </td>
                                                    <td className='table-item-price'>
                                                        <span>{element.orderStatus.toUpperCase()}</span>
                                                    </td>
                                                    <td className='table-item-price'>
                                                        <span>{element.paymentStatus.toUpperCase()}</span>
                                                    </td>

                                                </tr>
                                            </>
                                        )
                                    })
                                }

                            </tbody>
                        </table>

                        {
                            !list.length && <div className='cart-empty-image'>
                                <img src={emptyBoxIcon} alt='empty-box-icon' />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}


export default UserOrder;