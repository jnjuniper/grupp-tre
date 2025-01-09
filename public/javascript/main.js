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
let isLoggedIn = false; // Simulerar inloggat läge

// Visa adminlänkar om användaren är inloggad
if (isLoggedIn) {
  adminLink.classList.remove("hidden");
  adminLinkDesktop.classList.remove("hidden");
}

// Funktion för att uppdatera headerns stil
const updateHeaderStyles = () => {
  const shouldBeWhite = isSidebarOpen || isCartSidebarOpen || window.scrollY > 50;

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
};

// Funktion för att toggla hamburgarmenyn
hamburger.addEventListener("click", () => {
  isSidebarOpen = !isSidebarOpen;
  sidebar.style.transform = isSidebarOpen
    ? "translateX(0)"
    : "translateX(-100%)";

  updateHeaderStyles();

  // Uppdatera hamburger-ikonen
  hamburgerIconTop.style.transform = isSidebarOpen
    ? "rotate(45deg) translateY(8px)"
    : "rotate(0)";
  hamburgerIconMiddle.style.opacity = isSidebarOpen ? "0" : "1";
  hamburgerIconBottom.style.transform = isSidebarOpen
    ? "rotate(-45deg) translateY(-8px)"
    : "rotate(0)";
  hamburgerIconTop.style.backgroundColor = isSidebarOpen ? "black" : "currentColor";
  hamburgerIconBottom.style.backgroundColor = isSidebarOpen ? "black" : "currentColor";
});

// Funktion för att toggla varukorgens sidomeny
function toggleCartSidebar() {
  isCartSidebarOpen = !isCartSidebarOpen;
  cartSidebar.style.transform = isCartSidebarOpen
    ? "translateX(0)"
    : "translateX(100%)";

  updateHeaderStyles();
}

// Lägg till event-lyssnare för att öppna/stänga varukorgens sidomeny
cartImg.addEventListener("click", (e) => {
  e.preventDefault(); // Förhindrar att sidan hoppar till toppen
  toggleCartSidebar();
});

cartImgDesktop.addEventListener("click", (e) => {
  e.preventDefault(); // Förhindrar att sidan hoppar till toppen
  toggleCartSidebar();
});


// Stäng hamburgarmenyn vid klick utanför
window.addEventListener("click", (e) => {
  if (
    isSidebarOpen &&
    !sidebar.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    isSidebarOpen = false;
    sidebar.style.transform = "translateX(-100%)";
    updateHeaderStyles();
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

// Lägg till stängningsknappens funktion
closeCartSidebarButton.addEventListener("click", () => {
  isCartSidebarOpen = false;
  cartSidebar.style.transform = "translateX(100%)";
  updateHeaderStyles();
});

// Uppdatera headern vid scroll
window.addEventListener("scroll", () => {
  updateHeaderStyles();
});
