const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const hamburgerIconTop = document.getElementById("hamburger-icon-top");
const hamburgerIconMiddle = document.getElementById("hamburger-icon-middle");
const hamburgerIconBottom = document.getElementById("hamburger-icon-bottom");

const logoImg = document.getElementById("logo-img");
const loginImg = document.getElementById("login-img");

const logoImgDesktop = document.getElementById("logo-img-desktop");
const loginImgDesktop = document.getElementById("login-img-desktop");

const cartImg = document.getElementById("cart-img");
const cartImgDesktop = document.getElementById("cart-img-desktop");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartSidebarButton = document.getElementById("close-cart-sidebar");
const cartContent = document.getElementById("cart-content");
const cartTotal = document.getElementById("cart-total");

let isSidebarOpen = false;
let isCartSidebarOpen = false;

const updateHeaderStyles = () => {
  const isHomeOrAboutPage =
    window.location.pathname === "/" || window.location.pathname === "/about";

  if (isHomeOrAboutPage) {
    const shouldBeWhite =
      isSidebarOpen || isCartSidebarOpen || window.scrollY > 50;

    if (shouldBeWhite) {
      header.classList.remove("bg-transparent", "text-white");
      header.classList.add("bg-white", "text-black");

      logoImg.src = "/images/logo.svg";
      loginImg.src = "/images/login.svg";
      cartImg.src = "/images/cart.svg";

      logoImgDesktop.src = "/images/logo.svg";
      loginImgDesktop.src = "/images/login.svg";
      cartImgDesktop.src = "/images/cart.svg";
    } else {
      header.classList.remove("bg-white", "text-black");
      header.classList.add("bg-transparent", "text-white");

      logoImg.src = "/images/logo-white.svg";
      loginImg.src = "/images/login-white.svg";
      cartImg.src = "/images/cart-white.svg";

      logoImgDesktop.src = "/images/logo-white.svg";
      loginImgDesktop.src = "/images/login-white.svg";
      cartImgDesktop.src = "/images/cart-white.svg";
    }
  } else {
    header.classList.remove("bg-transparent", "text-white");
    header.classList.add("bg-white", "text-black");

    logoImg.src = "/images/logo.svg";
    loginImg.src = "/images/login.svg";
    cartImg.src = "/images/cart.svg";

    logoImgDesktop.src = "/images/logo.svg";
    loginImgDesktop.src = "/images/login.svg";
    cartImgDesktop.src = "/images/cart.svg";
  }
};

updateHeaderStyles();

window.addEventListener("scroll", () => {
  updateHeaderStyles();
});

const resetHamburgerIcon = () => {
  hamburgerIconTop.style.transform = "rotate(0)";
  hamburgerIconMiddle.style.opacity = "1";
  hamburgerIconBottom.style.transform = "rotate(0)";
  hamburgerIconTop.style.backgroundColor = "currentColor";
  hamburgerIconBottom.style.backgroundColor = "currentColor";
};

hamburger.addEventListener("click", () => {
  isSidebarOpen = !isSidebarOpen;

  sidebar.style.transform = isSidebarOpen
    ? "translateX(0)"
    : "translateX(-100%)";

  if (isSidebarOpen) {
    hamburgerIconTop.style.transform = "rotate(45deg) translateY(8px)";
    hamburgerIconMiddle.style.opacity = "0";
    hamburgerIconBottom.style.transform = "rotate(-45deg) translateY(-8px)";
    hamburgerIconTop.style.backgroundColor = "black";
    hamburgerIconBottom.style.backgroundColor = "black";
  } else {
    resetHamburgerIcon();
  }

  updateHeaderStyles();
});

window.addEventListener("click", (e) => {
  if (
    isSidebarOpen &&
    !sidebar.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    isSidebarOpen = false;
    sidebar.style.transform = "translateX(-100%)";
    resetHamburgerIcon();
    updateHeaderStyles();
  }
});

