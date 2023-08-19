// Obtén una referencia al botón de compra


const buyButton = document.querySelector('.buy-cart-button');

// Agrega un controlador de eventos al botón
buyButton.addEventListener('click', () => {
  // Obtén el _id del carrito directamente
  const cartId = buyButton.getAttribute('data-cart-id');
  console.log(cartId)

  // Construye la URL completa con el _id
  const url = `http://localhost:8080/api/carts/${cartId}/purchase`;

  // Realiza la solicitud POST
  fetch(url, {
    method: 'POST',
  })
    .then(response => {
      // Verifica el estado de la respuesta
      if (response.ok) {
        console.log('Compra exitosa');
        window.location.href = "/";
      } else {
        console.error('Error al realizar la compra');
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
});

function goToHome() {
  window.location.href = "/"
}