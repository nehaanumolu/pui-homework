// file contains code that manipulates product_detail_page

// list of glazePrice objects represented by
// glaze value and associated price adaptations
let glazePrices = [
    {
        glaze: 'keep-original',
        price: 0.0
    },
    {
        glaze: 'sugar-milk',
        price: 0.0
    },
    {
        glaze: 'vanilla-milk',
        price: 0.50
    },
    {
        glaze: 'double-chocolate',
        price: 1.50
    },
];

// list of sizePrice objects represented by
// values & associated price adaptations
let sizePrices = [
    {
        packSize: 1,
        priceAdaptation: 1.0
    },
    {
        packSize: 3,
        priceAdaptation: 3.0
    },
    {
        packSize: 6,
        priceAdaptation: 5.0
    },
    {
        packSize: 12,
        priceAdaptation: 10.0
    },

]

// global variables to manipulate
let currentGlazePrice = 0.0;
let currentPackPriceAdaptation = 1.0;


function displayPrice() {
    let cartPrice = document.querySelector('.cart-price');
    const basePrice = 2.49; // base price does not change
    // calculate total price
    let totalPrice = (currentGlazePrice + basePrice) * currentPackPriceAdaptation;
    // change cart price display
    cartPrice.innerText = "$" + totalPrice.toFixed(2);
}

function onSelectGlazeChange(element) {
    let glazeIndex = parseInt(element.value); // get the index of glaze type
    let glazePrice = glazePrices[glazeIndex].price; // access price property
    currentGlazePrice = glazePrice; // update current glaze price
    // update UI
    displayPrice();
}

// same functionality as function above but for manipulation
// of pack sizes
function onSelectPackSizeChange(element) {
    let sizeIndex = element.value;
    let sizePriceAdaptation = sizePrices[sizeIndex].priceAdaptation;
    currentPackPriceAdaptation = sizePriceAdaptation;
    displayPrice();
}

// when the page loads find the select element
let glazeSelectElement = document.querySelector("#glazing");
let packSelectElement = document.querySelector("#pack-size");

// listeners for change event, function that runs when selected options
// change
glazeSelectElement.addEventListener('change', onSelectGlazeChange);
packSelectElement.addEventListener('change', onSelectPackSizeChange);

