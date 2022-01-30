import { useEffect, useRef } from 'react';
import { handleEcomStoreData } from './redux-store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getProductsCatalog } from './api/product-api';
import { AuthProvider } from './contexts/AuthProvider';
import { ProtectedRoute } from './components/user/ProtectedRoute';
import { LoginFormProvider } from './contexts/LoginFormProvider';
import { WishListProvider, useWishListContext } from './contexts/WishListProvider';
import Checkout from './components/user/Checkout';
import UserOrder from './components/user/UserOrder';
import WishList from './components/user/WishList';
import Header from './components/navbar/Header';
import Slider from './components/designs/slider/Slider';
import CategoryCard from './components/designs/CategoryCard';
import ProductDetail from './components/Product/ProductDetail';
import AllProducts from './components/Product/AllProducts';
import { db } from './api/Firebase/';
import { ref, onValue } from "firebase/database";
import { PageVisitLinkContext } from './contexts/PageVisitLinkContext';
import PageNotFoundError from './components/Error-page/Error-404';




function App() {
    let dispatch = useDispatch();

    let {
        categoriesList,
        productsList
    } = useSelector(state => state.ecommerceState);

    let lens = useRef();

    useEffect(() => {
        // getProductsCatalog()
        //     .then(res => {
        //         dispatch(handleEcomStoreData('categoriesList', Object.keys(res)));
        //         dispatch(handleEcomStoreData('productsList', res));
        //     })
        //     .catch(err => console.log(err));


        let catalogDB = ref(db, 'catalog/');
        onValue(catalogDB, (snapshot) => {
            let listObj = snapshot.val();
            dispatch(handleEcomStoreData('categoriesList', Object.keys(listObj)));
            dispatch(handleEcomStoreData('productsList', listObj));

        }, {
            onlyOnce: true
        })



    }, []);

    return (
        <>
            <div className="main-area">
                <div className='lens' ref={lens}></div>
                <div className="circle ci-1"></div>
                <div className="square ci-3"></div>
                <div className="circle ci-2"></div>
                <div className="glass">
                    <AuthProvider>
                        <BrowserRouter>
                            <LoginFormProvider>
                                <WishListProvider>
                                    <PageVisitLinkContext>
                                        <Header navigation={productsList ? productsList : null} />
                                    </PageVisitLinkContext>





                                    <Routes>
                                        <Route exact path="/" element={
                                            <>
                                                <Slider />
                                                <div className="products-list">
                                                    <div className="container-fluid-custom">
                                                        <CategoryCard />
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        />
                                        <Route exact path="/product" element={<ProductDetail ref={lens} />} />
                                        <Route exact path="/products/:productParam" element={<AllProducts />} />
                                        <Route exact path="/user-orders" element={
                                            <ProtectedRoute>
                                                <UserOrder />
                                            </ProtectedRoute>
                                        } />

                                        <Route exact path="/wishlist" element={
                                            <ProtectedRoute>
                                                <WishListProvider>
                                                    <WishList />
                                                </WishListProvider>
                                            </ProtectedRoute>
                                        } />

                                        <Route exact path='/checkout' element={
                                            <ProtectedRoute>
                                                <Checkout />
                                            </ProtectedRoute>
                                        } />

                                        <Route path='*' element={<PageNotFoundError />} />
                                    </Routes>
                                </WishListProvider>
                            </LoginFormProvider>
                        </BrowserRouter>
                    </AuthProvider>
                </div>
            </div>
        </>
    );
}

export default App;
