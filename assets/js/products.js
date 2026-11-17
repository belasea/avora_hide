// Product catalog + the HTML-generating helpers that every page pulls from.
// Keeping it all in one file so category/shop/product-details/search stay
// in sync instead of each page rolling its own card markup.

// Unsplash photos, sized on the fly via URL params. A few categories
// (shoes, bags, handmade...) use fixed Wikimedia Commons images instead
// since Unsplash didn't have a great free match for those.
function unsplash(id, w, q) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q || 75}`;
}

const IMAGES = {
  wallet: {
    card: unsplash("photo-1627123424574-724758594e93", 600),
    large: unsplash("photo-1627123424574-724758594e93", 1400, 80),
    thumb: unsplash("photo-1627123424574-724758594e93", 160, 60)
  },
  belt: {
    card: unsplash("photo-1624222247344-550fb60583dc", 600),
    large: unsplash("photo-1624222247344-550fb60583dc", 1400, 80),
    thumb: unsplash("photo-1624222247344-550fb60583dc", 160, 60)
  },
  jacketFlat: {
    card: unsplash("photo-1551028719-00167b16eac5", 600),
    large: unsplash("photo-1551028719-00167b16eac5", 1400, 80),
    thumb: unsplash("photo-1551028719-00167b16eac5", 160, 60)
  },
  jacketWorn: {
    card: unsplash("photo-1521223890158-f9f7c3d5d504", 600),
    large: unsplash("photo-1521223890158-f9f7c3d5d504", 1400, 80),
    thumb: unsplash("photo-1521223890158-f9f7c3d5d504", 160, 60)
  },
  shoesDerby: {
    card: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Mens_brown_derby_leather_shoes.jpg/500px-Mens_brown_derby_leather_shoes.jpg",
    large: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Mens_brown_derby_leather_shoes.jpg/960px-Mens_brown_derby_leather_shoes.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Mens_brown_derby_leather_shoes.jpg/500px-Mens_brown_derby_leather_shoes.jpg"
  },
  shoesPair: {
    card: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Black_and_brown_leather_shoes.jpg/500px-Black_and_brown_leather_shoes.jpg",
    large: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Black_and_brown_leather_shoes.jpg/960px-Black_and_brown_leather_shoes.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Black_and_brown_leather_shoes.jpg/500px-Black_and_brown_leather_shoes.jpg"
  },
  duffel: {
    card: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Leather_duffel_bag_on_the_ground_%28Unsplash%29.jpg/500px-Leather_duffel_bag_on_the_ground_%28Unsplash%29.jpg",
    large: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Leather_duffel_bag_on_the_ground_%28Unsplash%29.jpg/960px-Leather_duffel_bag_on_the_ground_%28Unsplash%29.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Leather_duffel_bag_on_the_ground_%28Unsplash%29.jpg/500px-Leather_duffel_bag_on_the_ground_%28Unsplash%29.jpg"
  },
  bolso: {
    card: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Bolso_artesanal_-_cuero.jpg",
    large: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Bolso_artesanal_-_cuero.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Bolso_artesanal_-_cuero.jpg"
  },
  market: {
    card: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/DFC_4174_A_close-up_of_leather_belts_and_bags_neatly_displayed_at_a_bustling_outdoor_market_stall.jpg/500px-DFC_4174_A_close-up_of_leather_belts_and_bags_neatly_displayed_at_a_bustling_outdoor_market_stall.jpg",
    large: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/DFC_4174_A_close-up_of_leather_belts_and_bags_neatly_displayed_at_a_bustling_outdoor_market_stall.jpg/960px-DFC_4174_A_close-up_of_leather_belts_and_bags_neatly_displayed_at_a_bustling_outdoor_market_stall.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/DFC_4174_A_close-up_of_leather_belts_and_bags_neatly_displayed_at_a_bustling_outdoor_market_stall.jpg/500px-DFC_4174_A_close-up_of_leather_belts_and_bags_neatly_displayed_at_a_bustling_outdoor_market_stall.jpg"
  },
  cardholder: {
    card: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Red_leather_credit_card_holder.jpg/500px-Red_leather_credit_card_holder.jpg",
    large: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Red_leather_credit_card_holder.jpg/960px-Red_leather_credit_card_holder.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Red_leather_credit_card_holder.jpg/500px-Red_leather_credit_card_holder.jpg"
  }
};

const CATEGORIES = [
  { slug: "wallets", name: "Leather Wallets", image: IMAGES.wallet.card, desc: "Slim, timeless, handcrafted." },
  { slug: "bags", name: "Leather Bags", image: IMAGES.duffel.card, desc: "Everyday carry, elevated." },
  { slug: "backpacks", name: "Leather Backpacks", image: IMAGES.duffel.card, desc: "Structured. Durable. Refined." },
  { slug: "belts", name: "Leather Belts", image: IMAGES.belt.card, desc: "The finishing touch." },
  { slug: "jackets", name: "Leather Jackets", image: IMAGES.jacketFlat.card, desc: "Timeless outerwear." },
  { slug: "shoes", name: "Leather Shoes", image: IMAGES.shoesDerby.card, desc: "Step into craftsmanship." },
  { slug: "accessories", name: "Leather Accessories", image: IMAGES.cardholder.card, desc: "Small details, big impression." },
  { slug: "handmade", name: "Handmade Leather Products", image: IMAGES.bolso.card, desc: "Made entirely by hand." },
  { slug: "gifts", name: "Premium Gift Collections", image: IMAGES.wallet.card, desc: "Curated sets worth giving." }
];

// Swatch hexes used both for the filter dots and the product color options
const COLORS = {
  espresso: { name: "Deep Espresso", hex: "#2B211B" },
  darkBrown: { name: "Dark Brown", hex: "#3B2A20" },
  cognac: { name: "Cognac", hex: "#A66A3F" },
  tan: { name: "Warm Tan", hex: "#C49A6C" },
  black: { name: "Jet Black", hex: "#1C1816" },
  burgundy: { name: "Burgundy", hex: "#6E2E2A" }
};

// daysOld / sold are just used for the "Newest" and "Best Selling" sorts —
// not meant to be exact, just enough spread to make sorting look believable
const PRODUCTS = [
  // -- wallets
  { id: 1, slug: "heritage-bifold-wallet", name: "Heritage Bifold Wallet", category: "wallets", price: 89, originalPrice: 120, rating: 4.8, reviews: 236, badge: "bestseller", img: [IMAGES.wallet, IMAGES.bolso], colors: ["espresso", "cognac", "darkBrown"], leather: "Full-Grain Cowhide", sku: "AVH-WL-001", stock: 24, daysOld: 40, sold: 980,
    desc: "Our signature bifold wallet is cut from a single hide of full-grain cowhide and hand-burnished at the edges. Six card slots, a full-length bill compartment, and a hidden pocket for essentials you don't show off." },
  { id: 2, slug: "slim-cardholder-wallet", name: "Slim Cardholder Wallet", category: "wallets", price: 59, originalPrice: null, rating: 4.6, reviews: 98, badge: "new", img: [IMAGES.wallet, IMAGES.bolso], colors: ["cognac", "tan", "black"], leather: "Top-Grain Leather", sku: "AVH-WL-002", stock: 40, daysOld: 6, sold: 210,
    desc: "A minimalist cardholder for the pocket-first carry. Four slots and a central slip pocket, finished with contrast stitching and a subtle debossed emblem." },
  { id: 3, slug: "classic-trifold-wallet", name: "Classic Trifold Wallet", category: "wallets", price: 95, originalPrice: null, rating: 4.7, reviews: 154, badge: null, img: [IMAGES.wallet, IMAGES.bolso], colors: ["espresso", "darkBrown"], leather: "Full-Grain Cowhide", sku: "AVH-WL-003", stock: 18, daysOld: 120, sold: 540,
    desc: "An heirloom-quality trifold with eight card slots, two bill compartments, and a see-through ID window, all wrapped in richly tanned cowhide." },
  { id: 4, slug: "zip-around-travel-wallet", name: "Zip-Around Travel Wallet", category: "wallets", price: 110, originalPrice: 130, rating: 4.5, reviews: 76, badge: "sale", img: [IMAGES.wallet, IMAGES.bolso], colors: ["cognac", "espresso"], leather: "Pebbled Leather", sku: "AVH-WL-004", stock: 15, daysOld: 85, sold: 312,
    desc: "Keep passports, cards, and currency secure on the move. A smooth brass zip wraps the full perimeter with a dedicated passport sleeve inside." },

  // -- bags
  { id: 5, slug: "weekender-leather-duffel", name: "Weekender Leather Duffel", category: "bags", price: 249, originalPrice: 299, rating: 4.9, reviews: 312, badge: "bestseller", img: [IMAGES.duffel, IMAGES.bolso], colors: ["cognac", "darkBrown"], leather: "Vegetable-Tanned Leather", sku: "AVH-BG-001", stock: 12, daysOld: 70, sold: 860,
    desc: "Built for the overnight trip and built to outlast it. Vegetable-tanned leather develops a rich patina with every journey, reinforced with solid brass hardware and a detachable strap." },
  { id: 6, slug: "signature-tote-bag", name: "Signature Tote Bag", category: "bags", price: 189, originalPrice: null, rating: 4.7, reviews: 142, badge: "new", img: [IMAGES.duffel, IMAGES.market], colors: ["espresso", "tan"], leather: "Full-Grain Leather", sku: "AVH-BG-002", stock: 20, daysOld: 10, sold: 95,
    desc: "A structured tote sized for the laptop-and-everything-else commute, with a zip-top closure and an interior organizer pocket." },
  { id: 7, slug: "crossbody-satchel", name: "Crossbody Satchel", category: "bags", price: 159, originalPrice: null, rating: 4.6, reviews: 88, badge: null, img: [IMAGES.duffel, IMAGES.bolso], colors: ["cognac", "burgundy"], leather: "Top-Grain Leather", sku: "AVH-BG-003", stock: 16, daysOld: 150, sold: 410,
    desc: "An adjustable, hand-stitched crossbody built for everyday errands — compact enough to layer, roomy enough for the essentials." },
  { id: 8, slug: "structured-top-handle-bag", name: "Structured Top-Handle Bag", category: "bags", price: 215, originalPrice: 250, rating: 4.8, reviews: 121, badge: "sale", img: [IMAGES.duffel, IMAGES.market], colors: ["espresso", "darkBrown"], leather: "Saffiano-Finish Leather", sku: "AVH-BG-004", stock: 9, daysOld: 200, sold: 530,
    desc: "A clean-lined top-handle silhouette finished in a soft saffiano texture, with a removable crossbody strap for days you need both hands free." },

  // -- backpacks
  { id: 9, slug: "explorer-leather-backpack", name: "Explorer Leather Backpack", category: "backpacks", price: 229, originalPrice: 269, rating: 4.8, reviews: 201, badge: "bestseller", img: [IMAGES.duffel, IMAGES.market], colors: ["darkBrown", "cognac"], leather: "Full-Grain Leather", sku: "AVH-BP-001", stock: 14, daysOld: 60, sold: 702,
    desc: "A padded 15\" laptop sleeve, roll-top closure, and reinforced base make this our most versatile daily carry, aged to look better every year." },
  { id: 10, slug: "daily-commuter-backpack", name: "Daily Commuter Backpack", category: "backpacks", price: 199, originalPrice: null, rating: 4.6, reviews: 110, badge: "new", img: [IMAGES.duffel, IMAGES.bolso], colors: ["espresso", "black"], leather: "Top-Grain Leather", sku: "AVH-BP-002", stock: 22, daysOld: 15, sold: 145,
    desc: "Clean and minimal, with a quick-access front pocket and ergonomic straps for the daily commute." },
  { id: 11, slug: "compact-city-backpack", name: "Compact City Backpack", category: "backpacks", price: 175, originalPrice: null, rating: 4.5, reviews: 64, badge: null, img: [IMAGES.duffel, IMAGES.market], colors: ["cognac", "tan"], leather: "Pebbled Leather", sku: "AVH-BP-003", stock: 19, daysOld: 95, sold: 268,
    desc: "A compact silhouette for the light packer, with just enough structure to keep its shape empty or full." },

  // -- belts
  { id: 12, slug: "classic-cognac-belt", name: "Classic Cognac Belt", category: "belts", price: 65, originalPrice: null, rating: 4.9, reviews: 284, badge: "bestseller", img: [IMAGES.belt, IMAGES.market], colors: ["cognac", "darkBrown"], leather: "Full-Grain Leather", sku: "AVH-BT-001", stock: 35, daysOld: 220, sold: 1120,
    desc: "A single strip of full-grain hide, edge-painted and finished with a solid brass buckle. Our most-loved belt for good reason." },
  { id: 13, slug: "reversible-formal-belt", name: "Reversible Formal Belt", category: "belts", price: 75, originalPrice: null, rating: 4.6, reviews: 92, badge: "new", img: [IMAGES.belt, IMAGES.market], colors: ["espresso", "black"], leather: "Top-Grain Leather", sku: "AVH-BT-002", stock: 28, daysOld: 8, sold: 76,
    desc: "Two belts in one — a rotating buckle flips between black and espresso so you only need to pack one." },
  { id: 14, slug: "woven-leather-belt", name: "Woven Leather Belt", category: "belts", price: 70, originalPrice: 85, rating: 4.4, reviews: 51, badge: "sale", img: [IMAGES.belt, IMAGES.market], colors: ["tan", "cognac"], leather: "Woven Calfskin", sku: "AVH-BT-003", stock: 17, daysOld: 160, sold: 215,
    desc: "A hand-woven calfskin belt that adds quiet texture to smart-casual looks without sacrificing durability." },

  // -- jackets
  { id: 15, slug: "classic-biker-jacket", name: "Classic Biker Jacket", category: "jackets", price: 399, originalPrice: 459, rating: 4.8, reviews: 167, badge: "bestseller", img: [IMAGES.jacketFlat, IMAGES.jacketWorn], colors: ["black", "espresso"], sizes: ["S", "M", "L", "XL"], leather: "Lambskin Leather", sku: "AVH-JK-001", stock: 11, daysOld: 100, sold: 455,
    desc: "An asymmetric biker silhouette in buttery-soft lambskin, fully lined, with YKK zips throughout and a tailored, true-to-size fit." },
  { id: 16, slug: "aviator-bomber-jacket", name: "Aviator Bomber Jacket", category: "jackets", price: 369, originalPrice: null, rating: 4.6, reviews: 89, badge: "new", img: [IMAGES.jacketFlat, IMAGES.jacketWorn], colors: ["darkBrown", "cognac"], sizes: ["S", "M", "L", "XL"], leather: "Sheepskin Leather", sku: "AVH-JK-002", stock: 13, daysOld: 12, sold: 68,
    desc: "A relaxed bomber cut with ribbed cuffs and collar, built from supple sheepskin that softens with every wear." },
  { id: 17, slug: "tailored-moto-jacket", name: "Tailored Moto Jacket", category: "jackets", price: 429, originalPrice: null, rating: 4.7, reviews: 73, badge: null, img: [IMAGES.jacketFlat, IMAGES.jacketWorn], colors: ["espresso"], sizes: ["S", "M", "L"], leather: "Full-Grain Leather", sku: "AVH-JK-003", stock: 8, daysOld: 180, sold: 190,
    desc: "A sharper, tailored take on the moto jacket with a structured shoulder and minimal hardware for a cleaner silhouette." },

  // -- shoes
  { id: 18, slug: "oxford-dress-shoes", name: "Oxford Dress Shoes", category: "shoes", price: 179, originalPrice: null, rating: 4.7, reviews: 143, badge: "bestseller", img: [IMAGES.shoesDerby, IMAGES.shoesPair], colors: ["darkBrown", "black"], sizes: ["7", "8", "9", "10", "11", "12"], leather: "Calfskin Leather", sku: "AVH-SH-001", stock: 26, daysOld: 140, sold: 610,
    desc: "Hand-lasted calfskin oxfords with a leather sole and a close, formal silhouette for the boardroom and beyond." },
  { id: 19, slug: "classic-derby-shoes", name: "Classic Derby Shoes", category: "shoes", price: 165, originalPrice: null, rating: 4.6, reviews: 97, badge: "new", img: [IMAGES.shoesDerby, IMAGES.shoesPair], colors: ["cognac", "darkBrown"], sizes: ["7", "8", "9", "10", "11"], leather: "Full-Grain Leather", sku: "AVH-SH-002", stock: 21, daysOld: 9, sold: 88,
    desc: "An open-lace derby with a slightly roomier fit than our oxfords, finished with a hand-burnished toe." },
  { id: 20, slug: "chelsea-boots", name: "Chelsea Boots", category: "shoes", price: 195, originalPrice: 225, rating: 4.8, reviews: 118, badge: "sale", img: [IMAGES.shoesDerby, IMAGES.shoesPair], colors: ["black", "espresso"], sizes: ["7", "8", "9", "10", "11", "12"], leather: "Top-Grain Leather", sku: "AVH-SH-003", stock: 17, daysOld: 230, sold: 390,
    desc: "Elastic side-gusset boots with a stacked leather heel — equally at home with denim or tailoring." },

  // -- accessories
  { id: 21, slug: "leather-card-holder-red", name: "Leather Card Holder", category: "accessories", price: 45, originalPrice: null, rating: 4.5, reviews: 61, badge: "new", img: [IMAGES.cardholder, IMAGES.bolso], colors: ["burgundy", "cognac"], leather: "Embossed Croc-Pattern Leather", sku: "AVH-AC-001", stock: 33, daysOld: 5, sold: 54,
    desc: "A pocket-sized two-slot holder in a bold croc-embossed finish, for cards you reach for most." },
  { id: 22, slug: "minimalist-keychain", name: "Minimalist Keychain", category: "accessories", price: 29, originalPrice: null, rating: 4.4, reviews: 44, badge: null, img: [IMAGES.cardholder, IMAGES.bolso], colors: ["espresso", "tan"], leather: "Full-Grain Leather", sku: "AVH-AC-002", stock: 50, daysOld: 100, sold: 320,
    desc: "A compact leather loop and brass ring, hand-cut and edge-finished to match the rest of your everyday carry." },
  { id: 23, slug: "leather-phone-pouch", name: "Leather Phone Pouch", category: "accessories", price: 49, originalPrice: 59, rating: 4.3, reviews: 38, badge: "sale", img: [IMAGES.cardholder, IMAGES.bolso], colors: ["cognac", "darkBrown"], leather: "Top-Grain Leather", sku: "AVH-AC-003", stock: 27, daysOld: 170, sold: 160,
    desc: "A snug, pull-tab pouch that protects your phone without the bulk, finished with hand stitching along every seam." },
  { id: 24, slug: "leather-watch-strap", name: "Leather Watch Strap", category: "accessories", price: 39, originalPrice: null, rating: 4.6, reviews: 72, badge: null, img: [IMAGES.cardholder, IMAGES.bolso], colors: ["espresso", "tan", "black"], leather: "Vegetable-Tanned Leather", sku: "AVH-AC-004", stock: 41, daysOld: 60, sold: 245,
    desc: "A quick-release strap in vegetable-tanned leather that ages into a deeper tone with time and wear." },

  // -- handmade
  { id: 25, slug: "handcrafted-document-folder", name: "Handcrafted Document Folder", category: "handmade", price: 135, originalPrice: null, rating: 4.9, reviews: 54, badge: "bestseller", img: [IMAGES.bolso, IMAGES.market], colors: ["espresso", "darkBrown"], leather: "Full-Grain Leather", sku: "AVH-HM-001", stock: 10, daysOld: 210, sold: 180,
    desc: "Entirely hand-cut and saddle-stitched by a single artisan, this folder holds A4 documents, a notepad, and a pen in one slim fold." },
  { id: 26, slug: "hand-stitched-coin-pouch", name: "Hand-Stitched Coin Pouch", category: "handmade", price: 39, originalPrice: null, rating: 4.7, reviews: 29, badge: "new", img: [IMAGES.bolso, IMAGES.market], colors: ["tan", "cognac"], leather: "Vegetable-Tanned Leather", sku: "AVH-HM-002", stock: 24, daysOld: 4, sold: 32,
    desc: "A small frame pouch, entirely saddle-stitched by hand with waxed thread for a seam that only gets stronger." },

  // -- gifts
  { id: 27, slug: "heritage-wallet-belt-gift-set", name: "Heritage Wallet & Belt Gift Set", category: "gifts", price: 139, originalPrice: 165, rating: 4.9, reviews: 112, badge: "bestseller", img: [IMAGES.wallet, IMAGES.belt], colors: ["espresso", "cognac"], leather: "Full-Grain Leather", sku: "AVH-GF-001", stock: 15, daysOld: 50, sold: 340,
    desc: "Our Heritage Bifold Wallet and Classic Belt, matched in tone and presented in a branded gift box — ready to give." },
  { id: 28, slug: "executive-travel-gift-set", name: "Executive Travel Gift Set", category: "gifts", price: 225, originalPrice: null, rating: 4.8, reviews: 46, badge: "new", img: [IMAGES.wallet, IMAGES.cardholder], colors: ["darkBrown"], leather: "Full-Grain Leather", sku: "AVH-GF-002", stock: 12, daysOld: 7, sold: 41,
    desc: "A travel wallet and card holder set, boxed together for the frequent flyer on your list." }
];

function getProductBySlug(slug) {
  return PRODUCTS.find(function (p) { return p.slug === slug; });
}

function getRelatedProducts(product, count) {
  return PRODUCTS.filter(function (p) { return p.category === product.category && p.id !== product.id; }).slice(0, count || 4);
}

function formatPrice(n) {
  return "৳" + n.toFixed(2);
}

function starsHtml(rating) {
  var full = Math.floor(rating);
  var half = rating - full >= 0.5;
  var html = "";
  for (var i = 0; i < full; i++) html += '<i class="bi bi-star-fill"></i>';
  if (half) html += '<i class="bi bi-star-half"></i>';
  for (var i = full + (half ? 1 : 0); i < 5; i++) html += '<i class="bi bi-star"></i>';
  return html;
}

function categoryName(slug) {
  var c = CATEGORIES.find(function (c) { return c.slug === slug; });
  return c ? c.name : slug;
}

// The one product card markup every grid on the site renders from —
// shop, category, related products, search results all call this.
function productCardHtml(p) {
  var wished = isInWishlist(p.id);
  var badgeHtml = "";
  if (p.badge === "new") badgeHtml = '<span class="pc-badge badge-new">New</span>';
  else if (p.badge === "bestseller") badgeHtml = '<span class="pc-badge badge-best">Best Seller</span>';
  else if (p.badge === "sale") badgeHtml = '<span class="pc-badge badge-sale">Sale</span>';

  var originalHtml = p.originalPrice ? '<span class="original">' + formatPrice(p.originalPrice) + '</span>' : "";

  return (
    '<div class="product-card" data-product-id="' + p.id + '">' +
      '<div class="pc-media">' +
        '<a href="product-details.html?slug=' + p.slug + '" class="d-block w-100 h-100">' +
          '<img class="pc-img-primary" src="' + p.img[0].card + '" alt="' + p.name + '" loading="lazy">' +
          '<img class="pc-img-secondary" src="' + p.img[1].card + '" alt="' + p.name + '" loading="lazy">' +
        '</a>' +
        (badgeHtml ? '<div class="pc-badges">' + badgeHtml + '</div>' : "") +
        '<div class="pc-actions">' +
          '<button class="btn-icon-circle pc-wishlist-btn' + (wished ? " is-active" : "") + '" data-id="' + p.id + '" title="Add to Wishlist" aria-label="Add to Wishlist"><i class="bi ' + (wished ? "bi-heart-fill" : "bi-heart") + '"></i></button>' +
        '</div>' +
        '<a href="product-details.html?slug=' + p.slug + '" class="pc-quickview-btn">View Details</a>' +
      '</div>' +
      '<div class="pc-body">' +
        '<div class="pc-category">' + categoryName(p.category) + '</div>' +
        '<h3 class="pc-name"><a href="product-details.html?slug=' + p.slug + '">' + p.name + '</a></h3>' +
        '<div class="pc-rating"><span class="stars">' + starsHtml(p.rating) + '</span><span class="count">(' + p.reviews + ')</span></div>' +
        '<div class="pc-price"><span class="current">' + formatPrice(p.price) + '</span>' + originalHtml + '</div>' +
        '<button class="pc-addcart" data-id="' + p.id + '"><i class="bi bi-bag-plus"></i> Add to Cart</button>' +
      '</div>' +
    '</div>'
  );
}

function renderProductGrid(container, products, emptyMessage) {
  if (!container) return;
  if (!products.length) {
    container.innerHTML = '<div class="empty-state w-100"><i class="bi bi-search"></i><h4>No products found</h4><p>' + (emptyMessage || "Try adjusting your filters or search terms.") + '</p></div>';
    return;
  }
  container.innerHTML = products.map(productCardHtml).join("");
}

function filterProducts(opts) {
  opts = opts || {};
  var list = PRODUCTS.slice();

  if (opts.category) {
    list = list.filter(function (p) { return p.category === opts.category; });
  }
  if (opts.categories && opts.categories.length) {
    list = list.filter(function (p) { return opts.categories.indexOf(p.category) !== -1; });
  }
  if (opts.search) {
    var q = opts.search.toLowerCase();
    list = list.filter(function (p) {
      return p.name.toLowerCase().indexOf(q) !== -1 ||
        categoryName(p.category).toLowerCase().indexOf(q) !== -1 ||
        p.leather.toLowerCase().indexOf(q) !== -1;
    });
  }
  if (opts.minPrice != null) list = list.filter(function (p) { return p.price >= opts.minPrice; });
  if (opts.maxPrice != null) list = list.filter(function (p) { return p.price <= opts.maxPrice; });
  if (opts.colors && opts.colors.length) {
    list = list.filter(function (p) { return p.colors.some(function (c) { return opts.colors.indexOf(c) !== -1; }); });
  }
  if (opts.availability === "in-stock") list = list.filter(function (p) { return p.stock > 0; });
  if (opts.availability === "out-of-stock") list = list.filter(function (p) { return p.stock === 0; });
  if (opts.badge) list = list.filter(function (p) { return p.badge === opts.badge; });

  switch (opts.sort) {
    case "newest":
      list.sort(function (a, b) { return a.daysOld - b.daysOld; });
      break;
    case "price-asc":
      list.sort(function (a, b) { return a.price - b.price; });
      break;
    case "price-desc":
      list.sort(function (a, b) { return b.price - a.price; });
      break;
    case "best-selling":
      list.sort(function (a, b) { return b.sold - a.sold; });
      break;
    default:
      // "Featured" — bestsellers first, then highest rated. No real
      // merchandising logic behind it yet, just something sane by default.
      list.sort(function (a, b) {
        return (b.badge === "bestseller" ? 1 : 0) - (a.badge === "bestseller" ? 1 : 0) || b.rating - a.rating;
      });
  }

  return list;
}

function paginate(list, page, perPage) {
  var start = (page - 1) * perPage;
  return {
    items: list.slice(start, start + perPage),
    totalPages: Math.max(1, Math.ceil(list.length / perPage)),
    page: page,
    total: list.length
  };
}
