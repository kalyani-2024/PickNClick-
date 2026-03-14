/* ============================================================
   PickNClick Store — app.js
   Complete e-commerce logic: products, cart, search, checkout
   ============================================================ */

// ─── Product Data ────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Wireless Pro Headphones',
    description: 'Premium noise-cancelling headphones with 40hr battery life and studio-quality sound.',
    price: 149.99,
    comparePrice: 199.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
    stock: 15,
    rating: 4.8,
    reviewCount: 234,
    featured: true,
    badge: 'Best Seller'
  },
  {
    id: 'prod-002',
    name: 'Smart Fitness Watch',
    description: 'Track your health with GPS, heart-rate monitor, and 7-day battery life.',
    price: 89.99,
    comparePrice: 129.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format',
    stock: 8,
    rating: 4.6,
    reviewCount: 189,
    featured: true,
    badge: 'New'
  },
  {
    id: 'prod-003',
    name: 'Leather Travel Backpack',
    description: 'Handcrafted genuine leather backpack with laptop compartment and anti-theft pocket.',
    price: 79.99,
    comparePrice: 109.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
    stock: 12,
    rating: 4.7,
    reviewCount: 156,
    featured: false,
    badge: null
  },
  {
    id: 'prod-004',
    name: 'Air Boost Running Shoes',
    description: 'Ultra-lightweight running shoes with responsive cushioning and breathable mesh.',
    price: 124.99,
    comparePrice: 159.99,
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
    stock: 6,
    rating: 4.9,
    reviewCount: 312,
    featured: true,
    badge: 'Top Rated'
  },
 
  {
    id: 'prod-006',
    name: 'Artisan Coffee Maker',
    description: 'Pour-over coffee maker with precision temperature control and built-in grinder.',
    price: 69.99,
    comparePrice: 89.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&auto=format',
    stock: 10,
    rating: 4.5,
    reviewCount: 145,
    featured: false,
    badge: 'Sale'
  },
  {
    id: 'prod-007',
    name: 'Polarized Sunglasses',
    description: 'UV400 polarized lenses with titanium frame. Lightweight and scratch-resistant.',
    price: 59.99,
    comparePrice: 79.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format',
    stock: 14,
    rating: 4.3,
    reviewCount: 87,
    featured: false,
    badge: null
  },
  {
    id: 'prod-008',
    name: 'RGB Mechanical Keyboard',
    description: 'Hot-swappable switches, per-key RGB lighting, and aircraft-grade aluminum frame.',
    price: 109.99,
    comparePrice: 139.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop&auto=format',
    stock: 7,
    rating: 4.7,
    reviewCount: 203,
    featured: true,
    badge: 'Popular'
  },
  {
    id: 'prod-009',
    name: 'Ceramic Plant Pot Set',
    description: 'Set of 3 handmade ceramic pots with bamboo trays. Perfect for succulents.',
    price: 34.99,
    comparePrice: 49.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&auto=format',
    stock: 25,
    rating: 4.6,
    reviewCount: 76,
    featured: false,
    badge: null
  },
  {
    id: 'prod-010',
    name: 'Classic Canvas Sneakers',
    description: 'Timeless canvas sneakers with vulcanized rubber sole. Available in 8 colors.',
    price: 54.99,
    comparePrice: 74.99,
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&auto=format',
    stock: 18,
    rating: 4.5,
    reviewCount: 167,
    featured: false,
    badge: null
  },
  {
    id: 'prod-011',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof 360° speaker with 20hr battery and deep bass boost technology.',
    price: 39.99,
    comparePrice: 59.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&auto=format',
    stock: 22,
    rating: 4.4,
    reviewCount: 134,
    featured: false,
    badge: 'Sale'
  },
  {
    id: 'prod-012',
    name: 'Slim Leather Wallet',
    description: 'RFID-blocking minimalist wallet. Holds 8 cards with quick-access slot.',
    price: 29.99,
    comparePrice: 44.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop&auto=format',
    stock: 30,
    rating: 4.8,
    reviewCount: 221,
    featured: false,
    badge: null
  }
];

