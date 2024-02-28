
// global variables to manipulate
let currentGlazePrice = 0.0;
let currentPackPriceAdaptation = 1.0;

function displayPrice() {
    let cartPrice = document.querySelector('.cart-price');
    // base price depends on current roll type
    const basePrice = rolls[rollType].basePrice;
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

