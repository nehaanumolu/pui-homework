let cart = [] // Initialize cart array

// Using Roll class, make four new Roll objects and add them to your cart
let original_roll = new Roll("Original", "Sugar Milk", 1, rolls["Original"].basePrice);
let walnut_roll = new Roll("Walnut", "Vanilla Milk", 12, rolls["Walnut"].basePrice);
let raisin_roll = new Roll("Raisin", "Sugar Milk", 3, rolls["Raisin"].basePrice);
let apple_roll = new Roll("Apple", "Original", 3, rolls["Apple"].basePrice);


// Add new roll instances to cart array
cart.push(original_roll, walnut_roll, raisin_roll, apple_roll);

// Function to update cart whenever a new roll is added or removed
function updateCart(roll) {
    // Select DOM elements that will be manipulated
    const cartWrapper = document.querySelector('.product-cart-wrapper');
    const checkoutSection = document.querySelector('.checkout-section');
    const checkoutPrice = document.querySelector('.checkout-price');

    // create a new div element to represent the roll in the cart
    const newRoll = document.createElement('div');
    newRoll.id = 'item-listing';

    // create and configure image container for product image
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('item-image');
    const productImage = document.createElement('img');
    productImage.classList.add('product-image');
    let productImagePath = "assets/products/" + rolls[roll.type].imageFile;
    productImage.src = productImagePath;

    // create a remove button for the roll
    const removeButton = document.createElement('p');
    removeButton.classList.add('remove');
    removeButton.textContent = 'Remove';

    // append image and remove button to the image container
    imageDiv.appendChild(productImage);
    imageDiv.appendChild(removeButton);

    // create and configure the container for item details
    const itemDetailsDiv = document.createElement('div');
    itemDetailsDiv.classList.add('item-details');
    const itemName = document.createElement('p');
    itemName.textContent = roll.type + " Cinnamon Roll";
    const itemGlazing = document.createElement('p');
    itemGlazing.textContent = "Glazing: " + roll.glazing;
    const itemPackSize = document.createElement('p');
    itemPackSize.textContent = "Pack Size: " + roll.size;

    // append details to detail container
    itemDetailsDiv.appendChild(itemName);
    itemDetailsDiv.appendChild(itemGlazing);
    itemDetailsDiv.appendChild(itemPackSize);

    // Create and configure container for item's price 
    const itemPriceDiv = document.createElement('div');
    itemPriceDiv.classList.add('item-price');
    const price = document.createElement('p');
    price.textContent = "$ " + roll.computeRollPrice();
    itemPriceDiv.appendChild(price); // append price to price container

    // append image, details, and price containers to new roll element
    newRoll.appendChild(imageDiv);
    newRoll.appendChild(itemDetailsDiv);
    newRoll.appendChild(itemPriceDiv);

    // append newRoll to cart, above the checkout section
    cartWrapper.insertBefore(newRoll, checkoutSection);

    // Update the total price in the checkout section
    const currCartPrice = parseFloat(checkoutPrice.textContent.replace("$", ""));
    const currRollPrice = parseFloat(price.textContent.replace("$", ""));
    const updatedPrice = "$ " + (currCartPrice + currRollPrice).toFixed(2);
    checkoutPrice.textContent = updatedPrice; // add to current price

    // add event listener to remove button to handle removal of rolls
    removeButton.addEventListener('click', function() {
        cartWrapper.removeChild(newRoll);
        // Recaculate and update total price after removal
        const currCartPrice = parseFloat(checkoutPrice.textContent.replace("$", ""));
        const currRollPrice = parseFloat(price.textContent.replace("$", ""));
        const updatedPrice = "$ " + (currCartPrice - currRollPrice).toFixed(2);
        checkoutPrice.textContent = updatedPrice;
    });
}

// Iterate over cart array and update the rest of the cart
for (let i = 0; i < cart.length; i++) {
    updateCart(cart[i]);
}
