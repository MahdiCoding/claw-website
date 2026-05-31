// ============================================================
//  CLAW — APP LOGIC
// ============================================================

let currentLang = 'en';
let cart = [];
let currentFilter = 'all';

// ── Language Toggle ──────────────────────────────────────────
function toggleLang() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  const html = document.documentElement;
  const toggleBtn = document.getElementById('langToggle');

  if (currentLang === 'ar') {
    html.setAttribute('lang', 'ar');
    html.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl');
    toggleBtn.textContent = 'EN';
  } else {
    html.setAttribute('lang', 'en');
    html.setAttribute('dir', 'ltr');
    document.body.classList.remove('rtl');
    toggleBtn.textContent = 'عربي';
  }

  // Update all translatable elements
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });

  // Re-render products with new language
  renderProducts(currentFilter);
  renderCart();
}

// ── Render Products ──────────────────────────────────────────
function renderProducts(filter = 'all') {
  currentFilter = filter;
  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="no-products" data-en="No items found." data-ar="لا توجد منتجات.">No items found.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const name     = currentLang === 'ar' ? p.nameAr : p.name;
    const badge    = p.soldOut ? (currentLang === 'ar' ? 'نفذت الكمية' : 'SOLD OUT') : (currentLang === 'ar' ? p.badgeAr : p.badge);
    const imgSrc   = p.image;
    const onSale   = p.salePrice && p.salePrice > 0;
    const addLabel = currentLang === 'ar' ? 'أضف للحقيبة' : 'Add to Bag';
    const soldLabel = currentLang === 'ar' ? 'نفذت الكمية' : 'Sold Out';

    const sizes = p.sizes.map(s =>
      `<button class="size-btn${p.soldOut ? ' disabled' : ''}" ${p.soldOut ? 'disabled' : `onclick="selectSize(this, ${p.id})"`}>${s}</button>`
    ).join('');

    const priceHTML = onSale
      ? `<p class="product-price"><span class="price-original">EGP ${p.price.toLocaleString()}</span> <span class="price-sale">EGP ${p.salePrice.toLocaleString()}</span></p>`
      : `<p class="product-price">EGP ${p.price.toLocaleString()}</p>`;

    const overlayBtn = p.soldOut
      ? `<button class="quick-add sold-out-btn" disabled>${soldLabel}</button>`
      : `<button class="quick-add" onclick="quickAdd(${p.id})">${addLabel}</button>`;

    return `
      <div class="product-card${p.soldOut ? ' is-sold-out' : ''}" data-id="${p.id}">
        <div class="product-img-wrap">
          <img src="${imgSrc}" alt="${name}" onerror="this.parentElement.classList.add('no-img')" loading="lazy" />
          ${badge ? `<span class="product-badge${p.soldOut ? ' badge-soldout' : ''}">${badge}</span>` : ''}
          <div class="product-overlay">${overlayBtn}</div>
        </div>
        <div class="product-info">
          <h3 class="product-name">${name}</h3>
          ${priceHTML}
          <div class="size-selector" id="sizes-${p.id}">${sizes}</div>
        </div>
      </div>`;
  }).join('');
}

function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Update filter button labels
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.textContent = b.getAttribute(`data-${currentLang}`);
  });
  renderProducts(cat);
}

// ── Size Selection ───────────────────────────────────────────
function selectSize(btn, productId) {
  const container = document.getElementById(`sizes-${productId}`);
  container.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function getSelectedSize(productId) {
  const container = document.getElementById(`sizes-${productId}`);
  if (!container) return null;
  const selected = container.querySelector('.size-btn.selected');
  return selected ? selected.textContent : null;
}

// ── Cart Logic ───────────────────────────────────────────────
function quickAdd(productId) {
  const size = getSelectedSize(productId);
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // If only ONE SIZE, skip size check
  if (product.sizes.length > 1 && !size) {
    // Flash size selector
    const container = document.getElementById(`sizes-${productId}`);
    container.classList.add('shake');
    setTimeout(() => container.classList.remove('shake'), 500);
    return;
  }

  const selectedSize = size || product.sizes[0];
  const cartKey = `${productId}-${selectedSize}`;
  const existing = cart.find(i => i.key === cartKey);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      key: cartKey,
      productId,
      size: selectedSize,
      name: product.name,
      nameAr: product.nameAr,
      price: product.price,
      qty: 1
    });
  }

  updateCartCount();
  renderCart();
  openCart();
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  updateCartCount();
  renderCart();
}

function changeQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(key);
  else { updateCartCount(); renderCart(); }
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = total;
  document.getElementById('cartCount').style.display = total > 0 ? 'flex' : 'none';
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer    = document.getElementById('cartFooter');

  if (cart.length === 0) {
    const msg = currentLang === 'ar' ? 'حقيبتك فارغة.' : 'Your bag is empty.';
    container.innerHTML = `<p class="empty-cart">${msg}</p>`;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  let total = 0;

  container.innerHTML = cart.map(item => {
    const name = currentLang === 'ar' ? item.nameAr : item.name;
    const subtotal = item.price * item.qty;
    total += subtotal;
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <p class="cart-item-name">${name}</p>
          <p class="cart-item-meta">${item.size} — EGP ${item.price.toLocaleString()}</p>
        </div>
        <div class="cart-item-controls">
          <button onclick="changeQty('${item.key}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.key}', 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart('${item.key}')">✕</button>
        </div>
      </div>`;
  }).join('');

  document.getElementById('cartTotal').textContent = `EGP ${total.toLocaleString()}`;
}

// ── Cart Sidebar ─────────────────────────────────────────────
function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('show');
}

// ── Checkout / Order ─────────────────────────────────────────
function checkout() {
  if (cart.length === 0) return;
  document.getElementById('orderModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
}

async function submitOrder() {
  const name    = document.getElementById('orderName').value.trim();
  const phone   = document.getElementById('orderPhone').value.trim();
  const address = document.getElementById('orderAddress').value.trim();

  if (!name || !phone || !address) {
    const msg = currentLang === 'ar' ? 'يرجى ملء جميع الحقول.' : 'Please fill in all fields.';
    alert(msg);
    return;
  }

  const FORMSPREE_ID = 'xbdbaopa';

  const itemLines = cart.map(item =>
    `${item.name} (${item.size}) x${item.qty} - EGP ${(item.price * item.qty).toLocaleString()}`
  ).join(' | ');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const confirmBtn = document.querySelector('#orderModal .btn-primary');
  const originalText = confirmBtn.textContent;
  confirmBtn.textContent = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
  confirmBtn.disabled = true;

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: 'New CLAW Order - ' + name,
        Customer_Name: name,
        Phone_Number: phone,
        Delivery_Address: address,
        Order_Items: itemLines,
        Order_Total: 'EGP ' + total.toLocaleString(),
        Payment_Method: 'Cash on Delivery'
      })
    });

    if (res.ok) {
      closeModal();
      toggleCart();
      cart = [];
      updateCartCount();
      renderCart();
      document.getElementById('successModal').style.display = 'flex';
    } else {
      throw new Error('Failed');
    }
  } catch (err) {
    const msg = currentLang === 'ar'
      ? 'حدث خطأ، يرجى المحاولة مرة أخرى.'
      : 'Something went wrong. Please try again.';
    alert(msg);
    confirmBtn.textContent = originalText;
    confirmBtn.disabled = false;
  }
}

function closeSuccess() {
  document.getElementById('successModal').style.display = 'none';
}

// ── Navbar scroll effect ─────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
  // Apply translations initially
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute('data-en');
  });
});
