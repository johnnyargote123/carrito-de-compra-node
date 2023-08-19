const form = document.getElementById("resetForm");
const errorMessage = document.getElementById("errorMessage");
const popupOverlay = document.getElementById("popupOverlay");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};
  var path = window.location.pathname;
  var token = path.split("/reset-password/")[1];

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch(`/api/sessions/reset-password/${token}`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result = await response.json();
  console.log(result);

  if (response.ok) {


    popupOverlay.classList.add("active");
    const redirectButton = document.getElementById("redirectButton");
    redirectButton.addEventListener("click", () => {
      // Redirect to another page
      window.location.href = "http://localhost:8080/login";
    });

    
  } else {
    errorMessage.textContent = "No puedes poner esta contraseña";
    errorMessage.style.display = "block";
  }
});
