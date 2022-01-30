import { createContext, useState, useContext } from 'react';

let PageVisitContext = createContext();

export function PageVisitLinkContext({ children }) {

    let [pageurl, setPageurl] = useState('');

    return <PageVisitContext.Provider value={{ pageurl, setPageurl }}>
        {children}
    </PageVisitContext.Provider>
}


export function usePageVisitContext() {
    return useContext(PageVisitContext);
}