// ─── State ───────────────────────────────────────────────────
const state = {
  cart: JSON.parse(localStorage.getItem('pnc-cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('pnc-wishlist')) || [],
  currentCategory: 'all',
  currentSort: 'recommended',
  searchQuery: '',
  cartOpen: false,
  checkoutStep: 0
};

// ─── Helpers ─────────────────────────────────────────────────
function $(s, p) { return (p || document).querySelector(s); }
function $$(s, p) { return [...(p || document).querySelectorAll(s)]; }
function fmt(n) { return '$' + n.toFixed(2); }
function debounce(fn, ms = 300) {
  let t;
  return function (...a) { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

// ─── Initialization ──────────────────────────────────────────
function init() {
  renderProducts(getFilteredProducts());
  renderCart();
  updateCartBadge();
  setupEventListeners();
  setupScrollAnimations();
  initParticles();
  initTiltCards();
  $('#footer-year').textContent = new Date().getFullYear();

  // close loading screen
  setTimeout(() => {
    const loader = $('#loading-screen');
    if (loader) {
      loader.classList.add('loaded');
      setTimeout(() => loader.remove(), 600);
    }
  }, 800);
}

// ─── Product Rendering ───────────────────────────────────────
function renderProducts(products) {
  const grid = $('#product-grid');
  const template = $('#product-card-template');
  grid.innerHTML = '';

  if (products.length === 0) {
    grid.innerHTML = `<div class="catalog__empty">
      <p>😕 No products found matching your search.</p>
      <button class="btn btn--secondary" onclick="resetFilters()">Clear Filters</button>
    </div>`;
    return;
  }

  products.forEach((product, i) => {
    const card = template.content.cloneNode(true);
    const article = card.querySelector('.product');

    article.dataset.productId = product.id;
    article.style.animationDelay = `${i * 0.08}s`;
    article.classList.add('animate-in');

    // badge
    if (product.badge) {
      const badge = document.createElement('span');
      badge.className = 'product__badge';
      badge.textContent = product.badge;
      article.prepend(badge);
    }

    // image
    const img = card.querySelector('.product__image');
    img.src = product.image;
    img.alt = product.name;

    // text
    card.querySelector('.product__title').textContent = product.name;
    card.querySelector('.product__description').textContent = product.description;
    card.querySelector('.product__price').textContent = fmt(product.price);

    const compare = card.querySelector('.product__price--compare');
    if (product.comparePrice) {
      compare.textContent = fmt(product.comparePrice);
    } else {
      compare.style.display = 'none';
    }

    // stock
    const stockEl = card.querySelector('.product__stock');
    if (product.stock > 10) {
      stockEl.textContent = '✓ In Stock';
      stockEl.className = 'product__stock product__stock--in';
    } else if (product.stock > 0) {
      stockEl.textContent = `⚡ Only ${product.stock} left`;
      stockEl.className = 'product__stock product__stock--low';
    } else {
      stockEl.textContent = '✗ Out of Stock';
      stockEl.className = 'product__stock product__stock--out';
    }

    // rating
    const ratingEl = document.createElement('div');
    ratingEl.className = 'product__rating';
    ratingEl.innerHTML = renderStars(product.rating) +
      `<span class="product__rating-count">(${product.reviewCount})</span>`;
    card.querySelector('.product__pricing').after(ratingEl);

    // wishlist state
    const favBtn = card.querySelector('.product__favorite');
    if (state.wishlist.includes(product.id)) {
      favBtn.textContent = '★';
      favBtn.setAttribute('aria-pressed', 'true');
      favBtn.classList.add('active');
    }

    // disable add-to-cart if out of stock
    const addBtn = card.querySelector('.product__add');
    if (product.stock <= 0) {
      addBtn.disabled = true;
      addBtn.textContent = 'Sold Out';
    }

    // category tag
    const catTag = document.createElement('span');
    catTag.className = 'product__category';
    catTag.textContent = product.category;
    card.querySelector('.product__body').prepend(catTag);

    grid.appendChild(card);
  });
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// ─── Filtering & Sorting ────────────────────────────────────
function getFilteredProducts() {
  let products = [...PRODUCTS];

  // category filter
  if (state.currentCategory !== 'all') {
    products = products.filter(p => p.category === state.currentCategory);
  }

  // search filter
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // sort
  switch (state.currentSort) {
    case 'price-asc':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    case 'recommended':
    default:
      products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return products;
}

function handleSearch(e) {
  state.searchQuery = e.target.value.trim();
  renderProducts(getFilteredProducts());
}

function handleSort(e) {
  state.currentSort = e.target.value;
  renderProducts(getFilteredProducts());
}

function handleCategoryFilter(category) {
  state.currentCategory = category;
  $$('.category-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  renderProducts(getFilteredProducts());
}

function resetFilters() {
  state.searchQuery = '';
  state.currentCategory = 'all';
  state.currentSort = 'recommended';
  $('#search-input').value = '';
  $('#sort-select').value = 'recommended';
  $$('.category-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === 'all');
  });
  renderProducts(getFilteredProducts());
}

// ─── Cart Operations ────────────────────────────────────────
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || product.stock <= 0) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    const newQty = Math.min(existing.qty + quantity, product.stock, 9);
    existing.qty = newQty;
  } else {
    state.cart.push({ id: productId, qty: Math.min(quantity, product.stock, 9) });
  }

  saveCart();
  renderCart();
  updateCartBadge();
  animateCartBadge();
  showToast(`${product.name} added to cart!`, 'success');

  // open cart drawer
  if (!state.cartOpen) openCart();
}

function removeFromCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  updateCartBadge();
  if (product) showToast(`${product.name} removed from cart`, 'info');
}

function updateCartQty(productId, qty) {
  const product = PRODUCTS.find(p => p.id === productId);
  const item = state.cart.find(i => i.id === productId);
  if (!item || !product) return;

  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }

  item.qty = Math.min(qty, product.stock, 9);
  saveCart();
  renderCart();
  updateCartBadge();
}

function calculateTotals() {
  const subtotal = state.cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

function renderCart() {
  const cartItems = $('#cart-items');
  const emptyMsg = $('#cart-empty-msg');
  const checkoutBtn = $('#checkout-btn');
  const { subtotal, tax, total } = calculateTotals();

  cartItems.innerHTML = '';

  if (state.cart.length === 0) {
    emptyMsg.style.display = 'block';
    checkoutBtn.disabled = true;
  } else {
    emptyMsg.style.display = 'none';
    checkoutBtn.disabled = false;

    state.cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return;

      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerHTML = `
        <span class="cart__item-title">${product.name}</span>
        <span class="cart__item-price">${fmt(product.price * item.qty)}</span>
        <div class="cart__item-meta">
          <button class="cart__qty-btn" onclick="updateCartQty('${product.id}', ${item.qty - 1})" aria-label="Decrease">−</button>
          <span class="cart__qty-display">${item.qty}</span>
          <button class="cart__qty-btn" onclick="updateCartQty('${product.id}', ${item.qty + 1})" aria-label="Increase">+</button>
        </div>
        <div class="cart__item-actions">
          <button class="cart__remove-btn" onclick="removeFromCart('${product.id}')" aria-label="Remove ${product.name}">✕</button>
        </div>
      `;
      cartItems.appendChild(li);
    });
  }

  $('#cart-subtotal').textContent = fmt(subtotal);
  $('#cart-tax').textContent = fmt(tax);
  $('#cart-total').textContent = fmt(total);
}

