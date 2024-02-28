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

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll')

const base_price = rolls[rollType].basePrice;
const imagePath = rolls[rollType].imageFile;
const rollName = rollType;

const header = document.querySelector("#banner");
header.innerText = rollName + ' Cinnamon Roll';

const image = document.querySelector(".product-image");
image.src = "assets/products/" + imagePath;

const price = document.querySelector('.cart-price');
price.innerText = "$" + base_price.toFixed(2);


let cart = [] // create array of set to represent cart

// roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// wrote a function that would comptue price given pack_size, roll_type, glazing
function computePrice(pack_size, roll_type, glazing) {
    // get base price of roll type
    let basePrice = rolls[roll_type].basePrice;

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

function displayCart(Roll) {
    
}

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

