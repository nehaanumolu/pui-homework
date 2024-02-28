

// displaying product based on url parameters
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