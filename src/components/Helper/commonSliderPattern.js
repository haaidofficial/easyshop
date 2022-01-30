export function commonSliderPattern(clsName, move, elementCount, obj, defaultSlider = false) {

    let element = document.getElementsByClassName(clsName);

    let eleScrollWidth = element[elementCount].scrollWidth;

    let scrollParent = 'scroll1';
    if (elementCount) scrollParent = 'scroll2';
    //let eleScrollWidth = element[elementCount].children[0].children.length * 250;

    let calc = obj[scrollParent];

    let scrollValue = eleScrollWidth / element[elementCount].children[0].children.length;

    if (defaultSlider) {   // For first slider (fashion quotes slider)
        scrollValue = element[elementCount].children[0].offsetWidth;
        eleScrollWidth = element[elementCount].scrollWidth;
    }

    if (move === 'prev') scrollValue = 0 - scrollValue;  // Make the value -ve for prev button

    calc += scrollValue;

    if (calc < 0) calc = 0;   // If scrollbar points to starting position

    if (calc > eleScrollWidth) calc = eleScrollWidth;   // If scrollbar points to the last position

    return {
        calc,
        scrollParent,
        element: element[elementCount]
    }
}