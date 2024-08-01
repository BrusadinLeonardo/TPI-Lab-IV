//crear eventos
async function handleCreateEvent(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        fecha_inicio: formData.get('fecha_inicio'),
        fecha_fin: formData.get('fecha_fin'),
        lugar: formData.get('lugar'),
        cupos: formData.get('cupos'),
        categoria_id: formData.get('categoria_id')
    };

    try {
        const params = new URLSearchParams();
        params.append('nombre', data.nombre);
        params.append('descripcion', data.descripcion);
        params.append('fecha_inicio', data.fecha_inicio);
        params.append('fecha_fin', data.fecha_fin);
        params.append('lugar', data.lugar);
        params.append('cupos', data.cupos);
        params.append('categoria_id', data.categoria_id);

        const response = await fetch('http://127.0.0.1:8000/Eventos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: params
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('create-event-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('create-event-response').textContent = `Error: ${error.message}`;
    }
}

//modEVENTOS
async function handleUpdateEvent(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const eventId = formData.get('event_id');
    const data = {
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        fecha_inicio: formData.get('fecha_inicio'),
        fecha_fin: formData.get('fecha_fin'),
        lugar: formData.get('lugar'),
        cupos: formData.get('cupos'),
        categoria_id: formData.get('categoria_id')
    };

    try {
        const response = await fetch(`http://127.0.0.1:8000/Eventos/${eventId}`, {
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
        document.getElementById('update-event-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('update-event-response').textContent = `Error: ${error.message}`;
    }
}

// Ensure you attach the function to the form's submit event
document.getElementById('update-event-form').addEventListener('submit', handleUpdateEvent);


// Eliminar eventos
async function handleDeleteEvent(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const eventId = formData.get('event_id');

    try {
        const response = await fetch(`http://127.0.0.1:8000/Eventos/${eventId}`, { // Ajusta la URL según tu configuración
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
              }
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse the error response
            throw new Error(`Error: ${response.statusText} - ${errorData.detail}`);
        }

        document.getElementById('delete-event-response').textContent = `Evento ${eventId} eliminado con éxito.`;
    } catch (error) {
        document.getElementById('delete-event-response').textContent = `Error: ${error.message}`;
    }
}


// Obtener todos los eventos
async function handleGetEvents(event) {
    event.preventDefault();

    try {
        const response = await fetch('http://127.0.0.1:8000/Eventos/', {
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
        
        const eventsTableBody = document.getElementById('events-table-body');
        eventsTableBody.innerHTML = '';

        result.forEach((evento) => {
            const row = document.createElement('tr');

            const cellIndex = document.createElement('td');
            cellIndex.textContent = evento.id;
            row.appendChild(cellIndex);

            const cellName = document.createElement('td');
            cellName.textContent = evento.nombre;
            row.appendChild(cellName);

            const cellDescription = document.createElement('td');
            cellDescription.textContent = evento.descripcion;
            row.appendChild(cellDescription);

            const cellStartDate = document.createElement('td');
            cellStartDate.textContent = evento.fecha_inicio;
            row.appendChild(cellStartDate);

            const cellEndDate = document.createElement('td');
            cellEndDate.textContent = evento.fecha_fin;
            row.appendChild(cellEndDate);

            const cellLocation = document.createElement('td');
            cellLocation.textContent = evento.lugar;
            row.appendChild(cellLocation);

            const cellSlots = document.createElement('td');
            cellSlots.textContent = evento.cupos;
            row.appendChild(cellSlots);

            const cellCategory = document.createElement('td');
            cellCategory.textContent = evento.categoria_id;
            row.appendChild(cellCategory);

            eventsTableBody.appendChild(row);
        });
    } catch (error) {
        document.getElementById('get-events-response').textContent = `Error: ${error.message}`;
    }
}

async function handleGetEventById(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const eventId = formData.get('event_id');

    try {
        const response = await fetch(`http://127.0.0.1:8000/Eventos/id/${eventId}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const responseData = await response.text();

        // Verificar si la respuesta está vacía
        if (!responseData.trim()) {
            throw new Error("La respuesta está vacía o no es válida.");
        }

        const result = JSON.parse(responseData);
        document.getElementById('get-event-by-id-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('get-event-by-id-response').textContent = `Error: ${error.message}`;
    }
}


// evento.js

// Función para obtener y mostrar eventos disponibles
async function fetchAndDisplayEventos(fecha) {
    const url = `http://127.0.0.1:8000/Eventos/disponibles/${fecha}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Reemplaza con tu método para obtener el token
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        const eventosTableBody = document.querySelector('#eventos-table tbody');
        
        // Limpiar tabla antes de actualizar
        eventosTableBody.innerHTML = '';
        
        data.forEach(evento => {
            const row = `
                <tr>
                    <td>${evento.nombre}</td>
                    <td>${evento.descripcion}</td>
                    <td>${evento.fecha_inicio}</td>
                    <td>${evento.fecha_fin}</td>
                    <td>${evento.lugar}</td>
                    <td>${evento.cupos}</td>
                    <td>${evento.categoria_id}</td>
                </tr>`;
            eventosTableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching eventos:', error);
    }
}





// Función para buscar eventos por descripción
async function buscarEventoPorDescripcion(descripcionEvento) {
    const url = `http://127.0.0.1:8000/Eventos/descripcion/${encodeURIComponent(descripcionEvento)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Reemplaza con tu método para obtener el token
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const eventosTableBody = document.getElementById('eventos-table-body-descripcion');

        // Limpiar tabla antes de actualizar
        eventosTableBody.innerHTML = '';

        // Insertar filas de eventos en la tabla
        data.forEach((evento ) => {
            const row = `
                <tr>
                    <td>${evento.id}</td>
                    <td>${evento.nombre}</td>
                    <td>${evento.descripcion}</td>
                    <td>${evento.fecha_inicio}</td>
                    <td>${evento.fecha_fin}</td>
                    <td>${evento.lugar}</td>
                    <td>${evento.cupos}</td>
                    <td>${evento.id_categoria}</td>
                </tr>`;
            eventosTableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error buscando eventos por descripción:', error);
    }
}

// Event Listener para el formulario de búsqueda por descripción
document.addEventListener('DOMContentLoaded', () => {
    const buscarDescripcionForm = document.getElementById('buscar-descripcion-form');

    buscarDescripcionForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const descripcionEvento = document.getElementById('descripcion-evento').value.trim();
        
        if (descripcionEvento !== '') {
            await buscarEventoPorDescripcion(descripcionEvento);
        } else {
            console.error('La descripción del evento no puede estar vacía');
        }
    });
});


