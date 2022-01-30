import { useState } from 'react';
import { commonSliderPattern } from '../../Helper/commonSliderPattern';
import prevIcon from '../../../assets/icons/back.png';
import prevNext from '../../../assets/icons/next.png';

let scrollWidthCalc = {
    scroll1: 0,
    scroll2: 0,
};

function Slider() {
    let [slide, setSlide] = useState(0);

    let sliderTexts = [
        {
            text: "Fashion is what you're offered four times a year by designers. And style is what you choose.",
            author: "—Lauren Hutton"
        },
        {
            text: "Fashion is not something that exists in dresses only. Fashion is in the sky, in the street. Fashion has to do with ideas, the way we live, what is happening.",
            author: "—Coco Chanel"
        },
        {
            text: "Fashion is not necessarily about labels. It's not about brands. It's about something else that comes from within you.",
            author: "—Ralph Lauren"
        },
        {
            text: "Flexibility with yourself and your looks shows self confidence. You're willing to paint on your canvas with whatever comes from within you.",
            author: "—Willow Smith"
        },
        {
            text: "Being well dressed hasn't much to do with having good clothes. It’s a question of good balance and good common sense.",
            author: "—Oscar de la Renta"
        },
        {
            text: "What you wear is how you present yourself to the world, especially today, when human contacts are so quick. Fashion is instant language.",
            author: "—Miuccia Prada"
        },
        {
            text: "You can wear black at any time. You can wear it at any age. You may wear it for almost any occasion.",
            author: "—Christian Dior"
        },
        {
            text: "Fashion is the part of the daily air and it changes all the time, with all events. You can even see the approaching of a revolution in clothes. You can see and feel everything in clothes.",
            author: "—Diana Vreeland"
        },
        {
            text: "Conformity is the only real fashion crime. To not dress like yourself and to sublimate your spirit to some kind of group identity is succumbing to fashion fascism.",
            author: "—Simon Doonan"
        },
        {
            text: "Too much good taste can be very boring. Independent style, on the other hand, can be very inspiring.",
            author: "—Diana Vreeland"
        },
    ];


    function handleSlider(move, elementCount) {
        let { calc, scrollParent, element } = commonSliderPattern('slider', move, elementCount, scrollWidthCalc, true);

        scrollWidthCalc[scrollParent] = calc;

        element.scrollTo({
            top: 0,
            left: scrollWidthCalc[scrollParent],
            behavior: 'smooth'
        });
    }




    return (
        <>
            <div className="slider-container">
                <div className="slider">
                    <div className="slider-item">
                        <h5>{sliderTexts[slide].text}</h5>
                        <h6> {sliderTexts[slide].author}</h6>
                    </div>
                    <div className="slider-item">
                        <h5>{sliderTexts[slide + 1].text}</h5>
                        <h6> {sliderTexts[slide + 1].author}</h6>
                    </div>
                    {/*  */}
                    <div className="slider-item">
                        <h5>{sliderTexts[slide].text}</h5>
                        <h6> {sliderTexts[slide].author}</h6>
                    </div>
                    <div className="slider-item">
                        <h5>{sliderTexts[slide + 1].text}</h5>
                        <h6> {sliderTexts[slide + 1].author}</h6>
                    </div>
                    <div className="slider-item">
                        <h5>{sliderTexts[slide].text}</h5>
                        <h6> {sliderTexts[slide].author}</h6>
                    </div>
                    <div className="slider-item">
                        <h5>{sliderTexts[slide + 1].text}</h5>
                        <h6> {sliderTexts[slide + 1].author}</h6>
                    </div>
                </div>
                <div className="slider-btn prev" onClick={() => handleSlider('prev', 0)}>
                    <img src={prevIcon} alt="previous icon" />
                </div>
                <div className="slider-btn next" onClick={() => handleSlider('next', 0)}>
                    <img src={prevNext} alt="next icon" />
                </div>
            </div>
        </>
    );
}

export default Slider;