import ProductCard from './ProductCard';
import menFootwear from '../../assets/icons/running-shoes.png';
import womenFootwear from '../../assets/icons/high-heel.png';
import menDress from '../../assets/icons/businessman.png';
import womenDress from '../../assets/icons/businesswoman.png';
import prevIcon from '../../assets/icons/back.png';
import prevNext from '../../assets/icons/next.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { commonSliderPattern } from '../Helper/commonSliderPattern';



let scrollWidthCalc = {
    scroll1: 0,
    scroll2: 0,
};


function CategoryCard() {
    let productsList = useSelector(state => state.ecommerceState.productsList);
    let [productType, setProductType] = useState({ men: 'clothing', women: 'clothing' });

    function handleSlider(move, elementCount) {
        let { calc, scrollParent, element } = commonSliderPattern('side-slider-body', move, elementCount, scrollWidthCalc);
        // let element = document.getElementsByClassName('side-slider-body');
        // let eleScrollWidth = element[elementCount].scrollWidth;

        // let scrollParent = 'scroll1';
        // if (elementCount) scrollParent = 'scroll2';
        // //let eleScrollWidth = element[elementCount].children[0].children.length * 270;

        // let scrollValue = eleScrollWidth / element[elementCount].children[0].children.length;
        // if (move === 'prev') scrollValue = 0 - scrollValue;

        // scrollWidthCalc[scrollParent] += scrollValue;


        // if (scrollWidthCalc[scrollParent] < 0) scrollWidthCalc[scrollParent] = 0;

        // if (scrollWidthCalc[scrollParent] > eleScrollWidth) scrollWidthCalc[scrollParent] = eleScrollWidth;
        scrollWidthCalc[scrollParent] = calc;

        element.scrollTo({
            top: 0,
            left: scrollWidthCalc[scrollParent],
            behavior: 'smooth'
        });
    }


    function handleProductType(person, product) {
        setProductType(prevState => {
            return {
                ...prevState,
                [person]: product
            }
        });
    }


    function settleWithActiveCLass(perosn, product) {
        let className = 'cat-card-design';
        if (productType[perosn] === product) className = 'cat-card-design card-design-active';
        return className;
    }


    function handleScroll(e, n) {
        let temp;
        temp = 'scroll1';
        if (n) temp = 'scroll2';


        scrollWidthCalc[temp] = e.target.scrollLeft;

    }

    return (
        <>
            <div className="cat-card-container">

                <div className="cat-card-inner">
                    <div className={settleWithActiveCLass('men', 'clothing')} onClick={(e) => handleProductType('men', 'clothing')}>
                        <div className="cat-card-design-inner" >
                            <img src={menDress} />
                        </div>
                    </div>
                    <div className={settleWithActiveCLass('men', 'footwear')} onClick={(e) => handleProductType('men', 'footwear')}>
                        <div className="cat-card-design-inner" >
                            <img src={menFootwear} />
                        </div>
                    </div>

                </div>
                <div className="side-slider-body" onScroll={(e) => handleScroll(e, 0)}>
                    <div className="side-slider-inner">
                        {

                            productsList ? productsList.men[productType.men].map((element, index) => {
                                return <ProductCard productDetail={element} key={index} />
                            })
                                : <div className="loader">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                        }
                    </div>

                </div>
                <div className="sliderNav s-slider-prev">
                    <div onClick={() => handleSlider('prev', 0)}>
                        <img src={prevIcon} alt="previous icon" />
                    </div>
                </div>
                <div className="sliderNav s-slider-next">
                    <div onClick={() => handleSlider('next', 0)}>
                        <img src={prevNext} alt="next icon" />
                    </div>
                </div>
            </div>


            <div className="cat-card-container mt5 reverse-grid">
                <div className="side-slider-body remove-m-auto" onScroll={(e) => handleScroll(e, 1)}>
                    <div className="side-slider-inner">
                        {

                            productsList ? productsList.women[productType.women].map((element, index) => {
                                return <ProductCard productDetail={element} key={index} />
                            })
                                : <div className="loader">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                        }
                    </div>
                </div>
                <div className="cat-card-inner card-to-right">
                    <div className={settleWithActiveCLass('women', 'clothing')} onClick={() => handleProductType('women', 'clothing')}>
                        <div className="cat-card-design-inner" >
                            <img src={womenDress} />
                        </div>
                    </div>
                    <div className={settleWithActiveCLass('women', 'footwear')} onClick={() => handleProductType('women', 'footwear')}>
                        <div className="cat-card-design-inner" >
                            <img src={womenFootwear} />
                        </div>

                    </div>

                </div>

                <div className="sliderNav s-slider-prev sicon-2">
                    <div onClick={() => handleSlider('prev', 1)}>
                        <img src={prevIcon} alt="previous icon" />
                    </div>
                </div>
                <div className="sliderNav s-slider-next sicon-2">
                    <div onClick={() => handleSlider('next', 1)}>
                        <img src={prevNext} alt="next icon" />
                    </div>
                </div>
            </div>
        </>
    );
}


export default CategoryCard;