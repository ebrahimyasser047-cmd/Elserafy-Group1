// Cart data
let cart = [];

// Build the cart panel and the cart button
const cartButton = document.createElement('button');
cartButton.id = 'cart-button';
cartButton.textContent = 'Cart (0)';
document.querySelector('header').appendChild(cartButton);

const cartPanel = document.createElement('div');
cartPanel.id = 'cart-panel';
cartPanel.innerHTML = `
  <h3>Your Cart</h3>
  <ul id="cart-items"></ul>
  <p id="cart-total">Total: $0</p>
  <button id="clear-cart">Clear Cart</button>
`;
document.body.appendChild(cartPanel);

const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Open and close the cart panel
cartButton.addEventListener('click', () => {
  cartPanel.classList.toggle('open');
});

// Add a skin when Buy is clicked
document.querySelectorAll('.card button').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.card');
    const name = card.querySelector('h3').textContent;
    const price = parseFloat(card.querySelector('.price').textContent.replace('$', ''));

    cart.push({ name, price });
    updateCart();

    button.textContent = 'Added ✓';
    setTimeout(() => {
      button.textContent = 'Buy';
    }, 1000);
  });
});

// Remove one item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Clear everything
document.getElementById('clear-cart').addEventListener('click', () => {
  cart = [];
  updateCart();
});

// Refresh the cart on screen
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - $${item.price} <span class="remove" data-index="${index}">✕</span>`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: $${total}`;
  cartButton.textContent = `Cart (${cart.length})`;

  document.querySelectorAll('.remove').forEach((x) => {
    x.addEventListener('click', () => removeItem(Number(x.dataset.index)));
  });
}