function updateCartBadge() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  $('.header-cart__count').textContent = count;
}

function saveCart() {
  localStorage.setItem('pnc-cart', JSON.stringify(state.cart));
}

// ─── Wishlist ────────────────────────────────────────────────
function toggleWishlist(productId) {
  const idx = state.wishlist.indexOf(productId);
  const product = PRODUCTS.find(p => p.id === productId);

  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast(`${product?.name} removed from wishlist`, 'info');
  } else {
    state.wishlist.push(productId);
    showToast(`${product?.name} added to wishlist!`, 'success');
  }

  localStorage.setItem('pnc-wishlist', JSON.stringify(state.wishlist));

  // update UI
  const card = $(`.product[data-product-id="${productId}"]`);
  if (card) {
    const btn = card.querySelector('.product__favorite');
    const isWished = state.wishlist.includes(productId);
    btn.textContent = isWished ? '★' : '☆';
    btn.setAttribute('aria-pressed', isWished);
    btn.classList.toggle('active', isWished);
  }
}

// ─── Cart Drawer ─────────────────────────────────────────────
function openCart() {
  state.cartOpen = true;
  const cart = $('#cart-panel');
  cart.classList.remove('cart--hidden');
  cart.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  state.cartOpen = false;
  const cart = $('#cart-panel');
  cart.classList.add('cart--hidden');
  cart.setAttribute('aria-hidden', 'true');
}

