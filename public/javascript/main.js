const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const adminLink = document.getElementById("admin-link");
const adminLinkDesktop = document.getElementById("admin-link-desktop");
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
let isLoggedIn = false;

if (isLoggedIn) {
  adminLink.classList.remove("hidden");
  adminLinkDesktop.classList.remove("hidden");
}

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

