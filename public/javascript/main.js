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

let isSidebarOpen = false;
let isCartSidebarOpen = false;

const updateHeaderStyles = () => {
  // Kontrollera om sidan är startsidan eller "about"
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
    // För andra sidor: Vit bakgrund och svarta symboler
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

// Kör funktionen vid sidladdning
updateHeaderStyles();

// Behåll stilen för startsida och "about" under scroll
window.addEventListener("scroll", () => {
  updateHeaderStyles();
});

header.addEventListener("mouseenter", () => {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/about"
  ) {
    header.classList.remove("bg-transparent", "text-white");
    header.classList.add("bg-white", "text-black");

    logoImg.src = "/images/logo.svg";
    loginImg.src = "/images/login.svg";
    cartImg.src = "/images/cart.svg";

    logoImgDesktop.src = "/images/logo.svg";
    loginImgDesktop.src = "/images/login.svg";
    cartImgDesktop.src = "/images/cart.svg";
  }
});

header.addEventListener("mouseleave", () => {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/about"
  ) {
    updateHeaderStyles();
  }
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

  updateHeaderStyles();

  if (isSidebarOpen) {
    hamburgerIconTop.style.transform = "rotate(45deg) translateY(8px)";
    hamburgerIconMiddle.style.opacity = "0";
    hamburgerIconBottom.style.transform = "rotate(-45deg) translateY(-8px)";
    hamburgerIconTop.style.backgroundColor = "black";
    hamburgerIconBottom.style.backgroundColor = "black";
  } else {
    resetHamburgerIcon();
  }
});

function toggleCartSidebar() {
  isCartSidebarOpen = !isCartSidebarOpen;
  cartSidebar.style.transform = isCartSidebarOpen
    ? "translateX(0)"
    : "translateX(100%)";

  updateHeaderStyles();
}

cartImg.addEventListener("click", (e) => {
  e.preventDefault();
  toggleCartSidebar();
});

cartImgDesktop.addEventListener("click", (e) => {
  e.preventDefault();
  toggleCartSidebar();
});

window.addEventListener("click", (e) => {
  if (
    isSidebarOpen &&
    !sidebar.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    isSidebarOpen = false;
    sidebar.style.transform = "translateX(-100%)";
    updateHeaderStyles();
    resetHamburgerIcon();
  }

  if (
    isCartSidebarOpen &&
    !cartSidebar.contains(e.target) &&
    !cartImg.contains(e.target) &&
    !cartImgDesktop.contains(e.target)
  ) {
    isCartSidebarOpen = false;
    cartSidebar.style.transform = "translateX(100%)";
    updateHeaderStyles();
  }
});

closeCartSidebarButton.addEventListener("click", () => {
  isCartSidebarOpen = false;
  cartSidebar.style.transform = "translateX(100%)";
  updateHeaderStyles();
});



// Login/logout functionality
const loginPopup = document.getElementById("login-popup");
const loginForm = document.getElementById("login-form");
const closeLoginPopupButton = document.getElementById("close-login-popup");
const loginIconMobile = document.getElementById("login-icon-mobile");
const loginIconDesktop = document.getElementById("login-icon-desktop");
const logoutButton = document.getElementById("logout-btn");

let isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

const showLoginPopup = () => {
  if (loginPopup) {
    loginPopup.classList.remove("hidden");
  }
};

const closeLoginPopup = () => {
  if (loginPopup) {
    loginPopup.classList.add("hidden"); 
  }
};

const updateUI = () => {
  const adminLink = document.getElementById("admin-link");
  const adminLinkDesktop = document.getElementById("admin-link-desktop");

  if (isLoggedIn) {
    adminLink?.classList.remove("hidden");
    adminLinkDesktop?.classList.remove("hidden");
  } else {
    adminLink?.classList.add("hidden");
    adminLinkDesktop?.classList.add("hidden");
  }
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
        sessionStorage.removeItem("isLoggedIn");
        isLoggedIn = false;
        location.reload(); 
      })
      .catch((err) => console.error("Logout error:", err));
  });
}

if (closeLoginPopupButton) {
  closeLoginPopupButton.addEventListener("click", closeLoginPopup);
}

if (loginPopup) {
  window.addEventListener("click", (e) => {
    if (e.target === loginPopup) closeLoginPopup();
  });
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
        sessionStorage.setItem("isLoggedIn", "true");
        isLoggedIn = true;
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


 // Contact form
 const contactForm = document.getElementById("contactForm");
 const popUp = document.getElementById("popUp");
 const closeButton = document.getElementById("closeButton");
 const pageContent = document.getElementById("pageContent");

 contactForm.addEventListener("submit", (event) => {
   event.preventDefault();
   popUp.classList.remove("hidden");
   popUp.classList.add("flex");
   pageContent.classList.add("blur");
 });

 closeButton.addEventListener("click", () => {
   popUp.classList.add("hidden");
   popUp.classList.remove("flex");
   pageContent.classList.remove("blur");
   contactForm.reset();
 });


updateUI();


