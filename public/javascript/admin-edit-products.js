document
  .getElementById('edit-product-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const productId = window.location.pathname.split('/').pop();

    fetch(`/admin-edit/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/admin';
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  });
