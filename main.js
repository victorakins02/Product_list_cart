function copyright() {
    // Get the HTML element with the ID 'date'
    const date = document.getElementById('date');
    
    // Get the current year using JavaScript's Date object
    const year = new Date().getFullYear();
    
    // If an element with ID 'date' exists
    if (date) {
        // Set its inner HTML content to the current year
        date.innerHTML = year;
    }
}

async function loadJson(filepath) {
    try {
        const response = await fetch(filepath);
        if (!response.ok){
            throw new Error('Network responsewas not ok')
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error loading JSON ${error.message}`)
    }
}

function toggleButton() {
    const gridwrap = document.querySelector(".grid-wrap");

    gridwrap.addEventListener("click", (e) =>{
        const cartButton = e.target.closest(".cart-button");

        if(cartButton) {
            const cartPlusMinus = cartButton.nextElementSibling;

            if(cartPlusMinus) {
                if(cartButton.classList.contains("active")){
                    cartButton.classList.remove("active");
                    cartPlusMinus.classList.add("active");

                    const gridItem = cartButton.closest(".grid-item");
                    addToCart(gridItem);
                }
            }
        }
    });
}

function addToCart(gridItem){
    const itemName = gridItem.querySelector('.tertiary-header').innerText;
    const itemPrice = parseFloat(gridItem.querySelector('.item-price').innerText.replace("$", ""));
    let currentQuantity = 1;

    const cartItem = document.createElement('article');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-label', `${itemName}`)
    cartItem.innerHTML = `
            <div class="cart-quantity">
                <p class="cart-heading">${itemName}</p>
                <div class="quantity-wrap">
                    <span class="quantity">${currentQuantity}x</span>
                    <span class="each-item">@${itemPrice.toFixed(2)}</span>
                    <span class="item-total">$${itemPrice.toFixed(2)}</span>
                </div>
            </div>
            <button class="remove-item">
                <span class="access-hidden"></span>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
            </button>
    `;

    const cartSidebar = document.querySelector('.cart-container');
    if (cartSidebar) {
        console.log("cart item");
        cartSidebar.appendChild(cartItem);
    }

    const cartButton = gridItem.querySelector(".cart-button");
    const cartPlusMinus = gridItem.querySelector(".cart-plus-minus");

    const dataGridItem = gridItem.getAttribute(`${itemName}`)
    const dataCartItem = cartItem.getAttribute(`${itemName}`)


    const removeButton = cartItem.querySelector(".remove-item");
    const itemQuantitySpan = cartItem.querySelector(".quantity");
    const itemTotalSpan = cartItem.querySelector(".item-total")
    removeButton.addEventListener("click", () => {
        cartSidebar.removeChild(cartItem);
        if (dataGridItem == dataCartItem){
            cartPlusMinus.classList.remove('active');
            cartButton.classList.add('active');
            gridItemQuantity.innerHTML = 1;
        }
    })

    const incrementButton = gridItem.querySelector(".increment");
    const decrementButton = gridItem.querySelector(".decrement");
    const gridItemQuantity = gridItem.querySelector(".item-quantity");

    incrementButton.addEventListener("click", () => {
        currentQuantity ++;
        itemQuantitySpan.innerText = `${currentQuantity}`;
        itemTotalSpan.innerText = `$${(itemPrice * currentQuantity).toFixed(2)}`;
        gridItemQuantity.innerText = `${currentQuantity}`;
    })
    decrementButton.addEventListener("click", () => {
        if (currentQuantity > 1) {
            currentQuantity --;
            itemQuantitySpan.innerText = `${currentQuantity}`;
            itemTotalSpan.innerText = `$${(itemPrice * currentQuantity).toFixed(2)}`;
            gridItemQuantity.innerText = `${currentQuantity}`;
        }
    })
}


document.addEventListener('DOMContentLoaded', () => {
    copyright();
    loadJson('json/data.json')
        .then(data => {
            const gridwrap = document.querySelector('.grid-wrap');
            data.forEach((item) => {
                const article = document.createElement('article');
                article.classList.add('grid-item');
                article.setAttribute('data-label', `${item.name}`)
                article.innerHTML = `
                    <div class="button-container">
                        <figure class="image-container">
                            <img src="${item.image.desktop}" alt="${item.name}">
                        </figure>
                        <button class="cart-button active">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                            Add to Cart
                        </button>
                        <div class="cart-plus-minus">
                            <span class="access-hidden">Cart Quantity</span>
                            <button class="decrement">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="" viewBox="0 0 10 2"><path fill="" d="M0 .375h10v1.25H0V.375Z"/></svg>
                            </button>
                            <span class="item-quantity">1</span>
                            <button class="increment">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="" viewBox="0 0 10 10"><path fill="" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                            </button>
                        </div>
                    </div>
                    <div class="item-catergory">${item.category}</div>
                    <h3 class="tertiary-header">${item.name}</h3>
                    <div class="item-price">$${item.price}</div>
                `;
                gridwrap.appendChild(article);
            });
            toggleButton();  
        })
        .catch(error => {
            console.error('Error loading JSON data: ', error);
        });
});
