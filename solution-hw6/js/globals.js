// JavaScript file to store global constants
// & dictionaries that all other JS Files can access

// dictionary mapping glaze types of prices
const glazePrices = [
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

// dictionary mapping pack sizes to their
// corresponding price adaptations
const sizePrices = [
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

// dictionary mapping rolls to their respective
// base prices and image file names
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


// Roll class 
class Roll {
    // initializes Roll's attributes
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice; // holds base price for one single role
    }

    // Compute a roll's total price from pack size, roll type and glazing
    computeRollPrice() {
        // get base price of roll type
        let base_price = this.basePrice;

        // get price adaptation of given pack_size
        let packSize = sizePrices.find(sizePack => sizePack.packSize == this.size);
        let price_adaptation = packSize.priceAdaptation;

        // find glazing price for given glazing
        let glazing_lowercase = this.glazing.toLowerCase().replace(/ /g, '-');
        if (glazing_lowercase === "original") {
            glazing_lowercase = "keep-original";
        }
        let glaze = glazePrices.find(glazePrice => glazePrice.glaze == glazing_lowercase);
        let glazePrice = glaze.price;

        // compute total price and return
        let total_price = ((base_price + glazePrice) * price_adaptation).toFixed(2);
        return total_price;
    }

}