
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
        const productCard = document.createElement('div');
        productCard.className =
          'p-4 flex flex-col items-center justify-between bg-white rounded-lg shadow-lg hover:shadow-xl transition-all';
      
        productCard.innerHTML = `
          <div class="relative group">
            
            <img
              src="${product.image}"
              alt="${product.productName}"
              class="w-full h-64 object-cover rounded-t-lg group-hover:hidden"
            />
      
            
            <img
              src="${product.secondaryImage1}"
              alt="${product.productName} alternate view"
              class="w-full h-64 object-cover rounded-t-lg hidden group-hover:block"
            />
          </div>
          <div class="p-4 flex flex-col items-start">
            <h3 class="text-lg font-bold text-gray-800">${product.productName}</h3>
            <p class="text-sm text-gray-600">${product.brand}</p>
            <p class="text-lg font-semibold text-gray-900">${product.price} kr</p>
          </div>
        `;
      
        return productCard;
      }
  });