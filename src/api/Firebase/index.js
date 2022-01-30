// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";


// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAQ2lxI7l8uT_5spIS8vcjz6VPQcUBfWwg",
    authDomain: "easyshop-4b314.firebaseapp.com",
    projectId: "easyshop-4b314",
    storageBucket: "easyshop-4b314.appspot.com",
    messagingSenderId: "298363681619",
    appId: "1:298363681619:web:53b82a28be096d01ab7fa6",
    measurementId: "G-0927WD5EM7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const db = getDatabase();

export function writeUserData(uid, userEmail, pid) {

    set(ref(db, 'usersWishlist/' + uid), {
        email: userEmail,
        pid,
    });
}




export function getUsersWishList(userEmail, getCount = false) {

    let lists = [];
    const wishlists = ref(db, 'usersWishlist/');
    onValue(wishlists, (snapshot) => {

        let obj = snapshot.val();
        for (let k in obj) {
            if (obj[k].email === userEmail) {
                lists.push({ id: k, ...obj[k] });
            }
        }

    });

    if (getCount) return lists.length;
    return lists;
}



export function removeUserWishlistItem(id) {
    const wishlists = ref(db, 'usersWishlist/' + id);
    remove(wishlists);
}



export function writeOrders(orderId, orderDeatils) {

    set(ref(db, 'orders/' + orderId), orderDeatils);
}


export let getUsersOrder = () => {
    const dbRef = ref(db, 'orders/');
    return { onValue, dbRef };
};