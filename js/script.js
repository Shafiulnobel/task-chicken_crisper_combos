var catalog = [
    {
        name: "Chicken",
        desc: "Chicken Fajitas served with rice and beans, tortillas, guacamole ,salsa and sour cream",
        price: 69,
        image: "https://i.ibb.co/rbzRrBS/brooke-lark-j-UPOXXRNdc-A-unsplash.jpg"
    },
    {
        name: "Fijtaj",
        desc: "Chicken Fajitas served with rice and beans, tortillas, guacamole ,salsa and sour cream",
        price: 169,
        image: "https://i.ibb.co/ZzMrL07/davide-cantelli-jpkfc5-d-DI-unsplash.jpg"
    },

    {
        name: "Chicken Masala",
        desc: "Chicken Fajitas served with rice and beans, tortillas, guacamole ,salsa and sour cream",
        price: 269,
        image: "https://i.ibb.co/3SGrpdJ/emy-Xo-Byi-Bym-X20-unsplash.jpg"
    }
];
let cart = [];
let cartLengthElement = document.getElementById("cart-length");

const showCart = () => {
    let cartBody = document.getElementById('cart-body');
    let canvasHeader = document.getElementById('offcanvas-header');

    canvasHeader.innerHTML = `
    <h5 class="offcanvas-title" id="cartOffcanvasLabel"><i class="fa-solid fa-bag-shopping"></i> ${cart.length} items</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    `

    cartBody.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let cartInner = document.createElement("div");
        const uniqueId = `cartItem_${i}`;
        cartInner.innerHTML = `
        <div id="child${uniqueId}" class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${item.image}" class="img-fluid rounded-start h-100"   alt="${item.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text"><span class="text-body-secondary" >${item.price}</span>$/each</p>
                        <div class="input-group w-75">
                        <span class="input-group-btn">
                            <button type="button" class="quantity-left-minus btn btn-secondary btn-number" id="minus" data-type="minus" data-field="${uniqueId}">
                              <span><i class="fa-solid fa-minus"></i></span>
                            </button>
                        </span>
                        <input type="text" name="quantity" class="form-control input-number quantity"  value="${item.quantity}" min="1" max="100" id="${uniqueId}">
                        <span class="input-group-btn">
                            <button type="button" class="quantity-right-plus btn btn-secondary btn-number" id="plus" data-type="plus" data-field="${uniqueId}">
                                <span><i class="fa-solid fa-plus"></i></span>
                            </button>
                        </span>
                    </div>
                    <p class="card-text fw-bold text-end"><span class="text-body-secondary" id="price${uniqueId}">${item.price}</span>$</p>
                        <button class="btn position-absolute top-0 start-10 end-0" id="remove"><i class="fa-solid fa-trash text-danger"></i></button>
                    </div>
                </div>
            </div>
        </div>
        
        `;
        cartBody.appendChild(cartInner);


        let quantityInput = cartInner.querySelector('.quantity');
        let plusButton = cartInner.querySelector('.quantity-right-plus');
        let minusButton = cartInner.querySelector('.quantity-left-minus');

        plusButton.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateItemPrice(item, quantityInput.value,uniqueId);
            updateCartTotal();
        });

        minusButton.addEventListener('click', () => {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateItemPrice(item, quantityInput.value,uniqueId);
                updateCartTotal();
            }
        });
        const removeBtn = cartInner.querySelector('#remove');
        removeBtn.addEventListener("click", () => {
            const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        
            if (itemIndex !== -1) {
                const removedItem = cart.splice(itemIndex, 1)[0]; 
        
                
                const buttonIndex = catalog.findIndex(catalogItem => catalogItem.name === removedItem.name);
                if (buttonIndex !== -1) {
                    const clickedButton = document.getElementById(`myButton${buttonIndex}`);
                    clickedButton.disabled = false;
                    clickedButton.textContent = "Add to Order";
                }
        
                updateCartLength();
                showCart();
            }
        
            updateCartTotal();
        });

    }


}

const updateItemPrice = (item, quantity,uniqueId) => {
    const basePrice = catalog.find(catalogItem => catalogItem.name === item.name).price;
    item.price = basePrice * quantity;
    const updatedPriceElement = document.getElementById(`price${uniqueId}`);
    updatedPriceElement.innerText = item.price;

    item.quantity = quantity;
}

const updateCartTotal = () => {
    let totalPrice = cart.reduce((total, item) => total + item.price, 0);
    let cartFooter = document.getElementById('cart-footer');
    if (!cartFooter) {
        cartFooter = document.createElement('div');
        cartFooter.setAttribute("class", "offcanvas-footer position-absolute bottom-0 start-20");
        cartFooter.setAttribute("id", "cart-footer");
        document.getElementById('cart-body').appendChild(cartFooter);
    }
    cartFooter.innerHTML = `<h5 class="text-white">Place Order ${totalPrice} $</h5>`;
}
const updateCartLength = () => {
    cartLengthElement.textContent = cart.length.toString();
}

const productAdd = (index) => {
    cart.push({ ...catalog[index], quantity: 1, id: `cartItem_${cart.length}` });
    const clickedButton = document.getElementById(`myButton${index}`);
    clickedButton.disabled = true;
    clickedButton.textContent = "Added to Cart";
    console.log(cart);
    updateCartLength();
    showCart();
    showCartOffcanvas();
    updateCartTotal();
}
const showCartOffcanvas = () => {
    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartOffcanvas.show();
}
var contents = document.getElementById("content");
for (var i = 0; i < catalog.length; i++) {
    let contentInner = document.createElement("div");
    contentInner.setAttribute("class", "col");
    contentInner.innerHTML = `
    <div class="card h-100">
    <img src=${catalog[i].image} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${catalog[i].name}</h5>
      <p class="card-title">${catalog[i].price} $/each</p>
      <p class="card-text">${catalog[i].desc}</p>
      <button style="background-color: orange" onclick="productAdd(${i})" class="btn  w-100" id="myButton${i}">Add to Order</button>
      <button type="button" class="btn btn-outline-warning w-100 mt-3">Customize</button>
    </div>
  </div>
      `;
    contents.appendChild(contentInner);
}