// ─── Checkout Flow ───────────────────────────────────────────
function openCheckout() {
  if (state.cart.length === 0) return;
  state.checkoutStep = 1;
  const modal = $('#checkout-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderCheckoutStep();
}

function closeCheckout() {
  const modal = $('#checkout-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  state.checkoutStep = 0;
}

function renderCheckoutStep() {
  const container = $('#checkout-content');
  const { subtotal, tax, total } = calculateTotals();

  switch (state.checkoutStep) {
    case 1: // Review
      container.innerHTML = `
        <h3>Review Your Order</h3>
        <div class="checkout__items">
          ${state.cart.map(item => {
        const p = PRODUCTS.find(pr => pr.id === item.id);
        return `<div class="checkout__item">
              <img src="${p.image}" alt="${p.name}" class="checkout__item-img" />
              <div>
                <p class="checkout__item-name">${p.name}</p>
                <p class="checkout__item-qty">Qty: ${item.qty}</p>
              </div>
              <span class="checkout__item-price">${fmt(p.price * item.qty)}</span>
            </div>`;
      }).join('')}
        </div>
        <div class="checkout__promo">
          <input type="text" id="promo-input" placeholder="Promo code" class="checkout__promo-input" />
          <button class="btn btn--secondary" onclick="applyPromo()">Apply</button>
        </div>
        <div class="checkout__totals">
          <div><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
          <div><span>Tax (8%)</span><span>${fmt(tax)}</span></div>
          <div class="checkout__total-line"><span>Total</span><span>${fmt(total)}</span></div>
        </div>
        <button class="btn btn--primary btn--full" onclick="nextCheckoutStep()">Continue to Shipping →</button>
      `;
      break;

    case 2: // Shipping
      container.innerHTML = `
        <h3>Shipping Details</h3>
        <form id="shipping-form" class="checkout__form" onsubmit="event.preventDefault(); nextCheckoutStep();">
          <div class="form-row">
            <div class="form-group">
              <label for="ship-fname">First Name</label>
              <input type="text" id="ship-fname" required placeholder="John" />
            </div>
            <div class="form-group">
              <label for="ship-lname">Last Name</label>
              <input type="text" id="ship-lname" required placeholder="Doe" />
            </div>
          </div>
          <div class="form-group">
            <label for="ship-email">Email</label>
            <input type="email" id="ship-email" required placeholder="john@example.com" />
          </div>
          <div class="form-group">
            <label for="ship-address">Address</label>
            <input type="text" id="ship-address" required placeholder="123 Main St" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="ship-city">City</label>
              <input type="text" id="ship-city" required placeholder="New York" />
            </div>
            <div class="form-group">
              <label for="ship-zip">ZIP Code</label>
              <input type="text" id="ship-zip" required placeholder="10001" pattern="[0-9]{5}" />
            </div>
          </div>
          <button type="submit" class="btn btn--primary btn--full">Continue to Payment →</button>
        </form>
        <button class="btn btn--ghost" onclick="prevCheckoutStep()">← Back to Review</button>
      `;
      break;

    case 3: // Payment
      container.innerHTML = `
        <h3>Payment</h3>
        <form id="payment-form" class="checkout__form" onsubmit="event.preventDefault(); submitOrder();">
          <div class="form-group">
            <label for="card-name">Cardholder Name</label>
            <input type="text" id="card-name" required placeholder="JOHN DOE" />
          </div>
          <div class="form-group">
            <label for="card-number">Card Number</label>
            <input type="text" id="card-number" required placeholder="4242 4242 4242 4242" maxlength="19"
              oninput="this.value = this.value.replace(/[^0-9]/g,'').replace(/(.{4})/g,'$1 ').trim()" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="card-expiry">Expiry</label>
              <input type="text" id="card-expiry" required placeholder="MM/YY" maxlength="5"
                oninput="this.value = this.value.replace(/[^0-9]/g,'').replace(/(.{2})/, '$1/')" />
            </div>
            <div class="form-group">
              <label for="card-cvv">CVV</label>
              <input type="text" id="card-cvv" required placeholder="123" maxlength="4" />
            </div>
          </div>
          <div class="checkout__totals">
            <div class="checkout__total-line"><span>Total to Pay</span><span>${fmt(total)}</span></div>
          </div>
          <button type="submit" class="btn btn--primary btn--full checkout__pay-btn">
            <span class="btn__text">Pay ${fmt(total)}</span>
            <span class="btn__loader" style="display:none;">Processing...</span>
          </button>
        </form>
        <button class="btn btn--ghost" onclick="prevCheckoutStep()">← Back to Shipping</button>
      `;
      break;

    case 4: // Confirmation
      const orderId = 'PNC-' + Date.now().toString(36).toUpperCase();
      container.innerHTML = `
        <div class="checkout__confirmation">
          <div class="checkout__check-icon">✓</div>
          <h3>Order Confirmed!</h3>
          <p>Thank you for your purchase. Your order ID is:</p>
          <p class="checkout__order-id">${orderId}</p>
          <p class="checkout__note">A confirmation email will be sent shortly.</p>
          <button class="btn btn--primary" onclick="finishCheckout()">Continue Shopping</button>
        </div>
      `;
      createConfetti();
      break;
  }

  // Update step indicator
  $$('.checkout__step').forEach((step, i) => {
    step.classList.toggle('active', i < state.checkoutStep);
    step.classList.toggle('current', i + 1 === state.checkoutStep);
  });
}

function nextCheckoutStep() {
  if (state.checkoutStep < 4) {
    state.checkoutStep++;
    renderCheckoutStep();
  }
}

function prevCheckoutStep() {
  if (state.checkoutStep > 1) {
    state.checkoutStep--;
    renderCheckoutStep();
  }
}

function submitOrder() {
  const payBtn = $('.checkout__pay-btn');
  if (payBtn) {
    payBtn.querySelector('.btn__text').style.display = 'none';
    payBtn.querySelector('.btn__loader').style.display = 'inline';
    payBtn.disabled = true;
  }

  // Simulate payment processing
  setTimeout(() => {
    state.cart = [];
    saveCart();
    renderCart();
    updateCartBadge();
    closeCart();
    state.checkoutStep = 4;
    renderCheckoutStep();
  }, 1500);
}

function finishCheckout() {
  closeCheckout();
  renderProducts(getFilteredProducts());
}

function applyPromo() {
  const input = $('#promo-input');
  const code = input.value.trim().toUpperCase();
  const validCodes = { 'SAVE10': 10, 'WELCOME': 15, 'PICKNCLICK': 20 };

  if (validCodes[code]) {
    showToast(`🎉 Promo applied! ${validCodes[code]}% off`, 'success');
    input.classList.add('valid');
  } else {
    showToast('Invalid promo code', 'error');
    input.classList.add('error');
    setTimeout(() => input.classList.remove('error'), 1000);
  }
}

// ─── Product Detail Modal ────────────────────────────────────
function openProductDetail(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = $('#product-modal');
  const isWished = state.wishlist.includes(product.id);
  const savings = product.comparePrice ? product.comparePrice - product.price : 0;

  // Suggest related products
  const related = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  modal.querySelector('.modal__content').innerHTML = `
    <div class="product-detail">
      <div class="product-detail__gallery">
        <img src="${product.image}" alt="${product.name}" class="product-detail__img" />
        ${product.badge ? `<span class="product__badge product__badge--lg">${product.badge}</span>` : ''}
      </div>
      <div class="product-detail__info">
        <span class="product__category">${product.category}</span>
        <h2 class="product-detail__title">${product.name}</h2>
        <div class="product__rating product__rating--lg">
          ${renderStars(product.rating)}
          <span>(${product.reviewCount} reviews)</span>
        </div>
        <p class="product-detail__desc">${product.description}</p>
        <div class="product-detail__pricing">
          <span class="product-detail__price">${fmt(product.price)}</span>
          ${product.comparePrice ? `<span class="product__price--compare">${fmt(product.comparePrice)}</span>` : ''}
          ${savings > 0 ? `<span class="product-detail__savings">Save ${fmt(savings)}</span>` : ''}
        </div>
        <div class="product-detail__stock ${product.stock <= 5 ? 'low' : ''}">
          ${product.stock > 0 ? `${product.stock > 10 ? '✓ In Stock' : `⚡ Only ${product.stock} left!`}` : '✗ Out of Stock'}
        </div>
        <div class="product-detail__actions">
          <div class="product-detail__qty">
            <button onclick="document.getElementById('detail-qty').stepDown()" class="qty-btn">−</button>
            <input type="number" id="detail-qty" value="1" min="1" max="${Math.min(product.stock, 9)}" />
            <button onclick="document.getElementById('detail-qty').stepUp()" class="qty-btn">+</button>
          </div>
          <button class="btn btn--primary btn--full" onclick="addToCart('${product.id}', parseInt($('#detail-qty').value)); closeProductDetail();" ${product.stock <= 0 ? 'disabled' : ''}>
            ${product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
          </button>
          <button class="btn btn--ghost product-detail__wish" onclick="toggleWishlist('${product.id}')">
            ${isWished ? '★ In Wishlist' : '☆ Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
    ${related.length > 0 ? `
    <div class="product-detail__related">
      <h4>You Might Also Like</h4>
      <div class="related-grid">
        ${related.map(r => `
          <div class="related-card" onclick="openProductDetail('${r.id}')">
            <img src="${r.image}" alt="${r.name}" />
            <p>${r.name}</p>
            <span>${fmt(r.price)}</span>
          </div>
        `).join('')}
      </div>
    </div>` : ''}
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
  const modal = $('#product-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ─── Toast Notifications ─────────────────────────────────────
function showToast(message, type = 'info') {
  const container = $('#toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__msg">${message}</span>
    <button class="toast__close" onclick="this.parentElement.remove()">✕</button>
  `;
  container.appendChild(toast);

  // auto dismiss
  setTimeout(() => {
    toast.classList.add('toast--exit');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ─── Mobile Navigation ──────────────────────────────────────
function toggleMobileNav() {
  const toggle = $('.nav__toggle');
  const menu = $('#nav-menu');
  const expanded = toggle.getAttribute('aria-expanded') === 'true';

  toggle.setAttribute('aria-expanded', !expanded);
  menu.classList.toggle('nav__list--open', !expanded);
  toggle.textContent = expanded ? '☰' : '✕';
}

// ─── Smooth Scrolling ────────────────────────────────────────
function smoothScrollTo(target) {
  const el = document.querySelector(target);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ─── Animations ──────────────────────────────────────────────
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  $$('.scroll-reveal').forEach(el => observer.observe(el));

  // re-observe on new products
  const gridObserver = new MutationObserver(() => {
    $$('.product:not(.revealed)').forEach(el => observer.observe(el));
  });
  gridObserver.observe($('#product-grid'), { childList: true });
}

function animateCartBadge() {
  const badge = $('.header-cart__count');
  badge.classList.add('pulse');
  setTimeout(() => badge.classList.remove('pulse'), 400);
}

function initTiltCards() {
  document.addEventListener('mousemove', (e) => {
    $$('.product').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      } else {
        card.style.transform = '';
      }
    });
  });
}

// ─── Particle Background ────────────────────────────────────
function initParticles() {
  const canvas = $('#particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const count = 60;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    };
  }

  function initParticleArray() {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(76, 141, 255, ${p.opacity})`;
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(76, 141, 255, ${0.1 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  initParticleArray();
  draw();
  window.addEventListener('resize', () => { resize(); initParticleArray(); });
}

// ─── Confetti ────────────────────────────────────────────────
function createConfetti() {
  const container = $('#checkout-content');
  const colors = ['#4c8dff', '#7f5dff', '#f97373', '#a3e635', '#fbbf24', '#f472b6'];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 2}s;
      animation-duration: ${2 + Math.random() * 2}s;
    `;
    container.appendChild(confetti);
  }

  setTimeout(() => $$('.confetti').forEach(c => c.remove()), 5000);
}

// ─── Event Listeners ─────────────────────────────────────────
function setupEventListeners() {
  // Search
  $('#search-input').addEventListener('input', debounce(handleSearch, 250));

  // Sort
  $('#sort-select').addEventListener('change', handleSort);

  // Category pills
  $$('.category-pill').forEach(btn => {
    btn.addEventListener('click', () => handleCategoryFilter(btn.dataset.category));
  });

  // Cart open/close
  $('[data-open-cart]').addEventListener('click', openCart);
  $('[data-close-cart]').addEventListener('click', closeCart);

  // Mobile nav
  $('.nav__toggle').addEventListener('click', toggleMobileNav);

  // Scroll buttons
  $$('[data-scroll-target]').forEach(btn => {
    btn.addEventListener('click', () => smoothScrollTo(btn.dataset.scrollTarget));
  });

  // Product grid — delegated events
  $('#product-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.product');
    if (!card) return;
    const productId = card.dataset.productId;

    // Add to cart
    if (e.target.closest('.product__add')) {
      const qtyInput = card.querySelector('.product__qty-input');
      const qty = parseInt(qtyInput?.value || 1);
      addToCart(productId, qty);
      if (qtyInput) qtyInput.value = 1;
      return;
    }

    // Favorite
    if (e.target.closest('.product__favorite')) {
      toggleWishlist(productId);
      return;
    }

    // Click on card (not on button) → open detail
    if (!e.target.closest('button') && !e.target.closest('input')) {
      openProductDetail(productId);
    }
  });

  // Checkout button
  $('#checkout-btn').addEventListener('click', openCheckout);

  // Close modals
  $$('.modal__overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeProductDetail();
        closeCheckout();
      }
    });
  });

  $$('.modal__close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeProductDetail();
      closeCheckout();
    });
  });

  // Keyboard: Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if ($('#product-modal.active')) closeProductDetail();
      if ($('#checkout-modal.active')) closeCheckout();
      if (state.cartOpen) closeCart();
    }
  });

  // Back to top
  const backToTop = $('#back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Cart panel starts hidden
  closeCart();

  // Close nav on link click (mobile)
  $$('.nav__list a').forEach(link => {
    link.addEventListener('click', (e) => {
      // If it's the cart link, open it with JS
      if (link.getAttribute('href') === '#cart-panel') {
        e.preventDefault();
        openCart();
      }

      const toggle = $('.nav__toggle');
      if (toggle.getAttribute('aria-expanded') === 'true') {
        toggleMobileNav();
      }
    });
  });
}

// ─── Boot ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
