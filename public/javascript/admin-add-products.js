document
  .getElementById('add-product-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/admin-add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/admin';
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  });