function toggleCartSidebar(open = null) {
  if (open !== null) {
    isCartSidebarOpen = open;
  } else {
    isCartSidebarOpen = !isCartSidebarOpen;
  }

  cartSidebar.style.transform = isCartSidebarOpen
    ? "translateX(0)"
    : "translateX(100%)";

  updateHeaderStyles();
}

cartImg.addEventListener("click", (e) => {
  e.preventDefault();
  toggleCartSidebar(true);
  loadCart();
});

cartImgDesktop.addEventListener("click", (e) => {
  e.preventDefault();
  toggleCartSidebar(true);
  loadCart();
});

closeCartSidebarButton.addEventListener("click", () => {
  toggleCartSidebar(false);
});

async function loadCart() {
  try {
    const response = await fetch("/api/cart");
    if (!response.ok) throw new Error("Failed to fetch cart data");

    const data = await response.json();

    cartContent.innerHTML = "";
    let total = 0;

    if (data.cart.length > 0) {
      const itemsHTML = data.cart
        .map(
          (item) => `
          <div class="flex items-center justify-between py-4 border-b">
            <div class="flex items-center space-x-4">
              <img
                src="${item.image || "/images/placeholder.png"}"
                alt="${item.name || "No Name"}"
                class="h-16 w-16 object-cover rounded-md"
              />
              <div>
                <h3 class="font-semibold text-gray-800">${
                  item.name || "No Name"
                }</h3>
                <p class="text-sm text-gray-500">$${item.price.toFixed(2)}</p>
                <p class="text-sm text-gray-500">Quantity: ${item.quantity}</p>
              </div>
            </div>
            <button
              data-product-id="${item.productId}"
              class="text-red-600 hover:underline text-sm remove-from-cart"
            >
              Remove
            </button>
          </div>
        `
        )
        .join("");

      cartContent.innerHTML = itemsHTML;
      total = data.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    } else {
      cartContent.innerHTML =
        '<p class="text-gray-500">Your cart is empty.</p>';
    }

    cartTotal.textContent = `$${total.toFixed(2)}`;
  } catch (error) {
    console.error("Error loading cart:", error.message);
  }
}

document.addEventListener("click", async (event) => {
  if (event.target && event.target.classList.contains("remove-from-cart")) {
    const productId = event.target.getAttribute("data-product-id");
    try {
      const response = await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        loadCart();
      } else {
        alert("Failed to remove product.");
      }
    } catch (error) {
      console.error("Error removing product:", error.message);
    }
  }
});

const loginPopup = document.getElementById("login-popup");
const loginForm = document.getElementById("login-form");
const closeLoginPopupButton = document.getElementById("close-login-popup");
const loginIconMobile = document.getElementById("login-icon-mobile");
const loginIconDesktop = document.getElementById("login-icon-desktop");
const logoutButton = document.getElementById("logout-btn");

const showLoginPopup = () => {
  if (loginPopup) loginPopup.classList.remove("hidden");
};

const closeLoginPopup = () => {
  if (loginPopup) loginPopup.classList.add("hidden");
};

if (loginIconMobile) {
  loginIconMobile.addEventListener("click", (e) => {
    e.preventDefault();
    showLoginPopup();
  });
}

if (loginIconDesktop) {
  loginIconDesktop.addEventListener("click", (e) => {
    e.preventDefault();
    showLoginPopup();
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("/admin/logout", { method: "POST" })
      .then(() => {
        location.reload();
      })
      .catch((err) => console.error("Logout error:", err));
  });
}

if (closeLoginPopupButton) {
  closeLoginPopupButton.addEventListener("click", closeLoginPopup);

  if (loginPopup) {
    window.addEventListener("click", (e) => {
      if (e.target === loginPopup) closeLoginPopup();
    });
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    fetch("/admin/log-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid username or password.");
        return res.json();
      })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        const loginError = document.getElementById("login-error");
        if (loginError) {
          loginError.textContent = err.message;
          loginError.classList.remove("hidden");
        }
      });
  });
}
