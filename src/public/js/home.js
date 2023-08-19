function prevPage() {
  const currentPage = parseInt(document.querySelector('.pagination .active').textContent);
  const prevPage = currentPage - 1;
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('page', prevPage);
  window.location.search = searchParams.toString();
}

function nextPage() {
  const currentPage = parseInt(document.querySelector('.pagination .active').textContent);
  const nextPage = currentPage + 1;
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('page', nextPage);
  window.location.search = searchParams.toString();
}

function goToPage(page) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('page', page);
  window.location.search = searchParams.toString();
}


const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.parentNode.parentNode.id.split('-')[1];
    const cartId  = button.getAttribute('data-cart-id');

    console.log(cartId)
    const quantity = 1; // cantidad de productos a agregar al carrito
    const url = `http://localhost:8080/api/carts/${cartId}/product/${productId}`;
    
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify({ quantity,text: productId  })
    })
      .then((response) => {
        // handle response
      })
      .catch((error) => {
        // handle error
      });
  });
}); 

function goToProduct (productId) {
  console.log(productId)
    window.location.href = `/product/${productId}`;
}

function goToCart(){
  window.location.href = `/cart-personal`
}

function goToUserEdit() {
  window.location.href = `/control-user`
}

function logout() {
  fetch('/api/sessions/logout', { method: 'POST' })
    .then(() => {
      window.location.href = '/login';
    })
    .catch((error) => console.log(error));
}