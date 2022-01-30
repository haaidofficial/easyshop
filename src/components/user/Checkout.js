import { useEffect, useState } from "react";
import { useFilterCartItems } from '../Helper/filterCartItems';
import { getCart } from '../Helper/AddToCart';
import { useUserAuthContext } from '../../contexts/AuthProvider';
import { writeOrders } from '../../api/Firebase';
import trashIcon from '../../assets/icons/trash.png';
import emptyBoxIcon from '../../assets/icons/empty-box.png';



function Checkout() {

    let [totalPrice, setTotalPrice] = useState(0);
    let [homeAddress, setHomeAddress] = useState('');
    let [city, setCity] = useState('');
    let [zipcode, setZipcode] = useState('');
    let { filterItemsExistOnCart, removeItemFromCart, emptyCartStore } = useFilterCartItems();
    let cartItems = filterItemsExistOnCart();
    let { user } = useUserAuthContext();


    useEffect(() => {

        getPrice();

    }, []);


    useEffect(() => {

        getPrice();

    }, [cartItems]);

    function getPrice() {
        let total = 0;
        filterItemsExistOnCart().forEach(element => {
            total += parseInt(element.totalPrice);
        });


        setTotalPrice(total);
    }


    function productsWithSingleImage(email, paymentStatus, orderStatus, price) {
        let arr = [];
        for (let i = 0; i < cartItems.length; i++) {
            let obj = {};
            for (let key in cartItems[i]) {
                let val = cartItems[i][key];
                if (key === 'Images') {
                    val = cartItems[i][key][0];
                }
                obj[key] = val;
            }
            arr.push({ emailId: email, prodcuts: obj, totalPrice: price, orderDate: new Date().toLocaleDateString(), address: { homeAddress, city, zipcode }, paymentStatus, orderStatus });
        }
        return arr;
    }


    async function displayRazorpay() {

        if (!getCart().length) {
            alert('Your cart is empty');
            return;
        }

        if (homeAddress === '' || city === '' || zipcode === '') {
            alert('Please fill the shipping details');
            return;
        }

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        const data = await fetch('https://easyshop-razorpay.herokuapp.com/razorpay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ amount: totalPrice })
        }).then((t) =>
            t.json()
        )
            .catch((error) => {
                console.error('Error:', error);
            });



        const options = {
            key: 'rzp_test_T7f3vpA5Ct9fjL',
            currency: 'INR',
            amount: data.amount.toString(),
            order_id: data.id,
            name: 'EasyShop',
            description: 'Thanks for your shopping.',
            // image: 'http://localhost:1337/logo.svg',
            handler: function (response) {
                alert(response.razorpay_payment_id)
                alert(response.razorpay_order_id)
                alert(response.razorpay_signature)
                // Push to firebase (order details)
                writeOrders(response.razorpay_order_id, productsWithSingleImage(user.email, 'successfull', 'pending', data.amount / 100));

                emptyCartStore();
            },
            // prefill: {
            //     name: 'Haaid',
            //     email: 'haaid@gmail.com',
            //     phone_number: '9899999999'
            // }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }



    return (
        <>
            <div className="checkout-container">
                <div className="checkout-wrapper">
                    <div className="checkout-left">
                        <div className="user-info">
                            <div className="user-info-header">
                                <h5>Shipping Information</h5>
                            </div>
                            <div className="user-info-form">
                                <form>
                                    <div className="uiform-row">
                                        <input type='text' placeholder="House Address" onChange={(e) => setHomeAddress(e.target.value)} />
                                    </div>
                                    <div className="uiform-row">
                                        <input type='text' placeholder="City/State" onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                    <div className="uiform-row">
                                        <input type='text' placeholder="Post Code/Zip" onChange={(e) => setZipcode(e.target.value)} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="payment-info">
                            <div className="payment-info-header">

                            </div>
                            <div className="payment-info-form">
                            </div>
                        </div>
                    </div>
                    <div className="checkout-right">
                        <div className="checkout-orders">
                            <div className="ckt-o-header">
                                <h4>ORDER SUMMARY</h4>
                                <div className="ckt-divider"></div>
                            </div>
                            <div className="ckt-o-body">
                                {
                                    cartItems.length ? cartItems.map((element, index) => {
                                        return <div className="ckt-o-row" key={index}>
                                            <div className="ckt-order-detail-left">
                                                <div className="order-d-l-img">
                                                    <img src={element.Images[0]} alt="order-product-image" />
                                                </div>
                                            </div>
                                            <div className="ckt-order-detail-right">
                                                <div className="order-d-r-desc">
                                                    <p>{element.Description}</p>
                                                </div>
                                                <div className="order-d-r-remove-icon">
                                                    <img src={trashIcon} width={20} height={20} alt="remove-icon" onClick={() => {
                                                        removeItemFromCart(element.Product_ID);
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                    })
                                        :
                                        <div className="order-d-r-empty-icon">
                                            <img src={emptyBoxIcon} alt='empty-icon' />
                                        </div>
                                }

                            </div>
                            <div className="ckt-divider divider-space"></div>
                            <div className="ckt-order-total">
                                <div className="ckt-order-total-wrapper">
                                    <div className="ot-left">
                                        <h5>ORDER TOTAL</h5>
                                    </div>
                                    <div className="ot-right">
                                        <h5>Rs. {totalPrice}</h5>
                                    </div>
                                </div>

                                <div className="ot-right-mkp">
                                    <button onClick={displayRazorpay}>Make payment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );

}

export default Checkout;