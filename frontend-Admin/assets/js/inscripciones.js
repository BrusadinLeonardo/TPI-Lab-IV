// Crear Inscripción
async function handleCreateInscription(event) {
    event.preventDefault();
    
    const eventoId = document.getElementById('evento_id').value;
    const usuarioId = document.getElementById('usuario_id').value;
    const fechaInscripcion = document.getElementById('fecha_inscripcion').value;
    
    const formData = new FormData();
    formData.append('evento_id', eventoId);
    formData.append('usuario_id', usuarioId);
    formData.append('fecha_inscripcion', fechaInscripcion);
    
    try {
        const response = await fetch('http://127.0.0.1:8000/inscripciones', {
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
        document.getElementById('create-inscription-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('create-inscription-response').textContent = `Error: ${error.message}`;
    }
}

// Obtener Todas las Inscripciones
async function handleGetInscriptions(event) {
    event.preventDefault();

    try {
        const response = await fetch('http://127.0.0.1:8000/inscripciones', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        const tableBody = document.getElementById('inscriptions-table-body');
        tableBody.innerHTML = ''; // Limpiar la tabla antes de actualizar

        result.forEach((inscription) => {
            const row = `<tr>
                            <td>${inscription.id}</td>
                            <td>${inscription.evento_id}</td>
                            <td>${inscription.usuario_id}</td>
                            <td>${inscription.fecha_inscripcion}</td>
                        </tr>`;
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error('Error fetching inscriptions:', error);
    }
}

// Actualizar Inscripción
async function handleUpdateInscription(event) {
    event.preventDefault();

    const inscriptionId = document.getElementById('update_inscription_id').value;
    const eventoId = document.getElementById('update_evento_id').value;
    const usuarioId = document.getElementById('update_usuario_id').value;
    const fechaInscripcion = document.getElementById('update_fecha_inscripcion').value;

    const data = {
        id: parseInt(inscriptionId),
        evento_id: parseInt(eventoId),
        usuario_id: parseInt(usuarioId),
        fecha_inscripcion: fechaInscripcion
    };
    
    try {
        const response = await fetch(`http://127.0.0.1:8000/minscripciones/${inscriptionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse the error response
            throw new Error(`Error: ${response.statusText} - ${errorData.detail}`);
        }

        const result = await response.json();
        document.getElementById('update-inscription-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('update-inscription-response').textContent = `Error: ${error.message}`;
    }
}


// Eliminar Inscripción
async function handleDeleteInscription(event) {
    event.preventDefault();

    const inscriptionId = document.getElementById('delete_inscription_id').value;

    try {
        const response = await fetch(`http://127.0.0.1:8000/inscripciones/${inscriptionId}`, {
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
        document.getElementById('delete-inscription-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('delete-inscription-response').textContent = `Error: ${error.message}`;
    }
}

// Obtener Inscripción por ID
async function handleGetInscriptionById(event) {
    event.preventDefault();

    const inscriptionId = document.getElementById('get_inscription_id').value;

    try {
        const response = await fetch(`http://127.0.0.1:8000/inscripciones/${inscriptionId}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('get-inscription-by-id-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('get-inscription-by-id-response').textContent = `Error: ${error.message}`;
    }
}