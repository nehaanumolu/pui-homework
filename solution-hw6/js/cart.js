const glazingPrices = {
    "Keep original" : 0.0,
    "Sugar milk" : 0.0,
    "Vanilla milk" : 0.50,
    "Double chocolate" : 1.50
};

const packPrices = {
    "1" : 1, "3" : 3, "6" : 5, "12" : 10
};

// the cart array
let cartItems = [];
// used to create unique ID for each role, based on the order in which it's added to cart
let rollCounter = 0;

class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
        this.calculatedPrice = (this.basePrice + glazingPrices[this.glazing]) * packPrices[this.size];
    }
}


// add a Roll instance to the DOM
// also register a function to remove this roll when the "Remove" link is clicked
function addRollToPage(roll) {
    const imagePath = `images/products/${rolls[roll.type]["imageFile"]}`;
    // HTML template for a new Roll item
    const htmlContent = `
        <div class="cart-item" id="roll-${rollCounter}">
            <div>
                <img class="product-image" src="${imagePath}">
                <p class="remove">Remove</p>
            </div>
            <div class="item-detail">
                <p>${roll.type} Cinnamon Roll</p>
                <p>${roll.glazing}</p>
                <p>Pack Size: ${roll.size}</p>
            </div>
            <div class="item-price">
                <p>$ ${roll.calculatedPrice.toFixed(2)}</p>
            </div>
        </div>
    `;
    const cartContainer = document.querySelector(".cart-wrapper");
    const template = document.createElement("template");
    template.innerHTML = htmlContent.trim();
    const cartItemElement = template.content;

    // register function to remove this roll
    let currentRollCounter = rollCounter;
    cartItemElement.querySelector(".remove").onclick = function() {
        cartContainer.querySelector(`#roll-${currentRollCounter}`).remove();

        cartItems.splice(cartItems.indexOf(roll), 1);
        const jsonCart = JSON.stringify(cartItems);
        localStorage.setItem('cartItems', jsonCart);
        console.log(localStorage.getItem('cartItems'));

        const cartLength = cartItems.length;
        const jsonCartLength = JSON.stringify(cartLength.toString());
        localStorage.setItem('cart length', jsonCartLength);

        updateCartBadge();
        updateTotalPrice();
    }

    cartContainer.appendChild(cartItemElement);
    rollCounter += 1;
}

// update the total price field based on the current cart
function updateTotalPrice() {
    let totalPrice = 0;
    cartItems.forEach(roll => totalPrice += roll.calculatedPrice);
    const totalPriceElement = document.querySelector(".total-price");
    totalPriceElement.innerText = "$ " + totalPrice.toFixed(2);
}

// attempt to retrieve cart from local storage
function retrieveFromStorage() {
	const cartJSON = localStorage.getItem('cartItems');
	if (cartJSON != null) {
		const storedCartItems = JSON.parse(cartJSON);
        console.log(storedCartItems);
        storedCartItems.forEach(item => {
            const current_roll = new Roll(item.type, item.glazing, item.size, item.basePrice);
            cartItems.push(current_roll);
            addRollToPage(current_roll);
        })

	} else {
		cartItems = [];
	}
    updateTotalPrice();
}

function updateCartBadge() {
    const cartLength = JSON.parse(localStorage.getItem('cart length'));
    const cartBadge = document.querySelector("#cart-badge");
	cartBadge.innerText = cartLength;
}

document.addEventListener('DOMContentLoaded', retrieveFromStorage);
updateCartBadge();
updateTotalPrice();