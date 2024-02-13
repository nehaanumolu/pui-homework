// list of glaze types with glaze name and associated price adaptations
let glazePrices = [
    {
        glaze: 'Keep original',
        price: 0.0
    },
    {
        glaze: 'Sugar milk',
        price: 0.0
    },
    {
        glaze: 'Vanilla Milk',
        price: 0.50
    },
    {
        glaze: 'Double chocolate',
        price: 1.50
    },
];

// list of size types and assocaited price adaptations
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

// parameter is a glazePrice object and a sizePrice obje t
// given these two objects, change total price
function displayPrice(glazePrice, sizePrice) {
    let cartPrice = document.querySelector('#cart-price');

    let totalPrice = parseFloat(glazePrice.price * sizePrice.priceAdaptation);

    cartPrice.innerText = "$" + totalPrice.toString();
}

function onSelectGlazeChange() {
    let glazeIndex = parseInt(this.value);
    let glazePrice = glazePrices[glazeIndex];
    displayPrice(glazePrice);
}

function onSelectPackSizeChange() {
    let sizeIndex = parseInt(this.value);

}
// when the page loads find the select element
let glazeSelectElement = document.querySelector("#glazing");
let packSelectElement = document.querySelector("#pack-size");

// listeners for change event, function that runs when selected options
// change
glazeSelectElement.addEventListener('change', onSelectGlazeChange);
packSelectElement.addEventListener('change', onSelectPackSizeChange);