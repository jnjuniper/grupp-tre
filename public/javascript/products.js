
document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("product-grid");
  

    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
          
        }
        return response.json();

      })
      .then((products) => {
        products
        .filter((product) => product.isNew === true)
        .forEach((product) => {
          const productCard = createProductCard(product);
          productGrid.appendChild(productCard);
        });
      })
      .catch((error) => {
        console.error(error.message);
        productGrid.innerHTML = "<p class='text-center'>Unable to load products.</p>";
      });
  
    function createProductCard(product) {
      const card = document.createElement("div");
      card.classList.add("bg-white", "rounded-lg", "shadow-md", "p-4", "text-center");
  
      card.innerHTML = `
        <img 
          src="${product.image || '/images/placeholder.png'}" 
          alt="${product.productName}" 
          class="h-40 w-full object-cover mb-4 rounded">
        <h3 class="text-lg font-semibold mb-2">${product.productName}</h3>
        <p class="text-gray-600 mb-4">${product.brand || "Unknown Brand"}</p>
        <p class="text-xl font-bold text-gray-800 mb-4">${product.price}</p>
        <button 
          class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Lägg till i varukorg
        </button>
      `;
  
      return card;
    }
  });