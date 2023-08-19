const socket = io();

socket.on('add-product', (newProduct) => {
  const productElement = document.createElement('div');
  productElement.classList.add('container-card-product')
  productElement.setAttribute('id', `product-${newProduct.id}`); // Agregar el ID dinámico
  productElement.innerHTML = `
    <div class="box-card-product">
      <div class="contianer-tags">
        <div class="tag-id">
          <p>ID ${newProduct.id}</p>
        </div>

        <div class="tag-status">
          <p>Status ${newProduct.status}</p>
        </div>
      </div>

      <div class="container-img">
        <img src="${newProduct.thumbnails}" alt="imagen ${newProduct.title}">    
      </div>
      <div class="container-stock">
        <p style="margin: 0px"> <b>Stock:</b> ${newProduct.stock}</p>  
      </div>
      <h1>${newProduct.category}</h1>
      <h2>${newProduct.title}</h2>

      <p> <b>Description:</b> ${newProduct.description}</p>
      <p> <b>Code:</b> ${newProduct.code}</p>
      <p> <b>Price:</b> $${newProduct.price}</p>
    </div>
  `;

  const productsList = document.getElementById('products-list');
  productsList.appendChild(productElement);
});

socket.on('remove-product', (productId) => {
  const productElement = document.getElementById(`product-${productId}`);
  if (productElement) {
    productElement.parentNode.removeChild(productElement);
  }
});

