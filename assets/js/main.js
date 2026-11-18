// Global site behavior — header, nav, search, toasts, etc.
// Product-specific stuff (cart/wishlist logic) lives in cart.js / wishlist.js.

function showToast(message, type) {
  var stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  var icon = type === "error" ? "bi-exclamation-circle-fill" : "bi-check-circle-fill";
  var toast = document.createElement("div");
  toast.className = "toast-custom toast-" + (type || "success");
  toast.innerHTML = '<i class="bi ' + icon + '"></i><span>' + message + '</span>';
  stack.appendChild(toast);
  setTimeout(function () {
    toast.classList.add("toast-hide");
    setTimeout(function () { toast.remove(); }, 300);
  }, 2800);
}

function initHeaderScroll() {
  var header = document.querySelector(".site-header");
  if (!header) return;
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll);
  onScroll();
}

function initMobileNav() {
  // there are two toggles now — the hamburger in the header and the
  // "Menu" tab in the mobile bottom bar — both open the same drawer
  var toggles = document.querySelectorAll(".mobile-nav-toggle");
  var panel = document.querySelector(".mobile-nav-panel");
  var overlay = document.querySelector(".nav-overlay");
  var closeBtn = document.querySelector(".mnp-close");
  if (!toggles.length || !panel) return;

  function open() {
    panel.classList.add("open");
    overlay.classList.add("show");
    document.body.classList.add("no-scroll");
  }
  function close() {
    panel.classList.remove("open");
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }
  toggles.forEach(function (toggle) { toggle.addEventListener("click", open); });
  if (closeBtn) closeBtn.addEventListener("click", close);
  if (overlay) overlay.addEventListener("click", close);
}

function initAnnouncementBar() {
  var bar = document.querySelector(".announcement-bar");
  var closeBtn = document.querySelector(".ann-close");
  if (!bar || !closeBtn) return;

  // sessionStorage so it comes back if they close the tab and return later,
  // but stays dismissed while they're browsing around the site
  if (sessionStorage.getItem("avh_ann_closed") === "1") {
    bar.style.display = "none";
    return;
  }

  closeBtn.addEventListener("click", function () {
    bar.style.display = "none";
    try { sessionStorage.setItem("avh_ann_closed", "1"); } catch (e) { /* storage disabled, not critical */ }
  });
}

function initSearchOverlay() {
  var openBtns = document.querySelectorAll(".js-search-open");
  var overlay = document.querySelector(".search-overlay");
  if (!overlay) return;
  var input = overlay.querySelector("input");
  var closeBtn = overlay.querySelector(".search-close");
  var resultsBox = overlay.querySelector(".search-results");

  function open() {
    overlay.classList.add("show");
    document.body.classList.add("no-scroll");
    setTimeout(function () { input.focus(); }, 150);
  }
  function close() {
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }
  openBtns.forEach(function (b) { b.addEventListener("click", open); });
  if (closeBtn) closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

  if (input) {
    input.addEventListener("input", function () {
      var q = input.value.trim();
      if (!q) { resultsBox.innerHTML = ""; return; }
      var matches = filterProducts({ search: q }).slice(0, 6);
      if (!matches.length) {
        resultsBox.innerHTML = '<p class="text-light opacity-75">No products found for "' + q + '"</p>';
        return;
      }

      var rows = "";
      for (var i = 0; i < matches.length; i++) {
        var p = matches[i];
        rows += '<a href="product-details.html?slug=' + p.slug + '">' +
          '<img src="' + p.img[0].thumb + '" alt="' + p.name + '">' +
          '<span><span class="sr-name d-block">' + p.name + '</span><span class="sr-price">' + formatPrice(p.price) + '</span></span>' +
          '</a>';
      }
      resultsBox.innerHTML = rows;
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && input.value.trim()) {
        window.location.href = "shop.html?search=" + encodeURIComponent(input.value.trim());
      }
    });
  }
}

function initHeaderSearch() {
  var input = document.querySelector(".js-header-search-input");
  var resultsBox = document.querySelector(".header-search-results");
  if (!input || !resultsBox) return;

  function close() { resultsBox.classList.remove("show"); }

  input.addEventListener("input", function () {
    var q = input.value.trim();
    if (!q) { resultsBox.innerHTML = ""; close(); return; }
    var matches = filterProducts({ search: q }).slice(0, 6);
    if (!matches.length) {
      resultsBox.innerHTML = '<p>No products found for "' + q + '"</p>';
      resultsBox.classList.add("show");
      return;
    }
    var rows = "";
    for (var i = 0; i < matches.length; i++) {
      var p = matches[i];
      rows += '<a href="product-details.html?slug=' + p.slug + '">' +
        '<img src="' + p.img[0].thumb + '" alt="' + p.name + '">' +
        '<span><span class="sr-name">' + p.name + '</span><span class="sr-price">' + formatPrice(p.price) + '</span></span>' +
        '</a>';
    }
    resultsBox.innerHTML = rows;
    resultsBox.classList.add("show");
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && input.value.trim()) {
      window.location.href = "shop.html?search=" + encodeURIComponent(input.value.trim());
    } else if (e.key === "Escape") {
      close();
      input.blur();
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".header-search")) close();
  });
}

