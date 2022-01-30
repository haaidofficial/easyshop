import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import wishlistIcon from '../../assets/icons/wishlist.png';
import cartIcon from '../../assets/icons/shopping-cart.png';
import userIcon from '../../assets/icons/user.png';
import loginIcon from '../../assets/icons/login-icon.png';
import searchIcon from '../../assets/icons/search.png';
import arrowDown from '../../assets/icons/arrow-down.png';
import arrowUp from '../../assets/icons/arrow-up.png';
import closeIcon from '../../assets/icons/close2.png';
import navMenuIcon from '../../assets/icons/menu.png';
import Cart from './Cart';
import UserCart from '../user/UserCart';
import UserLogin from '../user/UserLogin';
import { useLoginContext } from '../../contexts/LoginFormProvider';
import { useUserAuthContext } from '../../contexts/AuthProvider';
import { WishListCart } from './WishListCart';
import { useWishListContext } from '../../contexts/WishListProvider';
import { useSelector, useDispatch } from 'react-redux';
import { handleEcomStoreData } from '../../redux-store/actions/index';
import { usePageVisitContext } from '../../contexts/PageVisitLinkContext';





function Header({ navigation }) {
    let [subCatOpen, setSubCatOpen] = useState({ men: false, women: false });
    let [showCartListPreview, setShowCartListPreview] = useState(false);
    let [isSearchBarEnabled, SetSearchBar] = useState(false);
    let [userAccNav, setUserAccNav] = useState(false);
    let [searchedList, setSearchedList] = useState([]);
    let [showList, setShowList] = useState([]);
    let [navbarDropDown, setNavbarDropDown] = useState(false);
    let [activeLink, setActiveLink] = useState({ home: true, men: false, women: false, search: false, wishlist: false, cart: false, account: false });
    let catArr = [];
    if (navigation) catArr = Object.keys(navigation);

    let { showLoginForm, setShowLoginForm } = useLoginContext();
    let { user, signOutGoogle } = useUserAuthContext();


    let { wishlistCount } = useWishListContext();

    let { setPageurl } = usePageVisitContext();

    let count = useSelector(state => state.userWishListsState.count);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleEcomStoreData('userWishListsCount', wishlistCount));
    }, []);

    useEffect(() => {
        recursiveLoop(navigation);
    }, [navigation]);


    useEffect(() => {

        if (!isSearchBarEnabled) setShowList([]);

    }, [isSearchBarEnabled]);

    useEffect(() => {
        let overflowStyle = 'initial';
        if (showCartListPreview) {
            overflowStyle = 'hidden';
        }
        document.querySelector('body').style.overflow = overflowStyle;
    }, [showCartListPreview]);


    let categoryLinks = {
        men: {
            'Mens Topwear': 'mens-topwear',
            'Mens Footwear': 'mens-footwear'
        },
        women: {
            'Womens Topwear': 'womens-topwear',
            'Womens Footwear': 'womens-footwear'
        }
    };



    let generateSubCat = (obj) => {
        let subCatLink = [];
        for (let key in obj) {
            let strArr = key.split(' ');
            subCatLink.push(<li onClick={() => setNavbarDropDown(false)}><Link to={'/products/' + obj[key]} state={{ gender: strArr[0].toLowerCase().substring(0, strArr[0].length - 1), itemType: strArr[1].toLowerCase() }}>{key}</Link></li>)
        }
        return subCatLink;
    }

    let handleSubCatLink = (str) => {
        setSubCatOpen((prevState) => {
            return {
                men: false,
                women: false,
                [str]: !prevState[str]

            }
        });
    }

    function validateText(str) {
        return /^([a-zA-Z(\s)?]+)$/.test(str);
    }

    function searchProducts(e) {

        if (!validateText(e.target.value)) {
            setShowList([]);
            alert('Invalid text');
            return;
        }


        let searchedListArr = searchedList.filter(element => {
            let rVal = false;
            for (let key in element) {
                if (key === 'Brand' || key === 'Category' || key === 'Description' || key === 'Search_Keywords') {
                    if (element[key].toLowerCase().trim().search(e.target.value.toLowerCase().trim()) != -1) {
                        rVal = true;
                        break;
                    }
                }
            }
            return rVal;
        });

        setShowList(searchedListArr);
    }



    function recursiveLoop(obj) {
        for (let key in obj) {
            if (obj[key] instanceof Object && !(obj[key] instanceof Array)) {
                recursiveLoop(obj[key]);
            }
            if (obj[key] instanceof Array) {
                setSearchedList(prevState => {
                    return [...prevState, ...obj[key]]
                });
            }
        }
    }

    function handleActiveLink(pageName) {
        setActiveLink(prevState => {
            let obj = {};
            for (let k in prevState) {
                obj[k] = false;
            }
            obj[pageName] = true;
            return obj;
        });
    }


    async function signOutUser() {
        await signOutGoogle()
    }


    let activeLinkBG = 'linear-gradient(to right, #ffe259, #ffa751)';

    return (
        <>
            {showCartListPreview && <UserCart setShowCartListPreview={setShowCartListPreview} products={navigation} catArr={catArr} />}
            {showLoginForm && <UserLogin />}
            <div className="header">


                <div className='nav-dropdown'>
                    <div className='n-d-icon'>
                        <img src={navMenuIcon} width='60' height='60' alt='navbar-menu-icon' onClick={() => setNavbarDropDown(!navbarDropDown)} />
                    </div>

                    {navbarDropDown &&
                        <div className='n-d-list'>
                            <ul>
                                <li style={{ background: activeLink.home ? activeLinkBG : '' }} className='p-nav-list' key={Math.random()} onClick={() => {
                                    handleActiveLink('home');
                                    setNavbarDropDown(false);
                                }}><Link to="/">Home</Link></li>
                                {
                                    catArr.map((element, index) => {
                                        return <li className='p-nav-list' key={Math.random()} style={{ position: 'relative', cursor: 'pointer', background: activeLink[element] ? activeLinkBG : '' }} onClick={() => {
                                            handleSubCatLink(element);
                                            handleActiveLink(element);

                                        }
                                        }>
                                            {element[0].toUpperCase()}{element.slice(1)}

                                            <span style={{ padding: '0 0 0 5px' }}><img src={subCatOpen[element] ? arrowUp : arrowDown} alt='arrow-up-icon' width='9' height='9' /></span>
                                            {subCatOpen[element] && <div className='sub-category-links'>
                                                {
                                                    generateSubCat(categoryLinks[element])
                                                }
                                            </div>}

                                        </li>
                                    })
                                }

                            </ul>
                        </div>}

                </div>

                <nav className='default-navbar'><ul>
                    <li style={{ background: activeLink.home ? activeLinkBG : '' }} className='p-nav-list' key={Math.random()} onClick={() => handleActiveLink('home')}><Link to="/">Home</Link></li>
                    {
                        catArr.map((element, index) => {
                            return <li className='p-nav-list' key={Math.random()} style={{ position: 'relative', cursor: 'pointer', background: activeLink[element] ? activeLinkBG : '' }} onClick={() => {
                                handleSubCatLink(element);
                                handleActiveLink(element);

                            }
                            }>
                                {element[0].toUpperCase()}{element.slice(1)}

                                <span style={{ padding: '0 0 0 5px' }}><img src={subCatOpen[element] ? arrowUp : arrowDown} alt='arrow-up-icon' width='9' height='9' /></span>
                                {subCatOpen[element] && <div className='sub-category-links'>
                                    {
                                        generateSubCat(categoryLinks[element])
                                    }
                                </div>}

                            </li>
                        })
                    }

                </ul>
                </nav>



                <div className="header-right">
                    <ul>
                        <li style={{ background: activeLink.search ? activeLinkBG : '', padding: activeLink.search ? '5px' : '', borderRadius: '100%' }} onClick={() => handleActiveLink('search')}>
                            <div className="icon-wrapper">
                                <img src={searchIcon} alt="search-icon" onClick={() => SetSearchBar(!isSearchBarEnabled)} />
                            </div>
                        </li>
                        <li style={{ background: activeLink.wishlist ? activeLinkBG : '', padding: activeLink.wishlist ? '5px' : '', borderRadius: '100%' }} onClick={() => {
                            handleActiveLink('wishlist');
                            setPageurl('/wishlist');
                        }}>
                            <div className="icon-wrapper">
                                {
                                    user ?
                                        <Link to='/wishlist'>
                                            <span className='wishlist-icon'>
                                                <img src={wishlistIcon} alt="wishlist-icon" />
                                                {/* <WishListProvider> */}
                                                <WishListCart count={count} />
                                                {/* </WishListProvider> */}

                                            </span>

                                        </Link>
                                        :
                                        <span className='wishlist-icon'>
                                            <img src={wishlistIcon} alt="wishlist-icon" onClick={() => setShowLoginForm(!showLoginForm)} />
                                            <WishListCart count={count} />
                                        </span>

                                }
                            </div>
                        </li>
                        <li style={{ background: activeLink.cart ? activeLinkBG : '', padding: activeLink.cart ? '5px' : '', borderRadius: '100%' }} onClick={() => handleActiveLink('cart')}>
                            <div className="icon-wrapper iw-cart">
                                <Cart />
                                <img src={cartIcon} alt="cart-icon" onClick={() => setShowCartListPreview(true)} />
                            </div>
                        </li>
                        <li style={{ background: activeLink.account ? activeLinkBG : '', padding: activeLink.account ? '5px' : '', borderRadius: '100%' }} onClick={() => {
                            handleActiveLink('account');

                        }}>
                            <div className="icon-wrapper u-ac" >





                                <img src={user ? userIcon : loginIcon} alt="user-avatar-icon" onClick={() => {
                                    setUserAccNav(!userAccNav);
                                    if (!user) setShowLoginForm(true);
                                }} />
                                {user && userAccNav && <div className='user-acc-nav'>
                                    <div className='user-acc-inner'>
                                        <ul>

                                            <li>
                                                <Link to='/user-orders' onClick={() => {
                                                    setShowLoginForm(!showLoginForm);
                                                    setUserAccNav(false);
                                                }}>
                                                    Orders <span className='arrow-right-icon'>&#8594;</span>
                                                </Link>
                                            </li>
                                            <li onClick={signOutUser} className='logout'>
                                                Logout
                                                <span className='arrow-right-icon'>&#8594;</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}


                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {
                isSearchBarEnabled &&

                <>
                    <div className="search-bar-container">
                        <div className="search-bar">
                            <div className="search-bar-input">
                                <input type='text' placeholder='Search here...' onChange={searchProducts} />
                            </div>
                            <span className="search-bar-close">
                                <img src={closeIcon} width='15' height='15' alt='cose-icon' onClick={() => SetSearchBar(false)} />
                            </span>
                        </div>
                    </div>

                    {
                        showList.length !== 0 &&
                        <div className='search-list-wrapper'>
                            <div className='list-wrapper-inner'>
                                {
                                    showList.map((element, index) => {
                                        return (
                                            <>
                                                <Link to='/product' state={{ productDetail: element }} onClick={() => SetSearchBar(false)} key={index}>
                                                    <div className='list-wrapper-item'>
                                                        <div className='lw-item-photo'>
                                                            <img src={element.Images[0]} />
                                                        </div>
                                                        <div className='lw-item-detail'>
                                                            <div className='lw-item-d-row'>
                                                                <h5>{element.Brand}</h5>
                                                            </div>
                                                            <div className='lw-item-d-row'>
                                                                <p>{element.Description}</p>
                                                            </div>
                                                            <div className='lw-item-d-row'>
                                                                <p>{element.Search_Keywords}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </>
                                        )

                                    })
                                }
                            </div>
                        </div>
                    }
                </>

            }

        </>
    );
}


export default Header;