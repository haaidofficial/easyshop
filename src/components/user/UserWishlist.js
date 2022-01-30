import { useState, useEffect } from 'react';
import { writeUserData, getUsersWishList } from '../../api/Firebase';
import { useUserAuthContext } from '../../contexts/AuthProvider';
import { useLoginContext } from '../../contexts/LoginFormProvider';
import likeIcon1 from '../../assets/icons/like-1.png';
import likeIcon2 from '../../assets/icons/like.png';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { handleEcomStoreData } from '../../redux-store/actions';


function UserWishlist({ element }) {
    let { user } = useUserAuthContext();
    let { setShowLoginForm, setDeafultNavigationURL } = useLoginContext();
    let dispatch = useDispatch();
    let [productExist, setProductExist] = useState(false);

    useEffect(() => {
        if (user) setProductExist(filterWishList());
        else setProductExist(false);
    }, [user]);

    function addToWishList() {

        if (!user) {
            setShowLoginForm(true);

            setDeafultNavigationURL('wishlist');
            return;
        }

        if (!filterWishList()) {
            writeUserData(uuidv4(), user.email, element.Product_ID);
            dispatch(handleEcomStoreData('userWishListsCount', getUsersWishList(user.email, true)));
            setProductExist(true);
            return;
        }

        alert('Product already exists in the wishlist');
    }

    function filterWishList() {
        let wishlists = getUsersWishList(user.email);
        let currentUserWishlist = [];
        for (let i = 0; i < wishlists.length; i++) {
            currentUserWishlist.push(wishlists[i].pid);
        }
        return currentUserWishlist.includes(element.Product_ID);
    }

    return (
        <>
            <div className='wishlist'>
                <img src={productExist ? likeIcon2 : likeIcon1} alt='like-icon' onClick={() => addToWishList(element)} />
            </div>
        </>
    );
}


export default UserWishlist;