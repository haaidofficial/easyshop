import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../designs/ProductCard';
import arrowDown from '../../assets/icons/arrow-down.png';
import arrowUp from '../../assets/icons/arrow-up.png';
import arrowForward from '../../assets/icons/bread-crumb-icon.png';

function AllProducts() {
    let location = useLocation();
    let [brands, setBrands] = useState([]);
    let [openBrandsList, setOpenBrandsList] = useState(false);
    let [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
    let [productCommonInfo, setProductCommonInfo] = useState(location.state);
    let [isProductNotFound, setIsProductNotFound] = useState(false);

    let productList = useSelector(state => {
        let type = 'clothing';
        if (state.ecommerceState.productsList === null || location.state === null) return;
        if (location.state.itemType === 'footwear') type = 'footwear';
        return state.ecommerceState.productsList[location.state.gender][type];
    });


    useEffect(() => {

        if (brands.length && productCommonInfo.gender === location.state.gender && productCommonInfo.itemType === location.state.itemType) return;

        let temp = [];
        let tempBrandArr = [{ brand: 'All', isChecked: true }];
        if (productList === undefined) return;
        productList.forEach(element => {
            if (!temp.includes(element.Brand.trim())) {
                temp.push(element.Brand.trim());
                tempBrandArr.push({ brand: element.Brand.trim(), isChecked: false });
            }
        });


        setBrands(sortStringArray(tempBrandArr));
        setProductCommonInfo(location.state);
    }, [productList]);  // [productList, location.state.gender]




    let handleRange = (e, rangeType) => {
        setPriceRange(prevState => {
            if (rangeType === 'min' && e.target.value < priceRange.max) return { ...prevState, [rangeType]: e.target.value }
            else if (rangeType === 'max' && e.target.value > priceRange.min) return { ...prevState, [rangeType]: e.target.value }
            return prevState;
        })
    }


    let rangeOptions = () => {
        let n = 0;
        let tempArr = [];
        while (n < 5000) {
            tempArr.push(n + 250);
            n += 250;
        }

        return tempArr;
    }


    let handleBrandListCheck = (e) => {

        setBrands(prevState => {
            let tempArr = prevState.filter(element => {
                if (element.brand !== e.target.value) return true;
            });
            return sortStringArray([...tempArr, { brand: e.target.value, isChecked: e.target.checked }]);
        });
    }


    function sortStringArray(arr) {
        return arr.sort((a, b) => {
            if (a.brand.toLowerCase() < b.brand.toLowerCase()) return -1;
            if (a.brand.toLowerCase() > b.brand.toLowerCase()) return 1;
            return 0;
        });
    }


    function filterProducts() {

        // filter products based on brands and price
        //brands

        let selectedBrands = [];
        brands.forEach(element => {
            if (element.isChecked) selectedBrands.push(element.brand);
        });

        if (productList === undefined) return [];

        let filteredProducts = productList.filter((product, index) => {
            let val = false;
            let inBudget = (parseInt(product.Price.trim()) >= priceRange.min && parseInt(product.Price.trim()) <= priceRange.max);
            //if (selectedBrands.length == 0 && inBudget) return true;
            selectedBrands.forEach(p => {
                if (p === 'All' && inBudget) val = true;
                else if (product.Brand.trim() === p.trim() && inBudget) val = true;
            });
            return val;
        });

        return filteredProducts;

    }

    let breadCrumb = {
        gender: location.state ? location.state.gender.substring(0, 1).toUpperCase() + location.state.gender.substring(1) : '',
        itemType: location.state ? location.state.itemType.substring(0, 1).toUpperCase() + location.state.itemType.substring(1) : '',
    }

    return (
        <>
            <div className='all-product-main-c'>
                <div className='all-product-left'>
                    <div className='filter-container'>
                        <div className='filter'>
                            <div className='f-header'>
                                <h5>Filters</h5>
                            </div>
                            <div className='f-brands'>
                                <button onClick={() => setOpenBrandsList(prevState => !prevState)}>
                                    <div className='f-brands-btn-text'>
                                        <span><h6>Brand  <span style={{ padding: '0 0 0 10px' }}><img src={openBrandsList ? arrowDown : arrowUp} alt='arrow-up-icon' width='10' height='10' /></span></h6></span>

                                    </div>
                                </button>
                                {openBrandsList && <div className='f-brands-list'>

                                    {
                                        brands.map((element, i) => {
                                            return (
                                                <>
                                                    <div className='f-b-list-row' key={i}>
                                                        <div className='f-b-list-left'>
                                                            <input type='checkbox' value={element.brand} onChange={(e) => handleBrandListCheck(e)} checked={element.isChecked} />
                                                        </div>
                                                        <div className='f-b-list-right'>
                                                            <label>{element.brand}</label>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>}

                            </div>
                            <div className='f-price-range'>
                                <div className='f-price-range-text'>
                                    <h6>Price</h6>
                                </div>
                                <div className='f-price-range-slider'>
                                    <div className='double-rage-wrapper'>
                                        <input type="range" className='range' onInput={(e) => handleRange(e, 'min')} min='0' max='5000' step='250' value={priceRange.min} />
                                        <input type="range" className='range' onInput={(e) => handleRange(e, 'max')} min='0' max='5000' step='250' value={priceRange.max} />
                                    </div>

                                </div>
                                <div className='f-price-range-min-max'>
                                    <div className='min-max-left'>
                                        <select onChange={(e) => handleRange(e, 'min')}>
                                            <option selected>Min</option>
                                            {rangeOptions().map((price, i) => {
                                                return <option key={i} selected={parseInt(priceRange.min) == price ? 'selected' : ''}>{price}</option>
                                            })}
                                        </select>
                                    </div>
                                    <span>to</span>
                                    <div className='min-max-right'>
                                        <select onChange={(e) => handleRange(e, 'max')}>
                                            <option selected>Max</option>
                                            {rangeOptions().map((price, i) => {
                                                return <option key={i} selected={parseInt(priceRange.max) == price ? 'selected' : ''}>{price}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='all-product-right'>
                    <div className='products-container'>
                        <div className='product-type-header-nav'>
                            <div className='pth-nav'>
                                <span>{breadCrumb.gender}</span>
                                <span><img src={arrowForward} alt='bread-crumb-icon' width='12' height='12' /></span>
                                <span>{breadCrumb.itemType}</span>
                            </div>
                        </div>
                        <div className='products-row'>
                            {

                                filterProducts().map((product, i) => {
                                    return <div className='products-ele'>
                                        <ProductCard productDetail={product} key={i} />
                                    </div>

                                })
                            }
                        </div>
                        {/* {
                            isProductNotFound && <div className='product-err-msg'>No Products Found!</div>
                        } */}
                    </div>
                </div>
            </div>

        </>
    );
}

export default AllProducts;