//crear usuario
async function handleCreateUser(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        rol: formData.get('rol'),
        hashed_password: formData.get('hashed_password')
    };

    try {
        const params = new URLSearchParams();
        params.append('nombre', data.nombre);
        params.append('email', data.email);
        params.append('rol', data.rol);
        params.append('hashed_password', data.hashed_password);

        const response = await fetch('http://127.0.0.1:8000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('create-user-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('create-user-response').textContent = `Error: ${error.message}`;
    }
}


//Actualizar Usuario
async function handleUpdateUser(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const userId = formData.get('user_id');
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        rol: formData.get('rol'),
        hashed_password: formData.get('hashed_password')
    };

    try {
        const response = await fetch(`http://127.0.0.1:8000/usuarios/${userId}`, { // Ajusta la URL según tu configuración
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('update-user-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('update-user-response').textContent = `Error: ${error.message}`;
    }
}


//Eliminar Usuario
async function handleDeleteUser(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const userId = formData.get('user_id');

    try {
        const response = await fetch(`http://127.0.0.1:8000/usuarios/${userId}`, { // Ajusta la URL según tu configuración
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
              }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('delete-user-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('delete-user-response').textContent = `Error: ${error.message}`;
    }
}

// Obtener Todos los Usuarios
async function handleGetUsers(event) {
    event.preventDefault();

    try {
        const response = await fetch('http://127.0.0.1:8000/usuarios',  {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        
        const usersTableBody = document.getElementById('users-table-body');
        usersTableBody.innerHTML = '';

        result.forEach((user, index) => {
            const row = document.createElement('tr');

            const cellIndex = document.createElement('td');
            cellIndex.textContent = user.id;
            row.appendChild(cellIndex);

            const cellName = document.createElement('td');
            cellName.textContent = user.nombre;
            row.appendChild(cellName);

            const cellEmail = document.createElement('td');
            cellEmail.textContent = user.email;
            row.appendChild(cellEmail);

            const cellRole = document.createElement('td');
            cellRole.textContent = user.rol;
            row.appendChild(cellRole);

            usersTableBody.appendChild(row);
        });
    } catch (error) {
        document.getElementById('get-users-response').textContent = `Error: ${error.message}`;
    }
}

// Obtener Usuario por ID
async function handleGetUserById(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const userId = formData.get('user_id');

    try {
        const response = await fetch(`http://127.0.0.1:8000/usuarios/${userId}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('get-user-by-id-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('get-user-by-id-response').textContent = `Error: ${error.message}`;
    }
}