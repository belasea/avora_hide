// Wishlist storage — same localStorage pattern as cart.js, kept separate
// since it doesn't need line-item keys (just product ids).

var WISHLIST_KEY = "avorahide_wishlist";

function getWishlist() {
  try {
    var raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  updateWishlistBadge();
}

function isInWishlist(productId) {
  return getWishlist().indexOf(productId) !== -1;
}

// Returns true if the product ended up IN the wishlist after the toggle.
function toggleWishlist(productId) {
  var list = getWishlist();
  var idx = list.indexOf(productId);
  var product = PRODUCTS.find(function (p) { return p.id === productId; });

  if (idx === -1) {
    list.push(productId);
    if (product) showToast(product.name + " added to wishlist", "success");
  } else {
    list.splice(idx, 1);
    if (product) showToast(product.name + " removed from wishlist", "success");
  }

  saveWishlist(list);
  return idx === -1;
}

function removeFromWishlist(productId) {
  var list = getWishlist().filter(function (id) { return id !== productId; });
  saveWishlist(list);
}

function getWishlistProducts() {
  return getWishlist()
    .map(function (id) { return PRODUCTS.find(function (p) { return p.id === id; }); })
    .filter(Boolean);
}

function updateWishlistBadge() {
  document.querySelectorAll(".js-wishlist-count").forEach(function (el) {
    el.textContent = getWishlist().length;
  });
}

document.addEventListener("DOMContentLoaded", updateWishlistBadge);
