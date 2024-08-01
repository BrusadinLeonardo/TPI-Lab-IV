// Crear Categoría
async function handleCreateCategory(event) {
    event.preventDefault();
    
    const nombreCategoria = document.getElementById('nombre_categoria').value;
    const descripcionCategoria = document.getElementById('descripcion_categoria').value; // Agregar captura de descripción si es necesario
    
    const formData = new FormData();
    formData.append('nombre', nombreCategoria);
    formData.append('descripcion', descripcionCategoria); // Agregar descripción si es necesario
    
    try {
        const response = await fetch('http://127.0.0.1:8000/categoria', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
              },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('create-category-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('create-category-response').textContent = `Error: ${error.message}`;
    }
}


// Obtener Todas las Categorías
async function handleGetCategories(event) {
    event.preventDefault();

    try {
        const response = await fetch('http://127.0.0.1:8000/categoria',{            method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        const tableBody = document.getElementById('categories-table-body');
        tableBody.innerHTML = ''; // Limpiar la tabla antes de actualizar

        result.forEach((categoria, index) => {
            const row = `<tr>
                            <td>${categoria.id}</td>
                            <td>${categoria.nombre}</td>
                            <td>${categoria.descripcion}</td>

                        </tr>`;
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Actualizar Categoría
async function handleUpdateCategory(event) {
    event.preventDefault();

    const categoriaId = document.getElementById('update_categoria_id').value;
    const nombreCategoria = document.getElementById('update_nombre_categoria').value;
    const descripcionCategoria = document.getElementById('update_descripcion_categoria').value;

    const categoryData = {
        id: categoriaId,
        nombre: nombreCategoria,
        descripcion: descripcionCategoria
    };

    try {
        const response = await fetch(`http://127.0.0.1:8000/categoria/${categoriaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(categoryData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.detail}`);
        }

        const result = await response.json();
        document.getElementById('update-category-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('update-category-response').textContent = `Error: ${error.message}`;
    }
}




// Eliminar Categoría
async function handleDeleteCategory(event) {
    event.preventDefault();

    const categoriaId = document.getElementById('delete_categoria_id').value;

    try {
        const response = await fetch(`http://127.0.0.1:8000/categoria/${categoriaId}`, {
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
        document.getElementById('delete-category-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('delete-category-response').textContent = `Error: ${error.message}`;
    }
}

// Obtener Categoría por ID
async function handleGetCategoryById(event) {
    event.preventDefault();

    const categoriaId = document.getElementById('get_categoria_id').value;

    try {
        const response = await fetch(`http://127.0.0.1:8000/categoria/${categoriaId}` ,{
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
        document.getElementById('get-category-by-id-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('get-category-by-id-response').textContent = `Error: ${error.message}`;
    }
}