function initDesktopSearch() {
  var input = document.querySelector(".js-desktop-search-input");
  var resultsBox = document.querySelector(".desktop-search-results");
  if (!input || !resultsBox) return;

  function close() { resultsBox.classList.remove("show"); }

  input.addEventListener("input", function () {
    var q = input.value.trim();
    if (!q) { resultsBox.innerHTML = ""; close(); return; }
    var matches = filterProducts({ search: q }).slice(0, 6);
    if (!matches.length) {
      resultsBox.innerHTML = '<p>No products found for "' + q + '"</p>';
      resultsBox.classList.add("show");
      return;
    }
    var rows = "";
    for (var i = 0; i < matches.length; i++) {
      var p = matches[i];
      rows += '<a href="product-details.html?slug=' + p.slug + '">' +
        '<img src="' + p.img[0].thumb + '" alt="' + p.name + '">' +
        '<span><span class="sr-name">' + p.name + '</span><span class="sr-price">' + formatPrice(p.price) + '</span></span>' +
        '</a>';
    }
    resultsBox.innerHTML = rows;
    resultsBox.classList.add("show");
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && input.value.trim()) {
      window.location.href = "shop.html?search=" + encodeURIComponent(input.value.trim());
    } else if (e.key === "Escape") {
      close();
      input.blur();
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".desktop-search")) close();
  });
}

function initMegaCategorySearch() {
  document.querySelectorAll(".js-mega-search").forEach(function (input) {
    input.addEventListener("input", function () {
      var panel = input.closest(".mega-panel-inner");
      var q = input.value.trim().toLowerCase();
      panel.querySelectorAll(".mega-cat-item").forEach(function (item) {
        var name = item.querySelector(".mega-cat-name").textContent.toLowerCase();
        item.classList.toggle("is-hidden", q !== "" && name.indexOf(q) === -1);
      });
    });
    input.addEventListener("click", function (e) { e.stopPropagation(); });
  });
}

function initBackToTop() {
  var btn = document.querySelector(".back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", function () {
    btn.classList.toggle("show", window.scrollY > 500);
  });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initNewsletterForms() {
  // Pretty loose email check on purpose — this is just gift-wrapping,
  // real validation happens server-side once the backend exists.
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  document.querySelectorAll(".js-newsletter-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var val = input.value.trim();
      if (!EMAIL_RE.test(val)) {
        input.classList.add("is-invalid");
        return;
      }
      input.classList.remove("is-invalid");
      showToast("Thanks for subscribing! Check your inbox for a welcome gift.", "success");
      form.reset();
    });
  });
}

// Add-to-cart / wishlist buttons get re-rendered constantly (grids,
// pagination, quick filters...) so this is delegated off document
// instead of bound per-button.
function initGlobalProductActions() {
  document.addEventListener("click", function (e) {
    var addBtn = e.target.closest(".pc-addcart");
    if (addBtn) {
      var id = parseInt(addBtn.dataset.id, 10);
      addToCart(id, 1);
      return;
    }
    var wishBtn = e.target.closest(".pc-wishlist-btn");
    if (wishBtn) {
      var wid = parseInt(wishBtn.dataset.id, 10);
      var active = toggleWishlist(wid);
      wishBtn.classList.toggle("is-active", active);
      var icon = wishBtn.querySelector("i");
      if (icon) icon.className = active ? "bi bi-heart-fill" : "bi bi-heart";
      if (typeof onWishlistChanged === "function") onWishlistChanged();
      return;
    }
  });
}

function initMobileDrawerCategories() {
  var container = document.getElementById("mobileDrawerCategories");
  if (!container || typeof CATEGORIES === "undefined") return;

  var html = CATEGORIES.map(function (c) {
    return '<a href="category.html?cat=' + c.slug + '" class="mnp-category-item">' +
      '<img src="' + c.image + '" alt="' + c.name + '">' +
      '<span>' + c.name + '</span>' +
      '</a>';
  }).join("");

  container.innerHTML = html;
}

function markActiveNav() {
  // .main-nav active state is set per-page in the markup (several nav
  // links share the same href, e.g. Shop/Men/Women all point to
  // shop.html, so matching by href here would wrongly light up all of them).
  var page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".mobile-nav-panel a, .bottom-nav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initHeaderScroll();
  initMobileNav();
  initMobileDrawerCategories();
  initAnnouncementBar();
  initSearchOverlay();
  initHeaderSearch();
  initDesktopSearch();
  initMegaCategorySearch();
  initBackToTop();
  initNewsletterForms();
  initGlobalProductActions();
  markActiveNav();
});
