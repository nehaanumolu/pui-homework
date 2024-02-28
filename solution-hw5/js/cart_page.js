

let cart = [] // initialize cart array

// Roll class 
class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
}

// Compute a roll's total price from pack size, roll type and glazing
function computeRollPrice(roll_type, glazing, pack_size) {
    // get base price of roll type
    let base_price = rolls[roll_type].basePrice;

    // get price adaptation of given pack_size
    let packSize = sizePrices.find(sizePack => sizePack.packSize == pack_size)
    let price_adaptation = packSize.priceAdaptation;

    // find glazing price for given glazing
    let glazing_lowercase = glazing.toLowerCase().replace(/ /g, '-');
    console.log(glazing_lowercase)
    let glaze = glazePrices.find(glazePrice => glazePrice.glaze == glazing_lowercase);
    let glazePrice = glaze.price;

    // compute total price and return
    let total_price = (base_price + glazePrice) * price_adaptation;
    return total_price;
}

// Using Roll class, make four new Roll objects and add them to your cart

let original_roll = new Roll("Original", "Sugar Milk", 1, computeRollPrice("Original", "Sugar Milk", 1))
let walnut_roll = new Roll("Walnut", "Vanilla Milk", 12, computeRollPrice("Walnut", "Vanilla Milk", 12))
let raisin_roll = new Roll("Raisin", "Sugar Milk", 3, computeRollPrice("Raisin", "Sugar Milk", 3))
let apple_roll = new Roll("Apple", "Original", 3, computeRollPrice("Apple", "Original", 3))

// add new roll instances to cart array
cart.push(original_roll, walnut_roll, raisin_roll, apple_roll);

function updateCart(roll) {
    const cartWrapper = document.querySelector('.product-cart-wrapper');

    // create a new roll listing
    const newRoll = document.createElement('div');
    newRoll.classList.add('item-listing');

    // Item Image
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('item-image');

    const productImage = document.createElement('img');
    productImage.classList.add('product-image');
    let productImagePath = "assets/products/" + rolls[roll.type].imageFile;
    productImage.src = productImagePath;

    const removeButton = document.createElement('p');
    removeButton.classList.add('remove');
    removeButton.textContent = 'Remove';

    imageDiv.appendChild(productImage);
    imageDiv.appendChild(removeButton);

    // Item details
    const itemDetailsDiv = document.createElement('div');
    itemDetailsDiv.classList.add('item-details');
    const itemName = document.createElement('p');
    itemName.textContent = roll.type + " Cinnamon Roll";
    const itemGlazing = document.createElement('p');
    itemGlazing.textContent = "Glazing: " + roll.glazing;
    const itemPackSize = document.createElement('p');
    itemPackSize.textContent = "Pack Size: " + roll.size;
    itemDetailsDiv.appendChild(itemName);
    itemDetailsDiv.appendChild(itemGlazing);
    itemDetailsDiv.appendChild(itemPackSize);

    // Item Price
    const itemPriceDiv = document.createElement('div');
    itemPriceDiv.classList.add('item-price');
    const price = document.createElement('p');
    price.textContent = "$ " + computePrice(roll.size, roll.type, roll.glazing).toFixed(2);
    itemPriceDiv.appendChild(price);

    // append all to new Roll
    newRoll.appendChild(imageDiv);
    newRoll.appendChild(itemDetailsDiv);
    newRoll.appendChild(itemPriceDiv);

    // append newRoll to cart
    cartWrapper.appendChild(newRoll);
    displayPrice();

    removeButton.addEventListener('click', function() {
        cartWrapper.removeChild(newRoll);
        displayPrice();
    });
}

updateCart(original_roll);
updateCart(walnut_roll);
updateCart(raisin_roll);
updateCart(apple_roll);


