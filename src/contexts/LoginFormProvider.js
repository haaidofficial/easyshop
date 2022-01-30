import { useState, useEffect, createContext, useContext } from 'react';

let LoginContext = createContext();

export function LoginFormProvider({ children }) {
    let [showLoginForm, setShowLoginForm] = useState(false);
    let [deafultNavigationURL, setDeafultNavigationURL] = useState('/user-account');

    useEffect(() => {
        let overflowStyle = 'initial';
        if (showLoginForm) {
            overflowStyle = 'hidden';
        }
        document.querySelector('body').style.overflow = overflowStyle;
    }, [showLoginForm]);


    return <LoginContext.Provider value={{ showLoginForm, setShowLoginForm, deafultNavigationURL, setDeafultNavigationURL }}>
        {children}
    </LoginContext.Provider>;

}


export function useLoginContext() {
    return useContext(LoginContext);
}