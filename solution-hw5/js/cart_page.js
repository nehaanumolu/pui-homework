let cart = [] // initialize cart array



// Using Roll class, make four new Roll objects and add them to your cart

let original_roll = new Roll("Original", "Sugar Milk", 1, rolls["Original"].basePrice);
let walnut_roll = new Roll("Walnut", "Vanilla Milk", 12, rolls["Walnut"].basePrice);
let raisin_roll = new Roll("Raisin", "Sugar Milk", 3, rolls["Raisin"].basePrice);
let apple_roll = new Roll("Apple", "Original", 3, rolls["Apple"].basePrice);


// add new roll instances to cart array
cart.push(original_roll, walnut_roll, raisin_roll, apple_roll);

function updateCart(roll) {
    const cartWrapper = document.querySelector('.product-cart-wrapper');

    // create a new roll listing
    const newRoll = document.createElement('div');
    newRoll.id = 'item-listing';

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
    price.textContent = "$ " + roll.computeRollPrice();
    itemPriceDiv.appendChild(price);

    // append all to new Roll
    newRoll.appendChild(imageDiv);
    newRoll.appendChild(itemDetailsDiv);
    newRoll.appendChild(itemPriceDiv);

    // append newRoll to cart
    cartWrapper.appendChild(newRoll);

    removeButton.addEventListener('click', function() {
        cartWrapper.removeChild(newRoll);
    });
}

// update cart
for (let i = 0; i < cart.length; i++) {
    updateCart(cart[i]);
}
