import { createContext, useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleEcomStoreData } from '../redux-store/actions';
import { getUsersWishList } from '../api/Firebase/index';
import { useUserAuthContext } from './AuthProvider';


let wishListContext = createContext();

export function WishListProvider({ children }) {
    let { productsList } = useSelector(state => state.ecommerceState);
    let dispatch = useDispatch();
    let [wishList, setWishList] = useState([]);  // firebase realtime db wishlist
    let [wishListArray, setWishListArray] = useState([]);  // all products common state 
    let [mappedWishList, setMappedWishList] = useState([]);  // Final wishlist items that will serve for the actual list
    let { user } = useUserAuthContext();


    // When component mounts for first time
    useEffect(() => {
        recursiveLoop(productsList);
    }, [productsList]);



    // When user is available after signin
    // get the user's wishlist from firebase realtime db
    useEffect(() => {
        if (!user) { setMappedWishList([]); return; }
        let x = getUsersWishList(user.email);
        setWishList(x);
        mapFirebaseWLToProducts();

    }, [user]);



    // Map the user's wishlist from firebase to actual product list    
    useEffect(() => {
        mapFirebaseWLToProducts();

    }, [wishListArray]);



    useEffect(() => {
        dispatch(handleEcomStoreData('userWishListsCount', mappedWishList.length));

    }, [mappedWishList]);


    function mapFirebaseWLToProducts() {
        let arr = [];
        wishList.forEach(elementX => {
            wishListArray.forEach(elementY => {
                if (elementX.pid == elementY.Product_ID) {
                    arr.push({ ...elementY, id: elementX.id });
                }
            });
        });

        setMappedWishList(arr);

    }



    function recursiveLoop(obj) {
        for (let key in obj) {
            if (obj[key] instanceof Object && !(obj[key] instanceof Array)) {
                recursiveLoop(obj[key]);
            }
            if (obj[key] instanceof Array) {
                setWishListArray(prevState => {
                    return [...prevState, ...obj[key]]
                });
            }
        }
    }

    function deleteWishListHandler(id) {

        let arr = mappedWishList.filter(element => {
            return element.id !== id
        });

        setMappedWishList(arr)

    }


    return <wishListContext.Provider value={{ mappedWishList, deleteWishListHandler, wishlistCount: mappedWishList.length }}>
        {children}
    </wishListContext.Provider>
}


export function useWishListContext() {
    return useContext(wishListContext);
}