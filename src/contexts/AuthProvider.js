import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/Firebase/index';


const AuthContext = createContext();

export function AuthProvider({ children }) {

    let [user, setUser] = useState('');

    useEffect(() => {

        let unSubscribe = onAuthStateChanged(auth, currentUser => setUser(currentUser));

        return unSubscribe;
    }, []);

    function signInWithgoogle() {
        return signInWithPopup(auth, new GoogleAuthProvider());
    }

    function signOutGoogle() {
        return signOut(auth, new GoogleAuthProvider());
    }


    function signUpWithEmail(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }


    function signInWithEmail(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }


    return <AuthContext.Provider value={{ user, signInWithgoogle, signOutGoogle, signUpWithEmail, signInWithEmail }}>
        {children}
    </AuthContext.Provider>
}


export function useUserAuthContext() {
    return useContext(AuthContext);
}