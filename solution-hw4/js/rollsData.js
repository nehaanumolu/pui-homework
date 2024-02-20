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


let cart = []

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

if (rollType && rolls[rollType]) {
    const base_price = rolls[rollType].basePrice;
    const imagePath = rolls[rollType].imageFile;
    const rollName = rollType;

    const header = document.querySelector("#banner");
    header.innerText = rollName + ' Cinnamon Roll';

    const image = imagePath;
    image.src = "assets/products/" + imagePath;

    const price = document.querySelector('.cart-price');
    price.innerText = "$" + base_price.toFixed(2);
}

