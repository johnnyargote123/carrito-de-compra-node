const changeRoleForm = document.getElementById("changeRoleForm");
const roleSelect = document.getElementById("role");
const buyButton = document.querySelector('.change-rol-user');
const roleDisplay = document.getElementById('roleDisplay');


roleSelect.addEventListener("change", () => {
    const selectedRole = roleSelect.value;
    const userEmailToChangeRol = document.getElementById('changeUserEmail').value;
    const url = `/api/users/${selectedRole.toLowerCase()}/${userEmailToChangeRol}`;
    changeRoleForm.action = url;
});

changeRoleForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedRole = roleSelect.value;
    const userEmailToChangeRol = document.getElementById('changeUserEmail').value;
    const url = `/api/users/${selectedRole.toLowerCase()}/${userEmailToChangeRol}`;
    console.log(url)
    const formData = new FormData(changeRoleForm);
    formData.append('role', selectedRole);
    roleDisplay.textContent =  selectedRole
  fetch(url, {
    method: 'PATCH',
  })
    .then(response => {
      if (response.ok) {
      } else {
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });

});

const deleteUserForm = document.getElementById("deleteUserForm");

deleteUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userEmailToDelete = document.getElementById('deleteUserEmail').value;
    const url = `http://localhost:8080/api/sessions/users/${encodeURIComponent(userEmailToDelete)}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (response.ok) {
        } else {
        }
    } catch (error) {
        console.error('Error in the request:', error);
    }
});