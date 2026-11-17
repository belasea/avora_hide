// Cart — persisted to localStorage, no backend yet. Each line is keyed by
// product + color + size so the same product in two colors doesn't merge.

var CART_KEY = "avorahide_cart";
var SHIPPING_FLAT = 12;
var FREE_SHIPPING_THRESHOLD = 150;

function getCart() {
  try {
    var raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function cartLineKey(productId, color, size) {
  return productId + "::" + (color || "") + "::" + (size || "");
}

function addToCart(productId, qty, color, size) {
  var product = PRODUCTS.find(function (p) { return p.id === productId; });
  if (!product) return;

  qty = qty || 1;
  color = color || product.colors[0];
  size = size || (product.sizes ? product.sizes[0] : null);

  var cart = getCart();
  var key = cartLineKey(productId, color, size);
  var existing = cart.find(function (l) { return l.key === key; });

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ key: key, productId: productId, qty: qty, color: color, size: size });
  }

  saveCart(cart);
  showToast(product.name + " added to cart", "success");
}

function removeFromCart(key) {
  var cart = getCart().filter(function (l) { return l.key !== key; });
  saveCart(cart);
}

function updateCartQty(key, qty) {
  var cart = getCart();
  var line = cart.find(function (l) { return l.key === key; });
  if (!line) return;
  line.qty = Math.max(1, qty);
  saveCart(cart);
}

// Joins each cart line back up with its product record so templates
// don't have to go look it up themselves.
function getCartDetailed() {
  return getCart().map(function (line) {
    var product = PRODUCTS.find(function (p) { return p.id === line.productId; });
    if (!product) return null;
    return {
      key: line.key,
      qty: line.qty,
      color: line.color,
      size: line.size,
      product: product,
      lineTotal: product.price * line.qty
    };
  }).filter(Boolean);
}

function getCartCount() {
  return getCart().reduce(function (sum, l) { return sum + l.qty; }, 0);
}

function getCartSubtotal() {
  return getCartDetailed().reduce(function (sum, l) { return sum + l.lineTotal; }, 0);
}

function getShippingCost(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function updateCartBadge() {
  document.querySelectorAll(".js-cart-count").forEach(function (el) {
    el.textContent = getCartCount();
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
