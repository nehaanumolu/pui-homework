const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};


// Code for product detail page --> displaying product
// based on url parameters
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

const base_price = rolls[rollType].basePrice;
const imagePath = rolls[rollType].imageFile;
const rollName = rollType;

const header = document.querySelector("#banner");
header.innerText = rollName + ' Cinnamon Roll';

const image = document.querySelector(".product-image");
image.src = "assets/products/" + imagePath;

const price = document.querySelector('.cart-price');
price.innerText = "$" + base_price.toFixed(2);


// Code for Cart page
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

// wrote a function that would comptue price given pack_size, roll_type, glazing
function computePrice(pack_size, roll_type, glazing) {
    // get base price of roll type
    let base_price = rolls[roll_type].basePrice;

    // get price adaptation of given pack_size
    let packSize = sizePrices.find(sizePack => sizePack.packSize == pack_size)
    let price_adaptation = packSize.priceAdaptation;

    // find glazing price for given glazing
    let glazing_lowercase = glazing.toLowerCase().replace(' ', '-');
    let glaze = glazePrices.find(glazePrice => glazePrice.glaze == glazing_lowercase);
    let glazePrice = glaze.price;

    // compute total price and return
    let total_price = (base_price + glazePrice) * price_adaptation;
    return total_price;
}

// create four new roll instances
let original_roll = new Roll("Original", "Sugar Milk", 1, computePrice(1, "Original", "Sugar Milk"))
let walnut_roll = new Roll("Walnut", "Vanilla Milk", 12, computePrice(12, "Walnut", "Vanilla Milk"))
let raisin_roll = new Roll("Raisin", "Sugar Milk", 3, computePrice(3, "Raisin", "Sugar Milk"))
let apple_roll = new Roll("Apple", "Original", 3, computePrice(3, "Apple", "Original"))

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

function addToCart() {
    const glazingSelect = document.querySelector("#glazing");
    const glazing = glazePrices[glazingSelect.selectedIndex].glaze;

    const packSizeSelect = document.querySelector("#pack-size");
    const packSize = parseInt(packSizeSelect.options[packSizeSelect.selectedIndex].text);

    const newRoll = new Roll(rollType, glazing, packSize, base_price);
    cart.push(newRoll);

    console.log(cart);
}

const addToCartBtn = document.querySelector("#add-to-cart-btn");
addToCartBtn.addEventListener('click', addToCart);

